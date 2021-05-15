import React from 'react'
import MatchPlayersList from '../components/MatchPlayersList'
import { useParams } from "react-router-dom";


const MatchOnePage = () => {
    const { match_id } = useParams();
    return (
        <React.Fragment>
           <h1 className="font-weight-dark display-1 text-center">Match {match_id}</h1>
            <MatchPlayersList/>
            </React.Fragment>
    )
}

export default MatchOnePage
