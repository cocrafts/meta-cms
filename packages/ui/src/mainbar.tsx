'use client';

import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
	AppBar,
	Drawer,
	IconButton,
	InputBase,
	Toolbar,
	Typography,
} from '@mui/material';
import Link from 'next/link';

import Sidebar from './sidebar';
import SigninWithGoogleButton from './signInWithGoogleButton';

const Navbar = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const handleDrawerToggle = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<>
			<AppBar position="static" component="nav" className="appbar">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Link
							href="/"
							style={{ textDecoration: 'none', color: 'white', marginLeft: 10 }}
						>
							MetaCMS
						</Link>
					</Typography>
					<div style={{ position: 'relative' }}>
						<InputBase
							placeholder="Search..."
							inputProps={{ 'aria-label': 'search' }}
							sx={{
								color: 'inherit',
								'& .MuiInputBase-input': { width: '150px' },
								mx: 3,
							}}
						/>
					</div>
					<SigninWithGoogleButton />
				</Toolbar>
			</AppBar>
			<nav>
				<Drawer
					variant="temporary"
					open={sidebarOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: 'block',
						'@media (min-width:600px)': {
							display: 'block',
						},
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
					}}
				>
					<Sidebar handleDrawerToggle={handleDrawerToggle} />
				</Drawer>
			</nav>
		</>
	);
};

export default Navbar;
