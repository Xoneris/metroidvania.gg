export const replaceMonthWithName = (release_date:string) => {
    const release_with_month = new Date(release_date)
    return release_with_month.toLocaleString(
        'en-GB', {
        year: "numeric",
        month: "long", 
        day: "numeric",
    });
}