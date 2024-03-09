"use client";

import "./globals.css"; 
import React, { useEffect, useState } from "react";
import { CssBaseline, Drawer, Container } from "@mui/material";
import Navbar from "@repo/ui/navbar";
import Sidebar from "@repo/ui/sidebar";
import { signOut } from "firebase/auth";
import firebaseApp from "../../../firebase"
import { send } from "process";

const auth = firebaseApp.auth();

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
    const provider = new firebaseApp.auth.GoogleAuthProvider();
    try {
      const result = await auth.signInWithPopup(provider);
      const user = result.user;
      if (user) {
        const firebaseUserIdToken  = await user.getIdToken();
        console.log(firebaseUserIdToken);
        const response = await fetch("http://localhost:8080/api/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${firebaseUserIdToken}`
          },
          body: JSON.stringify({ token: firebaseUserIdToken }),
        });
        const data = await response.json();
        console.log(data);
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