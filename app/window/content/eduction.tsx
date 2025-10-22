"use client";
import Frame from "../frame";
import { EducationItem } from "./elements/education_panel";
import EducationTimeline from "./elements/education_timeline";
import { ReactNode } from "react";

interface EducationProps {
    title: string,
    icon_url: string,
    raw?: boolean
}

class EducationAttributes {
    public static id: number = 0;
}

export default function Education({title, icon_url, raw = false}: EducationProps) {

    const id = EducationAttributes.id++;

    const terminate = () => {
        console.log("Education: terminated");
    };

    const educationItems: EducationItem[] = [
        {
            degree: "Bachelor of Science",
            period: "2015 - 2018",
            institution: "Universität Musterstadt",
            summary: "Studium der Informatik mit Schwerpunkt Softwareentwicklung.",
            additionalInfo: "Abschlussnote: 1,5"
        },
        {
            degree: "Master of Science",
            period: "2018 - 2020",
            institution: "Universität Musterstadt",
            summary: "Vertiefung in Künstlicher Intelligenz und Machine Learning.",
            additionalInfo: "Masterarbeit über neuronale Netze"
        },
        {
            degree: "Werkstudent Softwareentwicklung",
            period: "2017 - 2018",
            institution: "Tech Solutions GmbH",
            summary: "Entwicklung von Webanwendungen mit React und Node.js.",
        },
        {
            degree: "Praktikum Backend-Entwicklung",
            period: "Sommer 2016",
            institution: "Innovative Apps AG",
            summary: "Erstellung von REST-APIs mit Python und Django.",
            additionalInfo: "Teamarbeit in agilem Umfeld"
        },
        {
            degree: "Abitur",
            period: "2010 - 2015",
            institution: "Gymnasium Beispielstadt",
            summary: "Schwerpunkt Mathematik und Informatik.",
        }
    ];

    const build = ():ReactNode => {
        return(
            <div id={raw ? "education" : `education_${id}`} className={raw ? "" : "education"}>
                <div className="education_title">
                    <h1>
                        Bildung und Berufserfahrung
                    </h1>
                </div>
                <div className="education_description">
                    <span>
                        Mein aka­de­mi­scher Wer­de­gang und mein be­ruf­li­che Lauf­bahn.
                    </span>
                </div>
                <EducationTimeline id={raw ? undefined : id} education_item_list={educationItems}/>
                {/* <div className="application_filler">
                    
                </div> */}
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