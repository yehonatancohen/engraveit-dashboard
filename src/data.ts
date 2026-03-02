import { Order } from './types';

export const initialOrders: Order[] = [
  { id: '#10042', date: '14:30', customerName: 'ישראל ישראלי', shippingMethod: 'איסוף עצמי', product: 'ארנק דמוי עור - שחור', engravingText: 'באהבה מסבא וסבתא', status: 'new' },
  { id: '#10043', date: '15:00', customerName: 'שיר כהן', shippingMethod: 'נקודת חלוקה', product: 'מחזיק מפתחות עץ', engravingText: 'הבית של משפחת כהן', status: 'new' },
  { id: '#10044', date: '15:15', customerName: 'דוד לוי', shippingMethod: 'שליח עד הבית', product: 'בקבוק תרמי שחור', engravingText: 'David L.', status: 'production' },
  { id: '#10045', date: '16:00', customerName: 'רונית אברהם', shippingMethod: 'איסוף עצמי', product: 'קרש חיתוך במבוק', engravingText: 'המטבח של רונית', status: 'production' },
  { id: '#10046', date: '16:30', customerName: 'אלון מזרחי', shippingMethod: 'נקודת חלוקה', product: 'עט מתכת כסוף', engravingText: 'Alon 2026', status: 'completed' },
];
