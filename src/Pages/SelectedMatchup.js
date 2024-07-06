import React from "react";
import Card from '../Components/Card';
import {useLocation} from 'react-router-dom';
import "../CSS/SelectedMatchup.css;"


const SelectedMatchup = () => {
    const location = useLocation();
    const { state } = location;

    const userRoster = state && state.rostersSelected.length > 0 ? state.rostersSelected[0] : [];
    const enemyRoster = state && state.rostersSelected.length > 1 ? state.rostersSelected[1] : [];

    console.log('Species in state:', state);
    const selectMoves = (move, pokemon) => {
        // move to SelectMove, passing the pokemon to modify and move to highlight
    }

    return (

        <div>
            <div style={{textAlign: 'center', display: 'flex'}}>
                <div>
                    <h2>{userRoster.name}</h2>
                    <ul>
                        {userRoster && userRoster.species?.map((species, index) =>
                            <li key={index}>{species.name}</li>
                        )}
                    </ul>
                </div>

                <div className={'container'}>
                    <div className={'vertical-line'}></div>
                </div>

                <div>
                    <Card>
                        {/* Content for user's cards */}
                    </Card>

                    <Card>
                        {/* Content for user's cards */}
                    </Card>
                </div>

                <div className={'container'}>
                    <div className={'vertical-line'}></div>
                </div>

                <div>
                <h2>{userRoster.name}</h2>
                <ul>
                    {enemyRoster && enemyRoster.species?.map((species, index) =>
                        <li key={index}>{species.name}</li>
                    )}
                </ul>
                </div>
            </div>
        </div>
    );
}

export default SelectedMatchup;