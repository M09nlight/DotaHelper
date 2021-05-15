const Router = require("express");
const router = new Router();
let playersOnePlayer = require("./playersOnePlayer");

router.use("/players", playersOnePlayer);

module.exports = router;
