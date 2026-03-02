import React, { useState } from 'react';
import { Header } from './components/Header';
import { KanbanColumn } from './components/KanbanColumn';
import { initialOrders } from './data';
import { Order, OrderStatus } from './types';
import { Inbox, Hammer, CheckCircle } from 'lucide-react';

export default function App() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleMoveOrder = (id: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const handleEditOrder = (id: string, updatedOrder: Partial<Order>) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, ...updatedOrder } : order
    ));
  };

  const newOrders = orders.filter(o => o.status === 'new');
  const productionOrders = orders.filter(o => o.status === 'production');
  const completedOrders = orders.filter(o => o.status === 'completed');

  const openOrdersCount = newOrders.length + productionOrders.length;
  const completedTodayCount = completedOrders.length; // Assuming all completed are today for this demo

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans" dir="rtl">
      <Header openOrdersCount={openOrdersCount} completedTodayCount={completedTodayCount} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
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
            title="בביצוע"
            status="production"
            orders={productionOrders}
            onMove={handleMoveOrder}
            onEdit={handleEditOrder}
            icon={<Hammer className="w-5 h-5 text-orange-600" />}
            colorClass="bg-orange-100"
          />
          <KanbanColumn
            title="הושלמו"
            status="completed"
            orders={completedOrders}
            onMove={handleMoveOrder}
            onEdit={handleEditOrder}
            icon={<CheckCircle className="w-5 h-5 text-green-600" />}
            colorClass="bg-green-100"
          />
        </div>
      </main>
    </div>
  );
}
