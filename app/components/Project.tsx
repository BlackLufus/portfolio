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
    labels: Array<string>;
    links: LinkData[];
}

interface ProjectProps {
  image: string;
  title: string;
  description: string;
  labels: string[];
  links: LinkData[];
};

export default function Project({ image, title, description, labels, links }: ProjectProps) {
    return (
        <li className="project_list_item">
            <div className="project_image_container">
                <img className="project_image" src={image} alt="" />
            </div>
            <div className="project_title_container">
                <span className="project_title">
                    {title}
                </span>
            </div>
            <div className="project_description_container">
                <span className="project_description">
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
            <div className="project_links">
                {links.map((link, index) => (
                    <a key={index} href={link.link} target="_blank" rel="noopener noreferrer">{link.title}</a>
                ))}
            </div>
        </li>
    );
}
