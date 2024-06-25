import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import './styles/pokecard.css';


const PokeCard = ({url}) => {

    const [pokemon, getPokemon] = useFetch();

    const navigate = useNavigate();

    useEffect(() => {
      getPokemon(url);      
    }, []);

    const handleClic = () =>{
        navigate( `/pokedex/${pokemon.id}`);
    }
    
    
    console.log(pokemon)
  return (
    <div className={`pokecard_border ${pokemon?.types[0].type.name}`}>
    <article className={`pokecard`} onClick={handleClic}>
        <div className={`pokecard_back ${pokemon?.types[0].type.name}`}></div>
        <figure className={'pokecard_img'}>
            <img src={pokemon?.sprites.other[`official-artwork`].front_default} alt='poke img'/>
        </figure>
        <h3 className='pokecard_name'>{pokemon?.name}</h3>
        <ul className='pokecard_types'>
            {
                pokemon?.types.map(type=>(
                    <li className={`slot${type.slot}`} key={type.type.url}>
                        {type.type.name}
                    </li>
                ))
            }
        </ul>
        <span className='pokecard_span'>Type</span>
        <hr className='pokecard_hr'/>
        <ul className='pokecard_stats'>
            {
                pokemon?.stats.map(stat =>(
                    !stat.stat.name.includes('special') &&
                    <li  key={stat.stat.url}>
                        <span>{stat.stat.name}</span>
                        <span>{stat.base_stat}</span>
                    </li>
                ))
            }
        </ul>
    </article>
    </div>
  )
}

export default PokeCard;