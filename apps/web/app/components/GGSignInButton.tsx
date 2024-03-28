'use client';

import type { MouseEvent } from 'react';
import { Fragment, useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Avatar, Button, Menu, MenuItem, Tooltip } from '@mui/material';

import { profileActions, userProfileState } from '../utils/state';

export const GGSignInButton = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const open = Boolean(anchorEl);
	const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleSignOutClick = () => {
		handleMenuClose();
		profileActions.signOut();
	};

	return (
		<Fragment>
			{userProfileState.isSignedIn ? (
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
							<Avatar src={userProfileState.profile.avatarUrl} alt="Avatar" />
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
						<MenuItem onClick={handleSignOutClick}>Logout</MenuItem>
					</Menu>
				</>
			) : (
				<Button
					color="inherit"
					onClick={profileActions.googleSignIn}
					startIcon={<GoogleIcon />}
				>
					Sign in with GG
				</Button>
			)}
		</Fragment>
	);
};

export default GGSignInButton;
