import { Scissors } from 'lucide-react';

interface HeaderProps {
  openOrdersCount: number;
}

export function Header({ openOrdersCount }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gray-900 text-white p-2 rounded-xl">
            <Scissors className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">EngraveIt</h1>
            <p className="text-xs text-gray-500 font-medium">מערכת ניהול ייצור</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500 font-medium">הזמנות פתוחות</span>
            <span className="text-lg font-bold text-blue-600">{openOrdersCount}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
