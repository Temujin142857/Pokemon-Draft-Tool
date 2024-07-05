import React from "react";
import Card from '../Components/Card';
import {useLocation} from 'react-router-dom';


class SelectedMatchup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userRoster: props.location.state.teams ? props.location.state.teams[0] : [],
            enemyRoster: props.location.state.teams ? props.location.state.teams[1] : []
        };
    }



    selectMoves = (move, pokemon) => {
        // move to SelectMove, passing the pokemon to modify and move to highlight
    }

    render() {
        const { userRoster, enemyRoster } = this.state;

        return(
            <div>
                <div style={{textAlign: 'center', display: 'flex'}}>
                    <ul>
                        {userRoster && userRoster.species.map((species, index) =>
                            <li key={index}>{species.name}</li>
                        )}
                    </ul>

                    <div className={'container'}>
                        <div className={'vertical-line'}></div>
                    </div>

                    <div>
                        <Card>

                        </Card>

                        <Card>

                        </Card>
                    </div>
                    
                    <div className={'container'}>
                        <div className={'vertical-line'}></div>
                    </div>

                    <ul>
                        {enemyRoster && enemyRoster.species.map((species, index) =>
                            <li key={index}>{species.name}</li>
                        )}
                    </ul>
                </div>

            </div>
        );
    }
}

export default SelectedMatchup;