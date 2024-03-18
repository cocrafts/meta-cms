/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useEffect, useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Avatar, Button } from '@mui/material';
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

const signinWithGoogleButton = () => {
	const [isSignin, setIsSignin] = useState(false);
	const [userPhotoURL, setUserPhotoURL] = useState('');

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setIsSignin(true);
				setUserPhotoURL(user.photoURL || '');
			} else {
				setIsSignin(false);
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
				setIsSignin(false);
				setUserPhotoURL('');
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<>
			{isSignin ? (
				<>
					<Avatar src={userPhotoURL} alt="Avatar" />
					<Button color="inherit" onClick={handleSignOut}>
						Đăng xuất
					</Button>
				</>
			) : (
				<Button color="inherit" onClick={handleSignInWithGoogle}>
					<GoogleIcon sx={{ mr: 1 }} />
					Đăng nhập bằng Google
				</Button>
			)}
		</>
	);
};

export default signinWithGoogleButton;
