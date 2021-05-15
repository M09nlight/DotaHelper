const Router = require("express");
const router = new Router();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const axios = require("axios");
let DotaWebAPI = require("dota-web-api");
let api = new DotaWebAPI("BACADDA8E857C66331F1BB6A7B52331A");
require("dotenv").config();
router.use(morgan("tiny"));
router.use(cors());
router.use(express.json());

// let Imports = require("./Imports");
// router.use(Imports);

router.get("/:player_id", async (req, res) => {
  try {
    const playerId = req.params.player_id;
    let allMatchesId = [];
    let allMatchesData = [];
    let allMatchesFormatedData = [];
    let heroesId = [];
    const players = await axios.get(
      `https://api.opendota.com/api/players/${playerId}/matches?limit=10`
    );
    const heroes = await axios.get(
      `https://api.opendota.com/api/players/${playerId}/heroes`
    );

    //id всех матчей
    players.data.map((player) => {
      allMatchesId.push(player.match_id);
      return allMatchesId;
    });

    //вывожу в удобном формате
    for (let i = 0; i < allMatchesId.length; i++) {
      allMatchesData[i] = await api.getMatchDetails(allMatchesId[i]);
      allMatchesFormatedData.push(
        allMatchesData[i].result.players.map((player) => {
          return {
            account_id: player.account_id,
            kills: player.kills,
            deaths: player.deaths,
            hero_id: player.hero_id,
          };
        })
      );
    }

    //получаю id героев по всем матчам
    heroes.data.map((hero) => {
      heroesId.push(hero.hero_id);
    });

    //закидываю в 2хмерный массив где у каждого hero_id выводятся кол-во киллов
    let heroKills = [];

    let endSumHeroKills = [];
    let endAverageHeroKills = [];
    let sortAverageKills = [];
    for (let i = 0; i < heroesId.length; i++) {
      //console.log(heroesId[i]);

      const killsInMatch = [];
      allMatchesFormatedData.map((mData) => {
        let findKills = mData.find((player_data) => {
          return (
            playerId == player_data.account_id &&
            heroesId[i] == player_data.hero_id
          );
        })?.kills;
        if (findKills) {
          killsInMatch.push(findKills);
        } else {
          //killsInMatch.push(0);
        }
      });

      heroKills.push(killsInMatch);
      let sumHeroKills = 0;
      let averageHeroKills = 0;

      if (heroKills[i].length != 0) {
        for (let j = 0; j < heroKills[i].length; j++) {
          sumHeroKills = sumHeroKills + heroKills[i][j];
          endSumHeroKills.push(sumHeroKills);
        }
        averageHeroKills = sumHeroKills / heroKills[i].length;

        endAverageHeroKills.push({
          hero_id: heroesId[i],
          average_kills: averageHeroKills,
        });
        sortAverageKills.push(averageHeroKills);
      }
    }
    // console.log("endSumHeroKills " + endSumHeroKills);

    sortAverageKills.sort((a, b) => b - a);

    let sortKillsObject = [];
    sortAverageKills.map((sortAvgKill) => {
      console.log(sortAvgKill);
      try {
        let HeroID = endAverageHeroKills.find((kills) => {
          return sortAvgKill === kills.average_kills;
        }).hero_id;
        console.log(HeroID);
        sortKillsObject.push({
          hero_id: HeroID,
          average_kills: sortAvgKill,
        });
      } catch (error) {
        console.log(error);
      }

      //console.log(endAverageHeroKills[0].hero_id + ": ");
    });

    //console.log("endAverageKills " + endAverageHeroKills);
    //console.log("sortAverageKills " + sortAverageKills);

    //console.log(heroKills);
    //console.log(heroKills[0].length);
    //console.log(allMatchesFormatedData);

    res.status(200).json({
      status: "success",
      data: {
        //players: players.data,
        //heroes: heroes.data,
        allMatchesData: sortKillsObject,
      },
    });
  } catch (error) {}
});

module.exports = router;
