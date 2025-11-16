export async function sendContactMessage<T>(formData: FormData, id?: number | null):Promise<T> {

    const response = await fetch(
        document.location.hostname == "127.0.0.1" || document.location.hostname == "localhost"
        ? `${document.location.protocol}//${document.location.hostname}:7750/contact`
        : `${document.location.protocol}//${document.location.hostname}/api/contact`,
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
    if (response.status === 404) {
        alert("No data found!");
    }
    const result = await response.json();
    return result
}