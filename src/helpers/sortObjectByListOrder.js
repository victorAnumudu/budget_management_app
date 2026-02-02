const sortObjectByListOrder = (data={}) => {
    const sortedEntriesByValue = Object.entries(data).sort((a, b) => {
        if(a[1].list_order > b[1].list_order){
            return 1
        }else{
            return -1
        }
    }); // Sorts numerically by value

    const sortedObjectByValue = Object.fromEntries(sortedEntriesByValue);
    return sortedObjectByValue
}

export default sortObjectByListOrder