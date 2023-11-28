export function base64ToBlob(b64Data, contentType = '', sliceSize = 512) {
    b64Data = b64Data.replace(/\s/g, ''); // IE compatibility...
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
}

export function downloadFile(fileData: any) {
    if (fileData.content) {
        const blob = base64ToBlob(fileData.content);
        const url = window.URL.createObjectURL(blob);
        const fileName = `${fileData.nome}.${fileData.estensione}`;

        if (window.navigator && window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(blob, fileName);
        } else {
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        }
    }
}

export function downloadFromBlob(blob) {
    const url = window.URL.createObjectURL(blob);
    if (window.navigator && window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob);
    } else {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download;
        a.click();
        a.remove();
    }
}
