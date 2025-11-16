export async function getProjectList<T>():Promise<T> {
    const lang = 1;
    const response = await fetch(
        document.location.hostname == "127.0.0.1"
        ? `http://${document.location.hostname}:7750/project_list?language=${lang}`
        : `http://${document.location.hostname}/api/project_list?language=${lang}`,
    )
    console.log(`http://${document.location.hostname}:7750/project_list?language=${lang}`);
    if (response.status === 404) {
        alert("No data found!");
    }
    let result = await response.json();

    console.log(result)
    if (result['succeed']) {
        return result['response']
    }
    result = null;
    return result
}