import {useEffect, useState} from "react";
import axios from "axios";

interface FetchTypes<T> {
    results: T | null;
    isLoading: boolean;
    errorMessage: string | null;
}

export function useFetch<T>(url: string): FetchTypes<T> {
    const [results, setResults] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    let controller: AbortController;

    async function fetchData() {
        controller = new AbortController();
        const {signal} = controller; // Signal dient als Referenz zum AbortController
        try {
            setIsLoading(true);
            const response = await axios.get<T>(url, {signal});
            const fetchedData: T = response.data;

            setResults(fetchedData)
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage("Fehler beim Laden der Daten.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();

        return () => {
            controller.abort(); // Wenn beim Unmounten noch ein Fetch läuft, wird er abgebrochen
        }
    }, [url])

    return {results, isLoading, errorMessage};
}