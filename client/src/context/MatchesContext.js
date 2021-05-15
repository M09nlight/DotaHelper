import React, { useState, createContext } from "react";

export const MatchesContext = createContext();

export const MatchesContextProvider = (props) => {
  const [matches, setMatches] = useState([]);

  return (
    <MatchesContext.Provider value={{ matches, setMatches }}>
      {props.children}
    </MatchesContext.Provider>
  );
};
