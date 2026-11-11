import type {FormatDate} from "../types.ts";

export function formatDate(date: string): FormatDate {
    const minutes = new Date(date).getMinutes();
    const hours = new Date(date).getHours();
    const day = new Date(date).getDay();
    const month = new Date(date).getMonth()
    const year = new Date(date).getFullYear();

    return {minutes, hours, day, month, year};
}