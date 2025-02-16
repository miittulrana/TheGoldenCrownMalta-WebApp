interface BookingEmailProps {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerCity: string;
    serviceName: string;
    date: string;
    time: string;
    price: number;
    duration: number;
    refNo: string;
  }
  
  export const sendBookingConfirmation = async (props: BookingEmailProps) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(props)
      });
  
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
  
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error sending booking confirmation:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send email' 
      };
    }
  };
  
  export const getEmailErrorMessage = (error: string): string => {
    switch (error.toLowerCase()) {
      case 'missing required fields for email':
        return 'Unable to send email: Missing required information';
      case 'failed to send email':
        return 'Unable to send confirmation email. Please check your inbox later.';
      case 'network error':
        return 'Network error: Please check your internet connection';
      default:
        return 'Booking confirmed but confirmation email may be delayed';
    }
  };