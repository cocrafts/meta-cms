import type { FC } from 'react';
import {
	Dashboard,
	LibraryBooks,
	PermMedia,
	Settings,
	Storage,
} from '@mui/icons-material';
import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemButton,
	Typography,
} from '@mui/material';
import Link from 'next/link';

interface SidebarProps {
	handleDrawerToggle: () => void;
}

interface SidebarItemProps {
	href: string;
	text: string;
	icon: JSX.Element;
}

const SidebarItem: FC<SidebarItemProps> = ({ href, text, icon }) => (
	<ListItem disablePadding sx={styles.listItem}>
		<ListItemButton
			component={Link}
			href={href}
			style={{ textDecoration: 'none' }}
		>
			{icon}
			<Typography variant="body1" sx={styles.text}>
				{text}
			</Typography>
		</ListItemButton>
	</ListItem>
);

const Sidebar: FC<SidebarProps> = ({ handleDrawerToggle }) => {
	return (
		<Box onClick={handleDrawerToggle}>
			<Typography variant="h6" sx={styles.title}>
				<Link
					href="/"
					style={{
						textDecoration: 'none',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					MetaCMS
				</Link>
			</Typography>
			<Divider />
			<List sx={styles.list}>
				<SidebarItem
					href="/dashboard"
					text="Dashboard"
					icon={<Dashboard sx={styles.icon} />}
				/>
				<Typography variant="button" sx={styles.typography}>
					Collection Types
				</Typography>
				<SidebarItem
					href="/"
					text="Content Manager"
					icon={<Storage sx={styles.icon} />}
				/>
				<Typography variant="button" sx={styles.typography}>
					Plugins
				</Typography>
				<SidebarItem
					href="/"
					text="Content-Type Builder"
					icon={<LibraryBooks sx={styles.icon} />}
				/>
				<SidebarItem
					href="/"
					text="Media Library"
					icon={<PermMedia sx={styles.icon} />}
				/>
				<Typography variant="button" sx={styles.typography}>
					General
				</Typography>
				<SidebarItem
					href="/"
					text="Settings"
					icon={<Settings sx={styles.icon} />}
				/>
			</List>
		</Box>
	);
};

export default Sidebar;

const styles = {
	title: {
		my: 2,
		textAlign: 'center',
	},
	icon: {
		mr: 1,
	},
	list: {
		padding: 0,
	},
	listItem: {
		padding: '5px 0',
	},
	text: {
		marginLeft: '8px',
	},
	typography: {
		display: 'block',
		gutterBottom: true,
		mx: 2,
		mt: 2.5,
		fontSize: '0.875rem',
		fontWeight: 500,
		color: '#616161',
	},
};
