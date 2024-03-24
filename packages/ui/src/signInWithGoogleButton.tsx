'use client';

import { useEffect, useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Avatar, Button, Menu, MenuItem, Tooltip } from '@mui/material';
import { signOut } from 'firebase/auth';
import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

const SigninWithGoogleButton = () => {
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [userPhotoURL, setUserPhotoURL] = useState('');
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setIsSignedIn(true);
				setUserPhotoURL(user.photoURL || '');
			} else {
				setIsSignedIn(false);
				setUserPhotoURL('');
			}
		});

		return () => unsubscribe();
	}, []);

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
				setIsSignedIn(false);
				setUserPhotoURL('');
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			{isSignedIn ? (
				<>
					<Tooltip title="Account settings">
						<Button
							id="basic-button"
							color="inherit"
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
						>
							<Avatar src={userPhotoURL} alt="Avatar" />
						</Button>
					</Tooltip>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}
					>
						<MenuItem onClick={handleClose}>Profile</MenuItem>
						<MenuItem
							onClick={() => {
								handleClose();
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
