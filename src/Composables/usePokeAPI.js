export async function fetchSpecies(name) {
    try {
        // Replace this with your actual API endpoint
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+name);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        // Parse the response as JSON
        const data = await response.json();

        // Log or work with the data
        console.log(data);
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}