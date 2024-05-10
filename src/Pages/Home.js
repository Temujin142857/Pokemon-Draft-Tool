import React from "react";
import { loadTeams } from "./composables/useDatabase.js"
import { teams } from "./composables/useTeams.js"

class App extends React.Component {
    componentDidMount() {
        loadTeams();
    }

    addNewTeam = () => {
        // Your logic to add a new team goes here
    }

    render() {
       return(
        <template>
            <ul>
                {teams && teams.map((team, index) =>
                    <li key={index}>{team.name}</li>
                )}
                <button onClick={this.addNewTeam}>
                    Add New Team
                </button>
            </ul>
        </template>
       );
    }
}