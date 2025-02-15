import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.VITE_RESEND_API_KEY);
const ADMIN_EMAIL = 'thegoldencrownmalta@gmail.com';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
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
    } = req.body;

    // Send customer email
    const customerEmailResult = await resend.emails.send({
      from: 'The Golden Crown Malta <onboarding@resend.dev>',
      to: [customerEmail],
      subject: `Your Appointment #${refNo} is Confirmed - The Golden Crown Malta`,
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
            <p>Contact: +356 7777 0765</p>
            <p>Save this email for your reference.</p>
          </div>
        </div>
      `
    });

    // Send admin notification in a separate try-catch
    try {
      const adminEmailResult = await resend.emails.send({
        from: 'The Golden Crown Malta <onboarding@resend.dev>',
        to: [ADMIN_EMAIL],
        subject: `New Booking Received #${refNo}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>New Booking Details</h2>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Reference Number:</strong> #${refNo}</p>
              <p><strong>Service:</strong> ${serviceName}</p>
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

      console.log('Admin email sent:', adminEmailResult);
    } catch (adminError) {
      console.error('Admin email failed but customer email sent:', adminError);
      // Don't throw error here, as customer email was sent successfully
    }

    return res.status(200).json({ 
      success: true,
      customerEmail: customerEmailResult
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}