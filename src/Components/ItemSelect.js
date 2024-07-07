import React, { useState } from 'react';
import Select from 'react-select';
import { FaSearch } from 'react-icons/fa';

// Define the list of Pokémon items (example list of 10 items)
const pokemonItems = [
    { value: 'potion', label: 'Potion' },
    { value: 'super-potion', label: 'Super Potion' },
    { value: 'hyper-potion', label: 'Hyper Potion' },
    { value: 'max-potion', label: 'Max Potion' },
    { value: 'full-heal', label: 'Full Heal' },
    { value: 'revive', label: 'Revive' },
    { value: 'max-revive', label: 'Max Revive' },
    { value: 'ether', label: 'Ether' },
    { value: 'max-ether', label: 'Max Ether' },
    { value: 'elixir', label: 'Elixir' },
];

const PokemonItemsSelect = ({ onChange }) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleChange = (selectedOptions) => {
        setSelectedItems(selectedOptions);
        onChange(selectedOptions);
    };

    return (
        <div style={{ width: '100%' }}>
            <Select
                options={pokemonItems}
                value={selectedItems}
                onChange={handleChange}
                placeholder="Select Pokémon Items..."
                styles={{
                    control: (provided) => ({
                        ...provided,
                        minHeight: '40px',
                        borderRadius: '8px',
                        boxShadow: 'none',
                        borderColor: '#ccc',
                    }),
                    menu: (provided) => ({
                        ...provided,
                        zIndex: 9999,
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        borderBottom: '1px dotted gray',
                        color: state.isSelected ? 'white' : 'black',
                        backgroundColor: state.isSelected ? '#5a98d6' : 'white',
                        '&:hover': {
                            backgroundColor: '#5a98d6',
                            color: 'white',
                        },
                    }),
                    multiValueLabel: (provided) => ({
                        ...provided,
                        color: 'black',
                    }),
                }}
            />
        </div>
    );
};

export default PokemonItemsSelect;
