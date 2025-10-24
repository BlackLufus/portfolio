"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Frame from "../frame";
import Project, { ProjectData } from "./elements/Project";
import loadData, { DataType } from "@/load_data";

export interface ProjectsData {
  title: string;
  description: string;
  project_list: ProjectData[];
}

interface ProjectsProps {
    title: string;
    icon_url: string;
    raw?: boolean;
}

export default function Projects({title, icon_url, raw = false}: ProjectsProps) {

    const [data, setData] = useState<ProjectsData | null>(null);

    useEffect(() => {
        loadData<ProjectsData>(DataType.PROJECTS).then((res) => {
            setData(res);
        });
    }, []);

    const terminate = () => {
        console.log("Projects: terminated");
    };

    const build = (): ReactNode => {
        if (!data) return (
            <div>
                No data available.
            </div>
        )
        return(
            <div id="projects" className={`projects ${raw ? "" : "projects_with_scrollbar"}`}>
                <div className="projects_title">
                    <span className="header2">
                        {data.title}
                    </span>
                </div>
                <div className="projects_description">
                    <span className="description1">
                        {data.description}
                    </span>
                </div>
                <ul className="project_unsorted_list">
                    {data.project_list.map((projectData, index) => (
                        <Project
                            key={index}
                            image={projectData.image}
                            title={projectData.title}
                            description={projectData.description}
                            labels={projectData.labels}
                            links={projectData.links}
                        />
                    ))}
                </ul>
            </div>
        );
    }

    return (
        raw ? build() : (
            <Frame
                title={title}
                icon_url={icon_url}
                onClose={terminate}
            >
                {build()}
            </Frame>
        )
    );
}