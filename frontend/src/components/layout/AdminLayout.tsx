import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, ListOrdered, BarChart3, Settings, LogOut } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const navItems = [
    { to: '/admin', icon: <LayoutDashboard size={18} />, label: 'Dashboard', end: true },
    { to: '/admin/clients', icon: <Users size={18} />, label: 'Clients' },
    { to: '/admin/queue', icon: <ListOrdered size={18} />, label: "Today's Queue" },
    { to: '/admin/analytics', icon: <BarChart3 size={18} />, label: 'Analytics' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col shrink-0">
        <div className="p-6">
          <span className="text-[#ED1C24] font-bold text-xl tracking-tight">Smooth Lines</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Main Menu</p>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive 
                    ? 'bg-[#ED1C24] text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
          
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-8 mb-2 px-2">System</p>
          <NavLink to="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
            <Settings size={18} />
            Settings
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 w-full rounded-md transition-colors">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-slate-50/50 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;