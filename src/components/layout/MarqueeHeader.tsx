export default function MarqueeHeader() {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-sm">
        <div className="marquee-container relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap py-4"> {/* Increased padding */}
            <span className="inline-block text-lg sm:text-lg md:text-xl font-extrabold mx-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent tracking-wider uppercase">
              DOWNLOAD OUR APP & SAVE - EXCLUSIVE MOBILE REWARDS AWAITS!
            </span>
            <span className="inline-block text-lg sm:text-lg md:text-xl font-extrabold mx-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent tracking-wider uppercase">
              DOWNLOAD OUR APP & SAVE - EXCLUSIVE MOBILE REWARDS AWAITS!
            </span>
            <span className="inline-block text-lg sm:text-lg md:text-xl font-extrabold mx-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent tracking-wider uppercase">
              DOWNLOAD OUR APP & SAVE - EXCLUSIVE MOBILE REWARDS AWAITS!
            </span>
          </div>
  
          <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-4"> {/* Increased padding */}
            <span className="inline-block text-lg sm:text-lg md:text-xl font-extrabold mx-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent tracking-wider uppercase">
              DOWNLOAD OUR APP & SAVE - EXCLUSIVE MOBILE REWARDS AWAITS!
            </span>
            <span className="inline-block text-lg sm:text-lg md:text-xl font-extrabold mx-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent tracking-wider uppercase">
              DOWNLOAD OUR APP & SAVE - EXCLUSIVE MOBILE REWARDS AWAITS!
            </span>
            <span className="inline-block text-lg sm:text-lg md:text-xl font-extrabold mx-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent tracking-wider uppercase">
              DOWNLOAD OUR APP & SAVE - EXCLUSIVE MOBILE REWARDS AWAITS!
            </span>
          </div>
        </div>
      </div>
    );
  }