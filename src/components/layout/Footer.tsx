import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full border-t border-surface bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Copyright and Developer Info */}
          <div className="text-gray-300 text-sm">
            © Developed by{' '}
            <a
              href="https://dr-webb.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Dr-Webb Inc.
            </a>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              to="/privacy"
              className="text-gray-300 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-300 hover:text-primary transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}