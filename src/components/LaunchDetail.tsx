import type {LaunchDetailProps} from "../types.ts";

export default function LaunchDetail({missionDescription, location}: LaunchDetailProps) {
    return (
        <>
            <p>Mission: {missionDescription}</p>
            <p>Standort: {location}</p>
        </>
    )
}