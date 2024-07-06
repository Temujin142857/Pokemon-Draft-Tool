import React from "react";
import Card from '../Components/Card';
import {useLocation} from 'react-router-dom';
import "../CSS/SelectedMatchup.css"
import {Team} from "../DataStructures/Team.js";
import {Pokemon} from "../DataStructures/Pokemon";


const SelectedMatchup = () => {
    const location = useLocation();
    const { state } = location;

    const userRoster = state && state.rostersSelected.length > 0 ? state.rostersSelected[0] : [];
    const enemyRoster = state && state.rostersSelected.length > 1 ? state.rostersSelected[1] : [];

    const userTeam=new Team('team1');
    const enemyTeam=new Team('team1');

    console.log('hi',state.rostersSelected);

    console.log('hi',userRoster);

    let selectedUserPokemon= userRoster.team.pokemons[0];
    let selectedEnemyPokemon= enemyRoster.team.pokemons[0];


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
            const alreadyExists = userTeam.pokemons.some(pokemon => pokemon.specie.name === pokemonToAdd.specie.name);
            if (!alreadyExists) {
                userTeam.addPokemon(pokemonToAdd);
            } else {
                // Remove the existing Pokemon from the team
                userTeam.removePokemon(pokemonToAdd.specie.name);
            }
        } else {
            const alreadyExists = enemyTeam.pokemons.some(pokemon => pokemon.specie.name === pokemonToAdd.specie.name);
            if (!alreadyExists) {
                enemyTeam.addPokemon(pokemonToAdd);
            } else {
                // Remove the existing Pokemon from the team
                enemyTeam.removePokemon(pokemonToAdd?.specie.name);
            }
        }
    }




    return (

        <div style={{backgroundColor: '#302B2B', textAlign: 'center', minHeight: '100vh', paddingTop: '10px', paddingBottom: '20px'}}>
            <div style={{textAlign: 'center', display: 'flex'}}>
                <div>
                    <ul>
                        {userRoster && userRoster.species.map((specie, index) =>
                            <li className={userRoster.team.pokemons.some(pokemon => pokemon.specie.name === specie.name) ? 'lii highlighted' : 'lii'}
                                onClick={() => {
                                    selectSpecie(specie);
                                }} key={index}>
                                {specie.name}
                            </li>
                        )}
                    </ul>
                </div>

                <div className={'container'}>
                    <div className={'vertical-line'}></div>
                </div>

                <div>
                    <Card style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <h2 className={'text'}>stat</h2>
                        <ul>
                            <li>Hp</li>
                            <li>Atk</li>
                            <li>Def</li>
                            <li>SpA</li>
                            <li>SpD</li>
                            <li>Spe</li>
                        </ul>
                        <h2 className={'text'}>IVs</h2>
                        <ul>
                            {userRoster && selectedUserPokemon.ivs?.map((iv, index) =>
                                <li key={index} className={'liii'}>
                                    <input
                                        type="number"
                                        value={iv}
                                        onChange={(event) => handleIVChange(index, iv, event)}
                                    />
                                </li>
                            )}
                        </ul>
                        <h2 className={'text'}>EVs</h2>
                        <ul>
                            {userRoster && selectedUserPokemon.evs?.map((ev, index) =>
                                <li key={index} className={'liii'}>
                                    <input
                                        type="number"
                                        value={ev}
                                        onChange={(event) => handleEVChange(index, event)}
                                    />
                                </li>
                            )}
                        </ul>
                        <ul>
                            {userRoster && selectedUserPokemon.stats?.map((stat, index) =>
                                <li key={index} className={'liii'}>stat</li>
                            )}
                        </ul>
                    </Card>

                    <Card style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <h2 className={'text'}>stat</h2>
                        <ul>
                            <li>Hp</li>
                            <li>Atk</li>
                            <li>Def</li>
                            <li>SpA</li>
                            <li>SpD</li>
                            <li>Spe</li>
                        </ul>
                        <h2 className={'text'}>IVs</h2>
                        <ul>
                            {enemyRoster && selectedEnemyPokemon.ivs?.map((iv, index) =>
                                <li key={index} className={'liii'}>
                                    <input
                                        type="number"
                                        value={iv}
                                        onChange={(event) => handleIVChange(index, iv, event)}
                                    />
                                </li>
                            )}
                        </ul>
                        <h2 className={'text'}>EVs</h2>
                        <ul>
                            {enemyRoster && selectedEnemyPokemon.evs?.map((ev, index) =>
                                <li key={index} className={'liii'}>
                                    <input
                                        type="number"
                                        value={ev}
                                        onChange={(event) => handleEVChange(index, event)}
                                    />
                                </li>
                            )}
                        </ul>
                        <ul>
                            {enemyRoster && selectedEnemyPokemon.stats?.map((stat, index) =>
                                <li key={index} className={'liii'}>stat</li>
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