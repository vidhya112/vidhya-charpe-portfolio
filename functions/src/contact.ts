import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { sendNotificationEmail } from './notifications';

export const onNewContactSubmission = functions.firestore
  .document('contacts/{contactId}')
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data();
    if (!data) return;

    const contactId = context.params.contactId;
    const name = data.name || 'Anonymous Visitor';
    const email = data.email || 'No email provided';
    const projectType = data.projectType || 'General Inquiry';
    const budget = data.budgetRange || 'Not specified';
    const message = data.message || '';
    const submittedAt = new Date().toLocaleString();

    const subject = `NEW PORTFOLIO INQUIRY — ${projectType} from ${name}`;

    const textContent = `
New portfolio contact inquiry received.

Name: ${name}
Email: ${email}
Project: ${projectType}
Budget: ${budget}
Submitted: ${submittedAt}

Message:
${message}
    `.trim();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #7c3aed; border-radius: 12px; background-color: #07090e; color: #f8fafc;">
        <h2 style="color: #06b6d4; margin-top: 0;">🚀 New Portfolio Inquiry</h2>
        <div style="background-color: #0f172a; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #8b5cf6;">${email}</a></p>
          <p><strong>Project Type:</strong> ${projectType}</p>
          <p><strong>Budget Range:</strong> ${budget}</p>
          <p><strong>Timestamp:</strong> ${submittedAt}</p>
        </div>
        <div style="background-color: #1e293b; padding: 15px; border-radius: 8px;">
          <h3 style="color: #8b5cf6; margin-top: 0;">Message Content:</h3>
          <p style="white-space: pre-wrap; line-height: 1.5;">${message}</p>
        </div>
      </div>
    `;

    try {
      await sendNotificationEmail({
        to: process.env.ADMIN_EMAIL || 'vidhyacharpe@gmail.com',
        subject,
        text: textContent,
        html: htmlContent,
      });

      // Update document notification flag
      await snapshot.ref.update({
        notificationSent: true,
        notificationSentAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } catch (err) {
      console.error(`[Contact Function] Failed to process notification for contact ${contactId}:`, err);
    }
  });
