export async function createProject<T>(formData: FormData, id?: number | null):Promise<T> {

     const image = formData.get('image');
    if (image instanceof File) {
        formData.append('image', image);
    }
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const categorie = formData.get('categorie') as string;
    const labels = formData.get('labels');
    const features = formData.get('features)');
    const links = formData.get('links)');
    
    const response = await fetch(
        document.location.hostname == "127.0.0.1"
        ? `http://${document.location.hostname}:7750/project_list?language=${1}`
        : `http://${document.location.hostname}/api/project_list?language=${1}`,
        {
            method: id ? 'PUT' : 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: formData
        }
    )
    console.log(`http://${document.location.hostname}:7750/project_list?language=${1}`);
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