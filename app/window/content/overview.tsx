"use client";
import loadData, { DataType } from "@/load_data";
import Frame from "../frame";
import { ReactNode, useEffect, useState } from "react";

interface OverviewData {
    title: string;
    description: string;
    project_button: string;
    contact_button: string;
}

interface OverviewProps {
    title: string,
    icon_url: string,
    raw?: boolean
}

export default function Overview({title, icon_url, raw=false}: OverviewProps) {

    const [data, setData] = useState<OverviewData | null>(null);
    
    useEffect(() => {
        loadData<OverviewData>(DataType.OVERVIEW).then((res) => {
            setData(res);
        });
    }, []);

    const terminate = () => {
        console.log("General: terminated");
    };

    const build = (): ReactNode => {
        if (!data) return(
            <div>
                No data available
            </div>
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
                    <img className="overview_image" src="images/squirrel.png" alt="" />
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
