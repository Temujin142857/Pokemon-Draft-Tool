import React from "react";
import { loadTeams } from "../Composables/useDatabase.js"
import {Link} from 'react-router-dom'
import "../CSS/CreateRoster.css"
import {Species} from "../DataStructures/Species";

class CreateRoster extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slots: 12,
            speciesSelected: [],
            emptySlots: 0,
            species: [
                new Species("charmander1"), new Species("charmander1"), new Species("charmander1"), new Species("charmander1"), new Species("charmander1"), new Species("charmander1")
            ],
            slotsSelected: [],
        }
    }

    componentDidMount() {
        loadTeams();
        this.setState({

        });
    }

    selectSlot=(specie)=>{
        this.setState((prevState) => ({
            speciesSelected: [...prevState.speciesSelected, specie]
        }));
    }

    render() {
        const { emptySlots, speciesSelected, species, slotSelected } = this.state;
        return (
            <div style={{backgroundColor: '#302B2B', textAlign: 'center'}}>
                <div style={{textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <div style={{backgroundColor: '#302B2B', textAlign: 'center'}}>
                        <h2>Choose Pokemon for the Roster</h2>
                    <ul style={{margin: '0 10px'}}>
                        {species && species.map((specie, index) => (
                            <li onClick={() => this.selectSlot(specie)} key={index} >
                                {specie.name}
                            </li>
                        ))}
                    </ul>
                    </div>
                    <div>
                        <h2>Pokemon in the Roster</h2>
                    <ul style={{margin: '50px 0', columns: '2', overflow: 'hidden'}}>
                        {speciesSelected && speciesSelected.map((specie, index) => (
                            <li style={{margin: '20px 30px'}} key={index} >
                                {specie.name}

                            </li>
                        ))}
                    </ul>
                    </div>
                </div>

                <Link to="/">Save</Link>
            </div>
        );
    }
}


export default CreateRoster;