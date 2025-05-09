// src/components/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div id="cv-header" className="header-container d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <img
          src="/images/SeckLabs.png" // mon logo 
          alt="mon logo"
          className="logo"
        />
        <div className="ms-3">
          <h1 className="creator-name">Mouhamadou Mourtada Seck</h1>
          <p className="creator-role"><i class="fa-solid fa-code text-primary"></i> Développeur Full Stack</p>
          <small className='text-primary slogan'>Votre partenaire en technologie web et mobile</small>
        </div>
      </div>

      <img
        src="/images/img3.jpeg" // ma photo
        alt="Mouhamadou Mourtada"
        className="creator-photo"
      />
    </div>
  );
};

export default Header;
