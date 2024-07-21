import React from "react";
import { loadTeams } from "../Composables/useDatabase.js"
import {Link} from 'react-router-dom'
import "../CSS/CreateRoster.css"
import {Specie} from "../DataStructures/Specie";
import Header from "../Components/Header";

class CreateRoster extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slots: 12,
            speciesSelected: [],
            emptySlots: 0,
            species: [
                new Specie("Bulbasaur"),
                new Specie("Charmander"),
                new Specie("Squirtle"),
                new Specie("Pikachu"),
                new Specie("Jigglypuff"),
                new Specie("Snorlax"),
                new Specie("Eevee"),
                new Specie("Mewtwo"),
                new Specie("Gengar"),
                new Specie("Dragonite"),
                new Specie("Lucario"),
                new Specie("Greninja"),
                new Specie("Scizor"),
                new Specie("Alakazam"),
                new Specie("Machamp"),
                new Specie("Gyarados"),
                new Specie("Lapras"),
                new Specie("Blaziken"),
                new Specie("Charizard"),
                new Specie("Garchomp")
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
            <div style={{backgroundColor: '#302B2B', textAlign: 'center', minHeight: '100vh', paddingBottom: '20px'}}>
                <Header></Header>
                <div style={{textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <div style={{padding: '3px', border: '2px solid white', borderRadius: '10px', backgroundColor: '#302B2B', textAlign: 'center', maxHeight: '90vh', minWidth: '25vw'}}>
                        <h2 className={'text'}>Choose Pokemon</h2>
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
                    <div style={{marginLeft: "80px", minWidth: '25vw'}}>
                        <h2  contentEditable={"true"} className={'text'}>Roster Name</h2>
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