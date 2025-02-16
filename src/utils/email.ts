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