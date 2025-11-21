"use client";
import loadData, { DataType } from "@/services/load_data";
import Frame from "./frame";
import { ReactNode, useEffect, useState } from "react";
import Loading from "@/widgets/loader";
import LanguageNotifier, { LanguageCode } from "@/global/languageSubscriber";

interface OverviewData {
    title: string;
    description: string;
    project_button: string;
    contact_button: string;
}

export interface OverviewConfig {
    title: string;
    icon: string;
}

interface OverviewProps {
    firstname: string;
    lastname: string;
    config?: OverviewConfig
}

export default function Overview({firstname, lastname, config}: OverviewProps) {

    const [data, setData] = useState<OverviewData | null>(null);
    const [languageCode, setLanguageCode] = useState<LanguageCode>(LanguageNotifier.code);

    const handleLanguageChange = (code: LanguageCode) => {
        setLanguageCode(code);
    }
    
    useEffect(() => {
        loadData<OverviewData>(DataType.OVERVIEW, languageCode).then((res) => {
            setData(res);
        });
        LanguageNotifier.subscribe(handleLanguageChange);

        return () => {LanguageNotifier.unsubscribe(handleLanguageChange)};
    }, [languageCode]);

    const terminate = () => {
        console.log("General: terminated");
    };

    const build = (): ReactNode => {
        if (!data) return(
            <Loading
                width="50px"
                height="50px"
                justify_content="center"
                text="Data is loading ..."
            />
        )
        return(
            <section id="overview">
                <div className="container">
                    <h1>
                        {firstname} {lastname}
                    </h1>
                    <p className="tagline">
                        &bull;{data.title}&bull;
                    </p>
                    <p className="description">
                        {data.description}
                    </p>
                    <div className="btn_wrapper">
                        <a href="#projects" className="btw primary_button">{data.project_button}</a>
                        <a href="#contact" className="btw secondary_button">{data.contact_button}</a>
                    </div>
                </div>
            </section>
        );
    }

    return(
        !config ? build() : (
            <Frame
                title={config?.title}
                icon_url={config?.icon}
                onClose={terminate}
            >
                {build()}
            </Frame>
        )
    )
}
