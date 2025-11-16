"use client";
import Frame from "../frame";
import { ReactNode, useEffect, useState } from "react";
import Personal from "./aboutme.personal";
import loadData, { DataType } from "@/services/load_data";
import Professional from "./aboutme.professional";
import Loading from "@/widgets/loader";
import Skill from "./aboutme.skill";
import LanguageNotifier, { LanguageCode } from "@/global/languageSubscriber";

interface CharacteristicsData {
    image: string;
    data?: string;
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

export interface AboutMeConfig {
    title: string;
    icon: string;
}

interface AboutMeProps {
    config?: AboutMeConfig
}

export default function AboutMe({config}: AboutMeProps) {

    const [data, setAboutMeData] = useState<AboutMeData | null>(null);
    const [languageCode, setLanguageCode] = useState<LanguageCode>(LanguageNotifier.code);

    const handleLanguageChange = (code: LanguageCode) => {
        setLanguageCode(code);
    }

    useEffect(() => {
        loadData<AboutMeData>(DataType.ABOUTME, languageCode).then((res) => {
            setAboutMeData(res);
        });
        LanguageNotifier.subscribe(handleLanguageChange);
    
        return () => {LanguageNotifier.unsubscribe(handleLanguageChange)};
    }, [languageCode]);

    const terminate = () => {
        console.log("AboutMe: terminated");
    };

    const build = (): ReactNode => {
        if (!data) {
            return(
                <Loading
                    width="50px"
                    height="50px"
                    justify_content="center"
                    text="Data is loading ..."
                />
            )
        }
        return(
            <div id="about_me" className={`about_me ${!config ? "" : "about_me_with_scrollbar"}`}>
                <div className="about_me_title">
                    <span className="header2">
                        {data?.title}
                    </span>
                </div>
                <div className="about_me_description">
                    <span className="description1">
                        {data?.description}
                    </span>
                </div>
                <div className="about_me_content">
                    <div className="about_me_personal_professional">
                       <div className="about_me_personal_container">
                            <div className="about_me_additional_title">
                                <span className="header3">
                                    {data?.personal.title}
                                </span>
                            </div>
                            <div className="about_me_personal_professional_description">
                                <span className="description2">
                                    {data?.personal.description}
                                </span>
                            </div>
                            <div className="about_me_personal_professional_panels">
                                {data?.personal.characteristics_list.map((personalData, index) => (
                                    <Personal 
                                        key={index}
                                        icon={personalData.image}
                                        text={personalData.text}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="about_me_personal_container">
                            <div className="about_me_additional_title">
                                <span className="header3">
                                    {data?.professional.title}
                                </span>
                            </div>
                            <div className="about_me_personal_professional_description">
                                <span className="description2">
                                    {data?.professional.description}
                                </span>
                            </div>
                            <div className="about_me_personal_professional_panels">
                                {data?.professional.characteristics_list.map((professionalData, index) => (
                                    <Professional 
                                        key={index}
                                        data={professionalData.data!}
                                        text={professionalData.text}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    {
                        data
                        ? <Skill />
                        : null
                    }
                </div>
            </div>
        );
    }

    return(
        !config ? build() : (
            <Frame
                title={config.title}
                icon_url={config.icon}
                onClose={terminate}
            >
                { build() }
            </Frame>
        )
    )
}
