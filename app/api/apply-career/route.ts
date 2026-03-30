import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const education = formData.get('education') as string;
    const experience = formData.get('experience') as string;
    const portfolio = formData.get('portfolio') as string;
    const message = formData.get('message') as string;
    const position = formData.get('position') as string;
    const resume = formData.get('resume') as File;

    // Validate required fields
    if (!name || !email || !phone || !resume) {
      return NextResponse.json(
        { error: 'Name, email, phone, and resume are required' },
        { status: 400 }
      );
    }

    // Convert resume to buffer
    const resumeBuffer = await resume.arrayBuffer();
    const resumeBase64 = Buffer.from(resumeBuffer).toString('base64');

    // Send email using Resend with attachment
    const data = await resend.emails.send({
      from: 'Zephyra Dynamics <career@zephyradynamics.com>',
      to: 'career@zephyradynamics.com',
      reply_to: email,
      subject: `New Career Application: ${position}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00AEEF; margin-bottom: 20px;">New Career Application</h2>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 10px 0;"><strong>Position:</strong> ${position}</p>
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>
            ${education ? `<p style="margin: 10px 0;"><strong>Education:</strong> ${education}</p>` : ''}
            ${experience ? `<p style="margin: 10px 0;"><strong>Experience:</strong> ${experience}</p>` : ''}
            ${portfolio ? `<p style="margin: 10px 0;"><strong>Portfolio:</strong> <a href="${portfolio}">${portfolio}</a></p>` : ''}
          </div>

          ${message ? `
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #00AEEF;">
              <h3 style="color: #333; margin-top: 0;">Cover Letter:</h3>
              <p style="color: #555; white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
          ` : ''}

          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            Resume file attached to this email.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: resume.name,
          content: resumeBase64,
        }
      ],
    });

    // Optional: Also send confirmation email to applicant
    await resend.emails.send({
      from: 'Zephyra Dynamics <career@zephyradynamics.com>',
      to: email,
      subject: `Application Received - ${position} | Zephyra Dynamics`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00AEEF; margin-bottom: 20px;">Application Received</h2>
          <p style="color: #555; font-size: 16px; line-height: 1.6;">
            Hi ${name},
          </p>
          <p style="color: #555; font-size: 16px; line-height: 1.6;">
            Thank you for applying for the <strong>${position}</strong> position at Zephyra Dynamics. We've received your application and will review it carefully.
          </p>
          <p style="color: #555; font-size: 16px; line-height: 1.6;">
            We typically respond within 5-7 business days. If we feel you're a good fit, we'll reach out to schedule an interview.
          </p>
          <p style="color: #555; font-size: 16px; line-height: 1.6;">
            Best regards,<br>
            The Zephyra Dynamics Team
          </p>
          <p style="color: #999; font-size: 12px; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 20px;">
            Zephyra Dynamics Pvt. Ltd. | Building the future of Urban Air Mobility
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Application submitted successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Career application error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
