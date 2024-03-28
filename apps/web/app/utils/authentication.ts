import { signOut } from 'firebase/auth';
import firebase from 'firebase/compat/app';

import auth from './config';
import { environments } from './config';
import { userProfileFromFirebase, userProfileState } from './state';

export const handleSignInWithGG = async () => {
	const provider = new firebase.auth.GoogleAuthProvider();
	try {
		const result = await auth.signInWithPopup(provider);
		const user = result.user;
		if (user) {
			const firebaseUserIdToken = await user.getIdToken();
			const response = await fetch(`${environments.apiEndpoint}/api/signin`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${firebaseUserIdToken}`,
				},
				body: JSON.stringify({ token: firebaseUserIdToken }),
			});
			await response.json();
		}
	} catch (error) {
		console.error(error);
	}
};

export const handleSignOut = async () => {
	try {
		await signOut(auth);
		userProfileState.isSignedIn = false;
		userProfileState.profile = userProfileFromFirebase(null);
	} catch (error) {
		console.error(error);
	}
};
