// create the array for Pokemon and list at least 3 in the array
let pokemonList = [
    {name:'Charizard' , height: 5.7 , type: ['Fire', 'Flying']},
    {name: 'Nidoqueen', height: 4.3, type: ['Poison, Ground']},
    {name: 'Gyarados', height: 21.4, type: ['Water', 'Flying']},
    {name: 'Tentacruel', height: 5.3, type: ['Water', 'Poison']},
    {name: 'Moltres', height: 6.7, type: ['Fire', 'Flying']}
] // end of pokemonList Array

/*this for loop will run through each pokemon listed in the array
until it completes the loop. The height has a condition to list which
pokemon are short, average height, or tall using the if and else if 
conditions */
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


