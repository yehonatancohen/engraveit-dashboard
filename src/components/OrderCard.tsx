import React, { useState } from 'react';
import { Order } from '../types';
import { Copy, CheckCircle2, Play, Check, Package, Clock, Phone, Edit2, X, Save, ArrowRight } from 'lucide-react';

interface OrderCardProps {
  order: Order;
  onMove: (id: string, newStatus: Order['status']) => void;
  onEdit: (id: string, updatedOrder: Partial<Order>) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onMove, onEdit }) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    customer_phone: order.customer_phone,
    product_name: order.product_name,
    engraving_text: order.engraving_text,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(order.engraving_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onEdit(order.id, editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      customer_phone: order.customer_phone,
      product_name: order.product_name,
      engraving_text: order.engraving_text,
    });
    setIsEditing(false);
  };

  const formattedTime = new Date(order.created_at).toLocaleTimeString('he-IL', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const shortId = order.id.slice(0, 8);

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border-2 border-blue-400 p-4 mb-4 flex flex-col gap-3">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-lg text-gray-900">עריכת הזמנה</span>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <div>
            <label className="block text-xs text-gray-500 mb-1 font-medium">טלפון לקוח</label>
            <input
              type="text"
              value={editForm.customer_phone}
              onChange={e => setEditForm({ ...editForm, customer_phone: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1 font-medium">מוצר</label>
            <input
              type="text"
              value={editForm.product_name}
              onChange={e => setEditForm({ ...editForm, product_name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1 font-medium">טקסט לחריטה</label>
            <textarea
              value={editForm.engraving_text}
              onChange={e => setEditForm({ ...editForm, engraving_text: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              rows={2}
            />
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
            <Save className="w-4 h-4" /> שמור
          </button>
          <button onClick={handleCancel} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
            <X className="w-4 h-4" /> ביטול
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4 flex flex-col gap-3 hover:shadow-md transition-shadow group/card">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-gray-500 font-mono">{shortId}</span>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {formattedTime}
          </span>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="text-gray-400 hover:text-blue-600 opacity-0 group-hover/card:opacity-100 transition-opacity p-1 bg-gray-50 hover:bg-blue-50 rounded-md"
          title="ערוך הזמנה"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-1 text-sm">
        <div className="flex items-center gap-2 text-gray-700">
          <Phone className="w-4 h-4 text-gray-400" />
          <a
            href={`https://wa.me/${order.customer_phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600 hover:underline transition-colors"
          >
            {order.customer_phone}
          </a>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Package className="w-4 h-4 text-gray-400" />
          <span className="font-medium">{order.product_name}</span>
        </div>
      </div>

      <div className="mt-2">
        <div className="text-xs text-gray-500 mb-1 font-medium">טקסט לחריטה:</div>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-yellow-50 border border-yellow-200 text-yellow-900 p-3 rounded-lg font-mono text-lg text-center font-bold shadow-inner">
            {order.engraving_text}
          </div>
          <button
            onClick={handleCopy}
            className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors relative group"
            title="העתק טקסט"
          >
            {copied ? <Check className="w-6 h-6 text-green-600" /> : <Copy className="w-6 h-6" />}
            {copied && (
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
                הועתק!
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        {order.status === 'new' && (
          <button
            onClick={() => onMove(order.id, 'in_production')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Play className="w-4 h-4" />
            התחל ייצור
          </button>
        )}
        {order.status === 'in_production' && (
          <>
            <button
              onClick={() => onMove(order.id, 'new')}
              className="px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium flex items-center justify-center transition-colors"
              title="החזר לחדשות"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onMove(order.id, 'completed')}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              סמן כהושלם
            </button>
          </>
        )}
      </div>
    </div>
  );
};
