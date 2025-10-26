"use client";
import loadData, { DataType } from "@/services/load_data";
import Frame from "./frame";
import { EducationData } from "./education_panel";
import EducationTimeline from "./education_timeline";
import { ReactNode, useEffect, useRef, useState } from "react";
import Loading from "@/widgets/loader";

interface EducationGeneralData {
    title: string;
    description: string;
    education_data_list: EducationData[];
}

interface EducationProps {
    title: string,
    icon_url: string,
    ref?: React.RefObject<HTMLDivElement | null>;
    raw?: boolean
}

class EducationAttributes {
    public static id: number = 0;
}

export default function Education({title, icon_url, ref, raw = false}: EducationProps) {

    const [data, setSkillData] = useState<EducationGeneralData | null>(null);

    const education = useRef<HTMLDivElement>(null);

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
            <Loading
                width="50px"
                height="50px"
                justify_content="center"
                text="Data is loading ..."
            />
        )
        return(
            // <div id={raw ? "education" : `education_${id}`} className={`education ${raw ? "" : "projects_with_scrollbar"}`}>
            <div ref={education} id="education" className={`education ${raw ? "" : "projects_with_scrollbar"}`}>
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
                <EducationTimeline id={id} ref={ref ? ref :education} education_data_list={data.education_data_list}/>

            </div>
        );
    }

    console.log("Initial Education")

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