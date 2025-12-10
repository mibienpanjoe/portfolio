import React from 'react'
import clsx from "clsx";
import {useGSAP} from "@gsap/react";
import {Draggable} from "gsap/Draggable";
import useWindowStore from "#store/window.js";
import {locations} from "#constants/index.js";

const projects = locations.work?.children ?? [];

const Home = () => {
    const {setActiveLocation} = useWindowStore();
    const {openWindow} = useWindowStore();
    const handleOpenProjectFinder = (project) => {openWindow("finder")
    setActiveLocation(project)
    };

    useGSAP(()=>{
        Draggable.create(".folder") ;
    })
    return <section id="home">
        <ul>
            {projects.map((project) => (
                <li onClick={()=> handleOpenProjectFinder(project)} key={project.id} className={clsx("group folder" , project.windowPosition)}>
                    <img src="/images/folder.png" alt={project.name} />
                    <p>{project.name}</p>
                </li>
            ))}
        </ul>
    </section>
}
export default Home
