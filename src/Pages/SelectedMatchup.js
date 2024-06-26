import React from "react";

import { useParams } from 'react-router-dom';


class SelectedMatchup extends React.Component {


    selectMoves = (move, pokemon) => {
        // move to SelectMove, passing the pokemon to modify and move to highlight
    }

    render() {
        const { teams } = this.props.match.params;
        const userTeam=teams[0];
        const enemyTeam=teams[1];

        return(
            <div>
                <ul>
                    {userTeam && userTeam.map((species, index) =>
                        <li key={index}>{species.name}</li>
                    )}
                </ul>
            </div>
        );
    }
}

export default SelectedMatchup;