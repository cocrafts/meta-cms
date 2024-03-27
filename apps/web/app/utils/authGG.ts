import { signOut } from 'firebase/auth';
import firebase from 'firebase/compat/app';

import auth from './config';
import { userProfileState } from './state';

export const handleSignInWithGG = async () => {
	const provider = new firebase.auth.GoogleAuthProvider();
	try {
		const result = await auth.signInWithPopup(provider);
		const user = result.user;
		if (user) {
			const firebaseUserIdToken = await user.getIdToken();
			console.log(firebaseUserIdToken);
			const response = await fetch('http://localhost:3005/api/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${firebaseUserIdToken}`,
				},
				body: JSON.stringify({ token: firebaseUserIdToken }),
			});
			const data = await response.json();
			console.log(data);
		}
	} catch (error) {
		console.error(error);
	}
};

export const handleSignOut = async () => {
	try {
		await signOut(auth);
		userProfileState.isSignedIn = false;
		userProfileState.profile.photoURL = '';
	} catch (error) {
		console.error(error);
	}
};
