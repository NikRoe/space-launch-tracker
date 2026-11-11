export interface LaunchAgency {
    id: number;
    name: string;
}

export interface LaunchPad {
    name: string;
    location: {
        name: string;
    };
}

export interface Mission {
    name: string;
    description: string;
}

export interface LaunchItem {
    id: string;
    name: string;
    net: string; // ISO-Datumsstring
    image: string | null;
    launch_service_provider: LaunchAgency;
    pad: LaunchPad;
    mission: Mission | null;
}

export interface LaunchApiResponse {
    count: number;
    results: LaunchItem[];
}

export interface FormatDate {
    minutes: number,
    hours: number,
    day: number,
    month: number,
    year: number
}

export interface LaunchListProps {
    launches: LaunchItem[];
    favoriteIds: string[];
    onToggleFavorite: (id: string) => void;
}

export interface LaunchFilterProps {
    agencies: string[];
    selectedAgency: string;
    onSelectAgency: (agency: string) => void;
}

export interface LaunchDetailProps {
    missionDescription: string,
    location: string,
}

export interface LaunchCardProps {
    launch: LaunchItem;
    isFavorite: boolean;
    onToggleFavorite: (id: string) => void;
}

export interface LaunchBadgeProps {
    provider: string,
    date: string,
}

export interface FavoritesBarProps {
    favorites: LaunchItem[];
    onRemoveFavorite: (id: string) => void;
}