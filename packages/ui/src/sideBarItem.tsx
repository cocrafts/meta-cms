import type { FC } from 'react';
import { ListItem, ListItemButton, Typography } from '@mui/material';
import Link from 'next/link';

interface SidebarItemProps {
	href: string;
	text: string;
	icon: JSX.Element;
}

export const SidebarItem: FC<SidebarItemProps> = ({ href, text, icon }) => (
	<ListItem disablePadding sx={styles.listItem}>
		<ListItemButton component={Link} href={href}>
			{icon}
			<Typography variant="body1" sx={styles.text}>
				{text}
			</Typography>
		</ListItemButton>
	</ListItem>
);

export default SidebarItem;

const styles = {
	listItem: {
		padding: '5px 0',
	},
	text: {
		marginLeft: '8px',
	},
};
