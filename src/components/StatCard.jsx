import React from 'react';
import { GlassCard } from './GlassCard';
import { motion } from 'framer-motion';

export function StatCard({ title, value, change, icon: Icon, trend = 'up' }) {
  const isPositive = trend === 'up';
  
  return (
    <GlassCard className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-on-surface-variant">
        <span className="text-sm font-semibold tracking-wider">{title}</span>
        {Icon && <Icon className="w-5 h-5 text-primary" />}
      </div>
      
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold tracking-heading">{value}</div>
        {change && (
          <div className={`text-sm font-semibold px-2 py-1 rounded-full ${
            isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
          }`}>
            {isPositive ? '+' : ''}{change}
          </div>
        )}
      </div>
    </GlassCard>
  );
}
