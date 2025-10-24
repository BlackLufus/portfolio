export interface SkillData {
    title: string;
    description: string;
    level_text: string;
    percent: number
}

interface SkillItemProps {
    title: string,
    description: string,
    level_text: string;
    percent: number;
}

export default function SkillItem({title, description, level_text, percent}:SkillItemProps) {
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
                            {level_text}
                        </span>
                        <span className="skill_item_label_text">
                            {percent}%
                        </span>
                    </div>
                    <div className="skill_item_progress" style={{"--fill-width": `${percent}%`} as React.CSSProperties}>

                    </div>
                </div>
            </div>
        </li>
    )
}