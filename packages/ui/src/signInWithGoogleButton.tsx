'use client';

import type { MouseEvent } from 'react';
import { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Avatar, Button, Menu, MenuItem, Tooltip } from '@mui/material';
import { signOut } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { useSnapshot } from 'valtio';

import auth from '../../../apps/web/app/utils/config';
import { useUserProfile } from '../../../apps/web/app/utils/hook/index';

const SigninWithGoogleButton = () => {
	const userProfile = useUserProfile();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleSignInWithGoogle = async () => {
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

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				userProfile.isSignedIn = false;
				userProfile.profile.photoURL = '';
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const open = Boolean(anchorEl);
	const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const snap = useSnapshot(userProfile);
	return (
		<>
			{snap.isSignedIn ? (
				<>
					<Tooltip title="Account settings">
						<Button
							id="basic-button"
							color="inherit"
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={handleMenuOpen}
						>
							<Avatar src={snap.profile.photoURL} alt="Avatar" />
						</Button>
					</Tooltip>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleMenuClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}
					>
						<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
						<MenuItem
							onClick={() => {
								handleMenuClose();
								handleSignOut();
							}}
						>
							Logout
						</MenuItem>
					</Menu>
				</>
			) : (
				<Button
					color="inherit"
					onClick={handleSignInWithGoogle}
					startIcon={<GoogleIcon />}
				>
					Sign in with GG
				</Button>
			)}
		</>
	);
};

export default SigninWithGoogleButton;
