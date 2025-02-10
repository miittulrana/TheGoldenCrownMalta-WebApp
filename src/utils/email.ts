import { Resend } from 'resend';

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;
if (!RESEND_API_KEY) {
  console.error('RESEND_API_KEY is not defined in environment variables');
}

const resend = new Resend(RESEND_API_KEY);

const ADMIN_EMAIL = 'thegoldencrownmalta@gmail.com';

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

export const sendBookingConfirmation = async ({
  customerName,
  customerEmail,
  customerPhone,
  customerCity,
  serviceName,
  date,
  time,
  price,
  duration,
  refNo
}: BookingEmailProps) => {
  try {
    console.log('Attempting to send customer email to:', customerEmail);

    // Send email to customer
    const customerEmailResult = await resend.emails.send({
      from: 'The Golden Crown Malta <booking@thegoldencrownmalta.com>',
      to: customerEmail,
      subject: `Your Appointment #${refNo} has been received - The Golden Crown Malta`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Booking Confirmation</h2>
          <p>Dear ${customerName},</p>
          <p>Your appointment has been confirmed at The Golden Crown Malta.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Booking Details:</h3>
            <p><strong>Reference Number:</strong> #${refNo}</p>
            <p><strong>Service:</strong> ${serviceName}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Duration:</strong> ${duration} minutes</p>
            <p><strong>Price:</strong> €${price.toFixed(2)}</p>
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Phone:</strong> ${customerPhone}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
            <p><strong>City:</strong> ${customerCity}</p>
          </div>
          
          <p>If you need to make any changes to your booking, please contact us.</p>
          <p>We look forward to seeing you!</p>
          
          <div style="margin-top: 30px; font-size: 14px; color: #666;">
            <p>The Golden Crown Malta</p>
            <p>Contact: +356 1234 5678</p>
            <p>Save this email for your reference.</p>
          </div>
        </div>
      `
    });

    console.log('Customer email sent successfully:', customerEmailResult);

    console.log('Attempting to send admin email to:', ADMIN_EMAIL);

    // Send notification to admin
    const adminEmailResult = await resend.emails.send({
      from: 'The Golden Crown Malta <booking@thegoldencrownmalta.com>',
      to: ADMIN_EMAIL,
      subject: `New Booking Received with Ref.No: #${refNo}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>New Booking Details</h2>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Service Name:</strong> ${serviceName}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Phone:</strong> ${customerPhone}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
            <p><strong>City:</strong> ${customerCity}</p>
            <p><strong>Duration:</strong> ${duration} minutes</p>
            <p><strong>Price:</strong> €${price.toFixed(2)}</p>
          </div>
        </div>
      `
    });

    console.log('Admin email sent successfully:', adminEmailResult);

    return { success: true };
  } catch (error) {
    console.error('Detailed error sending email:', error);
    return { success: false, error };
  }
};