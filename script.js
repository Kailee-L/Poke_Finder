const load= document.getElementById('search-button');
const pokename= document.getElementById('pokemon-name');
const pokeid= document.getElementById('pokemon-id');
const pokeweight= document.getElementById('weight');
const pokeheight= document.getElementById('height');
const poketypes= document.getElementById('types');
const pokehp= document.getElementById('hp');
const pokeattack= document.getElementById('attack');
const pokedefense= document.getElementById('defense');
const pokespecattack= document.getElementById('special-attack');
const pokespecdefense= document.getElementById('special-defense');
const pokespeed= document.getElementById('speed');
const spritework= document.getElementById('sp');
let pokedata=[];
let sprite =[];
let datalist = [];

function fetchData(){
  poketypes.innerHTML="";
  let searcher= document.getElementById("search-input");

  fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon')
  .then((res) => res.json())
  .then((data) => {
    pokedata= data.results;
    let index;
    index = pokedata.findIndex(({id}) => id == searcher.value);
    if (index== -1){
      index = pokedata.findIndex(({name}) => name == searcher.value.toLowerCase());
    }

    if (index ==-1){
      alert("Pokémon not found");
    }
   else{
      displayPokemon(pokedata.slice(index,index+1));
   }
    
  })
  .catch((err) => {
    console.error(`There was an error: ${err}`);
  });
}

const displayPokemon = (pokemon) => {
   pokemon.forEach(({name,id,url}, index) => {
   pokename.innerHTML = `<div id="pokemon" class="id">  ${name.toUpperCase()}</div>`;
   pokeid.innerHTML = `<div id="pokemon" class="id">#${id}</div>`;
   getMorePokemon(url);
  });
};

function getMorePokemon(url){
   console.log(url);
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    datalist =data;
    processdata(datalist);
  })
  .catch((err) => {
   
  });

}

function processdata(list){
    console.log(list.stats[2]);

   document.getElementById("sprite").src = list.sprites.front_default;


   pokeweight.innerHTML =
    '<div>'+list.weight+'</div>';
    
   pokeheight.innerHTML =
    '<div>'+list.height+'</div>';
  try {
   poketypes.innerHTML =
    '<div>'+list.types[0].type.name.toUpperCase() + " </div><div>" +list.types[1].type.name.toUpperCase() +'</div>';
  }
  catch{
    poketypes.innerHTML =
    '<div>'+list.types[0].type.name.toUpperCase(); +'</div>';
  }
  pokehp.innerHTML= '<div>'+list.stats[0].base_stat +'</div>';

 pokeattack.innerHTML= '<div>'+list.stats[1].base_stat +'</div>';

 pokedefense.innerHTML='<div>'+list.stats[2].base_stat +'</div>';

pokespecattack.innerHTML='<div>'+list.stats[3].base_stat +'</div>';

  pokespecdefense.innerHTML='<div>'+list.stats[4].base_stat +'</div>';
  
  pokespeed.innerHTML='<div>'+list.stats[5].base_stat +'</div>';
}