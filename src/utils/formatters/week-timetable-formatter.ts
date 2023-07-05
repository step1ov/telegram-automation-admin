import weekdaysShort from "@/data/date/weekdays-short";

const WeekTimetableFormatter = (days: number[]): string =>
{
    if (!days) return 'Нет дней';
    if (days.length === 7) return 'Все дни';
    let res = weekdaysShort[days[0]];
    let interval = false;
    for (let i = 1; i < days.length; i++) {
        const pre = days[i - 1];
        const curr = days[i];
        if (pre !== curr - 1) {
            if (interval) {
                res += ` - ${weekdaysShort[pre]}`
                interval = false;
            }
            res += `, ${weekdaysShort[curr]}`;
        } else {
            interval = true
        }
    }
    if (interval) {
        res += ` - ${weekdaysShort[days[days.length - 1]]}`
    }
    return res;
};

export default WeekTimetableFormatter;
