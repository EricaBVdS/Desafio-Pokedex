const pokemonName = document.querySelector('.name')
const pokemonNumber = document.querySelector('.number')
const pokemonImg = document.querySelector('.pokemon_img')
const pokemonHeight = document.querySelector('.height')
const pokemonWeight = document.querySelector('.weight')
const pokemonAbilities = document.querySelector('.abilities')
const pokemonTypes = document.querySelector('.types')
const pokemonCard = document.querySelector(".card")

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext= document.querySelector('.btn-next')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')

let searchPokemon = 1;

function convertPokemonAbilitiesToLI (pokemonAbilities){
    return pokemonAbilities.map((abilitySlot) => `<li class="info ability">${abilitySlot.ability.name} </li>` )
}

function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type ${typeSlot.type.name}">${typeSlot.type.name}</li>` )
}



const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if(APIResponse.status === 200) {
       const data = await APIResponse.json();
        return data; 
    }
    
 
}

const renderPokemon = async(pokemon) => {

    pokemonName.innerHTML = 'Loading...'

    const data = await fetchPokemon(pokemon);


    if (data) {

        pokemonImg.style.display = 'block'
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = `#${data.id}`;
        pokemonImg.src = data.sprites.other.dream_world.front_default;
        pokemonHeight.innerHTML =  `${data.height / 10} m`
        pokemonWeight.innerHTML =  `${data.weight / 10} kg`
        pokemonTypes.innerHTML = convertPokemonTypesToLi(data.types).join('');
        pokemonAbilities.innerHTML = convertPokemonAbilitiesToLI(data.abilities).join('');
        pokemonCard.className = `card ${data.types[0].type.name}`;
        input.value = '';

    } else {
        pokemonImg.style.display = 'none';
        pokemonName.innerHTML = 'not found :C';
        pokemonNumber.innerHTML = '';
    }  
    
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase()) 
})


buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    }

})

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)

})

renderPokemon(searchPokemon)


