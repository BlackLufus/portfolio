import { LanguageCode } from "@/global/languageSubscriber";

export enum DataType {
    GENERAL = "general.json",
    OVERVIEW = "overview.json",
    SKILLS = "skills.json",
    ABOUTME = "aboutme.json",
    PROJECTASSET = "projects.json",
    PROJECTS = "project_list",
    EDUCATION = "education.json",
    CONTACT = "contact.json",
    NEURALNETWORK = "nn_number_detector_0001.json"
}

export default async function loadData<T>(dataType: DataType, code: LanguageCode = LanguageCode.DE):Promise<T> {
    const response = await fetch(
        `${document.location.origin}/data/${code.valueOf()}/${dataType.valueOf()}`,
        {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        }
    )
    // console.log(`${document.location.origin}/data/${lang}/${dataType.valueOf()}`);
    if (response.status === 401) {
        alert("No data found!");
    }
    const result = await response.json()
    // console.log(result)
    return result;
}