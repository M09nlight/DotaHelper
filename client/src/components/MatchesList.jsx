import React, { useContext, useEffect } from "react";
import MatchesFinder from "../apis/MatchesFinder";
import GameModes from "../constants/GameModes";
import Heroes from "../constants/Heroes";
import { MatchesContext } from "../context/MatchesContext";
import { useHistory } from "react-router-dom";
import "../constants/App.css";
import logo from '../images/Dawnbreaker_icon.png';  
import logo2 from '../images/dota.png';
var STATIC_CDN = "http://cdn.dota2.com/apps/dota2/images/heroes/";

const MatchesList = (props) => {
  let history = useHistory();
  //получаем данные с сервера
  const { matches, setMatches } = useContext(MatchesContext);
  //const { heroes, setHeroes } = useContext(MatchesContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MatchesFinder.get("/matches");
        setMatches(response.data.data.matches);
        //setHeroes(response.data.data.heroes);
        console.log(response.data.data.heroes);
      } catch (err) {}
    };

    fetchData();
  }, [setMatches]);

  const handleSelectMatch = (match_id) => {
    history.push(`/matches/${match_id}`);
  };

  return (
    <React.Fragment>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </span>
          </div>
          <input type="text" className="form-control" placeholder="ID match" />
          <input
            type="text"
            className="form-control"
            placeholder="Number matches"
          />
          <div className="input-group-append">
            <button className="btn btn-light" type="button">
              Button
            </button>
          </div>
        </div>
      
      <table
        className="table table-dark table-striped"
        border-collapse="separate"
      >
        <thead>
          <tr>
            <th scope="col">Match number</th>
            <th scope="col">Game mode</th>
            <th scope="col">Result</th>
            <th scope="col">Duration</th>
            <th scope="col" colSpan="5">
              Radiant Pick
            </th>
            <th scope="col" colSpan="5">
              Dire Pick
            </th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => {
            let hours = Math.floor(match.duration / 60 / 60);
            let minutes = Math.floor(match.duration / 60) - hours * 60;
            let seconds = match.duration % 60;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            let formattedTime =
              hours > 0
                ? hours + ":" + minutes + ":" + seconds
                : minutes + ":" + seconds;

            let gameMode = GameModes.find((game_mode) => {
              return match.game_mode === game_mode.ID;
            }).Name;

            let heroName = [];
            let heroImg = [];

            for (let i = 0; i < 10; i++) {
              heroName = heroName.concat(
                Heroes.find((hero_id) => {
                  return match.players[i].hero_id === hero_id.id || "";
                }).name
              );
              heroImg = heroImg.concat(match.players[i].hero_id===135 ? logo : match.players[i].hero_id===0 ? logo2 : STATIC_CDN + heroName[i] + "_sb.png");
            }

            return (
              <tr
                onClick={() => handleSelectMatch(match.match_id)}
                key={match.match_id}
              >
                <td>{match.match_id}</td>
                <td>{gameMode}</td>
                <td>
                  {match.radiant_win === false ? "Dire win" : "Radiant win"}
                </td>
                <td>{formattedTime}</td>
                <td width="50">
                  <img src={`${heroImg[0]}`} title={`${heroName[0]}`} alt={`${heroName[0]}`} />
                </td>
                <td width="50">
                  <img src={`${heroImg[1]}`} title={`${heroName[1]}`} alt={`${heroName[1]}`}/>
                </td>
                <td width="50">
                  <img src={`${heroImg[2]}`} title={`${heroName[2]}`} alt={`${heroName[2]}`}/>
                </td>
                <td width="50">
                  <img src={`${heroImg[3]}`} title={`${heroName[3]}`} alt={`${heroName[3]}`}/>
                </td>
                <td width="50">
                  <img src={`${heroImg[4]}`} title={`${heroName[4]}`} alt={`${heroName[4]}`}/>
                </td>

                <td width="50">
                  <img src={`${heroImg[5]}`} title={`${heroName[5]}`} alt={`${heroName[5]}`}/>
                </td>
                <td width="50">
                  <img src={`${heroImg[6]}`} title={`${heroName[6]}`} alt={`${heroName[6]}`}/>
                </td>
                <td width="50">
                  <img src={`${heroImg[7]}`} title={`${heroName[7]}`} alt={`${heroName[7]}`}/>
                </td>
                <td width="50">
                  <img src={`${heroImg[8]}`} title={`${heroName[8]}`} alt={`${heroName[8]}`}/>
                </td>
                <td width="50">
                  <img src={`${heroImg[9]}`} title={`${heroName[9]}`} alt={`${heroName[9]}`}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        type="button"
        className="btn btn-danger btn-xs btn-block Absolute-Center btn-icon"
      >
        <span className="icon">
          <i className="fas fa-download"></i> More
        </span>
      </button>
      </React.Fragment>
  );
};

export default MatchesList;
