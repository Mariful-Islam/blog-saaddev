export const TimeFormat = (isoTimeStr: string) => {
    const date = new Date(isoTimeStr);

    const formattedDate = date.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
    // const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const readableTimeStr = `${formattedDate}`;
    return readableTimeStr;
}
