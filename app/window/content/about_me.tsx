"use client";
import Frame from "../frame";
import { ReactNode, useEffect, useRef, useState } from "react";
import PersonalPanel from "./elements/personal_panel";
import SkillItem, { SkillData } from "./elements/skill";
import EventListener from "@/miscs/EventListener";
import loadData, { DataType } from "@/load_data";

interface CharacteristicsData {
    image: string;
    text: string;
}

interface ProfessionalData {
    title: string;
    description: string;
    characteristics_list: CharacteristicsData[];
}

interface PersonalData {
    title: string;
    description: string;
    characteristics_list: CharacteristicsData[];
}

interface AboutMeData {
    title: string;
    description: string;
    personal: PersonalData;
    professional: ProfessionalData;
}

interface SkillsData {
    title: string;
    description: string;
    level_description: string;
    skill_list: SkillData[];
}

interface AboutMeProps {
    title: string,
    icon_url: string,
    raw?: boolean
}

export default function AboutMe({title, icon_url, raw=false}: AboutMeProps) {

    const [about_me_data, setAboutMeData] = useState<AboutMeData | null>(null);
    const [skill_data, setSkillData] = useState<SkillsData | null>(null);

    const skillsUlRef = useRef<HTMLUListElement>(null);
    const [numBoxes, setNumBoxes] = useState(1);
    let selectedBox = 0;

    const calcNumBoxes = () => {
        console.log("calcNumBoxes")
        if (!skillsUlRef.current) return;
        const container = skillsUlRef.current;
        const totalScrollWidth = container.scrollWidth;
        const viewWidth = container.clientWidth;

        // Anzahl der "Seiten" (z. B. 3, wenn du 3 Viewports breit bist)
        const numBoxes = Math.ceil(totalScrollWidth / (viewWidth));
        setNumBoxes(numBoxes);
    }

    const onClickBox = (index: number) => {
        if (!skillsUlRef.current) return;
        // const scrollLeft = skillsUlRef.current.scrollLeft;
        const container = skillsUlRef.current;
        const totalScrollWidth = container.scrollWidth;
        const viewWidth = container.clientWidth;

        // Anzahl der "Seiten" (z. B. 3, wenn du 3 Viewports breit bist)
        const numBoxes = Math.ceil(totalScrollWidth / (viewWidth));

        // Pixel-Breite einer "Box"
        const boxWidth = totalScrollWidth / numBoxes;

        // const currentBoxIndex = Math.round(scrollLeft / boxWidth);

        const newScrollLeft = (index) * boxWidth;
        skillsUlRef.current.scrollTo({
            left: newScrollLeft,
            behavior: "smooth"
        });
    };

    const onScrollLeftChange = () => {
        if (!skillsUlRef.current) return;
        const scrollLeft = skillsUlRef.current.scrollLeft;
        const container = skillsUlRef.current;
        const totalScrollWidth = container.scrollWidth;
        const viewWidth = container.clientWidth;

        // Anzahl der "Seiten" (z. B. 3, wenn du 3 Viewports breit bist)
        const numBoxes = Math.ceil(totalScrollWidth / (viewWidth));

        // Pixel-Breite einer "Box"
        const boxWidth = totalScrollWidth / numBoxes;

        const currentBoxIndex = Math.round(scrollLeft / boxWidth);
        
        setSelectedBox(currentBoxIndex);
    }

    const setSelectedBox = (index: number) => {
        const oldSelected = document.getElementById(`skills_custom_box_${selectedBox}`) as HTMLDivElement;
        oldSelected.className = "skills_custom_box"
        console.log(selectedBox)
        selectedBox = index;
        const newSelected = document.getElementById(`skills_custom_box_${selectedBox}`) as HTMLDivElement;
        newSelected.className = "skills_custom_box skills_custom_box_selected"
    }

    const addEventListeners = ():void => {
        EventListener.addEventListener(
            window,
            'resize',
            () => {
                calcNumBoxes();
            },
            false,
            `skills_ul_ref`
        );
        EventListener.addEventListener(
            skillsUlRef.current,
            'scroll',
            () => {
                onScrollLeftChange();
            },
            false,
            `skills_ul_ref`
        );
        EventListener.addEventListener(
            skillsUlRef.current,
            'mousedown',
            (rootEvent: MouseEvent) => {

                if (!skillsUlRef.current) return;
                const startX = rootEvent.pageX - skillsUlRef.current.offsetLeft;
                const scrollLeft = skillsUlRef.current.scrollLeft;
                
                EventListener.addEventListener(
                    document,
                    'mousemove',
                    (e: MouseEvent) => {

                        if (!skillsUlRef.current) return;
                        const x = e.pageX - skillsUlRef.current.offsetLeft;
                        const walk = (x - startX);
                        skillsUlRef.current.scrollLeft = scrollLeft - walk;
                    },
                    false,
                    `skills_ul_ref_mousemove`,
                    { passive: false },
                );

                EventListener.addEventListener(
                    window,
                    'mouseup',
                    () => {
                        EventListener.removeAllListeners(`skills_ul_ref_mousemove`);
                    },
                    true,
                    `skills_ul_ref_mousemove`
                );
                EventListener.addEventListener(
                    window,
                    'blur',
                    () => {
                        EventListener.removeAllListeners(`skills_ul_ref_mousemove`);
                    },
                    true,
                    `skills_ul_ref_mousemove`
                );
            },
            false,
            `skills_ul_ref`
        );
    }

    useEffect(() => {

        loadData<AboutMeData>(DataType.ABOUTME).then((res) => {
            setAboutMeData(res);
        });

        loadData<SkillsData>(DataType.SKILLS).then((res) => {
            setSkillData(res);
            addEventListeners();
            onScrollLeftChange();
            calcNumBoxes();
        });

        return (() => {
            EventListener.removeAllListeners('skills_ul_ref_mousemove');
            EventListener.removeAllListeners('skills_ul_ref');
        })
    }, []);

    const terminate = () => {
        console.log("AboutMe: terminated");
    };

    const build = (): ReactNode => {
        return(
            <div id="about_me" className="about_me">
                <div className="about_me_title">
                    <span className="header2">
                        {about_me_data?.title}
                    </span>
                </div>
                <div className="about_me_description">
                    <span className="description1">
                        {about_me_data?.description}
                    </span>
                </div>
                <div className="about_me_content">
                    <div className="about_me_personal_professional">
                       <div className="about_me_personal_container">
                            <div className="about_me_additional_title">
                                <span className="header3">
                                    {about_me_data?.personal.title}
                                </span>
                            </div>
                            <div className="about_me_personal_professional_description">
                                <span className="description2">
                                    {about_me_data?.personal.description}
                                </span>
                            </div>
                            <div className="about_me_personal_professional_panels">
                                {about_me_data?.personal.characteristics_list.map((data, index) => (
                                    <PersonalPanel 
                                        key={index}
                                        icon={data.image}
                                        text={data.text}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="about_me_personal_container">
                            <div className="about_me_additional_title">
                                <span className="header3">
                                    {about_me_data?.professional.title}
                                </span>
                            </div>
                            <div className="about_me_personal_professional_description">
                                <span className="description2">
                                    {about_me_data?.professional.description}
                                </span>
                            </div>
                            <div className="about_me_personal_professional_panels">
                                {about_me_data?.professional.characteristics_list.map((data, index) => (
                                    <PersonalPanel 
                                        key={index}
                                        icon={data.image}
                                        text={data.text}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="about_me_skills">
                        <div className="about_me_skills_title">
                            <span className="header3">
                                {skill_data?.title}
                            </span>
                        </div>
                        <div className="about_me_skills_description">
                            <span className="description2">
                                {skill_data?.description}
                            </span>
                        </div>
                        <ul ref={skillsUlRef} className="about_me_skills_container">
                            {skill_data?.skill_list.map((data, index) => (
                                <SkillItem 
                                    key={index}
                                    title={data.title}
                                    description={data.description}
                                    level={data.level}
                                />
                            ))};
                        </ul>
                        <div className="skills_custom_scroll_bar">
                            {Array.from({ length: numBoxes }).map((_, i) => (
                                <div
                                key={i}
                                id={`skills_custom_box_${i}`}
                                onClick={() => onClickBox?.(i)}
                                className="skills_custom_box"
                                />
                            ))}
                        </div>
                    </div>
                </div>
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
