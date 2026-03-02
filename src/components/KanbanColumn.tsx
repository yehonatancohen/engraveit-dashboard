import React from 'react';
import { Order, OrderStatus } from '../types';
import { OrderCard } from './OrderCard';

interface KanbanColumnProps {
  title: string;
  status: OrderStatus;
  orders: Order[];
  onMove: (id: string, newStatus: OrderStatus) => void;
  onEdit: (id: string, updatedOrder: Partial<Order>) => void;
  icon: React.ReactNode;
  colorClass: string;
}

export function KanbanColumn({ title, status, orders, onMove, onEdit, icon, colorClass }: KanbanColumnProps) {
  return (
    <div className="flex flex-col bg-gray-100/50 rounded-2xl p-4 min-h-[70vh] border border-gray-200">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${colorClass}`}>
            {icon}
          </div>
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        </div>
        <div className="bg-gray-200 text-gray-700 text-sm font-bold px-3 py-1 rounded-full">
          {orders.length}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        {orders.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm font-medium border-2 border-dashed border-gray-200 rounded-xl min-h-[100px]">
            אין הזמנות בעמודה זו
          </div>
        ) : (
          orders.map(order => (
            <OrderCard key={order.id} order={order} onMove={onMove} onEdit={onEdit} />
          ))
        )}
      </div>
    </div>
  );
}
