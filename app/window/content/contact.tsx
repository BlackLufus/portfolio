"use client";
import Frame from "../frame";
import { ReactNode } from "react";

interface ContactProps {
    title: string,
    icon_url: string,
    raw?: boolean
}

export default function Contact({title, icon_url, raw=false}: ContactProps) {

    const terminate = () => {
        console.log("Contact: terminated");
    };

    const build = (): ReactNode => {
        return(
            <div id="contact" className="about_me">
                No contact available jet.
            </div>
        );
    }

    return(
        raw ? build() : (
            <Frame
                title={title}
                icon_url={icon_url}
                onClose={terminate}
            >
                {build()}
            </Frame>
        )
    )
}
