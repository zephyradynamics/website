import { NextRequest, NextResponse } from 'next/server';
import { getResend, escapeHtml, safeUrl, isEmail, emailFrame, row } from '@/lib/email';

const MAX_RESUME_BYTES = 8 * 1024 * 1024;
const RESUME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const field = (key: string) => String(formData.get(key) ?? '').trim();

    const name = field('name');
    const email = field('email');
    const phone = field('phone');
    const education = field('education');
    const experience = field('experience');
    const portfolio = safeUrl(field('portfolio'));
    const message = field('message');
    const position = field('position') || 'General application';
    const resume = formData.get('resume');

    if (!name || !phone || !isEmail(email) || !(resume instanceof File)) {
      return NextResponse.json(
        { error: 'Add your name, a valid email, a phone number and your resume.' },
        { status: 400 }
      );
    }
    if (resume.size > MAX_RESUME_BYTES || (resume.type && !RESUME_TYPES.has(resume.type))) {
      return NextResponse.json(
        { error: 'Upload your resume as a PDF or Word file under 8 MB.' },
        { status: 400 }
      );
    }

    const resumeBase64 = Buffer.from(await resume.arrayBuffer()).toString('base64');

    await getResend().emails.send({
      from: 'Zephyra Dynamics <career@zephyradynamics.com>',
      to: 'career@zephyradynamics.com',
      reply_to: email,
      subject: `Application: ${position.slice(0, 80)} (${name.slice(0, 60)})`,
      html: emailFrame(
        'New career application',
        [
          row('Position', escapeHtml(position)),
          row('Name', escapeHtml(name)),
          row('Email', escapeHtml(email)),
          row('Phone', escapeHtml(phone)),
          education ? row('Education', escapeHtml(education)) : '',
          experience ? row('Experience', escapeHtml(experience)) : '',
          portfolio ? row('Portfolio', `<a href="${escapeHtml(portfolio)}">${escapeHtml(portfolio)}</a>`) : '',
          message
            ? `<p style="margin: 20px 0 0; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>`
            : '',
          '<p style="color: #5A6670; font-size: 13px; margin-top: 20px;">Resume attached.</p>',
        ].join('')
      ),
      attachments: [{ filename: resume.name.replace(/[^\w.\- ]/g, '_'), content: resumeBase64 }],
    });

    await getResend().emails.send({
      from: 'Zephyra Dynamics <career@zephyradynamics.com>',
      to: email,
      subject: `Application received: ${position.slice(0, 80)} at Zephyra Dynamics`,
      html: emailFrame(
        'Application received',
        `<p style="line-height: 1.6;">Hi ${escapeHtml(name)},</p>
         <p style="line-height: 1.6;">Thank you for applying for the <strong>${escapeHtml(position)}</strong> role at Zephyra Dynamics. We've received your application and will review it carefully.</p>
         <p style="line-height: 1.6;">We usually reply within 5 to 7 business days. If there's a fit, we'll reach out to arrange a conversation.</p>
         <p style="line-height: 1.6;">The Zephyra Dynamics team</p>`
      ),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'The application could not be sent. Email career@zephyradynamics.com instead.' },
      { status: 500 }
    );
  }
}
