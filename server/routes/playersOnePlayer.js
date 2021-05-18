const Router = require("express");
const router = new Router();
const axios = require("axios");
let DotaWebAPI = require("dota-web-api");
let api = new DotaWebAPI("BACADDA8E857C66331F1BB6A7B52331A");

router.get("/:player_id", async (req, res) => {
  try {
    const playerId = req.params.player_id;
    let allMatchesId = [];
    let allMatchesData = [];
    let allMatchesFormatedData = [];
    let endAllMatchesFormatedData = [];
    let sortRatingObject = [];

    let radiantWonObject = [];
    let radiantIsWin = [];
    let heroesId = [];

    const heroGamesResult = [];
    let heroWins = [];
    let heroKills = [];
    let heroDeaths = [];
    let heroAssists = [];

    let sortAverageRating = [];
    let sortAverageRating3 = [];

    let endAverageHeroRating = [];

    let accPosition = [];
    let playerIsWin = [];

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
      radiantWonObject.push({
        radiant_win: allMatchesData[i].result.radiant_win,
      });
      radiantIsWin.push(allMatchesData[i].result.radiant_win);

      allMatchesFormatedData.push(
        allMatchesData[i].result.players.map((player) => {
          return {
            account_id: player.account_id,
            hero_id: player.hero_id,
            kills: player.kills,
            deaths: player.deaths,
            assists: player.assists,
            radiant_win: radiantWonObject[i].radiant_win,
          };
        })
      );
    }

    //получаю id героев по всем матчам
    heroes.data.map((hero) => {
      heroesId.push(hero.hero_id);
    });

    //закидываю в 2хмерный массив где у каждого hero_id выводятся кол-во киллов

    allMatchesFormatedData.map((mData) => {
      let pos = 0;
      let key = mData.find((player_data) => {
        pos++;

        return playerId == player_data.account_id;
      })?.kills;
      if (key) {
        accPosition.push(pos);
      }
    });

    for (
      let x = 0, y = 0;
      x < radiantIsWin.length, y < accPosition.length;
      x++, y++
    ) {
      if (accPosition[y] <= 5 && radiantIsWin[x] == false) {
        playerIsWin[x] = "false";
      }
      if (accPosition[y] > 5 && radiantIsWin[x] == false) {
        playerIsWin[x] = "true";
      }
      if (accPosition[y] <= 5 && radiantIsWin[x] == true) {
        playerIsWin[x] = "true";
      }
      if (accPosition[y] > 5 && radiantIsWin[x] == true) {
        playerIsWin[x] = "false";
      }
    }

    //вывожу в удобном формате
    for (let i = 0; i < allMatchesId.length; i++) {
      endAllMatchesFormatedData.push(
        allMatchesData[i].result.players.map((player) => {
          return {
            account_id: player.account_id,
            hero_id: player.hero_id,
            kills: player.kills,
            deaths: player.deaths,
            hero_id: player.hero_id,
            assists: player.assists,
            radiant_win: radiantWonObject[i].radiant_win,
            player_is_win: playerIsWin[i],
          };
        })
      );
    }

    for (let i = 0; i < heroesId.length; i++) {
      //console.log(heroesId[i]);
      const heroWinsInMatch = [];
      const killsInMatch = [];
      const deathsInMatch = [];
      const assistsInMatch = [];

      let heroGames = 0;

      endAllMatchesFormatedData.map((mData) => {
        let findGamesResult = mData.find((player_data) => {
          return (
            playerId == player_data.account_id &&
            heroesId[i] == player_data.hero_id
          );
        })?.player_is_win;
        if (findGamesResult != null) {
          heroGames++;
          if (findGamesResult == "true") {
            heroWinsInMatch.push(1);
          }
          if (findGamesResult == "false") {
            heroWinsInMatch.push(0);
          }
        } else {
        }

        let findKills = mData.find((player_data) => {
          return (
            playerId == player_data.account_id &&
            heroesId[i] == player_data.hero_id
          );
        })?.kills;
        if (findKills != null) {
          killsInMatch.push(findKills);
        } else {
        }
        let findDeaths = mData.find((player_data) => {
          return (
            playerId == player_data.account_id &&
            heroesId[i] == player_data.hero_id
          );
        })?.deaths;
        if (findDeaths != null) {
          deathsInMatch.push(findDeaths);
        } else {
        }

        let findAssists = mData.find((player_data) => {
          return (
            playerId == player_data.account_id &&
            heroesId[i] == player_data.hero_id
          );
        })?.assists;
        if (findAssists != null) {
          assistsInMatch.push(findAssists);
        } else {
        }
      });
      if (heroGames != 0) {
        heroGamesResult.push(heroGames);
      }

      heroWins.push(heroWinsInMatch);
      heroKills.push(killsInMatch);
      heroDeaths.push(deathsInMatch);
      heroAssists.push(assistsInMatch);

      let sumHeroGames = 0;
      let sumHeroWins = 0;
      let winrateHero = 0;

      let sumHeroKills = 0;
      let averageHeroKills = 0;

      let sumHeroDeaths = 0;
      let averageHeroDeaths = 0;

      let sumHeroAssists = 0;
      let averageHeroAssists = 0;

      let KDA = 0;
      let rating = 0;

      if (heroKills[i].length != 0 && heroDeaths[i].length != 0) {
        for (let j = 0; j < heroWins[i].length; j++) {
          sumHeroWins = sumHeroWins + heroWins[i][j];
        }
        for (let j = 0; j < heroKills[i].length; j++) {
          sumHeroKills = sumHeroKills + heroKills[i][j];
        }
        for (let j = 0; j < heroDeaths[i].length; j++) {
          sumHeroDeaths = sumHeroDeaths + heroDeaths[i][j];
        }
        for (let j = 0; j < heroAssists[i].length; j++) {
          sumHeroAssists = sumHeroAssists + heroAssists[i][j];
        }
        sumHeroGames = heroWins[i].length;
        winrateHero = +((sumHeroWins / sumHeroGames) * 100).toFixed(1);
        averageHeroKills = +(sumHeroKills / heroKills[i].length).toFixed(1);
        averageHeroDeaths = +(sumHeroDeaths / heroDeaths[i].length).toFixed(1);
        averageHeroAssists = +(sumHeroAssists / heroAssists[i].length).toFixed(
          1
        );
        KDA = +(
          (averageHeroKills + averageHeroAssists) /
          averageHeroDeaths
        ).toFixed(1);
        rating = +(KDA * winrateHero).toFixed(0);

        endAverageHeroRating.push({
          hero_id: heroesId[i],
          average_kills: averageHeroKills,
          average_deaths: averageHeroDeaths,
          average_assists: averageHeroAssists,
          avg_kda: KDA,
          games: sumHeroGames,
          win: sumHeroWins,
          winrate_hero: winrateHero,
          rating: rating,
        });

        sortAverageRating.push(rating);
      }
    }

    // console.log("heroGameResult: " + heroGamesResult);
    // console.log("heroWins: " + heroWins);
    // console.log("heroKills: " + heroKills);
    // console.log("heroDeaths: " + heroDeaths);
    // console.log("heroAssists: " + heroAssists);

    sortAverageRating.sort((a, b) => b - a);

    for (let h = 0; h < 3; h++) {
      sortAverageRating3[h] = sortAverageRating[h];
    }
    //console.log(sortAverageRating3);
    //console.log(endAverageHeroRating);

    let checkHeroId = [];
    //sortAverageRating3.map((sortAvgRating) => {

    for (let t = 0; t < sortAverageRating3.length; t++) {
      try {
        let obj = endAverageHeroRating.find((data) => {
          return (
            sortAverageRating3[t] === data.rating &&
            data.hero_id != checkHeroId[t - 1]
          );
        });
        if (obj) {
          checkHeroId.push(obj.hero_id);
          //console.log("t: " + t + " checkHeroId:" + checkHeroId);
        }

        sortRatingObject.push({
          hero_id: obj.hero_id,
          average_kills: obj.average_kills,
          average_deaths: obj.average_deaths,
          average_assists: obj.average_assists,
          avg_kda: obj.avg_kda,
          games: obj.games,
          win: obj.win,
          winrate_hero: obj.winrate_hero,
          rating: obj.rating,
        });
      } catch (error) {
        console.log(error);
      }
    }
    //});

    console.log(heroAssists);
    //console.log(allMatchesFormatedData);

    res.status(200).json({
      status: "success",
      data: {
        //players: players.data,
        //heroes: heroes.data,

        //endAllMatchesFormatedData: endAllMatchesFormatedData,
        //allMatchesData: allMatchesData,
        sortRatingObject: sortRatingObject,
        "-----------------------------------------":
          "                            ",
        endAverageHeroRating: endAverageHeroRating,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
