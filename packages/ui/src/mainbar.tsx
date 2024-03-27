'use client';

import type { FC } from 'react';
import { Fragment, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
	AppBar,
	Badge,
	Drawer,
	IconButton,
	InputBase,
	Toolbar,
	Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import Sidebar from './sidebar';
import SigninWithGoogleButton from './signInWithGoogleButton';

export const MainBar = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const handleDrawerToggle = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<Fragment>
			<AppBar position="static" component="nav" className="appbar">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Link href="/">
						<Image src={uri} alt="Walless logo" width={50} height={50} />
					</Link>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, ml: 0.5 }}
					>
						<Link href="/" style={styles.link}>
							Metapi
						</Link>
					</Typography>
					<InputBase
						placeholder="Search..."
						inputProps={{ 'aria-label': 'search' }}
						sx={{
							color: 'inherit',
							'& .MuiInputBase-input': { width: '150px' },
							mx: 4,
						}}
					/>
					<IconButton
						size="large"
						aria-label="show notifications"
						color="inherit"
						sx={{ mx: 3 }}
					>
						<Badge badgeContent={1} color="error">
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<SigninWithGoogleButton />
				</Toolbar>
			</AppBar>
			<Drawer
				variant="temporary"
				open={sidebarOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true,
				}}
				sx={styles.inputBase}
			>
				<Sidebar handleDrawerToggle={handleDrawerToggle} uri={uri} />
			</Drawer>
		</Fragment>
	);
};

export default MainBar;

const styles = {
	link: {
		textDecoration: 'none',
		color: 'white',
		marginLeft: 10,
	},
	inputBase: {
		color: 'inherit',
		'& .MuiInputBase-input': { width: '150px' },
		mx: 4,
	},
};
