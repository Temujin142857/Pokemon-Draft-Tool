import React from "react";
import Card from '../Components/Card';
import {useLocation} from 'react-router-dom';
import "../CSS/SelectedMatchup.css"
import {Team} from "../DataStructures/Team.js";
import {Pokemon} from "../DataStructures/Pokemon";
import {Roster} from "../DataStructures/Roster";


const SelectedMatchup = () => {
    const location = useLocation();
    const { state } = location;

    console.log('hi',state);


    const userRoster = state && state.param.length > 0 ? Roster.fromJSON(state.param[0]) : [];
    const enemyRoster = state && state.param.length > 1 ? Roster.fromJSON(state.param[1]) : [];

    console.log(userRoster, 'ooo')


    let selectedUserPokemon= userRoster.teams[0].pokemons[0];
    let selectedEnemyPokemon= enemyRoster.teams[0].pokemons[0];


    const selectMoves = (move, pokemon) => {
        // move to SelectMove, passing the pokemon to modify and move to highlight
    }

    const handleIVChange = (index, iv, event) => {
        selectedUserPokemon.setIv(iv);
    }

    const handleEVChange = (index, ev, event) => {
        selectedUserPokemon.setEv(ev);
    }


    const selectSpecie = (user, specie) => {
        const pokemonToAdd = new Pokemon(specie);
        if (user) {
            const alreadyExists = userRoster.teams[0].pokemons.some(pokemon => pokemon.specie.name === pokemonToAdd.specie.name);
            if (!alreadyExists) {
                userRoster.teams[0].addPokemon(pokemonToAdd);
            } else {
                // Remove the existing Pokemon from the team
                userRoster.teams[0].removePokemon(pokemonToAdd.specie.name);
            }
        } else {
            const alreadyExists = enemyRoster.teams[0].pokemons.some(pokemon => pokemon.specie.name === pokemonToAdd.specie.name);
            if (!alreadyExists) {
                enemyRoster.teams[0].addPokemon(pokemonToAdd);
            } else {
                // Remove the existing Pokemon from the team
                enemyRoster.teams[0].removePokemon(pokemonToAdd?.specie.name);
            }
        }
    }




    return (

        <div style={{backgroundColor: '#302B2B', textAlign: 'center', minHeight: '100vh', minWidth: '100vw', paddingTop: '10px', paddingBottom: '20px'}}>
            <div style={{textAlign: 'center', display: 'flex'}}>
                <div>
                    <h2 className={'text'}>{userRoster.name}</h2>
                    <ul>
                        {userRoster && userRoster.species?.map((species, index) =>
                            <li key={index} className={'liii'}>{species.name}</li>
                        )}
                    </ul>
                </div>

                <div className={'container'}>
                    <div className={'vertical-line'}></div>
                </div>

                <div>
                    <Card style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '100%',
                        padding: '20px'
                    }}>
                    <h2 className='text'>Stat</h2>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            <li>Hp</li>
                            <li>Atk</li>
                            <li>Def</li>
                            <li>SpA</li>
                            <li>SpD</li>
                            <li>Spe</li>
                        </ul>
                        <h2 className='text'>IVs</h2>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {enemyRoster && selectedUserPokemon.ivs?.map((iv, index) =>
                                <li key={index} className='liii'>
                                    <input
                                        type="number"
                                        value={iv}
                                        onChange={(event) => handleIVChange(index, iv, event)}
                                    />
                                </li>
                            )}
                        </ul>
                        <h2 className='text'>EVs</h2>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {enemyRoster && selectedUserPokemon.evs?.map((ev, index) =>
                                <li key={index} className='liii'>
                                    <input
                                        type="number"
                                        value={ev}
                                        onChange={(event) => handleEVChange(index, event)}
                                    />
                                </li>
                            )}
                        </ul>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {enemyRoster && selectedUserPokemon.stats?.map((stat, index) =>
                                <li key={index} className='liii'>stat</li>
                            )}
                        </ul>
                    </Card>

                    <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', padding: '20px' }}>
                        <h2 className='text'>Stat</h2>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            <li>Hp</li>
                            <li>Atk</li>
                            <li>Def</li>
                            <li>SpA</li>
                            <li>SpD</li>
                            <li>Spe</li>
                        </ul>
                        <h2 className='text'>IVs</h2>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {enemyRoster && selectedEnemyPokemon.ivs?.map((iv, index) =>
                                <li key={index} className='liii'>
                                    <input
                                        type="number"
                                        value={iv}
                                        onChange={(event) => handleIVChange(index, iv, event)}
                                    />
                                </li>
                            )}
                        </ul>
                        <h2 className='text'>EVs</h2>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {enemyRoster && selectedEnemyPokemon.evs?.map((ev, index) =>
                                <li key={index} className='liii'>
                                    <input
                                        type="number"
                                        value={ev}
                                        onChange={(event) => handleEVChange(index, event)}
                                    />
                                </li>
                            )}
                        </ul>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {enemyRoster && selectedEnemyPokemon.stats?.map((stat, index) =>
                                <li key={index} className='liii'>stat</li>
                            )}
                        </ul>
                    </Card>

                </div>

                <div className={'container'}>
                    <div className={'vertical-line'}></div>
                </div>

                <div>
                    <h2 className={'text'}>{enemyRoster.name}</h2>
                    <ul>
                        {enemyRoster && enemyRoster.species?.map((species, index) =>
                            <li key={index} className={'liii'}>{species.name}</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SelectedMatchup;