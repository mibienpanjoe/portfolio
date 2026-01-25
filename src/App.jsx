import {Draggable} from "gsap/Draggable";
import gsap from "gsap";

import {Navbar, Welcome, Dock, Home} from "#components";
import { Terminal , Contact, Safari ,Resume  , Finder , Text, Image, Photos, Chat } from "#windows";


gsap.registerPlugin(Draggable);


const App = () => {
    return (
        <main>
            <Navbar/>
            <Welcome/>
            <Dock/>

            <Terminal/>
            <Safari/>
            <Resume/>
            <Finder/>
            <Text/>
            <Image/>
            <Photos/>
            <Contact/>
            <Chat/>
            <Home />
        </main>
    )
}
export default App
