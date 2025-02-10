import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scissors, Clock, EuroIcon, AlertCircle } from 'lucide-react';
import { supabase } from '@/utils/supabase';
import type { Service } from '@/types';

function ServiceSkeleton() {
  return (
    <div className="bg-surface rounded-lg p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-6 bg-background rounded-full" />
        <div className="h-6 w-48 bg-background rounded" />
      </div>
      <div className="flex justify-between mb-4">
        <div className="h-4 w-24 bg-background rounded" />
        <div className="h-4 w-24 bg-background rounded" />
      </div>
      <div className="flex justify-end">
        <div className="h-10 w-28 bg-background rounded" />
      </div>
    </div>
  );
}

export default function Services() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;

      setServices(data || []);
    } catch (error) {
      console.error('Error loading services:', error);
      setError('Unable to load services. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <p className="text-subtext">Loading available services...</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <ServiceSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error || services.length === 0) {
    return (
      <div className="container mx-auto px-4 flex items-center justify-center min-h-[calc(100vh-56px)]">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-error mx-auto mb-4" />
          <p className="text-lg text-text mb-6">
            {error || 'No services available at the moment.'}
          </p>
          <button
            onClick={loadServices}
            className="bg-primary text-black px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <p className="text-subtext">Select a service to book your appointment</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="bg-surface rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <Scissors className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold text-text">
                {service.name}
              </h3>
            </div>

            <div className="flex justify-between mb-6">
              <div className="flex items-center gap-2 text-subtext">
                <EuroIcon className="w-5 h-5" />
                <span className="font-semibold text-primary">
                  {service.price.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-subtext">
                <Clock className="w-5 h-5" />
                <span>{service.duration_minutes} mins</span>
              </div>
            </div>

            {service.description && (
              <p className="text-subtext mb-6">
                {service.description}
              </p>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => navigate(`/booking/${service.id}`)}
                className="bg-primary hover:bg-primary/90 text-black px-6 py-2 
                         rounded-lg flex items-center gap-2 transition-all 
                         duration-300 hover:scale-105"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}