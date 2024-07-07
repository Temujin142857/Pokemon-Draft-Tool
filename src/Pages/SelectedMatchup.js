import React from "react";
import { useState, useEffect } from "react";
import Card from '../Components/Card';
import {useLocation} from 'react-router-dom';
import "../CSS/SelectedMatchup.css"
import {Team} from "../DataStructures/Team.js";
import {Pokemon} from "../DataStructures/Pokemon";
import {Roster} from "../DataStructures/Roster";


const SelectedMatchup = () => {
    const location = useLocation();
    const { state } = location;



    const [userRoster, setUserRoster] = useState([]);
    const [enemyRoster, setEnemyRoster] = useState([]);
    const [selectedUserPokemon, setSelectedUserPokemon] = useState(null);
    const [selectedEnemyPokemon, setSelectedEnemyPokemon] = useState(null);

    useEffect(() => {
        console.log('hhh')
        const initialUserRoster = state && state.param.length > 0 ? Roster.fromJSON(state.param[0]) : [];
        const initialEnemyRoster = state && state.param.length > 1 ? Roster.fromJSON(state.param[1]) : [];

        setUserRoster(initialUserRoster);
        setEnemyRoster(initialEnemyRoster);

        if (initialUserRoster.teams.length > 0 && initialUserRoster.teams[0].pokemons.length > 0) {
            setSelectedUserPokemon(initialUserRoster.teams[0].pokemons[0]);
        }
        if (initialEnemyRoster.teams.length > 0 && initialEnemyRoster.teams[0].pokemons.length > 0) {
            setSelectedEnemyPokemon(initialEnemyRoster.teams[0].pokemons[0]);
        }
    }, [state]);

    const handleIVChange = (index, iv, event) => {
        console.log('hello', event)
        const newIVs = [...selectedUserPokemon.ivs];
        newIVs[index] = parseInt(event.target.value, 10);
        selectedUserPokemon.setIv(index, newIVs[index]);
        setSelectedUserPokemon(prevState => ({ ...prevState, ivs: newIVs }));
    };

    const handleEVChange = (index, ev, event) => {
        const newEVs = [...selectedUserPokemon.evs];
        newEVs[index] = parseInt(event.target.value, 10);
        selectedUserPokemon.setEv(index, newEVs[index]);
        setSelectedUserPokemon(prevState => ({ ...prevState, evs: newEVs }));
    };



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
                        width: '100%',
                        padding: '20px'
                    }}>
                        <div>
                    <h2>_</h2>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            <li className={'hli'}>Hp</li>
                            <li className={'hli'}>Atk</li>
                            <li className={'hli'}>Def</li>
                            <li className={'hli'}>SpA</li>
                            <li className={'hli'}>SpD</li>
                            <li className={'hli'}>Spe</li>
                        </ul>
                        </div>
                        <div>
                        <h2>IVs</h2>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {selectedUserPokemon && selectedUserPokemon.ivs?.map((iv, index) =>
                                <li key={index} className='liii'>
                                    <input
                                        style={{width:'40px', marginLeft: '10px'}}
                                        type="number"
                                        value={iv}
                                        size='2'
                                        maxLength='2'
                                        onChange={(event) => handleIVChange(index, iv, event)}
                                    />
                                </li>
                            )}
                        </ul>
                        </div>
                        <div>
                        <h2>EVs</h2>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {selectedUserPokemon && selectedUserPokemon.evs?.map((ev, index) =>
                                <li key={index} className='liii'>
                                    <input
                                        style={{width:'50px', marginLeft: '10px'}}
                                        type="number"
                                        value={ev}
                                        size='3'
                                        maxLength='3'
                                        onChange={(event) => handleEVChange(index, ev, event)}
                                    />
                                </li>
                            )}
                        </ul>
                        </div>
                        <div>
                            <h2>Stats</h2>
                            <ul style={{listStyleType: 'none', padding: 0}}>
                                {selectedUserPokemon && selectedUserPokemon.stats?.map((stat, index) =>
                                    <li key={index}>{stat}</li>
                                )}
                            </ul>
                        </div>
                    </Card>

                    <Card style={{ display: 'flex', width: '100%', padding: '20px' }}>
                        <div>
                            <h2>_</h2>
                            <ul style={{listStyleType: 'none', padding: 0}}>
                                <li className={'hli'}>Hp</li>
                                <li className={'hli'}>Atk</li>
                                <li className={'hli'}>Def</li>
                                <li className={'hli'}>SpA</li>
                                <li className={'hli'}>SpD</li>
                                <li className={'hli'}>Spe</li>
                            </ul>
                        </div>
                        <div>
                        <h2>IVs</h2>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {selectedEnemyPokemon && selectedEnemyPokemon.ivs?.map((iv, index) =>
                                <li key={index} className='liii'>
                                    <input
                                        style={{width:'40px', marginLeft: '10px'}}
                                        type="number"
                                        placeholder={iv}
                                        size='2'
                                        maxLength='2'
                                        onChange={(event) => handleIVChange(index, iv, event)}
                                    />
                                </li>
                            )}
                        </ul>
                        </div>
                        <div>
                            <h2>EVs</h2>
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {selectedEnemyPokemon && selectedEnemyPokemon.evs?.map((ev, index) =>
                                    <li key={index} className='liii'>
                                        <input
                                            style={{width:'50px', marginLeft:'10px'}}
                                            type="number"
                                            value={ev}
                                            max='252'
                                            onChange={(event) => handleEVChange(index, ev, event)}
                                        />
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div>
                            <h2>Stats</h2>
                            <ul style={{listStyleType: 'none', padding: 0}}>
                                {selectedEnemyPokemon && selectedEnemyPokemon.stats?.map((stat, index) =>
                                    <li key={index} style={{marginLeft: '10px', marginBottom: '13px'}}>{stat}</li>
                                )}
                            </ul>
                        </div>
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