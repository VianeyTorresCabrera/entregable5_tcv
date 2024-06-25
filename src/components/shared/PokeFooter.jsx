import React from 'react';
import './styles/pokefooter.css';

const PokeFooter = () => {
  return (
    <div className='pokefooter'>
    <div className='pokefooter_container'>
        <div className='pokefooter_red'></div>
        <div className='pokefooter_black'>
            <div className='pokefooter_outcircle'>
                <div className='pokefooter_incircle'></div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default PokeFooter;