'use client';

import type { MouseEvent } from 'react';
import { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Avatar, Button, Menu, MenuItem, Tooltip } from '@mui/material';
import { useSnapshot } from 'valtio';

import {
	handleSignInWithGG,
	handleSignOut,
} from '../../../apps/web/app/utils/authGG';
import { useUserProfile } from '../../../apps/web/app/utils/hook/index';

const SigninWithGoogleButton = () => {
	const userProfile = useUserProfile();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
					onClick={handleSignInWithGG}
					startIcon={<GoogleIcon />}
				>
					Sign in with GG
				</Button>
			)}
		</>
	);
};

export default SigninWithGoogleButton;
