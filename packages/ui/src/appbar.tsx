import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import { signOut } from "firebase/auth";

const AppBarComponent = ({
  isSignin,
  userPhotoURL,
  handleDrawerToggle,
  handleSignInWithGoogle,
  handleSignOut,
}) => {
  return (
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            MetaCMS
          </Link>
        </Typography>
        {isSignin ? (
          <>
            <Avatar src={userPhotoURL} alt="Avatar" />
            <Button color="inherit" onClick={handleSignOut}>
              Đăng xuất
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleSignInWithGoogle}>
            <GoogleIcon sx={{ mr: 1 }} />
            Đăng nhập bằng Google
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
