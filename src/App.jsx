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


function App() {
    const [count, setCount] = useState(0)

    // return (
    //   <>
    //     <Navbar />
    //     <Player />
    //     {/*<Playlist playlistId = '936714ba-b7bc-4a2c-82ce-38f34a97f8d2' />*/}
    //   </>
    // )

    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="streams" element={<Playlists/>}/>
                <Route path="stream" element={<Stream/>}/>
                <Route path="playlists" element={<Playlists/>}/>
                <Route path="upload/stream" element={<PanelControl/>}/>
                <Route path="/:playlistId" element={<Playlist/>}/>
                <Route path="upload/video" element={<PanelControl/>}/>
                <Route path="/:playlistId/:videoId" element={<Player/>}/>
                <Route path="playlist" element={<Playlist playlistId="936714ba-b7bc-4a2c-82ce-38f34a97f8d2"/>}/>
            </Routes>
        </BrowserRouter>
    )

}

export default App
