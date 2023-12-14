let pokemonRepository = (function() {
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; //END pokeapi Loadlist  
  let modalContainer = document.querySelector('#modal-container');
 
  function add(pokemon) {
    return pokemonList.push(pokemon)
  };

  function getAll() {
    return pokemonList;
  }

 
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemonList');
    let listPokemon = document.createElement('li');
    listPokemon.classList.add('list-group-item');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');
    button.classList.add('btn', 'btn-primary');
    listPokemon.append(button);
    pokemonList.append(listPokemon);
    
    button.addEventListener('click', function() {
      showDetails(pokemon)
      console.log("addListItem is running");
    });
  }

  function loadList() {
    return fetch(apiURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon)
        }); //end forEach loop
      })
      .catch(function(e) { //end .then json function
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
        item.abilities = details.abilities; 
         
      })
      .catch(function(e) {
        console.error(e);
      });
      
  } //end loadDetails function


  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      //let modalContainer = document.getElementById("modal-container");
      //modalContainer.innerHTML = pokemon.name;
      showModal(pokemon); //be sure to add showMOdal to load pokemon items in moda
      console.log(pokemon)
      
    }); 
  } //END showDetails function

  function showModal(pokemon) {
    
    let modalTitle = document.querySelector('#modal-container .modal-title');
    let modalBody = document.querySelector('#modal-container .modal-body');
    let jsonString = JSON.stringify(pokemon.types, 'name');
    
    modalTitle.innerText = 'Pokemon: ' + pokemon.name;
   // modalBody.innerHTML = 'Pokemon height: ' + pokemon.height + '<br>' 
   // + 'Pokemon type(s): ' + pokemon.types + '<br><img src="' + pokemon.imageUrl + '">';

    modalBody.innerHTML = 'Height: ' + pokemon.height + '<br>' +
    'Abilities: ' + (pokemon.abilities||[]).map(ab => ab.ability.name).join(",") + '<br>' +
    'Types: ' + (pokemon.types||[]).map(ab => ab.type.name).join(",") + '<br>' +
    '<img src="' + pokemon.imageUrl + '">';
    

    $('#modal-container').modal('show'); // Use Bootstrap's modal method to show the modal

    console.log('showModal ran');
    
  } //END showModal function
  

function hideModal() {
  modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }

});

modalContainer.addEventListener('click', (e) => {
  // Since this is also triggered when clicking INSIDE the modal
  // We only want to close if the user clicks directly on the overlay
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});




  return {
    getAll: function() {
      return pokemonList;
    },
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
  };
})();

pokemonRepository.loadList().then(function() {
  //now data is loaded
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
  
});

