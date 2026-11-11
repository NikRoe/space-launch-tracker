import React from "react";
import type {LaunchFilterProps} from "../types.ts";

export default function LaunchFilter({agencies, selectedAgency, onSelectAgency}: LaunchFilterProps) {
    return (
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
            <label htmlFor="agency">Launch Agency:</label>
            <select id="agency"
                    value={selectedAgency}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => onSelectAgency(event.target.value)}>
                <option value="alle">Alle</option>
                {agencies.map((agency, index) => <option key={index} value={agency}>{agency}</option>)}
            </select>
        </div>
    )
}