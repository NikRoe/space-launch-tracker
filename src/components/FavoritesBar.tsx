import type {FavoritesBarProps} from "../types.ts";

export default function FavoritesBar({favorites, onRemoveFavorite}: FavoritesBarProps) {
    return (
        <>
            <div>
                <h2>Favoriten:</h2>
                {favorites.length === 0 && <p>Noch keinen Launch als Favorit markiert</p>}
                {favorites.length > 0 && (
                    <ul>
                        {favorites.map(({id, name}) => (
                            <li key={id}>
                                <button type="button" onClick={() => onRemoveFavorite(id)}>{name}</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <hr/>
        </>
    )
}