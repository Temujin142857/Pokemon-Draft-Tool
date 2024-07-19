import React from "react";
import { useState, useEffect } from "react";
import Card from '../Components/Card';
import {useLocation} from 'react-router-dom';
import "../CSS/SelectedMatchup.css"
import {Team} from "../DataStructures/Team.js";
import {Pokemon} from "../DataStructures/Pokemon";
import {Roster} from "../DataStructures/Roster";
import NatureSelect from '../Components/NatureSelect';
import ItemSelect from "../Components/ItemSelect";
import {NavigateForwards, NavigateBackwards} from "../Navigator";
import {set} from "firebase/database";
import AbilitySelect from "../Components/AbilitySelect";

const SelectedMatchup = () => {
    const location = useLocation();
    const { state } = location;


    const [navigate, setNavigate] = useState(false);
    const [data, setData] = useState(null);
    const [path, setPath] = useState('');
    const [userRoster, setUserRoster] = useState([]);
    const [enemyRoster, setEnemyRoster] = useState([]);
    const [selectedUserPokemon, setSelectedUserPokemon] = useState(null);
    const [selectedEnemyPokemon, setSelectedEnemyPokemon] = useState(null);

    const handleNatureChange = (user, selectedOption) => {
        // Assuming selectedUserPokemon and selectedEnemyPokemon are objects with a method to update nature
        if (user && selectedUserPokemon) {
            const updatedUserPokemon = Pokemon.fromJSON(selectedUserPokemon.toJSON()) ;
            updatedUserPokemon.setNature(selectedOption.value);
            setSelectedUserPokemon(updatedUserPokemon);
        } else if(!user && selectedEnemyPokemon){
            const updatedEnemyPokemon = Pokemon.fromJSON(selectedEnemyPokemon.toJSON());
            updatedEnemyPokemon.setNature(selectedOption.value);
            setSelectedEnemyPokemon(updatedEnemyPokemon);
        }

        // Similar logic for selectedEnemyPokemon if needed
    };
    const handleItemChange = (selectedOptions) => {
        //setSelectedNatures(selectedOptions);
    };

    useEffect(() => {
        const initialUserRoster = state && state.data  ? Roster.fromJSON(state.data.userRoster) : [];
        const initialEnemyRoster = state && state.data ? Roster.fromJSON(state.data.enemyRoster) : [];

        setUserRoster(initialUserRoster);
        setEnemyRoster(initialEnemyRoster);

        if (initialUserRoster.teams.length > 0 && initialUserRoster.teams[0].pokemons.length > 0) {
            setSelectedUserPokemon(initialUserRoster.teams[0].pokemons[0]);
        }
        if (initialEnemyRoster.teams.length > 0 && initialEnemyRoster.teams[0].pokemons.length > 0) {
            setSelectedEnemyPokemon(initialEnemyRoster.teams[0].pokemons[0]);
        }
    }, [state]);

    const handleIVChange = (user, index, iv, event) => {
        if(user){
            const newIVs = [...selectedUserPokemon.ivs];
            newIVs[index] = parseInt(event.target.value, 10);
            selectedUserPokemon.setIv(newIVs[index], index);
            setSelectedUserPokemon(prevState => ({ ...prevState, ivs: newIVs }));
        }else{
            const newIVs = [...selectedEnemyPokemon.ivs];
            newIVs[index] = parseInt(event.target.value, 10);
            selectedEnemyPokemon.setIv(newIVs[index], index);
            setSelectedEnemyPokemon(prevState => ({ ...prevState, ivs: newIVs }));
        }

    };

    const handleEVChange = (user, index, ev, event) => {
        if(user){
            const newEVs = [...selectedUserPokemon.evs];
            newEVs[index] = parseInt(event.target.value, 10);
            selectedUserPokemon.setEv(newEVs[index], index);
            setSelectedUserPokemon(prevState => ({ ...prevState, evs: newEVs }));
        }else{
            const newEVs = [...selectedEnemyPokemon.evs];
            newEVs[index] = parseInt(event.target.value, 10);
            selectedEnemyPokemon.setEv(newEVs[index], index);
            setSelectedEnemyPokemon(prevState => ({ ...prevState, evs: newEVs }));
        }

    };

    const selectMove = (user, move) => {
        console.log("Navigating to selected matchup with roster: ", move);
        const data={move: move, pokemon: user ? selectedUserPokemon.toJSON() : selectedEnemyPokemon.toJSON(), userRoster: userRoster.toJSON(), enemyRoster: enemyRoster.toJSON()}
        setData(data);
        setPath('/selectedMatchup/selectedMove')
        setNavigate(true)
    }



    const selectSpecie = (user, specie) => {
        const pokemonToAdd = new Pokemon(specie);
        if (user) {
            const alreadyExists = userRoster.teams[0].pokemons.some(pokemon => pokemon.specie.name === pokemonToAdd.specie.name);
            if (!alreadyExists) {
                userRoster.teams[0].replacePokemon(selectedUserPokemon, pokemonToAdd);
                setSelectedUserPokemon(pokemonToAdd);
                console.log(userRoster.teams[0].pokemons);
            }
        } else {
            const alreadyExists = enemyRoster.teams[0].pokemons.some(pokemon => pokemon.specie.name === pokemonToAdd.specie.name);
            if (!alreadyExists) {
                enemyRoster.teams[0].replacePokemon(selectedEnemyPokemon, pokemonToAdd);
                setSelectedEnemyPokemon(pokemonToAdd);
            }
        }
    }

    const MoveItem = ({ move, style, onClick }) => {
        return (
            <div onClick={onClick} style={{cursor: 'pointer'}}>
                {move && (
                    <div className="square-item" style={{border: `2px solid ${getColorForType(move.type)}`}}>
                        {move.name}<br/>
                        {`${move.power}/${move.accuracy}%/${move.pp}pp`}<br/>
                        {`${move.type}/${move.category}`}
                    </div>
                )}
            </div>
        );
    };


    function getColorForType(type) {
        switch (type) {
            case 'Normal':
                return 'gray';
            case 'Fire':
                return 'orange';
            case 'Water':
                return 'blue';
            case 'Electric':
                return 'yellow';
            case 'Grass':
                return 'green';
            case 'Ice':
                return 'lightblue';
            case 'Fighting':
                return 'red';
            case 'Poison':
                return 'purple';
            case 'Ground':
                return 'brown';
            case 'Flying':
                return 'skyblue';
            case 'Psychic':
                return 'pink';
            case 'Bug':
                return 'lime';
            case 'Rock':
                return 'sienna';
            case 'Ghost':
                return 'violet';
            case 'Dragon':
                return 'indigo';
            case 'Dark':
                return 'darkslategray';
            case 'Steel':
                return 'lightsteelblue';
            case 'Fairy':
                return 'orchid';
            default:
                return 'black'; // fallback color
        }
    }



    return (
        <div>
            {userRoster.species && (
                <div style={{
                    backgroundColor: '#302B2B',
                    textAlign: 'center',
                    minHeight: '100vh',
                    minWidth: '100vw', paddingTop: '10px', paddingBottom: '20px'}}>
                    <div style={{textAlign: 'center', display: 'flex'}}>
                        <div>
                            <h2 className={'text'} style={{marginLeft: '40px'}}>{userRoster.name}</h2>
                            <ul>
                                {userRoster && userRoster.species?.map((specie, index) =>
                                    <li key={index} className={'liii nameList'}  onClick={() => {
                                        selectSpecie(true, specie)
                                    }}>{specie.name}</li>
                                )}
                            </ul>
                        </div>

                        <div className={'container'}>
                            <div className={'vertical-line'}></div>
                        </div>


                        <div style={{textAlign: 'center'}}>
                            <h2 className={'text'} style={{marginLeft: '40px'}}>{userRoster.teams[0].name}</h2>
                            <ul>
                                {userRoster && userRoster.teams[0].pokemons.map((pokemon, index) =>
                                    <li key={index}
                                        className={selectedUserPokemon.specie.name === pokemon.specie.name ? 'liii nameList selectedPokemon' : 'liii nameList'}
                                        onClick={() => {
                                            setSelectedUserPokemon(pokemon)
                                        }}>
                                        {pokemon.specie.name}
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div>
                            <Card style={{
                                width: '100%',
                                padding: '20px'
                            }}>
                                <h1>{selectedUserPokemon.specie.name}</h1>
                                <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                                    <div style={{marginLeft: '10px'}}>
                                        <h4>Select Ability</h4>
                                        <AbilitySelect user={true}
                                                       defaultAbility={selectedUserPokemon.specie.abilities[0]}
                                                       abilities={selectedUserPokemon.specie.abilities}
                                                       onChange={handleNatureChange}/>
                                    </div>
                                    <div style={{marginLeft: '10px'}}>
                                        <h4>Select Nature</h4>
                                        <NatureSelect user={true} defaultNature={{
                                            label: selectedUserPokemon ? selectedUserPokemon.nature : '',
                                            value: selectedUserPokemon ? selectedUserPokemon.nature.toLowerCase() : ''
                                        }} onChange={handleNatureChange}/>
                                    </div>
                                    <div style={{marginLeft: '10px'}}>
                                        <h4>Select Item</h4>
                                        <ItemSelect onChange={handleItemChange}/>
                                    </div>
                                </div>

                                <div style={{display: 'flex'}}>
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
                                        <ul style={{listStyleType: 'none', padding: 0}}>
                                            {selectedUserPokemon && selectedUserPokemon.ivs?.map((iv, index) =>
                                                <li key={index} className='liii'>
                                                    <input
                                                        style={{width: '40px', marginLeft: '10px'}}
                                                        type="number"
                                                        value={iv}
                                                        size='2'
                                                        maxLength='2'
                                                        onChange={(event) => handleIVChange(true, index, iv, event)}
                                                    />
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    <div>
                                        <h2>EVs</h2>
                                        <ul style={{listStyleType: 'none', padding: 0}}>
                                            {selectedUserPokemon && selectedUserPokemon.evs?.map((ev, index) =>
                                                <li key={index} className='liii'>
                                                    <input
                                                        style={{width: '50px', marginLeft: '10px'}}
                                                        type="number"
                                                        value={ev}
                                                        size='3'
                                                        maxLength='3'
                                                        onChange={(event) => handleEVChange(true, index, ev, event)}
                                                    />
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    <div>
                                        <h2>Stats</h2>
                                        <ul style={{listStyleType: 'none', padding: 0}}>
                                            {selectedUserPokemon && selectedUserPokemon.stats?.map((stat, index) =>
                                                <li key={index}
                                                    style={{marginLeft: '10px', marginBottom: '13px'}}>{stat}</li>
                                            )}
                                        </ul>
                                    </div>
                                    <div className="square-container">
                                        <MoveItem move={selectedUserPokemon.moves[0]} onClick={() => {
                                            selectMove(true, selectedUserPokemon.moves[0]);
                                        }}/>
                                        <MoveItem move={selectedUserPokemon.moves[1]} onClick={() => {
                                            selectMove(true, selectedUserPokemon.moves[1]);
                                        }}/>
                                        <MoveItem move={selectedUserPokemon.moves[2]} onClick={() => {
                                            selectMove(true, selectedUserPokemon.moves[2]);
                                        }}/>
                                        <MoveItem move={selectedUserPokemon.moves[3]} onClick={() => {
                                            selectMove(true, selectedUserPokemon.moves[3]);
                                        }}/>
                                    </div>
                                </div>
                            </Card>

                            <Card style={{display: 'flex', width: '100%', padding: '20px'}}>
                                <h1>{selectedEnemyPokemon.specie.name}</h1>
                                <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                                    <div style={{marginLeft: '10px'}}>
                                        <h4>Select Ability</h4>
                                        <AbilitySelect user={false}
                                                       defaultAbility={selectedEnemyPokemon.specie.abilities[0]}
                                                       abilities={selectedEnemyPokemon.specie.abilities}
                                                       onChange={handleNatureChange}/>
                                    </div>
                                    <div style={{marginLeft: '10px'}}>
                                        <h4>Select Nature</h4>
                                        <NatureSelect user={false} defaultNature={{
                                            label: selectedEnemyPokemon ? selectedEnemyPokemon.nature : '',
                                            value: selectedEnemyPokemon ? selectedEnemyPokemon.nature.toLowerCase() : ''
                                        }} onChange={handleNatureChange}/>
                                    </div>
                                    <div style={{marginLeft: '10px'}}>
                                        <h4>Select Item</h4>
                                        <ItemSelect onChange={handleItemChange}/>
                                    </div>
                                </div>
                                <div style={{display: 'flex'}}>
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
                                        <ul style={{listStyleType: 'none', padding: 0}}>
                                            {selectedEnemyPokemon && selectedEnemyPokemon.ivs?.map((iv, index) =>
                                                <li key={index} className='liii'>
                                                    <input
                                                        style={{width: '40px', marginLeft: '10px'}}
                                                        type="number"
                                                        value={iv}
                                                        size='2'
                                                        maxLength='2'
                                                        onChange={(event) => handleIVChange(false, index, iv, event)}
                                                    />
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    <div>
                                        <h2>EVs</h2>
                                        <ul style={{listStyleType: 'none', padding: 0}}>
                                            {selectedEnemyPokemon && selectedEnemyPokemon.evs?.map((ev, index) =>
                                                <li key={index} className='liii'>
                                                    <input
                                                        style={{width: '50px', marginLeft: '10px'}}
                                                        type="number"
                                                        value={ev}
                                                        max='252'
                                                        onChange={(event) => handleEVChange(false, index, ev, event)}
                                                    />
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    <div>
                                        <h2>Stats</h2>
                                        <ul style={{listStyleType: 'none', padding: 0}}>
                                            {selectedEnemyPokemon && selectedEnemyPokemon.stats?.map((stat, index) =>
                                                <li key={index}
                                                    style={{marginLeft: '10px', marginBottom: '13px'}}>{stat}</li>
                                            )}
                                        </ul>
                                    </div>
                                    <div className="square-container">
                                        <MoveItem
                                            move={selectedEnemyPokemon.moves[0]}
                                            onClick={() => {
                                                selectMove(false, selectedEnemyPokemon.moves[0]);
                                            }}
                                        />
                                        <MoveItem
                                            move={selectedEnemyPokemon.moves[1]}
                                            onClick={() => {
                                                selectMove(false, selectedEnemyPokemon.moves[1]);
                                            }}
                                        />
                                        <MoveItem
                                            move={selectedEnemyPokemon.moves[2]}
                                            onClick={() => {
                                                selectMove(false, selectedEnemyPokemon.moves[2]);
                                            }}
                                        />
                                        <MoveItem
                                            move={selectedEnemyPokemon.moves[3]}
                                            onClick={() => {
                                                selectMove(false, selectedEnemyPokemon.moves[3]);
                                            }}
                                        />
                                    </div>


                                </div>
                            </Card>

                        </div>

                        <div>
                            <h2 className={'text'} style={{marginLeft: '40px'}}>{enemyRoster.teams[0].name}</h2>
                            <ul>
                                {enemyRoster && enemyRoster.teams[0].pokemons.map((pokemon, index) =>
                                    <li key={index}
                                        className={selectedEnemyPokemon.specie.name === pokemon.specie.name ? 'liii nameList selectedPokemon' : 'nameList liii'}
                                        onClick={() => {
                                            setSelectedEnemyPokemon(pokemon)
                                        }}>
                                        {pokemon.specie.name}
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className={'container'}>
                            <div className={'vertical-line'}></div>
                        </div>
                        <div>
                            <h2 className={'text'} style={{marginLeft: '40px'}}>{enemyRoster.name}</h2>
                            <ul>
                                {enemyRoster && enemyRoster.species?.map((specie, index) =>
                                    <li key={index} className={'liii nameList'} onClick={() => {
                                        selectSpecie(false, specie)
                                    }}>{specie.name}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            {navigate && <NavigateBackwards data={data} path={path}/>}
        </div>
    );
}

export default SelectedMatchup;