import React from "react";
import { loadTeams } from "../Composables/useDatabase.js"
import {Link} from 'react-router-dom'
import "../CSS/CreateRoster.css"

class CreateRoster extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slots: 12,
            speciesSelected: [],
            emptySlots: 0,
            species: [],
            slotsSelected: [],
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
        const { emptySlots, speciesSelected, species, slotSelected } = this.state;
        return (
            <div style={{backgroundColor: '#302B2B', textAlign: 'center'}}>
                <div style={{textAlign: 'center', display: 'flex'}}>
                    <ul>

                    </ul>
                    <ul style={{columns: '2', marginTop: '5%', overflow: 'hidden'}}>
                        {speciesSelected && speciesSelected.map((specie, index) =>
                            <li className={slotSelected.includes(specie) ? 'highlighted' : ''}
                                onClick={() => {
                                    this.selectSlot();
                                }} key={index} style={{display: 'flex'}}>
                                {specie.name}
                                {specie.image}
                            </li>
                        )}
                        {Array.from(Array(emptySlots)).map((_, index) => (
                            <li onClick={this.addNewTeam} key={index}>

                            </li>
                        ))}
                    </ul>
                </div>
                <Link to="/blogs">+ New Roster</Link>
            </div>
        );
    }
}


export default CreateRoster;