import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Calendar, Clock, ArrowLeft } from 'lucide-react';

interface LocationState {
  refNo: string;
  name: string;
  service: string;
  date: string;
  time: string;
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
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 mb-4">
            <CheckCircle2 className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-text mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-subtext">
            Your appointment has been successfully booked
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-surface rounded-lg p-6 mb-6">
          <div className="border-b border-surface pb-4 mb-4">
            <h2 className="text-lg font-semibold text-primary mb-1">
              Booking Reference
            </h2>
            <p className="text-2xl font-bold text-text">#{state.refNo}</p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-subtext mb-1">Service</h3>
              <p className="text-text font-medium">{state.service}</p>
            </div>

            <div className="flex items-start gap-8">
              <div>
                <h3 className="text-sm text-subtext mb-1 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Date
                </h3>
                <p className="text-text font-medium">{state.date}</p>
              </div>
              <div>
                <h3 className="text-sm text-subtext mb-1 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Time
                </h3>
                <p className="text-text font-medium">{state.time}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-subtext mb-1">Name</h3>
              <p className="text-text font-medium">{state.name}</p>
            </div>
          </div>
        </div>

        {/* Information Note */}
        <div className="bg-primary/10 rounded-lg p-4 mb-6">
          <p className="text-sm text-text">
            A confirmation email has been sent to your email address with your booking details.
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-surface text-text hover:bg-surface/80 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>
      </div>
    </div>
  );
}