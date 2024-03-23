import type React from 'react';
import { Container, CssBaseline } from '@mui/material';
import MainBar from '@repo/ui/mainbar';

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
				<MainBar />
				<Container maxWidth="lg">{children}</Container>
			</body>
		</html>
	);
}
