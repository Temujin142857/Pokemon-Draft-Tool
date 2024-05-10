import React from "react";
import { Team } from "./components/team";
import { loadTeams} from "./composables/database.js"

class App extends React.Component {
    componentDidMount() {
        loadTeams();
    }

    render() {
       return(
        <template>
            <div>

            </div>
        </template>
       );
    }
}