import {useState} from 'react'
import './App.scss'
import './components/Navbar.scss'
import Navbar from "./components/Header.jsx";
import Player from "./components/Player.jsx";
import Playlist from "./components/Playlist.jsx";
import Stream from "./components/Stream.jsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PanelControl from "./components/PanelControl.jsx";
import Playlists from "./components/Playlists.jsx";
import {routes} from "../config/routes.js"
import ContentLayout from "./pages/ContentLayout.jsx";
import Playlists2 from "./components/Playlists2.jsx";
import {Footer} from "./components/footer";


function App() {
    const [count, setCount] = useState(0)

    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<ContentLayout/>}/>
                <Route path={routes.playlists} element={<Playlists2/>}/>
                <Route path={routes.streams} element={<Playlists/>}/>
                <Route path={routes.stream} element={<Stream/>}/>
                <Route path={routes.uploadStream} element={<PanelControl/>}/>
                <Route path={routes.playlist} element={<Playlist/>}/>
                <Route path={routes.uploadedVideo} element={<Playlist/>}/>
                <Route path={routes.uploadVideo} element={<PanelControl/>}/>
                <Route path="/:playlistId/:videoId" element={<Player/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )

}

export default App
