"use client";
import Frame from "../frame";
import { ReactNode, useEffect, useState } from "react";
import loadData, { DataType } from "@/services/load_data";
import Loading from "@/widgets/loader";
import LanguageManager, { LanguageCode } from "@/global/languageSubscriber";

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
    const [languageCode, setLanguageCode] = useState<LanguageCode>(LanguageManager.code);

    const handleLanguageChange = (code: LanguageCode) => {
        setLanguageCode(code);
    }

    useEffect(() => {
        loadData<AboutMeData>(DataType.ABOUTME, languageCode).then((res) => {
            setAboutMeData(res);
        });
        LanguageManager.subscribe(handleLanguageChange);
    
        return () => {LanguageManager.unsubscribe(handleLanguageChange)};
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
            <section id="about_me">
                <div className="container">
                    <div className="wrapper">
                        <div className="about_me_photo">
                            <img className="profile_photo" src="images/data/portrait.png" alt="" />
                        </div>
                        <div>
                            <h3>
                                {data?.title}
                            </h3>
                            <p>
                                {data?.description}
                            </p>
                            <h5>
                                {data.personal.title}
                            </h5>
                            <div className="about_me_characteristics_grid">
                                {data.personal.characteristics_list.map((characteristic, index) => (
                                    <span
                                        key={index}
                                        className="about_me_characteristic">
                                            {characteristic.text}
                                    </span>
                                ))}
                            </div>
                            <h5>
                                {data.professional.title}
                            </h5>
                            <div className="about_me_characteristics_grid">
                                {data.professional.characteristics_list.map((characteristic, index) => (
                                    <span
                                        key={index}
                                        className="about_me_characteristic">
                                            {characteristic.data} {characteristic.text}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
