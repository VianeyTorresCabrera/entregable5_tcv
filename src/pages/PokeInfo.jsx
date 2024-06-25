import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import './styles/pokeinfo.css';
import '../App.css'

const PokeInfo = () => {

 const [pokemon, getPokemon] = useFetch();


  const {id} = useParams();

  console.log(id)

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    getPokemon(url);    
  }, [])
  
  console.log(pokemon)

  
  return (
    <div className={`pokeinfo ${pokemon?.types[0].type.name}`}>
      <section className= {`pokeinfo_container`}>
       <div className={`pokeinfo_header ${pokemon?.types[0].type.name}`}>      
        <figure className='pokeinfo_img'>
          <img src={pokemon?.sprites.other[`official-artwork`].front_default} alt="poke img" />
        </figure>
        </div>
        <div className='pokeinfo_info'>
          <h2 className='pokeinfo_id'>#{pokemon?.id}</h2>
          <h2 className={`pokeinfo_name ${pokemon?.types[0].type.name}_font`}>{pokemon?.name}</h2>
        </div >
          <ul className='pokeinfo_li'>
            <li><span>Weight</span><span>{pokemon?.weight}</span></li>
            <li><span>Height</span><span>{pokemon?.height}</span></li>                     
          </ul>
          <div className='pokeinfo_ts'>
            <div className='pokeinfo_2'>  
              <h3>Type</h3>          
              <ul className='pokecard_types'>            
                {
                  pokemon?.types.map(type=>(
                      <li className={`${type.type.name}`} key={type.type.url}>
                          {type.type.name}
                      </li>
                  ))
                }
              </ul>
              </div>
              <div className='pokeinfo_3'>  
              <h3>Skills</h3>
                <ul className='pokecard_types'>                
                  {
                    pokemon?.abilities.map(abi=>(
                        <li className={`skills${abi.ability.name}`} key={abi.ability.url}>
                            {abi.ability.name}
                        </li>
                    ))
                  }
                </ul>
            </div>                         
        </div>      
        
        <ul className='pokeinfo_stats'>
          {
          pokemon?.stats.map(stat =>(
            <li className='pokeinfo_stats_item' key={stat.stat.url}>
              <span>{stat.stat.name}</span>
              <span>{stat.base_stat}/250</span>
              <div className='outbar'>
              <div className='inbar' style={{width:`${stat.base_stat/2.5}%`}}></div>
              </div>
            </li>
            ))
          }
        </ul>

        <div className='pokeinfo_movements'>
          <h3>Movements</h3><hr/>

          <ul className='pokeinfo_mov_list'>                
            {
              pokemon?.moves.map(move=>(
                <li className={`moves`} key={move.move.url}>
                  {move.move.name}
               </li>
              ))
            }
          </ul>
        </div>  

        
      </section>
    </div>
  )
}

export default PokeInfo;