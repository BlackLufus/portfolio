
export enum DataType {
    GENERAL = "general.json",
    OVERVIEW = "overview.json",
    SKILLS = "skills.json",
    ABOUTME = "aboutme.json",
    PROJECTS = "projects.json",
    EDUCATION = "education.json",
    CONTACT = "contact.json"
}

export default async function loadData<T>(dataType: DataType):Promise<T> {
    const lang = "de";
    const response = await fetch(
        `${document.location.origin}/data/${lang}/${dataType.valueOf()}`,
    )
    console.log(`${document.location.origin}/data/${lang}/${dataType.valueOf()}`);
    if (response.status === 401) {
        alert("No data found!");
    }
    const result = await response.json()
    console.log(result)
    return result;
}