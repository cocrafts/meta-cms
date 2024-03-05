"use client";

import "./globals.css";
import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  Typography,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import GoogleIcon from "@mui/icons-material/Google";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Link from "next/link";
import { signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXzGwhPfxtQEEEeechJABRShSytmzpTrg",
  authDomain: "metacms-14850.firebaseapp.com",
  projectId: "metacms-14850",
  storageBucket: "metacms-14850.appspot.com",
  messagingSenderId: "576776784274",
  appId: "1:576776784274:web:f451917efe27a6a722594b",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSignin, setIsSignin] = useState(false);
  const [userPhotoURL, setUserPhotoURL] = useState("");

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsSignin(true);
        setUserPhotoURL(user.photoURL || "");
      } else {
        setIsSignin(false);
        setUserPhotoURL("");
      }
    });

    return () => unsubscribe();
  }, []);

  const drawer = (
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

  const handleSignInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await auth.signInWithPopup(provider);
      const user = result.user;
      if (user) {
        const idToken = await user.getIdToken();
        // sendTokenToBackend(idToken);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setIsSignin(false);
        setUserPhotoURL("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const sendTokenToBackend = (token: string) => {
  //   fetch("/api/auth/user", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ token }),
  //   })
  //     .then(() => {})
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  return (
    <html lang="en">
      <body>
        <CssBaseline />
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
              MetaCMS
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
        <nav>
          <Drawer
            variant="temporary"
            open={sidebarOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: "block",
              "@media (min-width:600px)": {
                display: "block",
              },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Container maxWidth="lg">{children}</Container>
      </body>
    </html>
  );
}
