import { Resend } from 'resend';

const resend = new Resend('re_Rr93Y174_DDCCGkoCYwZhXennE4ZvFipA');
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

export const sendBookingConfirmation = async (props: BookingEmailProps) => {
  try {
    // Send customer email
    await resend.emails.send({
      from: 'The Golden Crown Malta <onboarding@resend.dev>',
      to: [props.customerEmail],
      subject: `Your Appointment #${props.refNo} is Confirmed - The Golden Crown Malta`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Booking Confirmation</h2>
          <p>Dear ${props.customerName},</p>
          <p>Your appointment has been confirmed at The Golden Crown Malta.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Booking Details:</h3>
            <p><strong>Reference Number:</strong> #${props.refNo}</p>
            <p><strong>Service:</strong> ${props.serviceName}</p>
            <p><strong>Date:</strong> ${props.date}</p>
            <p><strong>Time:</strong> ${props.time}</p>
            <p><strong>Duration:</strong> ${props.duration} minutes</p>
            <p><strong>Price:</strong> €${props.price.toFixed(2)}</p>
            <p><strong>Name:</strong> ${props.customerName}</p>
            <p><strong>Phone:</strong> ${props.customerPhone}</p>
            <p><strong>Email:</strong> ${props.customerEmail}</p>
            <p><strong>City:</strong> ${props.customerCity}</p>
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

    // Send admin notification
    await resend.emails.send({
      from: 'The Golden Crown Malta <onboarding@resend.dev>',
      to: [ADMIN_EMAIL],
      subject: `New Booking Received #${props.refNo}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>New Booking Details</h2>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Reference Number:</strong> #${props.refNo}</p>
            <p><strong>Service:</strong> ${props.serviceName}</p>
            <p><strong>Date:</strong> ${props.date}</p>
            <p><strong>Time:</strong> ${props.time}</p>
            <p><strong>Name:</strong> ${props.customerName}</p>
            <p><strong>Phone:</strong> ${props.customerPhone}</p>
            <p><strong>Email:</strong> ${props.customerEmail}</p>
            <p><strong>City:</strong> ${props.customerCity}</p>
            <p><strong>Duration:</strong> ${props.duration} minutes</p>
            <p><strong>Price:</strong> €${props.price.toFixed(2)}</p>
          </div>
        </div>
      `
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending emails:', error);
    return { success: false, error };
  }
};