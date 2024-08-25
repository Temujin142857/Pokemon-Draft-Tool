import React, {useEffect, useState} from "react";
//import { loadrosters } from "../Composables/useDatabase.js"
import {Link, useLocation, useNavigate} from 'react-router-dom'
//import { Rosters } from "../Composables/useRosters.js"
import "../CSS/Home.css"
import {Specie} from "../DataStructures/Specie";
import {Roster} from "../DataStructures/Roster";
import {Move} from "../DataStructures/Move";
import {Ability} from "../DataStructures/Ability";
import {NavigateForwards} from "../Navigator";
import * as state from "../Composables/useRosters";
import Header from "../Components/Header";
import {getL, swapLNG} from "../Composables/useLexicon";


const speciesList = [
    new Specie(
        "Bulbasaur",
        "https://pokeapi.co/api/v2/pokemon/1/",
        [45, 49, 49, 65, 65, 45], // [hp, attack, defense, special attack, special defense, speed]
        [
            new Move("Tackle", 40, 100, "Normal", "Physical", 35),
            new Move("Vine Whip", 45, 100, "Grass", "Physical", 25),
            new Move("Leech Seed", 0, 90, "Grass", "Status", 10),
            new Move("Razor Leaf", 55, 95, "Grass", "Physical", 25),
            new Move("Solar Beam", 120, 100, "Grass", "Special", 10),
            new Move("Seed Bomb", 80, 100, "Grass", "Physical", 15)
        ],
        ["Grass", "Poison"],
        1,
        [
            new Ability("Overgrow", "Powers up Grass-type moves in a pinch."),
            new Ability("Chlorophyll", "Boosts the Pokémon's Speed stat in harsh sunlight.")
        ]
    ),
    new Specie(
        "Charmander",
        "https://pokeapi.co/api/v2/pokemon/4/",
        [39, 52, 43, 60, 50, 65],
        [
            new Move("Scratch", 40, 100, "Normal", "Physical", 35),
            new Move("Ember", 40, 100, "Fire", "Special", 25),
            new Move("Leer", 0, 100, "Normal", "Status", 30),
            new Move("Flamethrower", 90, 100, "Fire", "Special", 15),
            new Move("Flame Charge", 50, 100, "Fire", "Physical", 20),
            new Move("Fire Blast", 110, 85, "Fire", "Special", 5)
        ],
        ["Fire"],
        4,
        [
            new Ability("Blaze", "Powers up Fire-type moves in a pinch."),
            new Ability("Solar Power", "Boosts Sp. Atk, but lowers HP in harsh sunlight.")
        ]
    ),
    new Specie(
        "Squirtle",
        "https://pokeapi.co/api/v2/pokemon/7/",
        [44, 48, 65, 50, 64, 43],
        [
            new Move("Tackle", 40, 100, "Normal", "Physical", 35),
            new Move("Bubble", 40, 100, "Water", "Special", 30),
            new Move("Water Gun", 40, 100, "Water", "Special", 25),
            new Move("Hydro Pump", 110, 80, "Water", "Special", 5),
            new Move("Surf", 90, 100, "Water", "Special", 15),
            new Move("Aqua Tail", 90, 90, "Water", "Physical", 10)
        ],
        ["Water"],
        7,
        [
            new Ability("Torrent", "Powers up Water-type moves in a pinch."),
            new Ability("Rain Dish", "The Pokémon gradually recovers HP in rain.")
        ]
    ),
    new Specie(
        "Pikachu",
        "https://pokeapi.co/api/v2/pokemon/25/",
        [35, 55, 40, 50, 50, 90],
        [
            new Move("Quick Attack", 40, 100, "Normal", "Physical", 30),
            new Move("Thunder Shock", 40, 100, "Electric", "Special", 30),
            new Move("Thunderbolt", 90, 100, "Electric", "Special", 15),
            new Move("Volt Tackle", 120, 100, "Electric", "Physical", 15),
            new Move("Thunder", 110, 70, "Electric", "Special", 10),
            new Move("Thunder Wave", 0, 90, "Electric", "Status", 20)
        ],
        ["Electric"],
        25,
        [
            new Ability("Static", "May cause paralysis if touched."),
            new Ability("Lightning Rod", "Draws in all Electric-type moves to up Sp. Attack.")
        ]
    ),
    new Specie(
        "Jigglypuff",
        "https://pokeapi.co/api/v2/pokemon/39/",
        [115, 45, 20, 45, 25, 20],
        [
            new Move("Sing", 0, 55, "Normal", "Status", 15),
            new Move("Pound", 40, 100, "Normal", "Physical", 35),
            new Move("Double Slap", 15, 85, "Normal", "Physical", 10),
            new Move("Hyper Voice", 90, 100, "Normal", "Special", 10),
            new Move("Hyper Beam", 150, 90, "Normal", "Special", 5),
            new Move("Giga Impact", 150, 90, "Normal", "Physical", 5)
        ],
        ["Normal", "Fairy"],
        39,
        [
            new Ability("Cute Charm", "Contact with the Pokémon may cause infatuation."),
            new Ability("Competitive", "Boosts the Pokémon's Special Attack stat sharply when its stats are lowered.")
        ]
    ),
    new Specie(
        "Snorlax",
        "https://pokeapi.co/api/v2/pokemon/143/",
        [160, 110, 65, 65, 110, 30],
        [
            new Move("Rest", 0, 0, "Normal", "Status", 10),
            new Move("Snore", 50, 100, "Normal", "Special", 15),
            new Move("Body Slam", 85, 100, "Normal", "Physical", 15),
            new Move("Hyper Beam", 150, 90, "Normal", "Special", 5),
            new Move("Giga Impact", 150, 90, "Normal", "Physical", 5),
            new Move("Crunch", 80, 100, "Dark", "Physical", 15)
        ],
        ["Normal"],
        143,
        [
            new Ability("Immunity", "Prevents the Pokémon from getting poisoned."),
            new Ability("Thick Fat", "The Pokémon is protected by a layer of thick fat, which halves the damage taken from Fire- and Ice-type moves.")
        ]
    ),
    new Specie(
        "Eevee",
        "https://pokeapi.co/api/v2/pokemon/133/",
        [55, 55, 50, 45, 65, 55],
        [
            new Move("Tackle", 40, 100, "Normal", "Physical", 35),
            new Move("Quick Attack", 40, 100, "Normal", "Physical", 30),
            new Move("Bite", 60, 100, "Dark", "Physical", 25),
            new Move("Swift", 60, 0, "Normal", "Special", 20),
            new Move("Hyper Beam", 150, 90, "Normal", "Special", 5),
            new Move("Shadow Ball", 80, 100, "Ghost", "Special", 15)
        ],
        ["Normal"],
        133,
        [
            new Ability("Run Away", "Enables a sure getaway from wild Pokémon."),
            new Ability("Adaptability", "Powers up moves of the same type as the Pokémon.")
        ]
    ),
    new Specie(
        "Mewtwo",
        "https://pokeapi.co/api/v2/pokemon/150/",
        [106, 110, 90, 154, 90, 130],
        [
            new Move("Psychic", 90, 100, "Psychic", "Special", 10),
            new Move("Psybeam", 65, 100, "Psychic", "Special", 20),
            new Move("Shadow Ball", 80, 100, "Ghost", "Special", 15),
            new Move("Aura Sphere", 80, 0, "Fighting", "Special", 20),
            new Move("Psyshock", 80, 100, "Psychic", "Special", 10),
            new Move("Future Sight", 120, 100, "Psychic", "Special", 10)
        ],
        ["Psychic"],
        150,
        [
            new Ability("Pressure", "By putting pressure on the opposing Pokémon, it raises their PP usage."),
            new Ability("Unnerve", "Makes the opposing Pokémon unable to eat Berries.")
        ]
    ),
    new Specie(
        "Gengar",
        "https://pokeapi.co/api/v2/pokemon/94/",
        [60, 65, 60, 130, 75, 110],
        [
            new Move("Shadow Ball", 80, 100, "Ghost", "Special", 15),
            new Move("Dream Eater", 100, 100, "Psychic", "Special", 15),
            new Move("Night Shade", 0, 100, "Ghost", "Special", 15),
            new Move("Hypnosis", 0, 60, "Psychic", "Status", 20),
            new Move("Hex", 65, 100, "Ghost", "Special", 10),
            new Move("Dark Pulse", 80, 100, "Dark", "Special", 15)
        ],
        ["Ghost", "Poison"],
        94,
        [
            new Ability("Cursed Body", "May disable a move used on the Pokémon."),
            new Ability("Levitate", "Gives full immunity to all Ground-type moves.")
        ]
    ),
    new Specie(
        "Dragonite",
        "https://pokeapi.co/api/v2/pokemon/149/",
        [91, 134, 95, 100, 100, 80],
        [
            new Move("Dragon Claw", 80, 100, "Dragon", "Physical", 15),
            new Move("Hurricane", 110, 70, "Flying", "Special", 10),
            new Move("Fire Punch", 75, 100, "Fire", "Physical", 15),
            new Move("Aqua Tail", 90, 90, "Water", "Physical", 10),
            new Move("Dragon Pulse", 85, 100, "Dragon", "Special", 10),
            new Move("Dragon Rush", 100, 75, "Dragon", "Physical", 10)
        ],
        ["Dragon", "Flying"],
        149,
        [
            new Ability("Inner Focus", "The Pokémon's intensely focused, and that protects the Pokémon from flinching."),
            new Ability("Multiscale", "Reduces the amount of damage the Pokémon takes while its HP is full.")
        ]
    ),
    new Specie(
        "Lucario",
        "https://pokeapi.co/api/v2/pokemon/448/",
        [70, 110, 70, 115, 70, 90],
        [
            new Move("Metal Claw", 50, 95, "Steel", "Physical", 35),
            new Move("Aura Sphere", 80, 0, "Fighting", "Special", 20),
            new Move("Close Combat", 120, 100, "Fighting", "Physical", 5),
            new Move("Flash Cannon", 80, 100, "Steel", "Special", 10),
            new Move("Extreme Speed", 80, 100, "Normal", "Physical", 5),
            new Move("Bone Rush", 25, 90, "Ground", "Physical", 10)
        ],
        ["Fighting", "Steel"],
        448,
        [
            new Ability("Steadfast", "Raises Speed each time the Pokémon flinches."),
            new Ability("Inner Focus", "The Pokémon's intensely focused, and that protects the Pokémon from flinching.")
        ]
    ),
    new Specie(
        "Greninja",
        "https://pokeapi.co/api/v2/pokemon/658/",
        [72, 95, 67, 103, 71, 122],
        [
            new Move("Water Shuriken", 15, 100, "Water", "Physical", 20),
            new Move("Aerial Ace", 60, 0, "Flying", "Physical", 20),
            new Move("Dark Pulse", 80, 100, "Dark", "Special", 15),
            new Move("Hydro Pump", 110, 80, "Water", "Special", 5),
            new Move("Ice Beam", 90, 100, "Ice", "Special", 10),
            new Move("Night Slash", 70, 100, "Dark", "Physical", 15)
        ],
        ["Water", "Dark"],
        658,
        [
            new Ability("Torrent", "Powers up Water-type moves in a pinch."),
            new Ability("Protean", "Changes the Pokémon's type to the type of the move it's about to use.")
        ]
    ),
    new Specie(
        "Scizor",
        "https://pokeapi.co/api/v2/pokemon/212/",
        [70, 130, 100, 55, 80, 65],
        [
            new Move("Bullet Punch", 40, 100, "Steel", "Physical", 30),
            new Move("X-Scissor", 80, 100, "Bug", "Physical", 15),
            new Move("Swords Dance", 0, 0, "Normal", "Status", 20),
            new Move("Iron Head", 80, 100, "Steel", "Physical", 15),
            new Move("Steel Wing", 70, 90, "Steel", "Physical", 25),
            new Move("Pursuit", 40, 100, "Dark", "Physical", 20)
        ],
        ["Bug", "Steel"],
        212,
        [
            new Ability("Swarm", "Powers up Bug-type moves in a pinch."),
            new Ability("Technician", "Powers up the Pokémon's weaker moves.")
        ]
    ),
    new Specie(
        "Alakazam",
        "https://pokeapi.co/api/v2/pokemon/65/",
        [55, 50, 45, 135, 85, 120],
        [
            new Move("Psybeam", 65, 100, "Psychic", "Special", 20),
            new Move("Psychic", 90, 100, "Psychic", "Special", 10),
            new Move("Focus Blast", 120, 70, "Fighting", "Special", 5),
            new Move("Shadow Ball", 80, 100, "Ghost", "Special", 15),
            new Move("Future Sight", 120, 100, "Psychic", "Special", 10),
            new Move("Calm Mind", 0, 0, "Psychic", "Status", 20)
        ],
        ["Psychic"],
        65,
        [
            new Ability("Synchronize", "Passes on a burn, poison, or paralysis to the foe."),
            new Ability("Inner Focus", "The Pokémon's intensely focused, and that protects the Pokémon from flinching.")
        ]
    ),
    new Specie(
        "Machamp",
        "https://pokeapi.co/api/v2/pokemon/68/",
        [90, 130, 80, 65, 85, 55],
        [
            new Move("Karate Chop", 50, 100, "Fighting", "Physical", 25),
            new Move("Cross Chop", 100, 80, "Fighting", "Physical", 5),
            new Move("Earthquake", 100, 100, "Ground", "Physical", 10),
            new Move("Dynamic Punch", 100, 50, "Fighting", "Physical", 5),
            new Move("Bulk Up", 0, 0, "Fighting", "Status", 20),
            new Move("Knock Off", 65, 100, "Dark", "Physical", 20)
        ],
        ["Fighting"],
        68,
        [
            new Ability("Guts", "Boosts the Attack stat if the Pokémon has a status condition."),
            new Ability("No Guard", "Ensures attacks by or against the Pokémon land.")
        ]
    ),
    new Specie(
        "Gyarados",
        "https://pokeapi.co/api/v2/pokemon/130/",
        [95, 125, 79, 60, 100, 81],
        [
            new Move("Bite", 60, 100, "Dark", "Physical", 25),
            new Move("Dragon Rage", 0, 100, "Dragon", "Special", 10),
            new Move("Hydro Pump", 110, 80, "Water", "Special", 5),
            new Move("Hyper Beam", 150, 90, "Normal", "Special", 5),
            new Move("Ice Fang", 65, 95, "Ice", "Physical", 15),
            new Move("Aqua Tail", 90, 90, "Water", "Physical", 10)
        ],
        ["Water", "Flying"],
        130,
        [
            new Ability("Intimidate", "Lowers the foe's Attack stat."),
            new Ability("Moxie", "The Pokémon shows moxie, and that boosts the Attack stat after knocking out any Pokémon.")
        ]
    ),
    new Specie(
        "Lapras",
        "https://pokeapi.co/api/v2/pokemon/131/",
        [130, 85, 80, 85, 95, 60],
        [
            new Move("Sing", 0, 55, "Normal", "Status", 15),
            new Move("Ice Beam", 90, 100, "Ice", "Special", 10),
            new Move("Body Slam", 85, 100, "Normal", "Physical", 15),
            new Move("Hydro Pump", 110, 80, "Water", "Special", 5),
            new Move("Blizzard", 110, 70, "Ice", "Special", 5),
            new Move("Perish Song", 0, 0, "Normal", "Status", 5)
        ],
        ["Water", "Ice"],
        131,
        [
            new Ability("Water Absorb", "Restores HP if hit by a Water-type move, instead of taking damage."),
            new Ability("Shell Armor", "Protects the Pokémon from critical hits.")
        ]
    ),
    new Specie(
        "Blaziken",
        "https://pokeapi.co/api/v2/pokemon/257/",
        [80, 120, 70, 110, 70, 80],
        [
            new Move("Blaze Kick", 85, 90, "Fire", "Physical", 10),
            new Move("Sky Uppercut", 85, 90, "Fighting", "Physical", 15),
            new Move("Flamethrower", 90, 100, "Fire", "Special", 15),
            new Move("Brave Bird", 120, 100, "Flying", "Physical", 15),
            new Move("Thunder Punch", 75, 100, "Electric", "Physical", 15),
            new Move("Blast Burn", 150, 90, "Fire", "Special", 5)
        ],
        ["Fire", "Fighting"],
        257,
        [
            new Ability("Blaze", "Powers up Fire-type moves in a pinch."),
            new Ability("Speed Boost", "Boosts the Pokémon's Speed stat each turn.")
        ]
    ),
    new Specie(
        "Charizard",
        "https://pokeapi.co/api/v2/pokemon/6/",
        [78, 84, 78, 109, 85, 100],
        [
            new Move("Flamethrower", 90, 100, "Fire", "Special", 15),
            new Move("Fire Blast", 110, 85, "Fire", "Special", 5),
            new Move("Dragon Claw", 80, 100, "Dragon", "Physical", 15),
            new Move("Air Slash", 75, 95, "Flying", "Special", 15),
            new Move("Heat Wave", 95, 90, "Fire", "Special", 10),
            new Move("Solar Beam", 120, 100, "Grass", "Special", 10)
        ],
        ["Fire", "Flying"],
        6,
        [
            new Ability("Blaze", "Powers up Fire-type moves in a pinch."),
            new Ability("Solar Power", "Boosts Sp. Atk, but lowers HP in harsh sunlight.")
        ]
    ),
    new Specie(
        "Garchomp",
        "https://pokeapi.co/api/v2/pokemon/445/",
        [108, 130, 95, 80, 85, 102],
        [
            new Move("Dragon Claw", 80, 100, "Dragon", "Physical", 15),
            new Move("Earthquake", 100, 100, "Ground", "Physical", 10),
            new Move("Stone Edge", 100, 80, "Rock", "Physical", 5),
            new Move("Fire Fang", 65, 95, "Fire", "Physical", 15),
            new Move("Crunch", 80, 100, "Dark", "Physical", 15),
            new Move("Sandstorm", 0, 0, "Rock", "Status", 10)
        ],
        ["Dragon", "Ground"],
        445,
        [
            new Ability("Sand Veil", "Boosts the Pokémon's evasion in a sandstorm."),
            new Ability("Rough Skin", "Inflicts damage to the attacker on contact with this Pokémon.")
        ]
    )
];


const Home = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const passedData = location.state;

    const [slots, setSlots] = useState(12);
    const [rostersSelected, setRostersSelected] = useState([]);
    const [emptySlots, setEmptySlots] = useState(0);
    const [rosters, setRosters] = useState([
        new Roster("Roster 1", speciesList.slice(0, 8)),
        new Roster("Roster 2", speciesList.slice(2, 10)),
        new Roster("Roster 3", speciesList.slice(4, 14)),
        new Roster("Roster 4", speciesList.slice(6, 16)),
        new Roster("Roster 5", speciesList.slice(8, 18)),
        new Roster("Roster 6", speciesList.slice(10, 20))
    ]);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [path, setPath] = useState('');
    const [text, setText] = useState({
        homeHeader: "Welcome to DraftDex",
        homeHeader2: "Select two rosters to begin comparing or create a new roster to add to the draft",
        newRoster: "+ New Roster",
        socialTab: "Social Tab"
    });
    const [newRoster, setNewRoster] = useState(Roster.fromJSON(passedData));
    const [data, setData]=useState([])

    useEffect(() => {
        console.log(newRoster)
        const newRosters = [...rosters];  // Create a copy of the rosters array

        if (newRoster) {
            newRosters.push(newRoster);  // Add the new roster if it exists
        }
        console.log(newRosters);

        setEmptySlots(slots - newRosters.length);
        setRosters(newRosters);

        console.log("new roster", newRoster);
    }, []);

    const selectRoster = (roster) => {
        let newRostersSelected;
        if (rostersSelected.includes(roster)) {
            newRostersSelected = rostersSelected.filter(r => r !== roster);
        } else {
            newRostersSelected = [...rostersSelected, roster];
        }

        if (newRostersSelected.length === 2) {
            console.log("Navigating to selected matchup with roster: ", newRostersSelected);
            setData({ userRoster: newRostersSelected[0].toJSON(), enemyRoster: newRostersSelected[1].toJSON() });
            setShouldNavigate(true);
            setPath('/selectedMatchup');
            // Assuming there's some navigation logic here
        }

        setRostersSelected(newRostersSelected);
    };

    const goToSocial = () => {
        setShouldNavigate(true);
        setPath('/social');
    };

    const languageSwap = () => {
        setText(prevText => swapLNG(prevText));
    };

    return (
        <div style={{ backgroundColor: '#302B2B', textAlign: 'center', minHeight: '100vh', paddingBottom: '20px' }}>
            <Header reboot={languageSwap} />
            <h1 className='text'>{text["homeHeader"]}</h1>
            <h3 className='text'>
                {text['homeHeader2']}
            </h3>
            <ul style={{ columns: '3', marginTop: '5%' }}>
                {rosters && rosters.map((roster, index) =>
                    <li className={rostersSelected.includes(roster) ? 'lii highlighted' : 'lii'}
                        onClick={() => selectRoster(roster)} key={index}>
                        {roster.name}
                    </li>
                )}
                {Array.from(Array(emptySlots)).map((_, index) => (
                    <li className='lii' key={index}>
                        <Link to="/createRoster" className='link'>{text["newRoster"]}</Link>
                    </li>
                ))}
            </ul>
            <h2 className='text link' onClick={goToSocial}>
                {text["socialTab"]}
            </h2>
            {shouldNavigate && <NavigateForwards data={data} path={path} />}
        </div>
    );
};

export default Home;