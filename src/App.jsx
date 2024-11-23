import {useState} from 'react'
import './App.scss'
import './components/Navbar.scss'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navbar from "./components/Header.jsx";
import Player from "./components/Player.jsx";
import Playlist from "./components/Playlist.jsx";
import Stream from "./components/Stream.jsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PanelControl from "./components/PanelControl.jsx";
import Playlists from "./components/Playlists.jsx";
import {routes} from "../config/routes.js"


function App() {
    const [count, setCount] = useState(0)

    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path={routes.playlists} element={<Playlists/>}/>
                <Route path={routes.streams} element={<Playlists/>}/>
                <Route path={routes.stream} element={<Stream/>}/>
                <Route path={routes.uploadStream} element={<PanelControl/>}/>
                <Route path={routes.playlist} element={<Playlist/>}/>
                <Route path={routes.uploadVideo} element={<PanelControl/>}/>
                <Route path="/:playlistId/:videoId" element={<Player/>}/>
            </Routes>
        </BrowserRouter>
    )

}

export default App
