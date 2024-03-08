/* eslint-disable turbo/no-undeclared-env-vars */
"use client";

import "./globals.css"; 
import React, { useEffect, useState } from "react";
import { CssBaseline, Drawer, Container } from "@mui/material";
import Navbar from "@repo/ui/navbar";
import Sidebar from "@repo/ui/sidebar";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
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

  const handleSignInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await auth.signInWithPopup(provider);
      const user = result.user;
      if (user) {
        // const firebaseUserIdToken  = await user.getIdToken();
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

  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <Navbar
          isSignin={isSignin}
          userPhotoURL={userPhotoURL}
          handleDrawerToggle={handleDrawerToggle}
          handleSignInWithGoogle={handleSignInWithGoogle}
          handleSignOut={handleSignOut}
        />
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
            <Sidebar handleDrawerToggle={handleDrawerToggle} />
          </Drawer>
        </nav>
        <Container maxWidth="lg">{children}</Container>
      </body>
    </html>
  );
}