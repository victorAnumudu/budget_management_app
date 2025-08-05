function getDateFromDateString(dateString) {
    const date = new Date(dateString);
    
    // Ensure the date is valid
    if (isNaN(date)) {
        return "Invalid date string";
    }

    // Get the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed, so we add 1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export default getDateFromDateString