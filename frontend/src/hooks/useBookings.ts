import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '../services/api/booking.service';

export const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: bookingService.getAll,
  });
};

export const useTodayQueue = () => {
  return useQuery({
    queryKey: ['bookings', 'today'],
    queryFn: bookingService.getTodayQueue,
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: bookingService.getStats,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bookingService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};