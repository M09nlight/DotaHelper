import React from "react";
import { useParams } from "react-router-dom";
import PlayerStats from "../components/PlayerStats";

const PlayerPage = () => {
    const { player_id } = useParams();
  return (
    <div>
      <React.Fragment>
        <h1 className="font-weight-dark display-1 text-center">Player {player_id}</h1>
        <PlayerStats/>
      </React.Fragment>
    </div>
  );
};

export default PlayerPage;
