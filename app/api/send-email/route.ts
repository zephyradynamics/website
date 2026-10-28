import { NextRequest, NextResponse } from 'next/server';
import { getResend, escapeHtml, isEmail, emailFrame, row } from '@/lib/email';

const ENQUIRY_TYPES = new Set(['General', 'Investor', 'Partnership', 'Media', 'Careers', 'Technical']);

export async function POST(request: NextRequest) {
  try {
    const { name, email, organisation, role, enquiryType, message } = await request.json();

    if (!name || !message || !isEmail(email)) {
      return NextResponse.json(
        { error: 'Add your name, a valid email address and a message.' },
        { status: 400 }
      );
    }

    const type = ENQUIRY_TYPES.has(enquiryType) ? enquiryType : 'General';

    await getResend().emails.send({
      from: 'Zephyra Dynamics <info@zephyradynamics.com>',
      to: 'info@zephyradynamics.com',
      reply_to: email,
      subject: `Website enquiry (${type}): ${String(name).slice(0, 80)}`,
      html: emailFrame(
        'New website enquiry',
        [
          row('Name', escapeHtml(name)),
          row('Email', escapeHtml(email)),
          organisation ? row('Organisation', escapeHtml(organisation)) : '',
          role ? row('Role', escapeHtml(role)) : '',
          row('Enquiry type', type),
          `<p style="margin: 20px 0 0; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>`,
        ].join('')
      ),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'The message could not be sent. Email info@zephyradynamics.com instead.' }, { status: 500 });
  }
}
