import admin from 'firebase-admin';

export const environments = {
	firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
	firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,
	firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY,
};

admin.initializeApp({
	credential: admin.credential.cert({
		projectId: environments.firebaseProjectId,
		clientEmail: environments.firebaseClientEmail,
		privateKey: environments.firebasePrivateKey,
	}),
});

export const prepareAuthContext = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	// if (!authHeader) {
	// 	return res.status(401).send('Unauthorized');
	// }
	const tokenParts = authHeader.split(' ');
	// if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
	// 	return res.status(401).send('Unauthorized');
	// }
	const idToken = tokenParts[1];
	try {
		const decodedToken = await admin.auth().verifyIdToken(idToken);
		req.decodedToken = decodedToken;
		next();
	} catch (error) {
		res.status(401).send('Fail to verify token');
	}
};
