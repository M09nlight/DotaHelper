import React, { useContext, useEffect } from "react";
import MatchesFinder from "../apis/MatchesFinder";
import Heroes from "../constants/Heroes";
import { MatchPlayersContext } from "../context/MatchPlayersContext";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Items from "../constants/Items";
import logo from '../images/Dawnbreaker_icon.png';  
import logo2 from '../images/dota.png';
import Loader from '../components/Loader'

var STATIC_CDN = "http://cdn.dota2.com/apps/dota2/images/heroes/";
var STATIC_CDN2 = "http://cdn.dota2.com/apps/dota2/images/items/";

const MatchPlayersList = () => {
    let history = useHistory();
    const { match_id } = useParams();
    console.log(match_id);
    //получаем данные с сервера
    const { matchPlayers, setMatchPlayers } = useContext(MatchPlayersContext);
    const [loading, setLoading ] = React.useState(true)
    useEffect(() => {
      const fetchData = async () => {
        try {
          
            const value = "http://localhost:4000/matches/" + match_id
          const response = await MatchesFinder.get(`/matches/${match_id}`);
          setMatchPlayers(response.data.data.matchPlayers);
          setLoading(false)
          console.log(setMatchPlayers);
          console.log(value);
        } catch (err) {}
      };
  
      fetchData();
    }, [match_id, setMatchPlayers]);

    const handleSelectPlayer = (player_id) => {
      history.push(`/players/${player_id}`);
    };

    return (
      <React.Fragment>
       
          <table
            className="table table-dark table-striped"
            border-collapse="separate"
          >
            <thead>
              <tr>
                  
                <th scope="col">Hero</th>
                <th scope="col">Id player</th>
                <th scope="col">K</th>
                <th scope="col">D</th>
                <th scope="col">A</th>
                <th scope="col">Last hits/Denies</th>
                <th scope="col">GPM</th>
                <th scope="col">XPM</th>
                <th scope="col">Level</th>
                <th scope="col" colSpan="7">Items</th>
              </tr>
            </thead>
            <tbody>
           
              {matchPlayers && matchPlayers.map((matchPlayer) => {
                
                // let itemName = [];
                // let itemImg = [];
    
                // for (let i = 0; i < 10; i++) {
                //   itemName = itemName.concat(
                //     Items.find((item_0) => {
                //       return matchPlayer.item_0 === item_0.id || "";
                //     }).name
                //   );
                //   itemImg = itemImg.concat(STATIC_CDN + itemName[i] + "_sb.png");
                // }
                
                let heroName = (Heroes.find((hero_id)=>{
                    return (matchPlayer.hero_id === hero_id.id) 
                }).name);
                
                //console.log(heroSrc)
              //   let heroName = (Heroes.find((hero_id)=>{
              //     return (matchPlayer.hero_id === hero_id.id) 
              // }).name);
                let heroImg = matchPlayer.hero_id===135 ? logo :  matchPlayer.hero_id===0 ? logo2 : STATIC_CDN + heroName + "_sb.png";

                let itemName0 = (Items.find((item_0)=>{
                  return (matchPlayer.item_0 === item_0.id) 
              }).name);

              let itemImg0 = matchPlayer.item_0===0 ?logo2 : STATIC_CDN2 + itemName0+ '_lg.png';
///////////
let itemName1 = (Items.find((item_1)=>{
  return (matchPlayer.item_1 === item_1.id) 
}).name);

let itemImg1 = STATIC_CDN2 + itemName1+ '_lg.png';
///////////
let itemName2 = (Items.find((item_2)=>{
  return (matchPlayer.item_2 === item_2.id) 
}).name);

let itemImg2 = STATIC_CDN2 + itemName2+ '_lg.png';
///////////
let itemName3 = (Items.find((item_3)=>{
  return (matchPlayer.item_3 === item_3.id) 
}).name);

let itemImg3 = STATIC_CDN2 + itemName3+ '_lg.png';
///////////

let itemName4 = (Items.find((item_4)=>{
  return (matchPlayer.item_4 === item_4.id) 
}).name);

let itemImg4 = STATIC_CDN2 + itemName4+ '_lg.png';
///////////
let itemName5 = (Items.find((item_5)=>{
  return (matchPlayer.item_5 === item_5.id) 
}).name);

let itemImg5 = STATIC_CDN2 + itemName5+ '_lg.png';
///////////
let itemNameNeutral = (Items.find((item_neutral)=>{
  return (matchPlayer.item_neutral === item_neutral.id) 
}).name);

let itemImgNeutral = STATIC_CDN2 + itemNameNeutral+ '_lg.png';
///////////
    
                return (
                  
                  <tr
                  onClick={() => handleSelectPlayer(matchPlayer.account_id)}
                    key={matchPlayer.hero_id}
                  >
                    <td width="50px"><img src={`${heroImg}`} title={`${heroName}`} alt="" /></td>
                    <td width="200px">{matchPlayer.account_id === 4294967295 ? matchPlayer.account_id ='Anonimus' : matchPlayer.hasOwnProperty('account_id') ? matchPlayer.account_id : matchPlayer.account_id = 'Bot'}</td>
                    <td width="15px">{matchPlayer.kills}</td>
                    <td width="15px">{matchPlayer.deaths}</td>
                    <td width="15px">{matchPlayer.assists}</td>
                    <td width="200px">{matchPlayer.last_hits}/{matchPlayer.denies}</td>
                    <td width="100px">{matchPlayer.gold_per_min}</td>
                    <td width="100px">{matchPlayer.xp_per_min}</td>
                    <td width="100px">{matchPlayer.level}</td>
                    <td width="10px"><img src={`${itemImg0}`} title={`${itemName0}`} alt={`${itemName0}`} width="59" height="33"/></td>
                    <td width="10px"><img src={`${itemImg1}`} title={`${itemName1}`} alt={`${itemName1}`}/></td>
                    <td width="10px"><img src={`${itemImg2}`} title={`${itemName2}`} alt={`${itemName2}`}/></td>
                    <td width="10px"><img src={`${itemImg3}`} title={`${itemName3}`} alt={`${itemName3}`}/></td>
                    <td width="10px"><img src={`${itemImg4}`} title={`${itemName4}`} alt={`${itemName4}`}/></td>
                    <td width="10px"><img src={`${itemImg5}`} title={`${itemName5}`} alt={`${itemName5}`}/></td>
                    <td width="10px"><img src={`${itemImgNeutral}`} title={`${itemNameNeutral}`} alt={`${itemNameNeutral}`}/></td>
                  </tr>
                );
              })
              }
            </tbody>
          </table>
          {loading && <Loader/>}
          </React.Fragment>
          
      );
};

export default MatchPlayersList;
