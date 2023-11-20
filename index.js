class Pokemon {
    constructor(image1, image2, name, abilities) {
        this.image1 = image1;
        this.image2 = image2;
        this.name = name;
        this.abilities = abilities;
    }
}

const submit = document.getElementById('submit');
submit.addEventListener('click', getPokemon);

async function getPokemon(event) {
    event.preventDefault();
    const pokemonName = document.getElementById('name').value.toLowerCase();
    console.log(pokemonName);
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const param = {
        headers: {'Content-type': 'application/json; charset = UTF-8'},
        method: 'GET'
    };

    try {
        const data = await fetch(url, param);
        const result = await data.json();

        const pokemon = new Pokemon(
            result.sprites.front_shiny,
            result.sprites.back_shiny,
            result.name,
            result.abilities.map((ability) => ability.ability.name)
        );

        showPokemon(pokemon);

    } catch (error) {
        console.log(error);
    }
}

function showPokemon(pokemon) {
    const image1 = document.getElementById('img1');
    const image2 = document.getElementById('img2');
    const name = document.getElementById('pokemonName');
    const abilities = document.getElementById('abilities');

    image1.src = pokemon.image1;
    image2.src = pokemon.image2;
    name.textContent = pokemon.name;

    pokemon.abilities.forEach((ability) => {
        const row = abilities.insertRow();
        const cell = row.insertCell(0);
        cell.textContent = ability;
    });

    document.querySelector('.d-none').classList.remove('d-none');
}
