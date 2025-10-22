type ProjectProps = {
  image: string;
  title: string;
  description: string;
  labels: string[];
  links: Link[];
};

export class Link {
    public readonly title: string;
    public readonly link: string;

    public constructor(title: string, link: string) {
        this.title = title;
        this.link = link
    }
}

export default function Project({ image, title, description, labels, links }: ProjectProps) {
    return (
        <li className="project_list_item">
            <div className="project_image">
                <img src={image} alt="" />
            </div>
            <div className="project_title">
                <h1>{title}</h1>
            </div>
            <div className="project_description">
                <span>{description}</span>
            </div>
            <div className="project_labels">
                {labels.map((label, index) => (
                    <span key={index} className="label">{label}</span>
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
