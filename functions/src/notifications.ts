export interface EmailPayload {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendNotificationEmail(payload: EmailPayload): Promise<{ success: boolean; message?: string }> {
  const apiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_SECRET;
  const adminEmail = process.env.ADMIN_EMAIL || 'vidhyacharpe@gmail.com';

  console.log(`[Notification Provider] Sending notification to ${payload.to || adminEmail}: "${payload.subject}"`);

  if (!apiKey) {
    console.info('[Notification Provider] API key not configured. Mocking email delivery successfully.');
    return { success: true, message: 'Simulated email delivery (configure RESEND_API_KEY in production).' };
  }

  try {
    // Example: fetch directly to email provider (e.g. Resend) without extra dependencies
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Vidhya Portfolio <notifications@vidhyacharpe.dev>',
        to: [payload.to || adminEmail],
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[Notification Provider] Failed to send email:', errText);
      return { success: false, message: errText };
    }

    return { success: true };
  } catch (error: any) {
    console.error('[Notification Provider] Network exception:', error);
    return { success: false, message: error.message };
  }
}
