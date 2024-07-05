import React from "react";
import { loadTeams } from "../Composables/useDatabase.js"
import {Link, useNavigate} from 'react-router-dom'
import { teams } from "../Composables/useTeams.js"
import "../CSS/Home.css"

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slots: 12,
            teamsSelected: [],
            emptySlots: 0,
        }
    }

    componentDidMount() {
        loadTeams();
        this.setState({
            emptySlots: this.state.slots - (teams ? teams.length : 0)
        });
    }

    selectTeam = (team)=>{
        this.setState((prevState) => {
            const newTeamsSelected = [...prevState.teamsSelected, team];
            if (newTeamsSelected.length === 2) {
                console.log("Navigating to selected matchup with teams: ", newTeamsSelected);
                const navigate = useNavigate();
                navigate(`/selectedMatchup`, {state: newTeamsSelected,});
                // Navigate to selected matchup page with teamsSelected
            }
            return { teamsSelected: newTeamsSelected };
        });
        console.log('hi', this.state.teamsSelected);
    }

    render() {
       const { emptySlots, teamsSelected } = this.state;
       return (
           <div style={{backgroundColor: '#302B2B', textAlign: 'center'}}>
               <h1 className={'text'}>Welcome to DraftDex</h1>
               <h3 className={'text'}>
                   Select two rosters to begin comparing or
                   Create a new roster to add to the draft
               </h3>
               <ul style={{columns: '2', marginTop: '5%'}}>
                   {teams && teams.map((team, index) =>
                       <li className={teamsSelected.includes(team) ? 'highlighted' : ''}
                       onClick={() => {
                           this.selectTeam(team);
                       }} key={index}>
                           {team.name}
                       </li>
                   )}
                   {Array.from(Array(emptySlots)).map((_, index) => (
                       <li key={index}>
                           <Link to="/createRoster" className={'link'}>+ New Roster</Link>
                       </li>
                   ))}
               </ul>
           </div>
       );
    }
}


export default Home;