import React from 'react';
import Tilt from 'react-tilt';
import brain from './Logo.png';
import './logo.css';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt"
        options={{max: 50}}
        style={{height: 150, width: 150}}
      >
        <div className="Tilt-inner pa3">
          <img style={{paddingTop: '5px'}} src={brain} alt="brain" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
