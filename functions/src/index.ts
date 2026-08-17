import * as admin from 'firebase-admin';

admin.initializeApp();

export { onNewContactSubmission } from './contact';
export { onNewVisitorSession } from './visitor';
