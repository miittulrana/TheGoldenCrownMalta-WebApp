// Service related types
export interface Service {
    id: string;
    name: string;
    price: number;
    duration_minutes: number;
    description?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }
  
  // Booking related types
  export interface Booking {
    id: string;
    customer_id: string;
    service_id: string;
    booking_date: string;
    booking_time: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    notes?: string;
    created_at: string;
    updated_at: string;
    ref_no: string;
  }
  
  // Customer related types
  export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    city: string;
    created_at: string;
    updated_at: string;
  }
  
  // Shop schedule types
  export interface WorkingHours {
    id: string;
    day_of_week: number;
    is_open: boolean;
    open_time: string;
    close_time: string;
    break_start?: string;
    break_end?: string;
    created_at: string;
    updated_at: string;
  }
  
  // Form data types
  export interface CustomerForm {
    name: string;
    email: string;
    phone: string;
    city: string;
  }
  
  export interface TimeSlot {
    time: string;
    available: boolean;
  }
  
  // Helper types for API responses
  export interface ApiResponse<T> {
    data: T | null;
    error: Error | null;
  }