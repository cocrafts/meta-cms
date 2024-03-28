import type { User } from '@firebase/auth';
import { proxy } from 'valtio';

import { handleSignInWithGG, handleSignOut } from './authentication';

export interface UserProfile {
	name?: string;
	avatarUrl?: string;
}

export interface ProfileState {
	isSignedIn: boolean;
	profile: UserProfile;
}

export const userProfileFromFirebase = (user: User | null): UserProfile => {
	return {
		name: user?.displayName || '',
		avatarUrl: user?.photoURL || '',
	};
};

export const userProfileState = proxy<ProfileState>({
	isSignedIn: false,
	profile: userProfileFromFirebase(null),
});

export const profileActions = {
	signOut: handleSignOut,
	googleSignIn: handleSignInWithGG,
};
