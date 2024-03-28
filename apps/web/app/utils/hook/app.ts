import { useEffect } from 'react';

import auth from '../config';
import { userProfileFromFirebase, userProfileState } from '../state';

export const useBootLoader = () => {
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			userProfileState.isSignedIn = user?.displayName !== undefined;
			userProfileState.profile = userProfileFromFirebase(user as never);
		});

		return () => unsubscribe();
	}, []);
};
