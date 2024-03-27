import admin from 'firebase-admin';

import { environments } from './config';

admin.initializeApp({
	credential: admin.credential.cert({
		projectId: environments.firebaseProjectId,
		clientEmail: environments.firebaseClientEmail,
		privateKey: environments.firebasePrivateKey,
	}),
});

export const auth = admin.auth();
