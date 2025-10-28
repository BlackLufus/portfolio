import IconSvg from "@/widgets/icon_svg";

interface FooterProbs {
    firstname: string;
    lastname: string;
    year: string;
    linkTitle: string;
    allRightsReserved: string;
    githubLink: string;
    linkedInLink: string;
    version: string;
} 

export default function Footer({firstname, lastname, year, allRightsReserved, linkTitle, githubLink, linkedInLink}: FooterProbs) {
    return(
        <div className="footer">
            <div className="footer_left">
                <div>
                    <span className="footer_name">
                        {firstname} {lastname}
                    </span>
                </div>
                <div>
                    <span className="footer_copyright">
                        {year} &copy; {allRightsReserved}
                    </span>
                </div>
            </div>
            <div className="footer_right">
                <div className="footer_title_container">
                    <span className="footer_title">
                        {linkTitle}
                    </span>
                </div>
                <div className="footer_links">
                    <a className="footer_link_href" href={githubLink}>
                    <IconSvg
                        src="svg/github.svg"
                        className="footer_link_icon"
                        />
                    </a>
                    <a className="footer_link_href" href={linkedInLink}>
                    <IconSvg 
                        src="svg/linkedin.svg"
                        className="footer_link_icon"
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}