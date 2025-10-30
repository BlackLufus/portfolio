"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Frame from "../frame";
import loadData, { DataType } from "@/services/load_data";
import Loading from "@/widgets/loader";
import ProjectInfo from "./project.details";
import ProjectCard, { ProjectData } from "./project.card";

interface ProjectInfoData {
    button_title: string;
    overview_title: string;
    features_title: string;
    project_details_title: string;
    project_categorie_title: string;
    project_technologies_title: string;
    project_links_title: string;
    project_return_to_overview: string;
}

export interface ProjectsData {
  title: string;
  description: string;
  project_info: ProjectInfoData;
  project_list: ProjectData[];
}

export interface ProjectConfig {
    title: string;
    icon: string;
}

interface ProjectProps {
    config?: ProjectConfig
}

export default function Project({config}: ProjectProps) {

    const [data, setData] = useState<ProjectsData | null>(null);
    const [selectedProject, setSelectedProject] = useState<number>(-1);

    useEffect(() => {
        loadData<ProjectsData>(DataType.PROJECTS).then((res) => {
            setData(res);
        });
    }, []);

    const terminate = () => {
        console.log("Projects: terminated");
    };

    const openProject = (index: number) => {
        console.log(`Open Project (id: ${index})`)
        setSelectedProject(index);
    }

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
            <div id="projects" className={`projects ${!config ? "" : "projects_with_scrollbar"}`}>
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
                {
                    (selectedProject >= 0 && data.project_list.length)
                    ? <ProjectInfo
                        title={data.project_list[selectedProject].title}
                        image={data.project_list[selectedProject].image}
                        categorie={data.project_list[selectedProject].categorie}
                        overview_title={data.project_info.overview_title}
                        overview_content={data.project_list[selectedProject].description}
                        features_title={data.project_info.features_title}
                        features_list={data.project_list[selectedProject].features}
                        details_title={data.project_info.project_details_title}
                        categorie_title={data.project_info.project_categorie_title}
                        technologies_title={data.project_info.project_technologies_title}
                        links_title={data.project_info.project_links_title}
                        return_to_overview={data.project_info.project_return_to_overview}
                        label_list={data.project_list[selectedProject].labels}
                        link_list={data.project_list[selectedProject].links}
                        onClose={openProject}
                        test_programm={data.project_list[selectedProject].test_programm}
                    />
                    : <ul className="project_unsorted_list">
                        {data.project_list.map((projectData, index) => (
                            <ProjectCard
                                key={index}
                                index={index}
                                image={projectData.image}
                                title={projectData.title}
                                description={projectData.description}
                                labels={projectData.labels}
                                button_title={data.project_info.button_title}
                                onClick={openProject}
                            />
                        ))}
                    </ul>
                }
            </div>
        );
    }

    return (
        !config ? build() : (
            <Frame
                title={config?.title}
                icon_url={config?.icon}
                onClose={terminate}
            >
                {build()}
            </Frame>
        )
    );
}