import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import BookingConfirmation from './pages/BookingConfirmation';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { updateSEO } from './utils/seo';
import './index.css';

function App() {
  useEffect(() => {
    // Initialize global SEO
    updateSEO();
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col bg-background">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="booking/:id" element={<Booking />} />
            <Route path="booking/confirmation" element={<BookingConfirmation />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;