"use client";
import loadData, { DataType } from "@/services/load_data";
import Frame from "../frame";
import { EducationData } from "./education.card";
import EducationTimeline from "./education.timeline";
import { ReactNode, useEffect, useRef, useState } from "react";
import Loading from "@/widgets/loader";
import LanguageNotifier, { LanguageCode } from "@/global/languageSubscriber";

interface EducationGeneralData {
    title: string;
    description: string;
    education_data_list: EducationData[];
}

export interface EducationConfig {
    title: string;
    icon: string;
}

interface EducationProps {
    ref?: React.RefObject<HTMLDivElement | null>;
    config?: EducationConfig;
}

class EducationAttributes {
    public static id: number = 0;
}

export default function Education({ref, config}: EducationProps) {

    const [data, setSkillData] = useState<EducationGeneralData | null>(null);
    const [languageCode, setLanguageCode] = useState<LanguageCode>(LanguageNotifier.code);
    
    const handleLanguageChange = (code: LanguageCode) => {
        setLanguageCode(code);
    }

    const education = useRef<HTMLDivElement>(null);

    const id = EducationAttributes.id++;

    const terminate = () => {
        console.log("Education: terminated");
    };

    useEffect(() => {

        loadData<EducationGeneralData>(DataType.EDUCATION, languageCode).then((res) => {
            setSkillData(res);
        });
        LanguageNotifier.subscribe(handleLanguageChange);
        
        return () => {LanguageNotifier.unsubscribe(handleLanguageChange)};
    }, [languageCode]);

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
            <section ref={education} id="section" className={`education ${!config ? "" : "section_with_scrollbar"}`}>
                <div className="first_heading_container">
                    <span className="first_heading">
                        {data.title}
                    </span>
                </div>
                <div className="section_description_container">
                    <span className="section_description">
                        {data.description}
                    </span>
                </div>
                <EducationTimeline id={id} ref={ref ? ref :education} education_data_list={data.education_data_list}/>

            </section>
        );
    }

    return(
        !config ? build() : (
            <Frame
                title={config.title}
                icon_url={config.icon}
                width={"1380px"}
                onClose={terminate}
            >
                {build()}
            </Frame>
        )
    )
}