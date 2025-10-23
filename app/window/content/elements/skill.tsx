export enum SkillLevel {
    ANFAENGER = 0,
    FUNDAMENTAL = 1,
    KOMPETENT = 2,
    FORTGESCHRITTEN = 3,
    EXPERTE = 4,
    SPEZIALIST = 5
}

export interface SkillData {
    title: string;
    description: string;
    level: SkillLevel
}

interface SkillItemProps {
    title: string,
    description: string,
    level: SkillLevel
}

export default function SkillItem({title, description, level}:SkillItemProps) {
    return (
        <li className="skill_item">
            <div className="skill_item_border_top" />
            <div className="skill_item_content">
                <div className="skill_item_header_container">
                    <span className="skill_item_header">
                        {title}
                    </span>
                </div>
                <div className="skill_item_description_container">
                    <span className="skill_item_description">
                        {description}
                    </span>
                </div>
                <div className="skill_item_label_container">
                    <div className="skill_item_label_description">
                        <span className="skill_item_label_text">
                            Kompetenzlevel
                        </span>
                        <span className="skill_item_label_text">
                            {level}
                        </span>
                    </div>
                    <div className="skill_item_progress">

                    </div>
                </div>
            </div>
        </li>
    )
}