import React, { useState, createContext } from "react";

export const MatchPlayersContext = createContext();

export const MatchPlayersContextProvider = (props) => {
  const [matchPlayers, setMatchPlayers] = useState([]);

  return (
    <MatchPlayersContext.Provider value={{ matchPlayers, setMatchPlayers }}>
      {props.children}
    </MatchPlayersContext.Provider>
  );
};
