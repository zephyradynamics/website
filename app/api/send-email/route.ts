import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, organisation, role, enquiryType, message } = await request.json();

    // Validate all required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Zephyra Dynamics <info@zephyradynamics.com>',
      to: 'info@zephyradynamics.com',
      reply_to: email,
      subject: `New Contact Form Submission: ${enquiryType || 'General'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00AEEF; margin-bottom: 20px;">New Contact Form Submission</h2>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            ${organisation ? `<p style="margin: 10px 0;"><strong>Organisation:</strong> ${organisation}</p>` : ''}
            ${role ? `<p style="margin: 10px 0;"><strong>Role:</strong> ${role}</p>` : ''}
            <p style="margin: 10px 0;"><strong>Enquiry Type:</strong> ${enquiryType || 'General'}</p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #00AEEF;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #555; white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>

          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            This email was sent from the Zephyra Dynamics contact form.
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Email sent successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
