export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'client';
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  lastVisit?: string;
  totalSpent?: number;
  notes?: string;
}

export interface Booking {
  id: string;
  clientId: string;
  client?: Client;
  serviceId: string;
  serviceName: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
}

export interface DashboardStats {
  todayBookings: number;
  totalClients: number;
  revenueToday: number;
  pendingConfirmations: number;
}