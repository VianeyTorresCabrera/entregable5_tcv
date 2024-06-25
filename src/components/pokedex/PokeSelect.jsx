import React, { useEffect, useRef } from 'react';
import useFetch from '../../hooks/useFetch';
import './styles/pokeselect.css';

const PokeSelect = ({setTypeFilter}) => {
    
   const [types,getTypes] = useFetch();

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/type`;  
    getTypes(url);    
  }, []);

  const valueSelect = useRef();
  
  const handleChange = () =>{
    setTypeFilter(valueSelect.current.value);
  }
  return (    
      <select className='pokeselect' onChange={handleChange} ref={valueSelect}>
          <option className='pokeselect_menu' value=''>All Pokemons</option>
          {
              types?.results.map(type =>(
                  <option className='pokeselect_option' key={type.url} value={type.url}>
                      {type.name}
                  </option>
              ))
          }
      </select>          
  )
}

export default PokeSelect;