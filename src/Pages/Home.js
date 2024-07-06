import React from "react";
//import { loadrosters } from "../Composables/useDatabase.js"
import {Link} from 'react-router-dom'
//import { Rosters } from "../Composables/useRosters.js"
import "../CSS/Home.css"
import {Species} from "../DataStructures/Species";
import {Roster} from "../DataStructures/Roster";
import NavigateToMatchup from "../Navigator";
import * as state from "../Composables/useRosters";

const speciesList = [
    new Species("Bulbasaur"),
    new Species("Charmander"),
    new Species("Squirtle"),
    new Species("Pikachu"),
    new Species("Jigglypuff"),
    new Species("Snorlax"),
    new Species("Eevee"),
    new Species("Mewtwo"),
    new Species("Gengar"),
    new Species("Dragonite"),
    new Species("Lucario"),
    new Species("Greninja"),
    new Species("Scizor"),
    new Species("Alakazam"),
    new Species("Machamp"),
    new Species("Gyarados"),
    new Species("Lapras"),
    new Species("Blaziken"),
    new Species("Charizard"),
    new Species("Garchomp")
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