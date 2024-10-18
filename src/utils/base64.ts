import { useEffect, useState } from "react";

// Convert từ chuỗi sang base64
export function utf8ToBinaryString(str) {
    const utf8Bytes = new TextEncoder().encode(str);
    let binaryString = '';
    utf8Bytes.forEach((byte) => {
        binaryString += String.fromCharCode(byte);
    });
    return binaryString;
};

// Convert từ file sang base64
export function useConvertBase64(file: File | null) {
    const [base64String, setBase64String] = useState('');
    
    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = () => {
                if (reader.result instanceof ArrayBuffer) {
                    const arrayBuffer = reader.result;
                    const uint8Array = new Uint8Array(arrayBuffer);
                    const binaryString = new TextDecoder().decode(uint8Array);
                    const base64 = btoa(utf8ToBinaryString(binaryString));
                    setBase64String(base64);
                }
            };
            reader.onerror = () => {
                console.error('There was a problem reading the file.');
            };
        }
    }, [file]);
    return base64String
}
