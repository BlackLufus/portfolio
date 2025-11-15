import { ReactNode, useRef, useState } from "react";
import NumberDetector from "../neuralnetwork/numberdetector";
import CustomScrollBar from "@/widgets/customScrollBar";
import LightBoxOverlay from "./project.gallery.overlay";

export enum  TestProgramm {
    NUMBERDETECTOR = 0
}

interface LinkData {
    title: string;
    link: string;
}

export interface GalleryData {
    url: string;
    description: string;
}

export interface ProjectDetailsProbs {
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

export default function ProjectDetails({ title, categorie, image, overview_title, overview_content, features_title, features_list, details_title, categorie_title, technologies_title, links_title, return_to_overview, label_list, link_list, gallery_title, gallery, onClose, demo_programm }: ProjectDetailsProbs) {

    const galleryContentRef = useRef<HTMLUListElement>(null);

    const [openImageIndex, setOpenImage] = useState<number>(-1);

    const [isDragging, setIsDragging] = useState(false);;

    const onOpenImage = (index: number) => {
        if (isDragging) return;
        setOpenImage(index);
    }

    const onCloseImage = () => {
        setOpenImage(-1);
    }

    const getDemoProgramm = (dempProgramm?: TestProgramm): ReactNode => {
        switch(dempProgramm) {
            case TestProgramm.NUMBERDETECTOR: return <NumberDetector />
            default: return null
        }
    }

    return(
        <div className="project_info">
            <div className="project_info_close_wrapper">
                <div 
                    className="project_info_close_container"
                    onClick={() => {
                        onClose(-1);
                    }}
                >
                    <span className="project_info_close">
                        &#10229;	 {return_to_overview}
                    </span>
                </div>
            </div>
            <div className="project_info_wrapper">
                <div className="project_info_header">
                    <img className="project_info_image" src={image} alt="" />
                    <div className="project_info_header_content">
                        <div className="project_info_title_container">
                            <span className="project_info_title">
                                {title}
                            </span>
                        </div>
                        <div className="project_info_label_list_container">
                            {label_list.map((label, index) => (
                                <div 
                                key={index}
                                    className="project_info_label_container">
                                    <span 
                                        className="project_info_label"
                                    >
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="project_content_wrapper">
                    {
                        (gallery && gallery.length > 0)
                        ? <div className="project_gallery_wrapper">
                            <div>
                                <span className="project_gallery_title">
                                    {gallery_title}
                                </span>
                            </div>
                            <ul ref={galleryContentRef} className="project_gallery_content">
                                {
                                    gallery.map((image, index) => (
                                        <li 
                                            className="project_gallery_image_container"
                                            key={index}>
                                            <img 
                                                className="project_gallery_image"
                                                onClick={() => onOpenImage(index)}
                                                src={image.url}
                                                alt=""
                                            />
                                        </li>
                                    ))
                                }
                            </ul>
                            <CustomScrollBar 
                                wrapperRef={galleryContentRef}
                                setIsDragging={setIsDragging} />
                            {
                                (openImageIndex != -1)
                                ? <LightBoxOverlay 
                                    gallery={gallery} 
                                    start={openImageIndex}
                                    onClose={onCloseImage}
                                />
                                : null
                            }
                        </div>
                        : null
                    }
                    <div className="project_info_content">
                        <div className="project_info_content_left">
                            <div>
                                <div>
                                    <span className="project_info_overview_title">
                                        {overview_title}
                                    </span>
                                </div>
                                <div className="project_info_overview_content">
                                    <span className="project_info_overview">
                                        {overview_content}
                                    </span>
                                </div>
                            </div>
                            {
                                features_title && features_list && features_list.length > 0
                                ? <div>
                                    <div className="project_info_features_title_container">
                                        <span className="project_info_features_title">
                                            {features_title}
                                        </span>
                                    </div>
                                    <div className="project_info_features_wrapper">
                                        {features_list.map((feature, index) => (
                                            <div 
                                                key={index}
                                                className="project_info_features_content">
                                                <span 
                                                    className="project_info_features"
                                                >
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                : null
                            }
                        </div>
                        <div className="project_info_content_right">
                            <div className="project_info_details_title_container">
                                <span className="project_info_details_title">
                                    {details_title}
                                </span>
                            </div>
                            <div className="project_info_categorie_title_container">
                                <span className="project_info_categorie_title">
                                    {categorie_title.toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <span className="project_info_categorie">
                                    {categorie}
                                </span>
                            </div>
                            <div className="project_info_technologies_container">
                                <span className="project_info_technologies">
                                    {technologies_title.toUpperCase()}
                                </span>
                            </div>
                            <div className="project_info_label_list_container">
                                {label_list.map((label, index) => (
                                    <div 
                                        key={index}
                                        className="project_info_label_container">
                                        <span 
                                            className="project_info_label"
                                        >
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {
                                links_title && link_list && link_list.length > 0
                                ? <div className="project_info_projekt_links_title_container">
                                    <span className="project_info_project_title_links">
                                        {links_title.toUpperCase()}
                                    </span>
                                </div>
                                : null
                            }
                            {
                                links_title && link_list && link_list.length > 0
                                ? <div className="project_info_project_link_button_container">
                                    {link_list.map(((link, index) => (
                                        <div
                                            key={index}
                                            className="project_info_project_link_button"
                                        >
                                            <a 
                                                className="project_info_project_link_href"
                                                href={link.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span className="project_info_project_link_href_text">
                                                    &#128279; {link.title}
                                                </span>
                                            </a> 
                                        </div>
                                    )))}
                                </div>
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