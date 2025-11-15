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
    config?: OverviewConfig
}

export default function Overview({config}: OverviewProps) {

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
            <div id="overview" className="overview">
                <div className="overview_information">
                    <div className="overview_header">
                        <span className="header1">
                            {data.title}
                        </span>
                    </div>
                    <div className="overview_description">
                        <span className="description1">
                            {data.description}
                        </span>
                    </div>
                    <div className="overview_buttons">
                        <div className="overview_button overview_button_my_project">
                            <a href="#projects">{data.project_button}</a>
                        </div>
                        <div className="overview_button overview_button_contact">
                            <a href="#contact">{data.contact_button}</a>
                        </div>
                    </div>
                </div>
                <div className="overview_image_container">
                    <img className="overview_image" src="images/data/portrait.png" alt="" />
                </div>
            </div>
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
