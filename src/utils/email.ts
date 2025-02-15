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
  customerEmail?: {
    id: string;
    from: string;
    to: string[];
    status: string;
  };
}

export const sendBookingConfirmation = async (props: BookingEmailProps): Promise<EmailResponse> => {
  try {
    console.log('Starting email sending process:', {
      refNo: props.refNo,
      customer: props.customerEmail
    });

    // Input validation
    if (!props.customerEmail || !props.customerName || !props.refNo) {
      console.error('Missing required fields:', {
        hasEmail: Boolean(props.customerEmail),
        hasName: Boolean(props.customerName),
        hasRefNo: Boolean(props.refNo)
      });
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
      console.error('Email API error response:', data);
      throw new Error(data.error || 'Failed to send email');
    }

    console.log('Email sent successfully:', {
      refNo: props.refNo,
      response: data
    });

    return {
      success: true,
      customerEmail: data.customerEmail
    };

  } catch (error) {
    console.error('Email sending failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      refNo: props.refNo,
      customer: props.customerEmail
    });

    return {
      success: false,
      error: error instanceof Error 
        ? error.message 
        : 'Failed to send confirmation email'
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
      return 'Booking confirmed but confirmation email may be delayed. Please check your inbox later.';
  }
};