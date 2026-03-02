import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { KanbanColumn } from './components/KanbanColumn';
import { supabase } from './lib/supabase';
import { Order, OrderStatus } from './types';
import { Inbox, Hammer } from 'lucide-react';

export default function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial orders (not completed)
  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .neq('status', 'completed')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data as Order[]);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          const newOrder = payload.new as Order;
          if (newOrder.status !== 'completed') {
            setOrders(prev => [newOrder, ...prev]);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders' },
        (payload) => {
          const updated = payload.new as Order;
          if (updated.status === 'completed') {
            setOrders(prev => prev.filter(o => o.id !== updated.id));
          } else {
            setOrders(prev =>
              prev.map(o => (o.id === updated.id ? updated : o))
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleMoveOrder = async (id: string, newStatus: OrderStatus) => {
    // Optimistic update
    if (newStatus === 'completed') {
      setOrders(prev => prev.filter(o => o.id !== id));
    } else {
      setOrders(prev =>
        prev.map(o => (o.id === id ? { ...o, status: newStatus } : o))
      );
    }

    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      console.error('Error updating order status:', error);
      // Revert: refetch on error
      const { data } = await supabase
        .from('orders')
        .select('*')
        .neq('status', 'completed')
        .order('created_at', { ascending: false });
      if (data) setOrders(data as Order[]);
    }
  };

  const handleEditOrder = async (id: string, updatedFields: Partial<Order>) => {
    setOrders(prev =>
      prev.map(o => (o.id === id ? { ...o, ...updatedFields } : o))
    );

    const { error } = await supabase
      .from('orders')
      .update(updatedFields)
      .eq('id', id);

    if (error) {
      console.error('Error editing order:', error);
    }
  };

  const newOrders = orders.filter(o => o.status === 'new');
  const productionOrders = orders.filter(o => o.status === 'in_production');

  const openOrdersCount = newOrders.length + productionOrders.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <p className="text-gray-500 text-lg">טוען הזמנות...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans" dir="rtl">
      <Header openOrdersCount={openOrdersCount} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          <KanbanColumn
            title="הזמנות חדשות"
            status="new"
            orders={newOrders}
            onMove={handleMoveOrder}
            onEdit={handleEditOrder}
            icon={<Inbox className="w-5 h-5 text-blue-600" />}
            colorClass="bg-blue-100"
          />
          <KanbanColumn
            title="בייצור"
            status="in_production"
            orders={productionOrders}
            onMove={handleMoveOrder}
            onEdit={handleEditOrder}
            icon={<Hammer className="w-5 h-5 text-orange-600" />}
            colorClass="bg-orange-100"
          />
        </div>
      </main>
    </div>
  );
}
