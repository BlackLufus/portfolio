"use client";
import { useState, useEffect, ReactNode } from "react";
import loadData, { DataType } from "@/services/load_data";
import Loading from "@/widgets/loader";
import Frame from "../frame";
import LanguageNotifier, { LanguageCode } from "@/global/languageSubscriber";

interface ProjectsData {
    title: string;
    description: string;
}

export interface ContactConfig {
    title: string;
    icon: string;
}

interface ContactProps {
    config?: ContactConfig
}

export default function Contact({config}: ContactProps) {

    const [data, setData] = useState<ProjectsData| null>(null);
    const [languageCode, setLanguageCode] = useState<LanguageCode>(LanguageNotifier.code);
    
    const handleLanguageChange = (code: LanguageCode) => {
        setLanguageCode(code);
    }

    useEffect(() => {
        loadData<ProjectsData>(DataType.CONTACT, languageCode).then((res) => {
            setData(res);
        });
        LanguageNotifier.subscribe(handleLanguageChange);

        return () => {LanguageNotifier.unsubscribe(handleLanguageChange)};
    }, [languageCode]);

    const terminate = () => {
        console.log("Contact: terminated");
    };

    const build = (): ReactNode => {
        if (!data) return (
            <Loading
                width="50px"
                height="50px"
                justify_content="center"
                text="Data is loading ..."
            />
        )
        return(
            <div id="contact" className="contact">
                <div className="contact_title">
                    <span className="header2">
                        {data.title}
                    </span>
                </div>
                <div className="contact_description">
                    <span className="description1">
                        {data.description}
                    </span>
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
                {build()}
            </Frame>
        )
    )
}
