import type React from 'react';
import { Container, CssBaseline } from '@mui/material';
import Navbar from '@repo/ui/navbar';

import './globals.css';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<CssBaseline />
				<Navbar />
				<Container maxWidth="lg">{children}</Container>
			</body>
		</html>
	);
}
