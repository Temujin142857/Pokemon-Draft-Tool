import React from "react";

import { useParams } from 'react-router-dom';


class SelectedMatchup extends React.Component {


    addNewTeam = () => {
        // Your logic to add a new team goes here
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