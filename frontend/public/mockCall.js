const clipboard_api = {
    mock: [
        {
            uuid: "31x",
            text: "Esto es un unit test hecha con jest"

        }
    ]
}

export let mockService = () => new Promise(resolve => resolve(clipboard_api), reject => reject());
