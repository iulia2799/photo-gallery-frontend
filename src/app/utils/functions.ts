import * as base64 from 'base64-js';
export function convertByteArrayToBlob(byteArray: Uint8Array, fileType: string): Blob {
    const blob = new Blob([byteArray], { type: fileType});
    return blob;
}

export function decodeAndDisplayImage(value: string): string {
    // Decode the base64 string
    const decodedBytes = base64.toByteArray(value);
  
    // Create a Blob from the decoded bytes
    const blob = new Blob([decodedBytes], { type: 'image/jpeg' }); // Adjust the type based on your image format
  
    // Create a data URL from the Blob
    const imageUrl = URL.createObjectURL(blob);
  
    return imageUrl;
  }