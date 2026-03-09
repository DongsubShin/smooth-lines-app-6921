import apiClient from './api.client';
import { Booking, DashboardStats } from '../../types';

export const bookingService = {
  getAll: async () => {
    const { data } = await apiClient.get<Booking[]>('/bookings');
    return data;
  },
  getTodayQueue: async () => {
    const { data } = await apiClient.get<Booking[]>('/bookings/today');
    return data;
  },
  getStats: async () => {
    const { data } = await apiClient.get<DashboardStats>('/bookings/stats');
    return data;
  },
  create: async (bookingData: Partial<Booking>) => {
    const { data } = await apiClient.post<Booking>('/bookings', bookingData);
    return data;
  },
};