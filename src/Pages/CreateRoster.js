import React from "react";
import { loadTeams } from "../Composables/useDatabase.js"
import {Link} from 'react-router-dom'
import "../CSS/CreateRoster.css"

class CreateRoster extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slots: 12,
            teamsSelected: [],
            emptySlots: 0,
            species: []
        }
    }

    componentDidMount() {
        loadTeams();
        this.setState({

        });
    }

    selectSlot=()=>{

    }

    render() {
        const { emptySlots, teamsSelected, species } = this.state;
        return (
            <div style={{backgroundColor: '#302B2B', textAlign: 'center', display: 'flex'}}>
                <ul>

                </ul>
                <ul style={{columns: '2', marginTop: '5%', overflow: 'hidden'}}>
                    {species && species.map((specie, index) =>
                        <li className={teamsSelected.includes(specie) ? 'highlighted' : ''}
                            onClick={() => {
                                this.selectSlot();
                            }} key={index}>
                            {team.name}
                        </li>
                    )}
                    {Array.from(Array(emptySlots)).map((_, index) => (
                        <li onClick={this.addNewTeam} key={index}>
                            <Link to="/blogs">+ New Roster</Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}


export default CreateRoster;