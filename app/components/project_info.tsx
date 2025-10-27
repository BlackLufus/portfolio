interface LinkData {
    title: string;
    link: string;
}

export interface ProjectInfoProbs {
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
    onClose: (index: number) => void;
}

export default function ProjectInfo({ title, categorie, image, overview_title, overview_content, features_title, features_list, details_title, categorie_title, technologies_title, links_title, return_to_overview, label_list, link_list, onClose }: ProjectInfoProbs) {
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
                        &lt;&minus; {return_to_overview}
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
                        <div>
                            <div className="project_info_features_title_container">
                                <span className="project_info_features_title">
                                    {features_title}
                                </span>
                            </div>
                            <div className="project_info_features_content">
                                {features_list.map((feature, index) => (
                                    <span 
                                        key={index}
                                        className="project_info_features_content"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
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
                        <div className="project_info_projekt_links_title_container">
                            <span className="project_info_project_title_links">
                                {links_title.toUpperCase()}
                            </span>
                        </div>
                        <div className="project_info_project_link_button_container">
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
                                            {link.title}
                                        </span>
                                    </a> 
                                </div>
                            )))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}