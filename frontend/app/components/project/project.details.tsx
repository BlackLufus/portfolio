import { ReactNode } from "react";
import NumberDetector from "../neuralnetwork/numberdetector";
import ProjectDetailsGallery, { GalleryData } from "./project.details.gallery";

export enum  TestProgramm {
    NUMBERDETECTOR = 0
}

interface LinkData {
    title: string;
    link: string;
}

export interface ProjectDetailsProbs {
    id: string;
    title: string;
    categorie: string;
    image: string;
    overview_title: string;
    overview_content: string;
    features_title: string;
    features_list: Array<string>;
    details_title: string;
    categorie_title: string;
    technologies_title: string;
    links_title: string;
    return_to_overview: string;
    label_list: Array<string>;
    link_list: LinkData[];
    gallery_title: string;
    gallery: Array<GalleryData>;
    onClose: (index: number) => void;
    demo_programm?: TestProgramm;
}

export default function ProjectDetails({ id, title, categorie, image, overview_title, overview_content, features_title, features_list, details_title, categorie_title, technologies_title, links_title, return_to_overview, label_list, link_list, gallery_title, gallery, onClose, demo_programm }: ProjectDetailsProbs) {

    const getDemoProgramm = (dempProgramm?: TestProgramm): ReactNode => {
        switch(dempProgramm) {
            case TestProgramm.NUMBERDETECTOR: return <NumberDetector />
            default: return null
        }
    }

    return(
        <div id={id} className="project_details">
            <a 
                className="project_details_close_action"
                href="#projects"
                onClick={() => {
                    onClose(-1);
                }}>
                &#10229; {return_to_overview}
            </a>
            <div className="project_details_wrapper">
                <div className="project_details_header">
                    <img className="project_details_image" src={image} alt="" />
                    <div className="project_details_header_content">
                        <h4 className="project_details_title">
                            {title}
                        </h4>
                        <div className="project_details_labels">
                            {label_list.map((label, index) => (
                                <span 
                                    key={index}
                                    className="project_label"
                                    >
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="project_details_content_wrapper">
                    <ProjectDetailsGallery 
                        title={gallery_title}
                        gallery={gallery}
                    />
                    <div className="project_details_content">
                        <div className="project_details_content_left">
                            <h5>
                                {overview_title}
                            </h5>
                            <p className="project_details_description">
                                {overview_content}
                            </p>
                            {
                                features_title && features_list && features_list.length > 0
                                ? <>
                                    <h5>
                                        {features_title}
                                    </h5>
                                    <div className="project_details_features_grid">
                                        {features_list.map((feature, index) => (
                                            <div key={index}>
                                                <span 
                                                    className="project_details_features" >
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                                : null
                            }
                        </div>
                        <div className="project_details_content_right">
                            <h5>
                                {details_title}
                            </h5>
                            <h6 className="project_details_sub_heading">
                                {categorie_title.toUpperCase()}
                            </h6>
                            <span className="project_details_categorie">
                                {categorie}
                            </span>
                            <h6 className="project_details_sub_heading">
                                {technologies_title.toUpperCase()}
                            </h6>
                            <div className="project_details_labels">
                                {label_list.map((label, index) => (
                                    <span 
                                        key={index}
                                        className="project_label"
                                    >
                                        {label}
                                    </span>
                                ))}
                            </div>
                            {
                                links_title && link_list && link_list.length > 0
                                ? <>
                                    <h6 className="project_details_sub_heading">
                                        {links_title.toUpperCase()}
                                    </h6>
                                    <div className="project_links">
                                        {link_list.map((link, index) => (
                                            <a key={index}
                                            className="project_link"
                                            href={link.link}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                                &#128279; {link.title}
                                            </a> 
                                        ))}
                                    </div>
                                </>
                                : null
                            }
                        </div>
                    </div>
                </div>
                {getDemoProgramm(demo_programm)}
            </div>
        </div>
    )
}