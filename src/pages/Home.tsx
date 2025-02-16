import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AppPromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

function AppPromoModal({ isOpen, onClose, onProceed }: AppPromoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface rounded-lg p-6 w-full max-w-md">
        <div className="text-center space-y-6">
          {/* Title */}
          <h3 className="text-2xl font-bold text-primary">
            Unlock Special Rewards
          </h3>

          {/* Message */}
          <p className="text-lg text-white">
            App Coming Soon!
          </p>

          {/* App Store Button */}
          <div className="flex justify-center gap-4 py-4">
            <img
              src="/app-store.png"
              alt="App Store"
              className="h-10 w-auto"
            />
          </div>

          {/* Proceed Button */}
          <button
            onClick={onProceed}
            className="w-full py-3 text-black font-semibold bg-primary hover:bg-primary/90 
                     rounded-lg transition-colors duration-300"
          >
            I Want to Proceed Without App
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookNowClick = () => {
    setIsModalOpen(true);
  };

  const handleProceedWithoutApp = () => {
    navigate('/services');
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/background.jpg)',
        }}
      >
        <div className="absolute inset-0 backdrop-blur-md bg-black/40" />
      </div>

      {/* Center Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="w-full max-w-lg text-center">
          {/* Top Logo */}
          <img
            src="/logo.png"
            alt="The Golden Crown Malta"
            className="h-28 w-auto mx-auto mb-6"
          />

          {/* Title and Subtitle */}
          <div className="space-y-3 mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary whitespace-nowrap scale-90 sm:scale-100">
              The Golden Crown Malta
            </h1>
            <p className="text-xl sm:text-2xl text-white">
              Let's Book your Slot Now!
            </p>
          </div>

          {/* Book Now Button */}
          <div className="mb-24">
            <button
              onClick={handleBookNowClick}
              className="bg-primary px-10 py-3 rounded-full text-black font-semibold text-lg
                       shadow-lg transition-all duration-300 hover:bg-primary/90 hover:scale-105
                       ring-4 ring-primary/30"
            >
              Book Now
            </button>
          </div>

          {/* Download Section */}
          <div className="space-y-4">
            <h2 className="text-primary text-xl">
              App Coming Soon!
            </h2>
            <div className="flex justify-center gap-6">
              <img
                src="/app-store.png"
                alt="App Store"
                className="h-10 w-auto transition-transform duration-300 hover:-translate-y-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* App Promo Modal */}
      <AppPromoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProceed={handleProceedWithoutApp}
      />
    </div>
  );
}