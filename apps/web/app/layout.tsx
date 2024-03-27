import type { FC, ReactNode } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { MainBar } from '@repo/ui';

import './globals.css';

interface Props {
	children: ReactNode;
}

const RootLayout: FC<Props> = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<CssBaseline />
				<MainBar uri="/walless-icon.svg" />
				<Container maxWidth="lg">{children}</Container>
			</body>
		</html>
	);
};

export default RootLayout;
