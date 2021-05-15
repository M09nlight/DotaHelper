import React from 'react'
import { useHistory } from "react-router-dom";

const Header = () => {
    let history = useHistory();
    const handleSelect = (match_id) => {
        history.push(`/`);
      };
    return (
        <React.Fragment>
            <div className="font-weight-dark  text-right" onClick={() => handleSelect()}>Logout</div>
            <h1 className="font-weight-dark display-1 text-center">Matches</h1>
            </React.Fragment>
    )
}

export default Header
