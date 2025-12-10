import {Draggable} from "gsap/Draggable";
import gsap from "gsap";

import {Navbar , Welcome , Dock } from "#components";
import { Terminal , Contact, Safari ,Resume  , Finder , Text, Image} from "#windows";


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
            <Contact/>

        </main>
    )
}
export default App
