import { useState } from "react";

export default function Player({ name, symbol, isActive, onPlayerNameChange }) {
  1;
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onPlayerNameChange(symbol, playerName);
    }
  }

  function handPlayerNameChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <span>
            <input
              type="text"
              required
              value={playerName}
              onChange={handPlayerNameChange}
            />
          </span>
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
