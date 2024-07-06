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
            ],
            slotsSelected: [],

            filteredSpecies: [],
            searchInput: ''
        }
    }

    componentDidMount() {
        loadTeams();
        this.setState({ filteredSpecies: this.state.species });
    }

    selectSlot=(specie)=>{
        this.setState((prevState) => ({
            speciesSelected: [...prevState.speciesSelected, specie]
        }));
    }

    handleSearchInputChange = (event) => {
        const searchInput = event.target.value.toLowerCase();
        const filteredSpecies = this.state.species.filter(specie =>
            specie.name.toLowerCase().includes(searchInput)||specie.type?.toLowerCase().includes(searchInput)
        );
        this.setState({ searchInput, filteredSpecies });
    };

    render() {
        const { emptySlots, speciesSelected, species, slotSelected, searchInput, filteredSpecies } = this.state;
        return (
            <div style={{backgroundColor: '#302B2B', textAlign: 'center', minHeight: '100vh', paddingTop: '20px', paddingBottom: '20px'}}>
                <div style={{textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <div style={{border: '2px solid white', borderRadius: '10px', backgroundColor: '#302B2B', textAlign: 'center', maxHeight: '90vh'}}>
                        <h2 className={'text'}>Choose Pokemon for the Roster</h2>
                        <input
                            type="text"
                            value={searchInput}
                            onChange={this.handleSearchInputChange}
                            placeholder="Search for a Pokemon..."
                            style={{marginBottom: '20px', padding: '8px', width: '100%', boxSizing: 'border-box'}}
                        />

                        <ul style={{listStyle: 'none', padding: 0, marginTop: '5px', overflow: 'auto', maxHeight: '70vh'}}>
                            {filteredSpecies.map((specie, index) => (
                                <li className={'i' + ' li'} key={index} onClick={() => this.selectSlot(specie)}
                                    style={{margin: '20px 10px', cursor: 'pointer'}}>
                                    {specie.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={{marginLeft: "40px"}}>
                        <h2 className={'text'}>Pokemon in the Roster</h2>
                        <ul style={{margin: '50px 0', display: 'grid', gridTemplateColumns: 'auto auto', gap: '20px'}}>
                            {speciesSelected && speciesSelected.map((specie, index) => (
                                <li key={index} className={'li'} style={{margin: '20px 0'}}>
                                    {specie.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Link to="/" className={'link'}
                      style={{display: 'block', marginTop: '20px', color: 'white', textDecoration: 'none', fontSize: '24px'}}>Save</Link>
            </div>

        );
    }
}


export default CreateRoster;