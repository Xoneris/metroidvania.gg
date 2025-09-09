export default function HeaderDateDisplay () {

    const date = new Date()
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentDay = days[date.getDay()]
    const currentMonth = months[date.getMonth()]
    const currentHour = date.getHours()
    const currentMinute = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes()

    return (
        <p className="hidden sm:flex gap-1">
            <span>{currentDay}</span>-
            <span>{currentMonth}</span>
            <span>{date.getDate()}</span>-
            <span>{currentHour + ":" + currentMinute}</span>
        </p>
    )
}