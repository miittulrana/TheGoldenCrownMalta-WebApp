import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { Scissors, Clock, EuroIcon, AlertCircle } from 'lucide-react';
import { supabase } from '@/utils/supabase';
import { isValidEmail, isValidPhone, sanitizeInput } from '@/utils/validation';
import type { Service, TimeSlot, CustomerForm } from '@/types';
import 'react-day-picker/dist/style.css';

function BookingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="bg-surface rounded-lg p-6 mb-6">
        <div className="h-8 w-48 bg-background rounded mb-4" />
        <div className="flex justify-between">
          <div className="h-6 w-24 bg-background rounded" />
          <div className="h-6 w-24 bg-background rounded" />
        </div>
      </div>
      
      <div className="bg-surface rounded-lg p-6 mb-6">
        <div className="h-8 w-32 bg-background rounded mb-4" />
        <div className="h-64 w-full bg-background rounded" />
      </div>
      
      <div className="bg-surface rounded-lg p-6">
        <div className="h-8 w-32 bg-background rounded mb-4" />
        <div className="space-y-4">
          <div className="h-12 w-full bg-background rounded" />
          <div className="h-12 w-full bg-background rounded" />
          <div className="h-12 w-full bg-background rounded" />
          <div className="h-12 w-full bg-background rounded" />
        </div>
      </div>
    </div>
  );
}

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<CustomerForm>({
    name: '',
    email: '',
    phone: '',
    city: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<CustomerForm>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({
    name: false,
    email: false,
    phone: false,
    city: false,
  });

  useEffect(() => {
    loadServiceDetails();
  }, [id]);

  useEffect(() => {
    if (selectedDate) {
      loadAvailableSlots();
    }
  }, [selectedDate]);

  const loadServiceDetails = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setService(data);
    } catch (error) {
      console.error('Error loading service:', error);
      setError('Unable to load service details');
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableSlots = async () => {
    if (!selectedDate || !service) return;

    try {
      // Load working hours
      const dayOfWeek = selectedDate.getDay();
      const { data: hours } = await supabase
        .from('shop_schedule')
        .select('*')
        .eq('day_of_week', dayOfWeek)
        .single();

      if (!hours || !hours.is_open) {
        setAvailableSlots([]);
        return;
      }

      // Generate time slots
      const slots: TimeSlot[] = [];
      const interval = service.duration_minutes;
      let currentTime = new Date(`2000-01-01 ${hours.open_time}`);
      const closeTime = new Date(`2000-01-01 ${hours.close_time}`);
      
      // Adjust for same day bookings
      const now = new Date();
      const isToday = selectedDate.toDateString() === now.toDateString();
      if (isToday) {
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const roundedMinute = Math.ceil(currentMinute / interval) * interval;
        currentTime = new Date();
        currentTime.setHours(currentHour, roundedMinute);
      }

      const lastPossibleSlot = new Date(closeTime.getTime() - (interval * 60000));

      while (currentTime <= lastPossibleSlot) {
        slots.push({
          time: currentTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          }),
          available: true
        });
        currentTime = new Date(currentTime.getTime() + interval * 60000);
      }

      // Load existing bookings
      const { data: bookings } = await supabase
        .from('bookings')
        .select('booking_time, services ( duration_minutes )')
        .eq('booking_date', format(selectedDate, 'yyyy-MM-dd'))
        .neq('status', 'cancelled');

      // Mark booked slots as unavailable
      if (bookings) {
        bookings.forEach(booking => {
          const bookingStart = new Date(`2000-01-01 ${booking.booking_time}`);
          const bookingEnd = new Date(bookingStart.getTime() + 
            (booking.services.duration_minutes * 60000));

          slots.forEach((slot, index) => {
            const slotTime = new Date(`2000-01-01 ${slot.time}`);
            const slotEnd = new Date(slotTime.getTime() + (interval * 60000));

            if (
              (slotTime >= bookingStart && slotTime < bookingEnd) ||
              (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
              (slotTime <= bookingStart && slotEnd >= bookingEnd)
            ) {
              slots[index].available = false;
            }
          });
        });
      }

      setAvailableSlots(slots);
    } catch (error) {
      console.error('Error loading slots:', error);
      setError('Unable to load available time slots');
    }
  };

  const validateField = (field: keyof CustomerForm, value: string): string => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
        
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!isValidEmail(value)) return 'Please enter a valid email address';
        return '';
        
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!isValidPhone(value)) return 'Please enter a valid phone number (e.g., +356 9999 9999)';
        return '';
        
      case 'city':
        if (!value.trim()) return 'City is required';
        if (value.trim().length < 2) return 'Please enter a valid city name';
        return '';
        
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerForm> = {};
    let isValid = true;

    (Object.keys(form) as Array<keyof CustomerForm>).forEach((field) => {
      const error = validateField(field, form[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setFormErrors(newErrors);
    return isValid;
  };

  const handleFieldBlur = (field: keyof CustomerForm) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, form[field]);
    setFormErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleFieldChange = (field: keyof CustomerForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (touchedFields[field]) {
      const error = validateField(field, value);
      setFormErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleBooking = async () => {
    if (!validateForm()) return;
    if (!service || !selectedDate || !selectedTime) {
      setError('Please select a date and time');
      return;
    }

    try {
      setBookingLoading(true);

      // Format time for database
      const timeMatch = selectedTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!timeMatch) {
        throw new Error('Invalid time format');
      }

      let [_, hours, minutes, period] = timeMatch;
      let hour = parseInt(hours);

      if (period.toUpperCase() === 'PM' && hour !== 12) {
        hour += 12;
      } else if (period.toUpperCase() === 'AM' && hour === 12) {
        hour = 0;
      }

      const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes}:00`;

      // Sanitize form data
      const sanitizedForm = {
        name: sanitizeInput(form.name),
        email: sanitizeInput(form.email.toLowerCase()),
        phone: sanitizeInput(form.phone),
        city: sanitizeInput(form.city)
      };

      // Create customer
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .insert([sanitizedForm])
        .select()
        .single();

      if (customerError) throw customerError;

      // Generate reference number
      const refNo = Math.floor(10000 + Math.random() * 90000).toString();

      // Create booking
      const { error: bookingError } = await supabase
        .from('bookings')
        .insert([{
          customer_id: customerData.id,
          service_id: service.id,
          booking_date: format(selectedDate, 'yyyy-MM-dd'),
          booking_time: formattedTime,
          ref_no: refNo,
          status: 'confirmed'
        }]);

      if (bookingError) throw bookingError;

      // Navigate to confirmation
      navigate('/booking/confirmation', {
        state: { 
          refNo,
          name: sanitizedForm.name,
          service: service.name,
          date: format(selectedDate, 'EEEE, MMMM d, yyyy'),
          time: selectedTime
        }
      });

    } catch (error) {
      console.error('Error creating booking:', error);
      setError('Unable to complete booking. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <BookingSkeleton />;
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <AlertCircle className="w-12 h-12 text-error mb-4" />
          <p className="text-lg text-text mb-6">Service not found</p>
          <button
            onClick={() => navigate('/services')}
            className="bg-primary text-black px-6 py-2 rounded-lg hover:bg-primary/90"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Service Details */}
      <div className="bg-surface rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-text mb-4 flex items-center gap-2">
          <Scissors className="w-6 h-6 text-primary" />
          {service.name}
        </h2>
        <div className="flex justify-between text-subtext">
          <div className="flex items-center gap-2">
            <EuroIcon className="w-5 h-5" />
            <span className="font-semibold text-primary">
              {service.price.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{service.duration_minutes} mins</span>
          </div>
        </div>
      </div>

      {/* Date Selection */}
      <div className="bg-surface rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-text mb-4">Select Date</h3>
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={{ before: new Date() }}
          className="!bg-background rounded-lg p-4"
          classNames={{
            day_selected: "bg-primary text-black",
            day_today: "text-primary",
            day: "text-text hover:bg-surface",
          }}
        />
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="bg-surface rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-text mb-4">Select Time</h3>
          {availableSlots.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {availableSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTime(slot.time)}
                  disabled={!slot.available}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium
                    ${slot.available
                      ? selectedTime === slot.time
                        ? 'bg-primary text-black'
                        : 'bg-background text-text hover:bg-primary/20'
                      : 'bg-background/50 text-subtext cursor-not-allowed'
                    }
                  `}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-subtext text-center italic">
              No available time slots for this date
            </p>
          )}
        </div>
      )}

{/* Customer Details Form */}
<div className="bg-surface rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-text mb-4">Your Details</h3>
        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={form.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              onBlur={() => handleFieldBlur('name')}
              className={`w-full px-4 py-2 rounded-lg bg-background text-text border ${
                formErrors.name ? 'border-error' : 'border-surface'
              }`}
              placeholder="Enter your name"
            />
            {formErrors.name && (
              <p className="mt-1 text-sm text-error">{formErrors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => handleFieldChange('email', e.target.value.toLowerCase())}
              onBlur={() => handleFieldBlur('email')}
              className={`w-full px-4 py-2 rounded-lg bg-background text-text border ${
                formErrors.email ? 'border-error' : 'border-surface'
              }`}
              placeholder="Enter your email"
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-error">{formErrors.email}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={form.phone}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              onBlur={() => handleFieldBlur('phone')}
              className={`w-full px-4 py-2 rounded-lg bg-background text-text border ${
                formErrors.phone ? 'border-error' : 'border-surface'
              }`}
              placeholder="+356 9999 9999"
            />
            {formErrors.phone && (
              <p className="mt-1 text-sm text-error">{formErrors.phone}</p>
            )}
          </div>

          {/* City Field */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-text mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              value={form.city}
              onChange={(e) => handleFieldChange('city', e.target.value)}
              onBlur={() => handleFieldBlur('city')}
              className={`w-full px-4 py-2 rounded-lg bg-background text-text border ${
                formErrors.city ? 'border-error' : 'border-surface'
              }`}
              placeholder="Enter your city"
            />
            {formErrors.city && (
              <p className="mt-1 text-sm text-error">{formErrors.city}</p>
            )}
          </div>
        </div>
      </div>

      {/* Booking Summary */}
      {selectedDate && selectedTime && (
        <div className="bg-surface rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-text mb-4">Booking Summary</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-subtext">
              <Scissors className="w-5 h-5" />
              <span>{service.name}</span>
            </div>
            <div className="flex items-center gap-2 text-subtext">
              <Clock className="w-5 h-5" />
              <span>{format(selectedDate, 'EEEE, MMMM d, yyyy')} at {selectedTime}</span>
            </div>
            <div className="flex items-center gap-2 text-subtext">
              <EuroIcon className="w-5 h-5" />
              <span className="font-semibold text-primary">
                €{service.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-error/10 rounded-lg p-4 mb-6 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-error flex-shrink-0" />
          <p className="text-error">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleBooking}
        disabled={bookingLoading || !selectedDate || !selectedTime}
        className={`
          w-full py-3 rounded-lg font-semibold
          ${bookingLoading || !selectedDate || !selectedTime
            ? 'bg-primary/50 cursor-not-allowed'
            : 'bg-primary hover:bg-primary/90'
          }
          text-black transition-colors
        `}
      >
        {bookingLoading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            Confirming Booking...
          </span>
        ) : (
          'Confirm Booking'
        )}
      </button>
    </div>
  );
}