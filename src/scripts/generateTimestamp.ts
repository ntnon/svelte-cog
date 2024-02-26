import timestamps from '$lib/timestamps.json';

export const generateTimestamp = () => {
    const randomIndex = Math.floor(Math.random() * timestamps.length);
    return timestamps[randomIndex];
};