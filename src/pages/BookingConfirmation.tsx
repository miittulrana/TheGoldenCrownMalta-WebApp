import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Calendar, Clock, ArrowLeft, Scissors, Euro, Phone, Mail, MapPin, AlertCircle } from 'lucide-react';

interface LocationState {
  refNo: string;
  name: string;
  service: string;
  date: string;
  time: string;
  emailStatus?: string;  // Added emailStatus to the interface
}

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  useEffect(() => {
    if (!state?.refNo) {
      navigate('/services');
    }
  }, [state, navigate]);

  if (!state?.refNo) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Success Icon & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/20 mb-6">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-text mb-3">
            Thank You!
          </h1>
          <p className="text-xl text-primary font-semibold mb-2">
            Booking Confirmed
          </p>
          <p className="text-subtext">
            Your appointment has been successfully booked
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-surface rounded-lg p-6 mb-6 shadow-lg border border-surface">
          {/* Reference Number */}
          <div className="border-b border-surface/30 pb-4 mb-6">
            <h2 className="text-lg font-semibold text-primary mb-2">
              Booking Reference
            </h2>
            <p className="text-3xl font-bold text-text">#{state.refNo}</p>
          </div>

          {/* Service Details */}
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Scissors className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-subtext mb-1">Service</p>
                <p className="text-lg font-medium text-text">{state.service}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-subtext mb-1">Date</p>
                <p className="text-lg font-medium text-text">{state.date}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-subtext mb-1">Time</p>
                <p className="text-lg font-medium text-text">{state.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-subtext mb-1">Name</p>
                <p className="text-lg font-medium text-text">{state.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Email Status Message */}
        {state.emailStatus && (
          <div className="bg-warning/10 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-1" />
              <p className="text-sm text-warning">
                {state.emailStatus}
              </p>
            </div>
          </div>
        )}

        {/* Information Notes */}
        <div className="bg-primary/10 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <p className="text-sm text-text">
              A confirmation email has been sent to your email address with your booking details.
            </p>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-lg bg-surface 
                   text-text hover:bg-surface/80 transition-colors border border-surface/30"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </button>
      </div>
    </div>
  );
}