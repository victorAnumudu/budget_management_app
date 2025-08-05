function getTimeFromDateString(dateString) {
    const date = new Date(dateString);
    
    // Ensure the date is valid
    if (isNaN(date)) {
        return "Invalid date string";
    }

    // Get hours, minutes, and seconds
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    // const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours <= 12 ? hours : hours%12}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
}

export default getTimeFromDateString
