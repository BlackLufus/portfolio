import { Url } from "next/dist/shared/lib/router/router";

type ProjectProps = {
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

export default function Project({ title, description, labels, links }: ProjectProps) {
    return (
        <div className="project">
            <div className="project_image">
                <img src="images/image.png" alt="test" />
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
        </div>
    );
}
