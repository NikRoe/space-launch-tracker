import type {LaunchListProps} from "../types.ts";
import LaunchCard from "./LaunchCard.tsx";

export default function LaunchList({launches, favoriteIds, onToggleFavorite}: LaunchListProps) {
    return (
        <ul>
            {launches.map((launch) => (
                <li key={launch.id} style={{border: "3px solid lightgrey", padding: "1rem"}}>
                    <LaunchCard launch={launch}
                                isFavorite={favoriteIds.some((favoriteId) => favoriteId === launch.id)}
                                onToggleFavorite={onToggleFavorite}
                    />
                </li>
            ))}
        </ul>
    )
}

