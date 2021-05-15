import React, { useState, createContext } from "react";

export const PlayerContext = createContext();

export const PlayerContextProvider = (props) => {
  const [players, setPlayers] = useState([]);
  const [heroes, setHeroes] = useState([]);
  return (
    <PlayerContext.Provider value={{ players, setPlayers, heroes, setHeroes }}>
      {props.children}
    </PlayerContext.Provider>
  );
};
