"use client";
import Frame from "../frame";
import { useEffect, useState } from "react";

interface ScrollProps {
    title: string,
    icon_url: string
}

export default function Scroll({title, icon_url}: ScrollProps) {

    const terminate = () => {
        console.log("Scroll: terminated");
    };

    const [scrollPercent, setScrollPercent] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        setScrollPercent(scrollPercent);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return(
        <Frame
            title={title}
            icon_url={icon_url}
            onClose={terminate}
        >
            <div className="application">
                <div className="application_title">
                    <h1>
                        Bildung und Berufserfahrung
                    </h1>
                </div>
                <div className="application_description">
                    <span>
                        Mein aka­de­mi­scher Wer­de­gang und mein be­ruf­li­che Lauf­bahn.
                    </span>
                </div>
                <div className="application_content">
                    
                </div>
            </div>
        </Frame>
    )
}
