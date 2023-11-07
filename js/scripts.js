let pokemonRepository = (function() {
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
//END pokeapi Loadlist


  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    return pokemonList.push(pokemon)
  };

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemonList');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button_class');
    button.addEventListener('click', function() {
      showDetails(pokemon)
    });
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
  }

function loadList() {
  return fetch(apiURL)
    .then (function (response) {
      return response.json();
    })
    .then (function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add (pokemon)
      }); //end forEach loop
    })
    .catch (function (e) { //end .then json function
      console.error(e);
    });
}//END loadList function

function loadDetails(item) {
  let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
       return response.json();
      })
      .then(function(details) {
        //now add details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch (function (e) {
       console.error(e);
      });
} //end loadDetails function

function add(pokemon) {
  pokemonList.push(pokemon);
}

function showDetails(pokemon) {
  loadDetails(pokemon).then(function() {
    console.log(pokemon)
  }); //END showDetails function
}

return {
  getAll: function () {
    return pokemonList;
  },
  add: add,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails
};
})(); 

pokemonRepository.loadList().then(function() {
  //now data is loaded
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});








//original work
// create the array for Pokemon and list at least 3 in the array
/*let pokemonList = [
  { name: 'Charizard', height: 5.7, type: ['Fire', 'Flying'] },
  { name: 'Nidoqueen', height: 4.3, type: ['Poison, Ground'] },
  { name: 'Gyarados', height: 21.4, type: ['Water', 'Flying'] },
  { name: 'Tentacruel', height: 5.3, type: ['Water', 'Poison'] },
  { name: 'Moltres', height: 6.7, type: ['Fire', 'Flying'] }
] // end of pokemonList Array
*/


/*this for loop will run through each pokemon listed in the array
until it completes the loop. The height has a condition to list which
pokemon are short, average height, or tall using the if and else if 
conditions 

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height < 15.5 && pokemonList[i].height > 5.5) {
      document.write(pokemonList[i].name + ' ' + '(height:' + pokemonList[i].height + ')' + "<br>");
      console.log(pokemonList[i].name + pokemonList[i].height + 'is average height.');
    } //end average height condition
    else if (pokemonList[i].height < 5.5) {
      document.write(pokemonList[i].name + " " + '(height:' + pokemonList[i].height + ')' + "<br>");
      console.log(pokemonList[i].name + pokemonList[i].height + 'is short.');
    } //end short height condition
    else {
      document.write(pokemonList[i].name + " " + '(height:' + pokemonList[i].height + ')' + ' Wow! That\'s tall! <br>');
    } //end tall height condition

  } //End for loop of pokemon height
*/

//create IIFE for pokemonList, fist create pokemonRepositry variable
/*let pokemonRepository = (function() {
  let pokemonList = [
    { name: 'Charizard', height: 5.7, type: ['Fire', 'Flying'] },
    { name: 'Nidoqueen', height: 4.3, type: ['Poison, Ground'] },
    { name: 'Gyarados', height: 21.4, type: ['Water', 'Flying'] },
    { name: 'Tentacruel', height: 5.3, type: ['Water', 'Poison'] },
    { name: 'Moltres', height: 6.7, type: ['Fire', 'Flying'] }
  ];*/

//console.log(pokemonRepository.getAll())
//pokemonRepository.add({ name: 'Xatu', height: 4.11, type: ['Psychic', 'Flying'] });
//console.log(pokemonRepository.getAll());
//End pokemonList IIFE

/*
pokemonList.forEach(function(pokemon) {
  document.write("<p>" + pokemon.name + ' ' + '(height:' + pokemon.height + ')');
  console.log("<p>" + pokemon.name + ' ' + '(height:' + pokemon.height + ')');
}); //End forEach look of pokemon height
*/

/*
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write("<p>" + pokemon.name + ' ' + '(height:' + pokemon.height + ')')

}); //End forEach loop of pokemon height with IIFE pokemonRepository
*/

//console.log(pokemonRepository.getAll())
//console.log(pokemonRepository.getAll());
//End pokemonList IIFE

//pokemonRepository.getAll().forEach(function(pokemon) {
  //pokemonRepository.addListItem(pokemon);
//}); //End forEach look of pokemon height with IIFE pokemonRepository


/*let listItem = document.createElement('li');
let button = document.createElement('button');
console.log(button.innerText);
button.innerText = 
*/

//console.log(pokemonRepository.getAll())
//console.log(pokemonRepository.getAll());
//End pokemonList IIFE


