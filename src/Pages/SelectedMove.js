import React, { useState, useEffect } from "react";
import { Specie } from "../DataStructures/Specie";
import { Pokemon } from "../DataStructures/Pokemon";
import { loadTeams } from "../Composables/useDatabase";
import {Link, useLocation} from "react-router-dom";
import { Move } from "../DataStructures/Move";
import {Roster} from "../DataStructures/Roster";
import { NavigateBackwards } from "../Navigator";
import "../CSS/SelectedMove.css"
import {Slide, toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Components/Header";

const SelectedMove = (props) => {
    const location = useLocation();
    const { state } = location;

    const [slots, setSlots] = useState(12);
    const [movesSelected, setMovesSelected] = useState([]);
    const [emptySlots, setEmptySlots] = useState(0);
    const [allMoves, setAllMoves] = useState([
                new Move("Tackle", 40, 100, "Normal", "Physical", 35),
                new Move("Vine Whip", 45, 100, "Grass", "Physical", 25),
                new Move("Leech Seed", 0, 90, "Grass", "Status", 10),
                new Move("Razor Leaf", 55, 95, "Grass", "Physical", 25),
                new Move("Seed Bomb", 80, 100, "Grass", "Physical", 15),

                new Move("Scratch", 40, 100, "Normal", "Physical", 35),
                new Move("Ember", 40, 100, "Fire", "Special", 25),
                new Move("Leer", 0, 100, "Normal", "Status", 30),
                new Move("Flamethrower", 90, 100, "Fire", "Special", 15),
                new Move("Flame Charge", 50, 100, "Fire", "Physical", 20),
                new Move("Fire Blast", 110, 85, "Fire", "Special", 5),

                new Move("Bubble", 40, 100, "Water", "Special", 30),
                new Move("Water Gun", 40, 100, "Water", "Special", 25),
                new Move("Hydro Pump", 110, 80, "Water", "Special", 5),
                new Move("Surf", 90, 100, "Water", "Special", 15),
                new Move("Aqua Tail", 90, 90, "Water", "Physical", 10),

                new Move("Quick Attack", 40, 100, "Normal", "Physical", 30),
                new Move("Thunder Shock", 40, 100, "Electric", "Special", 30),
                new Move("Thunderbolt", 90, 100, "Electric", "Special", 15),
                new Move("Volt Tackle", 120, 100, "Electric", "Physical", 15),
                new Move("Thunder", 110, 70, "Electric", "Special", 10),
                new Move("Thunder Wave", 0, 90, "Electric", "Status", 20),

                new Move("Sing", 0, 55, "Normal", "Status", 15),
                new Move("Pound", 40, 100, "Normal", "Physical", 35),
                new Move("Double Slap", 15, 85, "Normal", "Physical", 10),
                new Move("Hyper Voice", 90, 100, "Normal", "Special", 10),
                new Move("Hyper Beam", 150, 90, "Normal", "Special", 5),
                new Move("Giga Impact", 150, 90, "Normal", "Physical", 5),

                new Move("Rest", 0, 0, "Normal", "Status", 10),
                new Move("Snore", 50, 100, "Normal", "Special", 15),
                new Move("Body Slam", 85, 100, "Normal", "Physical", 15),
                new Move("Crunch", 80, 100, "Dark", "Physical", 15),

                new Move("Bite", 60, 100, "Dark", "Physical", 25),
                new Move("Swift", 60, 0, "Normal", "Special", 20),
                new Move("Shadow Ball", 80, 100, "Ghost", "Special", 15),

                new Move("Psychic", 90, 100, "Psychic", "Special", 10),
                new Move("Psybeam", 65, 100, "Psychic", "Special", 20),
                new Move("Aura Sphere", 80, 0, "Fighting", "Special", 20),
                new Move("Psyshock", 80, 100, "Psychic", "Special", 10),
                new Move("Future Sight", 120, 100, "Psychic", "Special", 10),

                new Move("Dream Eater", 100, 100, "Psychic", "Special", 15),
                new Move("Night Shade", 0, 100, "Ghost", "Special", 15),
                new Move("Hypnosis", 0, 60, "Psychic", "Status", 20),
                new Move("Hex", 65, 100, "Ghost", "Special", 10),
                new Move("Dark Pulse", 80, 100, "Dark", "Special", 15),

                new Move("Dragon Claw", 80, 100, "Dragon", "Physical", 15),
                new Move("Hurricane", 110, 70, "Flying", "Special", 10),
                new Move("Fire Punch", 75, 100, "Fire", "Physical", 15),
                new Move("Dragon Pulse", 85, 100, "Dragon", "Special", 10),
                new Move("Dragon Rush", 100, 75, "Dragon", "Physical", 10),

                new Move("Metal Claw", 50, 95, "Steel", "Physical", 35),
                new Move("Close Combat", 120, 100, "Fighting", "Physical", 5),
                new Move("Flash Cannon", 80, 100, "Steel", "Special", 10),
                new Move("Extreme Speed", 80, 100, "Normal", "Physical", 5),
                new Move("Bone Rush", 25, 90, "Ground", "Physical", 10),

                new Move("Water Shuriken", 15, 100, "Water", "Physical", 20),
                new Move("Aerial Ace", 60, 0, "Flying", "Physical", 20),
                new Move("Ice Beam", 90, 100, "Ice", "Special", 10),
                new Move("Night Slash", 70, 100, "Dark", "Physical", 15),

                new Move("Bullet Punch", 40, 100, "Steel", "Physical", 30),
                new Move("X-Scissor", 80, 100, "Bug", "Physical", 15),
                new Move("Swords Dance", 0, 0, "Normal", "Status", 20),
                new Move("Iron Head", 80, 100, "Steel", "Physical", 15),
                new Move("Steel Wing", 70, 90, "Steel", "Physical", 25),
                new Move("Pursuit", 40, 100, "Dark", "Physical", 20),

                new Move("Focus Blast", 120, 70, "Fighting", "Special", 5),
                new Move("Calm Mind", 0, 0, "Psychic", "Status", 20),

                new Move("Karate Chop", 50, 100, "Fighting", "Physical", 25),
                new Move("Cross Chop", 100, 80, "Fighting", "Physical", 5),
                new Move("Earthquake", 100, 100, "Ground", "Physical", 10),
                new Move("Dynamic Punch", 100, 50, "Fighting", "Physical", 5),
                new Move("Bulk Up", 0, 0, "Fighting", "Status", 20),
                new Move("Knock Off", 65, 100, "Dark", "Physical", 20),

                new Move("Ice Fang", 65, 95, "Ice", "Physical", 15),

                new Move("Blizzard", 110, 70, "Ice", "Special", 5),
                new Move("Perish Song", 0, 0, "Normal", "Status", 5),

                new Move("Blaze Kick", 85, 90, "Fire", "Physical", 10),
                new Move("Sky Uppercut", 85, 90, "Fighting", "Physical", 15),
                new Move("Brave Bird", 120, 100, "Flying", "Physical", 15),
                new Move("Thunder Punch", 75, 100, "Electric", "Physical", 15),
                new Move("Blast Burn", 150, 90, "Fire", "Special", 5),

                new Move("Air Slash", 75, 95, "Flying", "Special", 15),
                new Move("Heat Wave", 95, 90, "Fire", "Special", 10),
                new Move("Solar Beam", 120, 100, "Grass", "Special", 10),

                new Move("Stone Edge", 100, 80, "Rock", "Physical", 5),
                new Move("Crunch", 80, 100, "Dark", "Physical", 15),
                new Move("Sandstorm", 0, 0, "Rock", "Status", 10),
    ]);
    const [availableMoves, setAvailableMoves]=useState([]);
    const [slotsSelected, setSlotsSelected] = useState([]);
    const [filteredMoves, setFilteredMoves] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [selectedMove, setSelectedMove] = useState([]);
    const [data, setData] = useState(null);
    const [navigate, setNavigate] = useState(false);
    const [path, setPath] = useState('');
    const [userRoster, setUserRoster] = useState(null);
    const [enemyRoster, setEnemyRoster]= useState(null);

    useEffect(() => {

        console.log('onLoad', state)

        const initialSelectedMove = state && state.data ? state.data.move : null;
        const initialSelectedPokemon = state && state.data ? Pokemon.fromJSON(state.data.pokemon) : [];
        const initialUserRoster = state && state.data  ? Roster.fromJSON(state.data.userRoster) : [];
        const initialEnemyRoster = state && state.data ? Roster.fromJSON(state.data.enemyRoster) : [];
        const initialMovesSelected= initialSelectedPokemon? initialSelectedPokemon.moves : null;
        const initialAvailableMoves= initialSelectedPokemon?  allMoves.filter((m)=>{return initialSelectedPokemon.specie.learnSet.some((m1)=>{return m1.name===m.name})}): null;
        const noDuplicateAvailableMoves=[];
        for (const i in initialAvailableMoves) {
            console.log(i)
            if(!noDuplicateAvailableMoves.some((m)=>{return initialAvailableMoves[i].name===m.name})){
                noDuplicateAvailableMoves.push(initialAvailableMoves[i]);
            }
        }

        setAvailableMoves(noDuplicateAvailableMoves);
        setFilteredMoves(noDuplicateAvailableMoves);
        setSelectedMove(initialSelectedMove);
        setSelectedPokemon(initialSelectedPokemon)
        setUserRoster(initialUserRoster);
        setEnemyRoster(initialEnemyRoster);
        setMovesSelected(initialMovesSelected)

    }, [allMoves]);

    const selectSlot = (move) => {
        if(movesSelected.some((m)=>{return m.name===move.name})){
            toast.warn('Move Already Selected', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
                toastId: "customId"
            });
            return
        }
        toast.dismiss()
        let indexToReplace= movesSelected.findIndex((m)=>{return m.name===selectedMove.name});
        let tempMoves=movesSelected;
        tempMoves[indexToReplace]=move;
        setMovesSelected(tempMoves)
        setSelectedMove(move)

    };

    const handleSearchInputChange = (event) => {
        const searchInput = event.target.value.toLowerCase();
        const filteredMoves = availableMoves.filter((move) =>
            move.name.toLowerCase().includes(searchInput) || move.type.toLowerCase().includes(searchInput) || move.accuracy.toString().includes(searchInput) || move.power.toString().includes(searchInput)
        );
        setSearchInput(searchInput);
        setFilteredMoves(filteredMoves);
    };

    const MoveItem = ({ move }) => {
        return (
            <div>
                {move && (
                    <div className={selectedMove.name === move.name ? "SelectedMove square-item" : "square-item"} style={{ border: `2px solid ${getColorForType(move.type)}` }} onClick={() => handleMoveSelect(move)}>
                        {move.name}
                        <br />
                        {`${move.power}/${move.accuracy}%/${move.pp}pp`}
                        <br />
                        {`${move.type}/${move.category}`}
                    </div>
                )}
            </div>
        );
    };

    const getColorForType = (type) => {
        switch (type) {
            case "Normal":
                return "gray";
            case "Fire":
                return "orange";
            case "Water":
                return "blue";
            case "Electric":
                return "yellow";
            case "Grass":
                return "green";
            case "Ice":
                return "lightblue";
            case "Fighting":
                return "red";
            case "Poison":
                return "purple";
            case "Ground":
                return "brown";
            case "Flying":
                return "skyblue";
            case "Psychic":
                return "pink";
            case "Bug":
                return "lime";
            case "Rock":
                return "sienna";
            case "Ghost":
                return "violet";
            case "Dragon":
                return "indigo";
            case "Dark":
                return "darkslategray";
            case "Steel":
                return "lightsteelblue";
            case "Fairy":
                return "orchid";
            default:
                return "black";
        }
    };

    const handleSave = () =>{
        console.log(userRoster)
        const data={userRoster: userRoster.toJSON(), enemyRoster: enemyRoster.toJSON()}
        setData(data);
        setPath('/selectedMatchup')
        setNavigate(true)
    }

    const handleMoveSelect = (move) => {
        setSelectedMove(move);
        console.log(move, selectedMove);
    }

    const navBarBehaviourM=[
        ()=>{handleSave()},
        ()=>{}
    ];

    return (
        <>
            <Header navBarBehaviour={navBarBehaviourM}></Header>
            {selectedPokemon && (
        <div style={{ backgroundColor: "#302B2B", textAlign: "center", minHeight: "100vh", paddingTop: "20px", paddingBottom: "20px" }}>
            <div style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
                <div
                    style={{
                        padding: "3px",
                        border: "2px solid white",
                        borderRadius: "10px",
                        backgroundColor: "#302B2B",
                        textAlign: "center",
                        maxHeight: "90vh",
                        minWidth: "25vw"
                    }}
                >
                    <h2 className="text">Choose Moves</h2>
                    <input
                        type="text"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        placeholder="Search for a move..."
                        style={{ marginBottom: "20px", padding: "8px", width: "100%", boxSizing: "border-box" }}
                    />

                    <ul style={{ listStyle: "none", padding: 0, marginTop: "5px", overflow: "auto", maxHeight: "70vh" }}>
                        {filteredMoves.map((move, index) => (
                            <li className="i li" key={index} onClick={() => selectSlot(move)} style={{ margin: "20px 10px", cursor: "pointer" }}>
                                {move.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ marginLeft: "80px", minWidth: "25vw" }}>
                    <h2 className="text">{selectedPokemon.specie.name}</h2>
                    <div className="square-container">
                        {movesSelected.map((move, index) => (
                            <MoveItem key={index} move={move}/>
                        ))}
                    </div>
                </div>
            </div>

            <h2 onClick={handleSave} className={'link'}>
                save
            </h2>
        </div>
            )}
            {navigate && <NavigateBackwards data={data} path={path} />}
            <ToastContainer/>
        </>

    );
};

export default SelectedMove;
