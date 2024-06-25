import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';
import PokeCard from '../components/pokedex/PokeCard';
import PokeSelect from '../components/pokedex/PokeSelect';
import './styles/pokedex.css';
const Pokedex = () => {

  const trainer = useSelector((store)=>store.trainer);
  const [inputValue, setInputValue] = useState('');
  const [pokemons, getPokemons, getType] = useFetch();
  const [typeFilter, setTypeFilter] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (typeFilter) {
      //por tipo
      getType(typeFilter);
    }else{
      const url = `https://pokeapi.co/api/v2/pokemon/`;
    getPokemons(url);   
    }    
  }, [typeFilter]);

  const textInput = useRef();

  const handleSubmit = (event) =>{
    event.preventDefault();
    setInputValue(textInput.current.value.trim().toLowerCase());
    textInput.current.value = '';
  }


 // console.log(pokemons);

  const cbFilter = (poke) =>{    
    return poke.name.includes(inputValue);
  }

  //console.log(pokemons?.results);

  const pokemonNumbers = 5;
  const lastIndex = pokemonNumbers * page;
  const firstIndex = lastIndex - pokemonNumbers;
  let pokemonPaginated = pokemons?.results;
  pokemonPaginated = pokemonPaginated?.slice(firstIndex,lastIndex)
  const lastpage = Math.ceil(pokemons?.results.length/pokemonNumbers);
  const numbers = [];
  for(let i=1; i<= lastpage; i++){
    numbers.push(i);
  }

  //console.log(numbers);
  //console.log(lastpage);

 
  return (
    <div className='pokedex'>
      <h3 className='pokedex_wave'>
        <span>Welcome {trainer}, </span> here you could find your favorite Pokemon</h3>
      <div className='pokedex_filters'>
        <form onSubmit={handleSubmit}>
          <input className='pokedex_search' ref={textInput} type="text" />
          <button className='pokedex_search_btn'>Search</button>
        </form>
        <PokeSelect
          setTypeFilter = {setTypeFilter}
        />
      </div>
      <div className='pokedex_container'>
        {
          pokemonPaginated?.map((poke)=>(
            <PokeCard 
              key = {poke.url} 
              url = {poke.url}             
            />
          ))
        }
      </div>      
      <div className='pokedex_pagination'>
        <button className='pokedex_pag_btn_prev' 
          onClick={()=>setPage(page-1)} 
          disabled = {page === 1 }
        >Prev</button>
        {numbers.map(number =>(
          <button key={number} className='pokedex_pag_btn active' onClick={()=> setPage(number)} >{number}</button>
        ))}
        <button className='pokedex_pag_btn_next'
          onClick={()=>setPage(page+1)}
          disabled = {page === lastpage}
        >Next</button>
      </div>
    </div>
  )
}

export default Pokedex;