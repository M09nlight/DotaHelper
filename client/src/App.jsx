import React from "react";

//import "./constants/Login.css";
import{BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { MatchesContextProvider } from "./context/MatchesContext";
import { MatchPlayersContextProvider } from "./context/MatchPlayersContext";
import MatchesPage from "./routes/MatchesPage";
import MatchOnePage from "./routes/MatchOnePage";
import LoginPage from "./routes/LoginPage";
import PlayerPage from "./routes/PlayerPage";
import { PlayerContextProvider } from "./context/PlayerContext";

const App = () => {
    return(
        <React.Fragment >
        <MatchesContextProvider > 
            <MatchPlayersContextProvider > 
                <PlayerContextProvider>
           
            <div className="container-inner container-inner-content " >
            <div className="p-3 mb-2 bg-secondary bg-gradient text-white">
        <Router>
            <Switch>
                <Route exact path="/" component={LoginPage}/>
                
                <Route exact path="/matches" component={MatchesPage}/>
                <Route exact path="/matches/:match_id" component={MatchOnePage}/>
                <Route exact path="/players/:player_id" component={PlayerPage}/>
            </Switch>
        </Router>
        </div>
    </div>
    </PlayerContextProvider>
    </MatchPlayersContextProvider>
    </MatchesContextProvider>
    </React.Fragment>
       )
}

export default App;