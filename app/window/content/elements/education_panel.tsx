export class EducationItem {
    public readonly degree: string;
    public readonly period: string;
    public readonly institution: string;
    public readonly summary: string;
    public readonly additionalInfo?: string;
    
    constructor (
        degree: string,
        period: string,
        institution: string,
        summary: string,
        additionalInfo?: string
    ) {
        this.degree = degree;
        this.period = period;
        this.institution = institution;
        this.summary = summary;
        this.additionalInfo = additionalInfo;
    }
}

interface EducationPanelProps {
    item: EducationItem,
    class_name?: string;
}

export default function EducationPanel({item, class_name}:EducationPanelProps) {
    return (
        <div className={`education_panel ${class_name}`}>
            <div className="education_panel_degree_and_period">
                <div className="education_degree">
                    <span>
                        {item.degree}
                    </span>
                </div>
                <div className="education_period">
                    <span>
                        {item.period}
                    </span>
                </div>
            </div>
            <div className="education_panel_institution">
                <div className="education_institution_image">
                    <img src="images/colored/museum.png" alt="" />
                </div>
                <div className="education_institution">
                    <span>
                        {item.institution}
                    </span>
                </div>
            </div>
            <div className="education_summary">
                <span>
                    {item.summary}
                </span>
            </div>
            <div className="education_additionalInfo">
                <span>
                    {item.additionalInfo}
                </span>
            </div>
        </div>
    )
}