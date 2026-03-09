import React from 'react';
import { useDashboardStats } from '../../hooks/useBookings';
import { Users, Calendar, DollarSign, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { data: stats, isLoading } = useDashboardStats();

  const cards = [
    { label: "Today's Bookings", value: stats?.todayBookings || 0, icon: <Calendar className="text-blue-600" />, bg: 'bg-blue-50' },
    { label: "Total Clients", value: stats?.totalClients || 0, icon: <Users className="text-purple-600" />, bg: 'bg-purple-50' },
    { label: "Revenue Today", value: `$${stats?.revenueToday || 0}`, icon: <DollarSign className="text-green-600" />, bg: 'bg-green-50' },
    { label: "Pending Confirmations", value: stats?.pendingConfirmations || 0, icon: <Clock className="text-amber-600" />, bg: 'bg-amber-50' },
  ];

  if (isLoading) return <div className="animate-pulse">Loading dashboard...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${card.bg}`}>
                {card.icon}
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">{card.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{card.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="font-bold text-slate-900">Recent Activity</h2>
          <button className="text-sm text-[#ED1C24] font-semibold hover:underline">View All</button>
        </div>
        <div className="p-6">
          <p className="text-slate-500 text-sm text-center py-8">No recent activity to display.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;