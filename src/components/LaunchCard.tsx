import type {LaunchCardProps} from "../types.ts";
import {useState} from "react";
import LaunchDetail from "./LaunchDetail.tsx";
import LaunchBadge from "./LaunchBadge.tsx";

export default function LaunchCard({launch, isFavorite, onToggleFavorite}: LaunchCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const {name, image, launch_service_provider, net, mission, pad} = launch;

    return (
        <section>
            <div>
                <h2>{name}</h2>
                <button type="button"
                        onClick={() => onToggleFavorite(launch.id)}
                >
                    Als Favorit {isFavorite ? "entfernen" : "markieren"}
                </button>
            </div>
            <img src={image ?? ""} alt={`Bild von ${name}`} width={200} height={200}/>
            <LaunchBadge provider={launch_service_provider.name} date={net}/>
            <button type="button"
                    onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? "Weniger" : "Mehr"} anzeigen
            </button>
            {isExpanded &&
                <LaunchDetail missionDescription={mission?.description ?? ""}
                              location={pad.location.name}/>
            }
        </section>
    )
}



