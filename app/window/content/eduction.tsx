"use client";
import loadData, { DataType } from "@/load_data";
import Frame from "../frame";
import { EducationData } from "./elements/education_panel";
import EducationTimeline from "./elements/education_timeline";
import { ReactNode, useEffect, useState } from "react";

interface EducationGeneralData {
    title: string;
    description: string;
    education_data_list: EducationData[];
}

interface EducationProps {
    title: string,
    icon_url: string,
    raw?: boolean
}

class EducationAttributes {
    public static id: number = 0;
}

export default function Education({title, icon_url, raw = false}: EducationProps) {

    const [data, setSkillData] = useState<EducationGeneralData | null>(null);

    const id = EducationAttributes.id++;

    const terminate = () => {
        console.log("Education: terminated");
    };

    useEffect(() => {
        loadData<EducationGeneralData>(DataType.EDUCATION).then((res) => {
            setSkillData(res);
        });
    }, []);

    const build = ():ReactNode => {
        if (!data) return(
            <div>
                No data available.
            </div>
        )
        return(
            // <div id={raw ? "education" : `education_${id}`} className={`education ${raw ? "" : "projects_with_scrollbar"}`}>
            <div id="education" className={`education ${raw ? "" : "projects_with_scrollbar"}`}>
                <div className="education_title">
                    <span className="header2">
                        Bildung und Berufserfahrung
                    </span>
                </div>
                <div className="education_description">
                    <span className="description1">
                        Mein aka­de­mi­scher Wer­de­gang und mein be­ruf­li­che Lauf­bahn.
                    </span>
                </div>
                <EducationTimeline id={raw ? undefined : id} education_data_list={data.education_data_list}/>

            </div>
        );
    }

    return(
        raw ? build() : (
            <Frame
                title={title}
                icon_url={icon_url}
                width={"1380px"}
                onClose={terminate}
            >
                {build()}
            </Frame>
        )
    )
}