import React from "react";
import { loadTeams } from "./composables/useDatabase.js"
import { teams } from "./composables/useTeams.js"

class App extends React.Component {

    teamsSelected=[];

    componentDidMount() {
        loadTeams();
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
            <ul>
                {teams && teams.map((team, index) =>
                    <li onClick={() => {this.selectTeam(team);}} key={index}>{team.name}</li>
                )}
                <button onClick={this.addNewTeam}>
                    Add New Team
                </button>
            </ul>
        </template>
       );
    }
}