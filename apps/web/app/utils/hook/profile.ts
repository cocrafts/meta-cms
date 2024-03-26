import { useEffect } from 'react';
import { proxy } from 'valtio';

import auth from '../config';

const profileState = proxy({
	isSignedIn: false,
	profile: {
		displayName: '',
		photoURL: '',
	},
});

export const useUserProfile = () => {
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				profileState.isSignedIn = true;
				profileState.profile.displayName = user.displayName || '';
				profileState.profile.photoURL = user.photoURL || '';
			} else {
				profileState.isSignedIn = false;
				profileState.profile.displayName = '';
				profileState.profile.photoURL = '';
			}
		});

		return () => unsubscribe();
	}, []);

	return profileState;
};
