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
    // Validate required fields
    if (!props.customerEmail || !props.customerName || !props.refNo) {
      throw new Error('Missing required fields for email');
    }

    console.log('Starting email sending process...', {
      recipient: props.customerEmail,
      refNo: props.refNo
    });

    // Make API call to our serverless function
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
      }),
    });

    // Parse response
    const responseData = await response.json();

    // Check if the response was successful
    if (!response.ok) {
      console.error('Email API response error:', responseData);
      throw new Error(responseData.error || 'Failed to send email');
    }

    console.log('Email sent successfully', {
      recipient: props.customerEmail,
      refNo: props.refNo,
      response: responseData
    });

    return {
      success: true,
      data: responseData
    };

  } catch (error) {
    // Log the full error for debugging
    console.error('Error in sendBookingConfirmation:', {
      error,
      props,
      errorMessage: error instanceof Error ? error.message : 'Unknown error occurred'
    });

    // Return a structured error response
    return {
      success: false,
      error: error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred while sending the confirmation email'
    };
  }
};

// Helper function to handle email errors in the UI
export const getEmailErrorMessage = (error: string): string => {
  // Map common errors to user-friendly messages
  switch (error.toLowerCase()) {
    case 'missing required fields for email':
      return 'Unable to send email: Missing required information';
    case 'failed to send email':
      return 'Unable to send confirmation email at this time';
    case 'network error':
      return 'Network error: Please check your internet connection';
    default:
      return 'Unable to send confirmation email. Please check your inbox later.';
  }
};