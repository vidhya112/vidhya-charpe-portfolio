import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { sendNotificationEmail } from './notifications';

export const onNewVisitorSession = functions.firestore
  .document('visits/{visitId}')
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data();
    if (!data) return;

    const isNotificationEnabled = process.env.ENABLE_NEW_VISITOR_EMAILS === 'true';
    if (!isNotificationEnabled) {
      return;
    }

    const device = data.deviceType || 'Desktop';
    const browser = data.browser || 'Unknown Browser';
    const country = data.country || 'Global / Direct';
    const referrer = data.referrer || 'Direct Traffic';
    const time = new Date().toLocaleString();

    const subject = `NEW PORTFOLIO VISITOR — ${device} (${country})`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 15px; border-radius: 8px; background-color: #07090e; color: #f8fafc;">
        <h3 style="color: #06b6d4;">👀 New Portfolio Visitor</h3>
        <p><strong>Device:</strong> ${device}</p>
        <p><strong>Browser:</strong> ${browser}</p>
        <p><strong>Location:</strong> ${country}</p>
        <p><strong>Referrer:</strong> ${referrer}</p>
        <p><strong>Time:</strong> ${time}</p>
      </div>
    `;

    try {
      await sendNotificationEmail({
        to: process.env.ADMIN_EMAIL || 'vidhyacharpe@gmail.com',
        subject,
        text: `New visitor detected from ${country} on ${device}. Referrer: ${referrer}`,
        html: htmlContent,
      });
    } catch (err) {
      console.warn('[Visitor Function] Could not send visitor alert:', err);
    }
  });
