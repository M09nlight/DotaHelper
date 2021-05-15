import React, { useContext, useEffect } from "react";
import MatchesFinder from "../apis/MatchesFinder";
import GameModes from "../constants/GameModes";
import Heroes from "../constants/Heroes";
import { PlayerContext } from "../context/PlayerContext";
import { useHistory } from "react-router-dom";
import "../constants/App.css";
import { useParams } from "react-router-dom";
import logo from '../images/Dawnbreaker_icon.png';  
import logo2 from '../images/dota.png';

var STATIC_CDN = "http://cdn.dota2.com/apps/dota2/images/heroes/";


const PlayerStats = (props) => {
  let history = useHistory();
  const { player_id } = useParams();
  //получаем данные с сервера
  const { players, setPlayers, heroes, setHeroes } = useContext(PlayerContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MatchesFinder.get(`/players/${player_id}`);
        setPlayers(response.data.data.players);
        const response2 = await MatchesFinder.get(`/players/${player_id}`);
        setHeroes(response2.data.data.heroes);
        
      } catch (err) {}
    };

    fetchData();
  }, [player_id, setPlayers, heroes, setHeroes]);



  let bestWins =[];
  let persWins = 0;
  heroes.map((hero) => {
    persWins = hero.win *100/hero.games
    bestWins.push(["persWins: " + persWins.toFixed(2), "hero_id: " + hero.hero_id])
    return bestWins
  })
  console.log(players[0])
  //console.log(bestWins[0])

  // let allMatches = [];
  // players.map((player) =>{
  //   allMatches.push(player.match_id); 
  //   return allMatches
  // })
  // let min = total[0];
  // let max = min;
  // for (let i = 0; i < total.length; i++) {
  //   if (total[i] > max) max = total[i];
  //   if (total[i] < min) min = total[i];
    
  // }
  // console.log(max)
  // console.log(min)
  // console.log(total)
 
  return (
    <React.Fragment>
      
      <table
        className="table table-dark table-striped"
        border-collapse="separate"
      >
        <thead>
          <tr>
          <th scope="col">Hero</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
            

        
          let heroName = (Heroes.find((hero_id)=>{
              return (player.hero_id === hero_id.id) 
          }).name);

          let heroImg = player.hero_id===135 ? logo :  player.hero_id===0 ? logo2 : STATIC_CDN + heroName + "_sb.png";

            return (
              <tr
              
                key={player.match_id}
              >
                <td width="50px"><img src={`${heroImg}`} title={`${heroName}`} alt="" /></td>
                <td width="100px">{player.hero_id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
     
      </React.Fragment>
  );
};

export default PlayerStats;
