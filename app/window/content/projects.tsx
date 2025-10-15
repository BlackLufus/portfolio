"use client";
import Frame from "../frame";
import React, { useEffect } from "react";
import Project, { Link } from "./elements/Project";

class Projects extends Frame {

    public constructor() {

        super("Video Cam", () => this.terminate());
    }

    public build(): React.ReactNode {
        useEffect(() => {
            console.log("asd")
            super.addEventListeners();
        });
        return super.build(
            <div className="application">
                <div className="application_title">
                    <h1>
                        Pro­jek­te
                    </h1>
                </div>
                <div className="application_description">
                    <span>
                        Ent­de­cken Sie mein An­wen­dungs­port­fo­lio, wel­ches mei­ne Kennt­nis­se in der Front­end-, Ba­ckend-, Full-Stack- so­wie App-Ent­wick­lung zeigt.
                    </span>
                </div>
                <div className="application_content">
                    <div className="application_content_project">
                        {Project({ title: "Projekt Title", description: "Das ist eine Beispiel beschreibung eines Projektes, bla bla bla bla bla blabla bla bla bla bla bla.", labels: ["test1", "test2", "test3", "test1", "test2", "test3"], links: [new Link("Google", "google.com")] })}
                        {Project({ title: "Test", description: "Das ist eine Beispiel beschreibung eines Projektes", labels: ["test1", "test2", "test3", "test1"], links: [new Link("Google", "google.com")] })}
                        {Project({ title: "Test", description: "Das ist eine Beispiel beschreibung eines Projektes", labels: ["test1", "test2", "test3", "test1"], links: [new Link("Google", "google.com")] })}
                        {Project({ title: "Test", description: "Das ist eine Beispiel beschreibung eines Projektes", labels: ["test1", "test2", "test3", "test1"], links: [new Link("Google", "google.com")] })}
                        {Project({ title: "Test", description: "Das ist eine Beispiel beschreibung eines Projektes", labels: ["Vogel", "Schildkröte", "Katze", "Maus", "Hund", "Schwein", "Fisch", "Kuh", "Huhn"], links: [new Link("Google", "google.com")] })}
                    </div>
                </div>
            </div>
        )
    }

    /**
     * Terminates the Video Cam frame by stopping the image stream and unsubscribing from the WebSocket.
     * @returns {void}
     */
    private terminate = (): void => {
        console.log("VideoCam: Terminate Node");
        
    }

}

export default Projects