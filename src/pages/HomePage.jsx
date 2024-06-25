import React, { useRef } from 'react';
import { setTrainer } from './store/slices/trainer.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './styles/homepage.css'
import PokeFooter from '../components/shared/PokeFooter';

const HomePage = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const textInput = useRef();
  
  const handleSubmit = (event) => {
    event.preventDefault();    
    dispatch(setTrainer(textInput.current.value.trim()));
    textInput.current.value = '';
    navigate('/pokedex');
  }

  return (
    <div className='homepage'>
        <figure className='homepage_img'>
          <img src="../..//assets/pokedex_logo.png" alt="img_home" />
        </figure>              
        <h2>Hi trainer!</h2>
        <p>To start give me your name</p>
        <form onSubmit={handleSubmit}>
          <input ref={textInput} type="text"/>
          <button>Go!</button>
        </form>      
      </div>  
  )
}

export default HomePage;