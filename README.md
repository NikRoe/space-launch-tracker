# 🚀 Space Launch Tracker & Mission Control

Ziel dieses Projekts ist die Entwicklung eines interaktiven Dashboards zur Überwachung von Raumfahrtmissionen mit
**React**, **TypeScript** und **Axios**.

---

## Datenquelle (API)

* **API-Provider:** The Space Devs (Launch Library 2)
* **Endpoint (Upcoming Launches):**  
  `https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10`
* **Alternative:** Lokaler Mock-Server oder lokales JSON-Mocking, falls keine Internetverbindung oder API-Rate-Limits
  vorliegen.

---

## Variante 2: Geführte Aufgabenstellung (Strukturierte Vorgabe)

> **Zielgruppe:** Lernende, die eine konkrete Architektur, vorgegebene Interfaces und eine schrittweise
> Implementierungsanleitung bevorzugen.

### 1. Komponenten-Architektur

```text
App
└── MissionControl (Container / State-Owner)
    ├── LaunchFilter (Dropdown / Filter)
    ├── FavoritesBar (Horizontale Liste gespeicherter Missionen)
    └── LaunchList (Grid aller Starts)
        └── LaunchCard (Einzelner Start)
            ├── LaunchBadge (Status, Provider & Datum)
            └── LaunchDetail (Aufklappbare Detailsektion)
```

---

### 2. TypeScript-Definitionen (`src/types/launch.ts`)

```typescript
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
```

---

### 3. Technische Spezifikation je Komponente

#### A. `MissionControl.tsx` (Container)

* **States:**
    * `launches`: `LaunchItem[]` (Initial: `[]`)
    * `isLoading`: `boolean` (Initial: `true`)
    * `errorMessage`: `string | null` (Initial: `null`)
    * `selectedAgency`: `string` (Initial: `""` für alle)
    * `favoriteIds`: `string[]` (Initial: `[]`)
* **Effekte (`useEffect`):**
    * Rufe per `axios.get<LaunchApiResponse>(...)` die Daten ab.
    * Verwende einen `AbortController`, um Requests bei Komponenten-Unmount sauber abzubrechen.
* **Logik:**
    * Filtere Launches vor der Weitergabe an `LaunchList` anhand von `selectedAgency`.
    * Extrahiere eine eindeutige Liste aller Agenturnamen für den Filter.

#### B. `LaunchFilter.tsx`

* **Props:**
  ```typescript
  interface LaunchFilterProps {
    agencies: string[];
    selectedAgency: string;
    onSelectAgency: (agency: string) => void;
  }
  ```
* Bietet ein Dropdown (`<select>`) zur Auswahl.

#### C. `FavoritesBar.tsx`

* **Props:**
  ```typescript
  interface FavoritesBarProps {
    favorites: LaunchItem[];
    onRemoveFavorite: (id: string) => void;
  }
  ```
* Zeigt gespeicherte Favoriten als Chips mit Entfernen-Button.

#### D. `LaunchList.tsx`

* **Props:**
  ```typescript
  interface LaunchListProps {
    launches: LaunchItem[];
    favoriteIds: string[];
    onToggleFavorite: (id: string) => void;
  }
  ```
* Iteriert über die Liste und rendert für jeden Eintrag eine `LaunchCard`.

#### E. `LaunchCard.tsx`

* **Props:**
  ```typescript
  interface LaunchCardProps {
    launch: LaunchItem;
    isFavorite: boolean;
    onToggleFavorite: (id: string) => void;
  }
  ```
* **Lokaler State:** `isExpanded: boolean` (steuert Auf- und Zuklappen der Details).
* Rendert Titel, Bild, Favoriten-Toggle sowie die Kind-Komponenten `<LaunchBadge />` und bedingt `<LaunchDetail />`.

#### F. `LaunchBadge.tsx` & `LaunchDetail.tsx`

* `LaunchBadge`: Zeigt Provider und formatiertes Datum visuell hervorgehoben an.
* `LaunchDetail`: Zeigt Pad-Standort und Missionsbeschreibung an.

---

### Bewertungskriterien

* **TypeScript-Präzision:** Vollständige Typisierung, keine `any`-Typen.
* **Hooks-Verständnis:** Korrektes Dependency-Array in `useEffect`, sauberer Umgang mit asynchronem State und
  AbortController.
* **Component Design:** Saubere Trennung von Container- und Presentational-Komponenten.
* **Immutability:** Unveränderliche State-Updates (kein direktes Mutieren von Arrays oder Objekten).
