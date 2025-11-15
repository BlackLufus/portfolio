import Image from "next/image";

export interface EducationData {
    image: string;
    degree: string;
    period: string;
    institution: string;
    summary: string;
    additionalInfo?: string;
}

interface EducationCardProps {
    data: EducationData,
    class_name?: string;
}

export default function EducationCard({data, class_name}:EducationCardProps) {
    return (
        <div className={`education_panel ${class_name}`}>
            <div className="education_panel_border_top" />
            <div className="education_panel_wraper">
                <div className="education_panel_degree_and_period">
                <div>
                    <span className="education_degree">
                        {data.degree}
                    </span>
                </div>
                <div className="education_period_container">
                    <span className="education_period">
                        {data.period}
                    </span>
                </div>
            </div>
            <div className="education_panel_institution">
                <div className="education_institution_image">
                    <Image src={data.image} alt="" />
                </div>
                <div>
                    <span className="education_institution">
                        {data.institution}
                    </span>
                </div>
            </div>
            <div className="education_summary_container">
                <span className="education_summary">
                    {data.summary}
                </span>
            </div>
            {data.additionalInfo
                ? <div className="education_additional_info_container">
                    <span className="education_additional_info">
                        {data.additionalInfo}
                    </span>
                </div>
                : null
            }
            </div>
        </div>
    )
}