import IconSvg from "@/widgets/icon_svg";

export interface SkillCardData {
    title: string;
    logo: string;
    description: string;
    level_text: string;
    percent: number
}

interface SkillCardProps {
    title: string;
    logo: string;
    description: string;
    level_text: string;
    percent: number;
}

export default function SkillCard({title, logo, description, level_text, percent}:SkillCardProps) {
    return (
        <li className="skill_card">
            <div className="skill_card_content">
                <div className="skill_card_header">
                    <IconSvg src={logo} className="skill_card_logo" />
                    <h5>
                        {title}
                    </h5>
                </div>
                <span className="skill_card_description">
                    {description}
                </span>
                <div className="skill_card_progress_container">
                    <div className="skill_card_progress_description">
                        <span className="skill_card_label_text">
                            {level_text}
                        </span>
                        <span className="skill_card_label_text">
                            {percent}%
                        </span>
                    </div>
                    <div className="skill_card_progress" style={{"--fill-width": `${percent}%`} as React.CSSProperties}/>
                </div>
            </div>
        </li>
    )
}