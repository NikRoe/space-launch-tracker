import {formatDate} from "../util/formatDate.ts";
import type {LaunchBadgeProps} from "../types.ts";

export default function LaunchBadge({provider, date}: LaunchBadgeProps) {
    const {minutes, hours, day, month, year} = formatDate(date);

    const dateText = `Der Launch erfolgte am ${day}.${month}.${year} um ${hours}:${minutes} Uhr`;
    return (
        <>
            <p>Provider: {provider}</p>
            <time>{dateText}</time>
        </>
    )
}

