import {useState} from "react";
import type {LaunchApiResponse, LaunchItem} from "../types.ts";
import LaunchList from "./LaunchList.tsx";
import LaunchFilter from "./LaunchFilter.tsx";
import FavoritesBar from "./FavoritesBar.tsx";
import {useFetch} from "../hooks/useFetch.ts";

const url = "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10";

export default function MissionControl() {
    const [selectedAgency, setSelectedAgency] = useState("alle");
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

    const {
        results,
        isLoading,
        errorMessage
    } = useFetch<LaunchApiResponse>(url);

    const launches: LaunchItem[] = results?.results ?? [];

    function handleRemoveFavorite(id: string) {
        setFavoriteIds(favoriteIds.filter((favoriteId) => favoriteId !== id))
    }

    function handleAddFavorite(id: string) {
        setFavoriteIds([...favoriteIds, id]);
    }

    function handleToggleFavorite(id: string) {
        const isFavorite = favoriteIds.some((favoriteId) => favoriteId === id);

        if (isFavorite) {
            handleRemoveFavorite(id);
        }

        if (!isFavorite) {
            handleAddFavorite(id);
        }
    }

    const filteredLaunches = launches.filter((launch) => launch.launch_service_provider.name === selectedAgency
        || selectedAgency === "alle");

    const agencies = launches.map((launch) => launch.launch_service_provider.name);

    const favorites = launches.filter((launch) => favoriteIds.some((favoriteId) => favoriteId === launch.id))

    return (
        <div>
            <h2>Mission Control</h2>
            <FavoritesBar favorites={favorites} onRemoveFavorite={handleRemoveFavorite}/>
            <LaunchFilter agencies={agencies} selectedAgency={selectedAgency} onSelectAgency={setSelectedAgency}/>
            {isLoading && <p>Die Launches werden geladen.</p>}
            {errorMessage !== null && <p>{errorMessage}</p>}
            {!isLoading && errorMessage === null && (
                <LaunchList launches={filteredLaunches} favoriteIds={favoriteIds}
                            onToggleFavorite={handleToggleFavorite}/>
            )}

        </div>
    )
}

