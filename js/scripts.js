let pokemonRepository = (function() {
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; //END pokeapi Loadlist  
  let modalContainer = document.querySelector('#modal-container');

  function showModal(pokemon) {
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Pokemon height:' + ' ' + pokemon.height;

    let pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.imageUrl;


    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
    modal.appendChild(pokemonImage);

    modalContainer.classList.add('is-visible');
    console.log('showModal ran');
  }

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
      console.log("addListItem is running");
    });
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
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
      })
      .catch(function(e) {
        console.error(e);
      });
  } //end loadDetails function

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      let modalContainer = document.getElementById("modal-container");
      modalContainer.innerHTML = pokemon.name;
      showModal(pokemon); //be sure to add showMOdal to load pokemon items in moda
      console.log(pokemon)
    }); //END showDetails function
  }

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