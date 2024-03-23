/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useEffect, useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Avatar, Button, Menu, MenuItem, Typography } from '@mui/material';
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
	const [userName, setUserName] = useState('');

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setIsSignedIn(true);
				setUserPhotoURL(user.photoURL || '');
				setUserName(user.displayName || '');
			} else {
				setIsSignedIn(false);
				setUserPhotoURL('');
				setUserName('');
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
				setUserName('');
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			{isSignedIn ? (
				<>
					<Button
						color="inherit"
						onClick={handleMenuOpen}
						startIcon={
							<Avatar
								src={userPhotoURL}
								alt="Avatar"
								sx={{ height: 35, width: 35 }}
							/>
						}
					>
						{userName}
					</Button>
					<Menu
						id="user-menu"
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleMenuClose}
					>
						<MenuItem onClick={handleSignOut}>Đăng xuất</MenuItem>
					</Menu>
				</>
			) : (
				<Button
					color="inherit"
					onClick={handleSignInWithGoogle}
					startIcon={<GoogleIcon />}
				>
					Đăng nhập bằng Google
				</Button>
			)}
		</>
	);
};

export default SigninWithGoogleButton;
