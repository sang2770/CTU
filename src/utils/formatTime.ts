import dayjs from "dayjs";

export function convertTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const hDisplay = h > 0 ? `${h.toString().padStart(2, '0')}:` : '';
    const mDisplay = `${m.toString().padStart(2, '0')}:`;
    const sDisplay = s.toString().padStart(2, '0');

    return `${hDisplay}${mDisplay}${sDisplay}`;
};

export const convertTimeFromArray = (response: any[]) => {
    return `${response[2]}/${response[1]}/${response[0]}`
}

export const convertTimeFromString = (dateTimeString: string) => {
    const cleanedDateString = dateTimeString?.replace(/\[UTC\]$/, '');
    return dayjs(cleanedDateString).format('HH:mm:ss, DD/MM/YYYY');
}

export const convertTimeStampFromString = (dateTimeString: string) => {
    const cleanedDateString = dateTimeString?.replace(/\[UTC\]$/, '');
    return dayjs(cleanedDateString).valueOf();
}