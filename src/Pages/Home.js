import React from "react";
//import { loadrosters } from "../Composables/useDatabase.js"
import {Link} from 'react-router-dom'
//import { Rosters } from "../Composables/useRosters.js"
import "../CSS/Home.css"
import {Specie} from "../DataStructures/Specie";
import {Roster} from "../DataStructures/Roster";
import NavigateToMatchup from "../Navigator";
import * as state from "../Composables/useRosters";

const speciesList = [
    new Specie(
        "Bulbasaur",
        "https://pokeapi.co/api/v2/pokemon/1/",
        { hp: 45, attack: 49, defense: 49, speed: 45 },
        ["Tackle", "Vine Whip", "Leech Seed", "Razor Leaf"],
        ["Grass", "Poison"],
        1,
        ["Overgrow", "Chlorophyll"]
    ),
    new Specie(
        "Charmander",
        "https://pokeapi.co/api/v2/pokemon/4/",
        { hp: 39, attack: 52, defense: 43, speed: 65 },
        ["Scratch", "Ember", "Leer", "Flamethrower"],
        ["Fire"],
        4,
        ["Blaze", "Solar Power"]
    ),
    new Specie(
        "Squirtle",
        "https://pokeapi.co/api/v2/pokemon/7/",
        { hp: 44, attack: 48, defense: 65, speed: 43 },
        ["Tackle", "Bubble", "Water Gun", "Hydro Pump"],
        ["Water"],
        7,
        ["Torrent", "Rain Dish"]
    ),
    new Specie(
        "Pikachu",
        "https://pokeapi.co/api/v2/pokemon/25/",
        { hp: 35, attack: 55, defense: 40, speed: 90 },
        ["Quick Attack", "Thunder Shock", "Thunderbolt", "Volt Tackle"],
        ["Electric"],
        25,
        ["Static", "Lightning Rod"]
    ),
    new Specie(
        "Jigglypuff",
        "https://pokeapi.co/api/v2/pokemon/39/",
        { hp: 115, attack: 45, defense: 20, speed: 20 },
        ["Sing", "Pound", "Double Slap", "Hyper Voice"],
        ["Normal", "Fairy"],
        39,
        ["Cute Charm", "Competitive"]
    ),
    new Specie(
        "Snorlax",
        "https://pokeapi.co/api/v2/pokemon/143/",
        { hp: 160, attack: 110, defense: 65, speed: 30 },
        ["Rest", "Snore", "Body Slam", "Hyper Beam"],
        ["Normal"],
        143,
        ["Immunity", "Thick Fat"]
    ),
    new Specie(
        "Eevee",
        "https://pokeapi.co/api/v2/pokemon/133/",
        { hp: 55, attack: 55, defense: 50, speed: 55 },
        ["Tackle", "Quick Attack", "Bite", "Swift"],
        ["Normal"],
        133,
        ["Run Away", "Adaptability"]
    ),
    new Specie(
        "Mewtwo",
        "https://pokeapi.co/api/v2/pokemon/150/",
        { hp: 106, attack: 110, defense: 90, speed: 130 },
        ["Psychic", "Psybeam", "Shadow Ball", "Aura Sphere"],
        ["Psychic"],
        150,
        ["Pressure", "Unnerve"]
    ),
    new Specie(
        "Gengar",
        "https://pokeapi.co/api/v2/pokemon/94/",
        { hp: 60, attack: 65, defense: 60, speed: 110 },
        ["Lick", "Shadow Punch", "Shadow Ball", "Dream Eater"],
        ["Ghost", "Poison"],
        94,
        ["Levitate"]
    ),
    new Specie(
        "Dragonite",
        "https://pokeapi.co/api/v2/pokemon/149/",
        { hp: 91, attack: 134, defense: 95, speed: 80 },
        ["Wing Attack", "Dragon Claw", "Hyper Beam", "Outrage"],
        ["Dragon", "Flying"],
        149,
        ["Inner Focus", "Multiscale"]
    ),
    new Specie(
        "Lucario",
        "https://pokeapi.co/api/v2/pokemon/448/",
        { hp: 70, attack: 110, defense: 70, speed: 90 },
        ["Metal Claw", "Aura Sphere", "Close Combat", "Flash Cannon"],
        ["Fighting", "Steel"],
        448,
        ["Steadfast", "Inner Focus"]
    ),
    new Specie(
        "Greninja",
        "https://pokeapi.co/api/v2/pokemon/658/",
        { hp: 72, attack: 95, defense: 67, speed: 122 },
        ["Water Shuriken", "Aerial Ace", "Dark Pulse", "Hydro Pump"],
        ["Water", "Dark"],
        658,
        ["Torrent", "Protean"]
    ),
    new Specie(
        "Scizor",
        "https://pokeapi.co/api/v2/pokemon/212/",
        { hp: 70, attack: 130, defense: 100, speed: 65 },
        ["Bullet Punch", "X-Scissor", "Swords Dance", "Iron Head"],
        ["Bug", "Steel"],
        212,
        ["Swarm", "Technician"]
    ),
    new Specie(
        "Alakazam",
        "https://pokeapi.co/api/v2/pokemon/65/",
        { hp: 55, attack: 50, defense: 45, speed: 120 },
        ["Psybeam", "Psychic", "Focus Blast", "Shadow Ball"],
        ["Psychic"],
        65,
        ["Synchronize", "Inner Focus"]
    ),
    new Specie(
        "Machamp",
        "https://pokeapi.co/api/v2/pokemon/68/",
        { hp: 90, attack: 130, defense: 80, speed: 55 },
        ["Karate Chop", "Cross Chop", "Earthquake", "Dynamic Punch"],
        ["Fighting"],
        68,
        ["Guts", "No Guard"]
    ),
    new Specie(
        "Gyarados",
        "https://pokeapi.co/api/v2/pokemon/130/",
        { hp: 95, attack: 125, defense: 79, speed: 81 },
        ["Bite", "Dragon Rage", "Hydro Pump", "Hyper Beam"],
        ["Water", "Flying"],
        130,
        ["Intimidate", "Moxie"]
    ),
    new Specie(
        "Lapras",
        "https://pokeapi.co/api/v2/pokemon/131/",
        { hp: 130, attack: 85, defense: 80, speed: 60 },
        ["Sing", "Ice Beam", "Body Slam", "Hydro Pump"],
        ["Water", "Ice"],
        131,
        ["Water Absorb", "Shell Armor"]
    ),
    new Specie(
        "Blaziken",
        "https://pokeapi.co/api/v2/pokemon/257/",
        { hp: 80, attack: 120, defense: 70, speed: 80 },
        ["Blaze Kick", "Sky Uppercut", "Flamethrower", "Brave Bird"],
        ["Fire", "Fighting"],
        257,
        ["Blaze", "Speed Boost"]
    ),
    new Specie(
        "Charizard",
        "https://pokeapi.co/api/v2/pokemon/6/",
        { hp: 78, attack: 84, defense: 78, speed: 100 },
        ["Flamethrower", "Fire Blast", "Dragon Claw", "Air Slash"],
        ["Fire", "Flying"],
        6,
        ["Blaze", "Solar Power"]
    ),
    new Specie(
        "Garchomp",
        "https://pokeapi.co/api/v2/pokemon/445/",
        { hp: 108, attack: 130, defense: 95, speed: 102 },
        ["Dragon Claw", "Earthquake", "Stone Edge", "Fire Fang"],
        ["Dragon", "Ground"],
        445,
        ["Sand Veil", "Rough Skin"]
    ),
];

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slots: 12,
            rostersSelected: [],
            emptySlots: 0,
            rosters: [
                new Roster("Roster 1", speciesList.slice(0, 8)),
                new Roster("Roster 2", speciesList.slice(2, 10)),
                new Roster("Roster 3", speciesList.slice(4, 14)),
                new Roster("Roster 4", speciesList.slice(6, 16)),
                new Roster("Roster 5", speciesList.slice(8, 18)),
                new Roster("Roster 6", speciesList.slice(10, 20))
            ],
            navigate: false,
            path:''
        }
    }

    componentDidMount() {
        //loadrosters();
        this.setState({
            emptySlots: this.state.slots - (this.state.rosters ? this.state.rosters.length : 0)
        });
    }

    selectRoster = (roster) => {
        this.setState((prevState) => {
            let newRostersSelected;
            if (prevState.rostersSelected.includes(roster)) {
                newRostersSelected = prevState.rostersSelected.filter(r => r !== roster);
            } else {
                newRostersSelected = [...prevState.rostersSelected, roster];
            }
            if (newRostersSelected.length === 2) {
                console.log("Navigating to selected matchup with roster: ", newRostersSelected);
                return { rostersSelected: newRostersSelected, navigate: true, path: '/selectedMatchup' };
            }
            return { rostersSelected: newRostersSelected };
        });
    }

    render() {
       const { emptySlots, rostersSelected, rosters, navigate, path } = this.state;
       return (
           <div style={{backgroundColor: '#302B2B', textAlign: 'center', minHeight: '100vh', paddingTop: '20px', paddingBottom: '20px'}}>
               <h1 className={'text'}>Welcome to DraftDex</h1>
               <h3 className={'text'}>
                   Select two rosters to begin comparing or
                   Create a new roster to add to the draft
               </h3>
               <ul style={{columns: '3', marginTop: '5%'}}>
                   {rosters && rosters.map((roster, index) =>
                       <li className={rostersSelected.includes(roster) ? 'lii highlighted' : 'lii'}
                       onClick={() => {
                           this.selectRoster(roster);
                       }} key={index}>
                           {roster.name}
                       </li>
                   )}
                   {Array.from(Array(emptySlots)).map((_, index) => (
                       <li className='lii' key={index}>
                           <Link to="/createRoster" className={'link'}>+ New Roster</Link>
                       </li>
                   ))}
               </ul>
               {navigate && <NavigateToMatchup rostersSelected={rostersSelected} path={path} />}
           </div>
       );
    }
}


export default Home;