"use client";
import React, { useEffect } from "react";
import Project, { Link } from "./elements/Project";
import Frame from "../frame";

interface ProjectsProps {
    title: string,
    icon_url: string
}

export default function Projects({title, icon_url}: ProjectsProps) {
    useEffect(() => {
        console.log("Projects mounted");
        // super.addEventListeners();
    });

    const terminate = () => {
        console.log("Projects: terminated");
    };

    return (
        <Frame
            title={title}
            icon_url={icon_url}
            onClose={terminate}
        >
            <div className="application">
                <div className="application_title">
                    <h1>Projekte</h1>
                </div>
                <div className="application_description">
                    <span>
                        Ent­de­cken Sie mein An­wen­dungs­port­fo­lio, wel­ches mei­ne Kennt­nis­se in der Front­end-, Ba­ckend-, Full-Stack- so­wie App-Ent­wick­lung zeigt.
                    </span>
                </div>
                <div className="application_content">
                    <div className="application_content_project">
                        <Project
                            title="Port­fo­lio Web­site"
                            description="Die­se Web­site ist eine Prä­sen­ta­ti­on mei­ner Pro­jek­te, Fä­hig­kei­ten und Er­fah­run­gen in der Soft­ware­ent­wick­lung. Sie zeich­net sich durch ein mo­dernes Design aus."
                            labels={["React", "Next.js", "TypeScript", "Framemotion"]}
                            links={[new Link("Details", "https://google.com")]}
                        />
                        <Project
                            title="Neural Network (Number Detector)"
                            description="Ein Projekt um die tiefen geheimnisse Neuronaler Netze zu erknungen. Diese Projekt dient ausschließlich zur bildungszwecken."
                            labels={["Neurnale Netze", "KI", "Python", "numpy"]}
                            links={[new Link("Details", "https://google.com")]}
                        />
                        <Project
                            title="Projekt Title"
                            description="Das ist eine Beispiel beschreibung eines Projektes, bla bla bla bla bla blabla bla bla bla bla bla."
                            labels={["test1", "test2", "test3", "test1", "test2", "test3"]}
                            links={[new Link("Google", "https://google.com")]}
                        />
                        <Project 
                            title="Test"
                            description="Das ist eine Beispiel beschreibung eines Projektes"
                            labels={["test1", "test2", "test3", "test1"]}
                            links={[new Link("Google", "https://google.com")]}
                        />
                        <Project 
                            title="Test"
                            description="Das ist eine Beispiel beschreibung eines Projektes"
                            labels={["test1", "test2", "test3", "test1"]}
                            links={[new Link("Google", "https://google.com")]}
                        />
                        <Project 
                            title="Test"
                            description="Das ist eine Beispiel beschreibung eines Projektes"
                            labels={["test1", "test2", "test3", "test1"]}
                            links={[new Link("Google", "https://google.com")]}
                        />
                        <Project 
                            title="Test"
                            description="Das ist eine Beispiel beschreibung eines Projektes"
                            labels={["Vogel", "Schildkröte", "Katze", "Maus", "Hund", "Schwein", "Fisch", "Kuh", "Huhn"]}
                            links={[new Link("Google", "https://google.com")]}
                        />
                    </div>
                </div>
            </div>
        </Frame>
    );
}