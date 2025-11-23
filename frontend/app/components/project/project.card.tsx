import { GalleryData } from "./project.details";

interface LinkData {
    title: string;
    link: string;
}

export interface LinksListData {
    link_list: LinkData[];
}

export interface ProjectData {
    image: string;
    title: string;
    description: string;
    categorie: string;
    labels: Array<string>;
    features: Array<string>;
    links: LinkData[];
    gallery: Array<GalleryData>;
    test_programm?: number;
}

interface ProjectCardProps {
    index: number;
    image: string;
    title: string;
    description: string;
    labels: string[];
    button_title: string;
    onClick: (index: number) => void;
};

export default function ProjectCard({ index, image, title, description, labels, button_title, onClick }: ProjectCardProps) {
    const delay = `${(index * 0.075)}s`;
    return (
        <div className="project_card" style={{"--delay": delay} as React.CSSProperties}>
            <div 
                className="project_image_container" 
                onClick={() => {
                    onClick(index);
            }}>
                <img className="project_image" src={image} alt="" />
            </div>
            <div className="project_title_container">
                <h4 
                    className="third_heading project_title"
                    onClick={() => {
                            onClick(index);
                }}>
                    {title}
                </h4>
            </div>
            <div className="project_description_container">
                <span className="description3 project_description">
                    {description}
                </span>
            </div>
            <div className="project_labels_container">
                {labels.map((label, index) => (
                    <span key={index} className="project_label">
                        {label}
                    </span>
                ))}
            </div>
            <div 
                className="project_action_container" 
                onClick={() => {
                    onClick(index);
                }}>
                <span className="project_action">
                    {button_title}
                </span>
            </div>
        </div>
    );
}
