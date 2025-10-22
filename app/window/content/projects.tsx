"use client";
import React, { ReactNode, useEffect } from "react";
import Project, { Link } from "./elements/Project";
import Frame from "../frame";

interface ProjectsProps {
    title: string,
    icon_url: string,
    raw?: boolean
}

export default function Projects({title, icon_url, raw = false}: ProjectsProps) {
    useEffect(() => {
        console.log("Projects mounted");
        // super.addEventListeners();
    });

    const terminate = () => {
        console.log("Projects: terminated");
    };

    const build = (): ReactNode => {
        return(
            <div className={`projects ${raw ? "" : "projects_with_scrollbar"}`}>
                <div className="projects_title">
                    <span className="header2">
                        Projekte
                    </span>
                </div>
                <div className="projects_description">
                    <span className="description1">
                        Ent­de­cken Sie mein An­wen­dungs­port­fo­lio, wel­ches mei­ne Kennt­nis­se in der Front­end-, Ba­ckend-, Full-Stack- so­wie App-Ent­wick­lung zeigt.
                    </span>
                </div>
                <ul className="project_unsorted_list">
                    <Project
                        image="images/image.png"
                        title="Port­fo­lio Web­site"
                        description="Die­se Web­site ist eine Prä­sen­ta­ti­on mei­ner Pro­jek­te, Fä­hig­kei­ten und Er­fah­run­gen in der Soft­ware­ent­wick­lung. Sie zeich­net sich durch ein mo­dernes Design aus."
                        labels={["React", "Next.js", "TypeScript", "Framemotion"]}
                        links={[new Link("Details", "https://google.com")]}
                    />
                    <Project
                    image="images/image.png"
                        title="Neural Network (Number Detector)"
                        description="Ein Projekt um die tiefen geheimnisse Neuronaler Netze zu erknungen. Diese Projekt dient ausschließlich zur bildungszwecken."
                        labels={["Neurnale Netze", "KI", "Python", "numpy"]}
                        links={[new Link("Details", "https://google.com")]}
                    />
                    <Project
                    image="images/island_traveler.png"
                        title="Island Traveler"
                        description="Island Traveler ist ein 3D-Abenteuer-Action-Jump-’n’-Run-Spiel, bei dem der Spie
                        ler über verschiedene fliegende Inseln und Jump ’n’ Run Abschnitte zur Zielinsel
                        gelangen muss.

                        Dabei wird er auf seinem Weg durch verschiedenste Gegner aufgehalten, diese kann
                        er mit seinem Schwert besiegen. Zudem ist es dem Spieler möglich Edelsteine einzu
                        sammeln, welche ihn zum Ende des Spiels belohnen werden. Erst wenn alle Gegner
                        auf einer Insel besiegt wurden, wird der Weg zur nächsten Insel freigeschaltet.

                        Ziel des Spielers ist es die letzte fliegende Insel zu erreichen, um dort schließlich die
                        verbleibenden Gegner zu besiegen, ohne vorher alle drei seiner Herzen verloren zu
                        haben."
                        labels={["Unity", "Assets"]}
                        links={[new Link("Google", "https://google.com")]}
                    />
                    <Project 
                        image="images/image.png"
                        title="Projekt Title"
                        description="Das ist eine Beispiel beschreibung eines Projektes"
                        labels={["test1", "test2", "test3", "test1"]}
                        links={[new Link("Google", "https://google.com")]}
                    />
                    <Project 
                        image="images/image.png"
                        title="Test"
                        description="Das ist eine Beispiel beschreibung eines Projektes"
                        labels={["test1", "test2", "test3", "test1"]}
                        links={[new Link("Google", "https://google.com")]}
                    />
                    <Project 
                        image="images/image.png"
                        title="Test"
                        description="Das ist eine Beispiel beschreibung eines Projektes"
                        labels={["test1", "test2", "test3", "test1"]}
                        links={[new Link("Google", "https://google.com")]}
                    />
                    <Project 
                        image="images/image.png"
                        title="Test"
                        description="Das ist eine Beispiel beschreibung eines Projektes"
                        labels={["Vogel", "Schildkröte", "Katze", "Maus", "Hund", "Schwein", "Fisch", "Kuh", "Huhn"]}
                        links={[new Link("Google", "https://google.com")]}
                    />
                </ul>
            </div>
        );
    }

    return (
        raw ? build() : (
            <Frame
                title={title}
                icon_url={icon_url}
                onClose={terminate}
            >
                {build()}
            </Frame>
        )
    );
}