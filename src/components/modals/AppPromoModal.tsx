interface AppPromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export default function AppPromoModal({ isOpen, onClose, onProceed }: AppPromoModalProps) {
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
                      Download Our App Below!
                  </p>

                  {/* Proceed Button */}
                  <button
                      onClick={onProceed}
                      className="w-full py-3 text-black font-semibold bg-primary hover:bg-primary/90 
                              rounded-lg transition-colors duration-300"
                  >
                      Sharp Cuts, One Tap Away – Our App is Coming Soon!
                  </button>
              </div>
          </div>
      </div>
  );
}