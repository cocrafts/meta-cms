import admin from 'firebase-admin';

import serviceAccount from '../service-account-key.json';

admin.initializeApp({
	credential: admin.credential.cert({
		projectId: serviceAccount.project_id,
		clientEmail: serviceAccount.client_email,
		privateKey: serviceAccount.private_key,
	}),
});

export const checkToken = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).send('Unauthorized');
	}
	const tokenParts = authHeader.split(' ');
	if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
		return res.status(401).send('Unauthorized');
	}
	const idToken = tokenParts[1];
	try {
		const decodedToken = await admin.auth().verifyIdToken(idToken);
		req.decodedToken = decodedToken;
		next();
	} catch (error) {
		res.status(401).send('Unauthorized');
	}
};
