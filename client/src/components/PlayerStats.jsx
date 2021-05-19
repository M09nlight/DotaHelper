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
import Loader from '../components/Loader'
import "../constants/Loader.css";
import "../constants/heroCards.css";

var STATIC_CDN = "http://cdn.dota2.com/apps/dota2/images/heroes/";


const PlayerStats = (props) => {
  let history = useHistory();
  const { player_id } = useParams();
  //получаем данные с сервера
  const { players, setPlayers, heroes, setHeroes, signatureHeroes, setSignatureHeroes } = useContext(PlayerContext);
  const [loading, setLoading ] = React.useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MatchesFinder.get(`/players/${player_id}`);
       
        setLoading(false)
        setPlayers(response.data.data.players);
        setHeroes(response.data.data.heroes);
        setSignatureHeroes(response.data.data.signatureHeroes);
      } catch (err) {}
    };

    fetchData();
  }, []);



  let bestWins =[];
  let persWins = 0;
  heroes.map((hero) => {
    persWins = hero.win *100/hero.games
    bestWins.push(["persWins: " + persWins.toFixed(2), "hero_id: " + hero.hero_id])
    return bestWins
  })
  //console.log(players[0])
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
  console.log(loading)
  return (

    <React.Fragment>
      <div id="container">
  <h1>Best heroes</h1>
  <hr />
  {signatureHeroes.map((signatureHero) => {
     let hero = (Heroes.find((hero_id)=>{
      return (+(signatureHero.hero_id) === hero_id.id) 
  })?.name);
 
  let heroImg = signatureHero.hero_id===135 ? logo :  signatureHero.hero_id===0 ? logo2 : STATIC_CDN + hero + "_full.png";
    return(
  <div class="card">
    <div class="front">
      <img
        src={heroImg}
        class="contact" alt =""
      />
      <span class="name">{"Hero: "+hero}</span>
      <hr />
      <span class="job">{"Score: "+signatureHero.rating} </span>
    </div>
    <div class="back">
      <span>Stats:</span>
      <p align="center">{"Average KDA: "+signatureHero.average_kda}</p>
      <p align="center">{"Games: "+signatureHero.games}</p>
      <p align="center">{"Winrate: "+signatureHero.winrate_hero*100+"%"}</p>
      
      <div class="icons">
      </div>
    </div>
  </div>)
})}

</div>
      <table
        className="table table-dark table-striped"
        border-collapse="separate"
      >
        <thead>
          <tr>
          <th scope="col">Hero</th>
          <th scope="col">Hero</th>
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
                <td width="100px">{player.item_0}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {loading && <Loader/>}
      
      </React.Fragment>
  );
};

export default PlayerStats;
