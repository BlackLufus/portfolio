import path from "path";
import { GalleryData } from "./project.details.gallery";

interface LinkData {
    title: string;
    link: string;
}

export interface LinksListData {
    link_list: LinkData[];
}

export interface ProjectData {
    id: string;
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
    id: string;
    index: number;
    image: string;
    title: string;
    description: string;
    labels: string[];
    button_title: string;
    onClick: (index: number) => void;
};

export default function ProjectCard({ id, index, image, title, description, labels, button_title, onClick }: ProjectCardProps) {
    const delay = `${(index * 0.075)}s`;

    const onAuxClixk = () => {
        const url = new URL(path.join(window.location.origin, `#${id}`));
        url.searchParams.set("project_id", index.toString());
        window.open(url.toString(), '_blank');
    }

    return (
        <div className="project_card" style={{"--delay": delay} as React.CSSProperties}>
            <a 
                className="project_image_link" 
                href={`#${id}`}
                onAuxClick={onAuxClixk}
                onClick={() => {
                    onClick(index);
                }}>
                <img className="project_image" src={image} alt="" />
            </a>
            <a 
                className="project_title_link"
                href={`#${id}`}>
                <h5 
                    className="project_title"
                    onAuxClick={onAuxClixk}
                    onClick={() => {
                            onClick(index);
                }}>
                    {title}
                </h5>
            </a>
            <p className="project_card_description">
                {description}
            </p>
            <div className="project_labels_container">
                {labels.map((label, index) => (
                    <span key={index} className="project_label">
                        {label}
                    </span>
                ))}
            </div>
            <a 
                className="project_action_link" 
                href={`#${id}`}
                onAuxClick={onAuxClixk}
                onClick={() => {
                    onClick(index);
                }}>
                <span className="project_action">
                    {button_title}
                </span>
            </a>
        </div>
    );
}
