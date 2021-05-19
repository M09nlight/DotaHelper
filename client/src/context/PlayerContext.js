import React, { useState, createContext } from "react";

export const PlayerContext = createContext();

export const PlayerContextProvider = (props) => {
  const [players, setPlayers] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [signatureHeroes, setSignatureHeroes] = useState([]);
  return (
    <PlayerContext.Provider
      value={{
        players,
        setPlayers,
        heroes,
        setHeroes,
        signatureHeroes,
        setSignatureHeroes,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};
