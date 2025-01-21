import { useState } from "react";
import "./App.scss";
import { Navbar } from "./components/navbar/Navbar.jsx";
import Player from "./components/Player.jsx";
import Playlist from "./components/Playlist.jsx";
import Stream from "./components/Stream.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { routes } from "../config/routes.js";
import ContentLayout from "./pages/ContentLayout.jsx";
import { Footer } from "./components/footer";
import { Login } from "./components/login/Login";
import { Admin } from "./pages/Admin";

function IsNavbar() {
  const location = useLocation();
  if (location.pathname !== routes.login) {
    return <Navbar />;
  } else {
    return;
  }
}

function App() {
  return (
    <BrowserRouter basename="/ui">
      <div className="flex flex-col min-h-screen leading-tight">
        <IsNavbar />
        <div className="flex-1">
          <Routes>
            <Route path={routes.root} element={<ContentLayout />} />
            <Route path={routes.playlists} element={<ContentLayout />} />
            <Route path={routes.playlist} element={<Playlist />} />
            <Route path={routes.streams} element={<ContentLayout />} />
            <Route path={routes.stream} element={<Stream />} />
            <Route path="/:playlistId/:videoId" element={<Player />} />
            <Route path="/playlists/:videoId" element={<Player />} />

            <Route path={routes.login} element={<Login />} />
            <Route path={routes.admin} element={<Admin />} />

            <Route path={routes.adminVideo} element={<Admin />} />
            <Route path={routes.adminStream} element={<Admin />} />
            <Route path={routes.adminPlaylist} element={<Admin />} />
            <Route path={routes.adminUsers} element={<Admin />} />
            
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
