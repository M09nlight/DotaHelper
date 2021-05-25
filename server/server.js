require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const axios = require("axios");
let DotaWebAPI = require("dota-web-api");
let api = new DotaWebAPI("BACADDA8E857C66331F1BB6A7B52331A");
//const { PlayersOnePlayer } = require("./PlayersOnePlayer");
//let PlayersOnePlayer = require("./PlayersOnePlayer");
const router = require("./routes/mainRouter");
const port = process.env.PORT || 3001;
const app = express();
const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use("/", router);

//////////////////////////////////////
let steam = require("steam-login");

app.use(
  require("express-session")({
    resave: false,
    saveUninitialized: false,
    secret: "a secret",
  })
);
app.use(
  steam.middleware({
    realm: "http://localhost:3000/",
    verify: "http://localhost:3000/verify",
    apiKey: "BACADDA8E857C66331F1BB6A7B52331A",
  })
);

app.get("/", function (req, res) {
  res
    .send(req.user == null ? "not logged in" : "hello " + req.user.username)
    .end();
});

app.get("/authenticate", steam.authenticate(), function (req, res) {
  res.redirect("/");
});

app.get("/verify", steam.verify(), function (req, res) {
  res.send(req.user._json);
});

app.get("/logout", steam.enforceLogin("/"), function (req, res) {
  req.logout();
  res.redirect("/");
});

/////////

// passport.use(
//   new SteamStrategy(
//     {
//       returnURL: `http://localhost:${port}/`,
//       realm: `http://localhost:${port}/`,
//       apiKey: "BACADDA8E857C66331F1BB6A7B52331A",
//     },
//     function (identifier, profile, done) {
//       User.findByOpenID({ openId: identifier }, function (err, user) {
//         return done(err, user);
//       });
//     }
//   )
// );

// app.get("/", (req, res) => {
//   res.send(`<a href="/auth/steam">steam</a>`);
// });
// app.post("/", (req, res) => {
//   res.send(`<a href="/auth/steam">steam</a>`);
// });

// app.get("/auth/steam", passport.authenticate("steam"), function (req, res) {
//   // The request will be redirected to Steam for authentication, so
//   // this function will not be called.
// });

// app.get(
//   "/auth/steam/return",
//   passport.authenticate("steam", { failureRedirect: "/login" }),
//   function (req, res) {
//     // Successful authentication, redirect home.

//     res.redirect("/");
//     res.send(req.user).end();
//   }
// );

////////////////////////////////////////////////////////////////////////////////////START

const start = () => {
  try {
    app.listen(port, async () => {
      console.log(`server is up and listening on port localhost:${port} `);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
////////////////////////////////////////////////////////////////////////////////////START

// app.get("/heroes", async (req, res) => {
//   try {
//     // const heroes = await api.getHeroes();
//     // console.log(heroes.id);
//     // console.log(heroes.naga_siren.id);
//     // console.log(heroes.naga_siren.images.full);
//     // res.status(200).json({
//     //   status: "success",
//     //   match: heroes.naga_siren,
//     // });
//   } catch (error) {}
// });

//app.use("/players/:player_id", PlayersOnePlayer);
// try {
//   PlayersOnePlayer(app);
// } catch (error) {
//   console.log(error);
// }

app.get("/matches", async (req, res) => {
  try {
    const startSeqNum = 2000;
    let numOfMatches = 10;
    const response = await api.getMatchHistoryBySequenceNumber(
      startSeqNum,
      numOfMatches
    );
    const response2 = await api.getMatchHistoryBySequenceNumber(
      2050,
      numOfMatches
    );

    const heroes = await axios.get(
      "https://api.pandascore.co/dota2/heroes?token=FLZkbgsmiTCAqKB4opsJkIeqBXAj8qb9qsk2XFWy7ip7cVGJfUM&per_page=100&page=1"
    );
    const heroes2 = await axios.get(
      "https://api.pandascore.co/dota2/heroes?token=FLZkbgsmiTCAqKB4opsJkIeqBXAj8qb9qsk2XFWy7ip7cVGJfUM&per_page=100&page=2"
    );

    //console.log(response.result);
    //console.log(response.result.matches);

    //const response1 = await api.getLiveLeagueGames();
    //console.log(response1);
    //console.log(response1.result.games[0]);

    res.status(200).json({
      status: "success",
      data: {
        matches: response.result.matches,
        heroes: [heroes.data, heroes2.data],
      },
    });
  } catch (error) {}
});

app.get("/matches/:match_id", async (req, res) => {
  try {
    const matchId = req.params.match_id;

    const response = await api.getMatchDetails(matchId);
    console.log(response);
    //console.log(response.result.players[0]);

    const items = await api.getItems();
    console.log(items);

    const playersData = response.result.players.map((player) => {
      return { kills: player.kills, deaths: player.deaths };
    });

    // console.log(playersData);

    res.status(200).json({
      status: "success",
      data: {
        matchPlayers: response.result.players,
      },
    });
  } catch (error) {}
});

app.get("/example", async (req, res) => {
  try {
    const items = await api.getItems();
    console.log(items.blink);
    console.log(items.blink.cost);
    console.log(items.blink.images.lg);

    const accId = 263852328;
    const response = await api.getMatchHistory(null, null, null, null, accId);
    //console.log(response);
    //console.log(response.result.matches[0]);

    const response1 = await api.getLiveLeagueGames();
    //console.log(response1);
    //console.log(response1.result.games[0]);
    res.status(200).json({
      status: "success",
      data: {
        matches: response1.result.games,
        //items: items,
      },
    });
  } catch (error) {}
});

// app.post("/matches", (req, res) => {
//   console.log(req.body);
//   res.status(200).json({
//     status: "success",
//     data: {
//       match: 1234567890,
//     },
//   });
// });

// app.put("/matches/:id", (req, res) => {
//   console.log(req.params.id);
//   console.log(req.body);
//   res.status(200).json({
//     status: "success",
//     data: {
//       match: 1234567890,
//     },
//   });
// });

// app.delete("/matches/:id", (req, res) => {
//   res.status(200).json({
//     status: "success",
//   });
// });
