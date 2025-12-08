import React from 'react'
import {WindowControls} from "#components/index.js";
import {ChevronLeft,Search, ChevronRight , Share ,Copy, MoveRight, PanelLeft, Plus, ShieldHalf} from "lucide-react";
import {blogPosts} from "#constants/index.js";
import WindowWrapper from "#hoc/WindowWrapper.jsx";

const Safari = () => {
    return (
    <>
        <div id="window-header">
            <WindowControls target="safari"/>
            <PanelLeft className="ml-10 icon"/>

            <div className= "flex items-center gap-1 ml-5">
                <ChevronLeft className="icon"/>
                <ChevronRight className="icon"/>
            </div>

            <div className="flex-1 flex-center gap-3">
                <ShieldHalf className="icon"/>

                <div className="search">
                    <Search className="icon"/>
                    <input type="text" placeholder="Search or enter website name" className="flex-1"/>
                </div>

                <div className="flex irems-center gap-5">
                    <Share className="icon"/>
                    <Plus className="icon"/>
                    <Copy className="icon"/>

                </div>
            </div>
        </div>

        <div className="blog">
            <h2>My developer blog</h2>

            <div className="space-y-6">
                {blogPosts.map(({id ,link,date, title , image }) => (
                    <div key={id} className="blog-post">
                        <div className="col-span-2">
                            <img src={image} alt={title}/>
                        </div>

                        <div className="content">
                            <p>{date}</p>
                            <h3>{title}</h3>
                            <a href={link} target="_blank"
                               rel="noopener noreferrer">Read more <MoveRight className="icon-hover" /> </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>);
}
const SafariWindow = WindowWrapper(Safari , "safari");
export default SafariWindow ;
