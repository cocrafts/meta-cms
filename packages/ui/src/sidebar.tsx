import type { FC } from "react";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import Link from "next/link";

interface SidebarProps {
  handleDrawerToggle: () => void;
}

const Sidebar: FC<SidebarProps> = ({ handleDrawerToggle }) => {
  return (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          MetaCMS
        </Link>
      </Typography>
      <Divider />
      <List>
        {["Dashboard", "Profile"].map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link
                href={`/${item.toLowerCase()}`}
                style={{ textDecoration: "none" }}
              >
                {item}
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
