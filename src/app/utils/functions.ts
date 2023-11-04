export function convertByteArrayToBlob(byteArray: Uint8Array, fileType: string): Blob {
    const blob = new Blob([byteArray], { type: fileType});
    return blob;
}