import React from "react";
import { loadTeams } from "./composables/useDatabase.js"
import { teams } from "./composables/useTeams.js"

class App extends React.Component {

    slots=12;
    teamsSelected=[];
    emptySlots=0;

    componentDidMount() {
        loadTeams();
        this.emptySlots=this.slots-teams.length;
    }

    addNewTeam = () => {
        // move to create roster page
    }

    selectTeam = (team)=>{
        this.teamsSelected.push(team);
        if(this.teamsSelected.length===2){
            //move to selected matchup passing teamsSelected
        }
    }

    render() {
       return(
        <template>

            <h1>
                Welcome to DraftDex
            </h1>

            <h3>
                Select two rosters to begin comparing or <br></br>
                Create a new roster to add to the draft
            </h3>

            <ul>
                {teams && teams.map((team, index) =>
                    <li onClick={() => {this.selectTeam(team);}} key={index}>{team.name}</li>
                )}
                {Array.from(Array(this.emptySlots), () =>
                   <li onClick={this.addNewTeam}>
                        Add New Team
                   </li>
                )}

            </ul>
        </template>
       );
    }
}