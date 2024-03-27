import { proxy } from 'valtio';

export const userProfileState = proxy({
	isSignedIn: false,
	profile: {
		displayName: '',
		photoURL: '',
	},
});
