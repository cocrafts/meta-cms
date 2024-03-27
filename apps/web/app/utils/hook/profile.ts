import { useEffect } from 'react';

import auth from '../config';
import { userProfileState } from '../state';

export const useUserProfile = () => {
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				userProfileState.isSignedIn = true;
				userProfileState.profile.displayName = user.displayName || '';
				userProfileState.profile.photoURL = user.photoURL || '';
			} else {
				userProfileState.isSignedIn = false;
				userProfileState.profile.displayName = '';
				userProfileState.profile.photoURL = '';
			}
		});

		return () => unsubscribe();
	}, []);

	return userProfileState;
};
