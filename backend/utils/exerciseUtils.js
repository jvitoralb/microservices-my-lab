const convertDate = (date) => {
    const [year, month, day] = date.split('-');
    let dateString = new Date(year, month - 1, day);
    return dateString.toDateString();
}


export default convertDate;