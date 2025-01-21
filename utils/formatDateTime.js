export function formatDateTime(isoString) {
    const date = new Date(isoString);

    date.setUTCHours(date.getUTCHours() + 3);

    const padZero = (num) => num.toString().padStart(2, '0');

    const day = padZero(date.getUTCDate());
    const month = padZero(date.getUTCMonth() + 1); 
    const year = date.getUTCFullYear();

    const hours = padZero(date.getUTCHours());
    const minutes = padZero(date.getUTCMinutes());
    const seconds = padZero(date.getUTCSeconds());

    return {
        date: `${day}.${month}.${year}`,
        time: `${hours}:${minutes}:${seconds}`
    };
}