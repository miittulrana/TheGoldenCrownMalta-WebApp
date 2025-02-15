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

interface EmailResponse {
  success: boolean;
  error?: string;
  data?: any;
}

export const sendBookingConfirmation = async (props: BookingEmailProps): Promise<EmailResponse> => {
  try {
    console.log('Starting email sending process for booking:', props.refNo);

    // Input validation
    if (!props.customerEmail || !props.customerName || !props.refNo) {
      throw new Error('Missing required fields for email');
    }

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerName: props.customerName,
        customerEmail: props.customerEmail,
        customerPhone: props.customerPhone,
        customerCity: props.customerCity,
        serviceName: props.serviceName,
        date: props.date,
        time: props.time,
        price: props.price,
        duration: props.duration,
        refNo: props.refNo
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send email');
    }

    console.log('Email sent successfully for booking:', props.refNo);

    return {
      success: true,
      data
    };

  } catch (error) {
    // Log detailed error for debugging
    console.error('Error sending booking confirmation email:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      bookingRef: props.refNo,
      customer: props.customerEmail
    });

    // Return user-friendly error
    return {
      success: false,
      error: error instanceof Error 
        ? error.message 
        : 'Failed to send confirmation email'
    };
  }
};

// Helper function to get user-friendly error messages
export const getEmailErrorMessage = (error: string): string => {
  switch (error.toLowerCase()) {
    case 'missing required fields for email':
      return 'Unable to send email: Missing required information';
    case 'failed to send email':
      return 'Unable to send confirmation email. Please check your inbox later.';
    default:
      return 'Unable to send confirmation email. Our team has been notified.';
  }
};