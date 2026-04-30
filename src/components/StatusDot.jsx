import React from 'react';

export function StatusDot({ status = 'online', className = '' }) {
  const colors = {
    online: 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]',
    offline: 'bg-gray-500',
    warning: 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]',
    error: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'
  };

  return (
    <span className={`inline-block w-2.5 h-2.5 rounded-full ${colors[status]} ${className}`} />
  );
}
