import React from "react";
import {Link} from 'react-router-dom'
<style>
@import url('https://fonts.cdnfonts.com/css/Games');
</style>

export default function LandingPage(){

    const backgroundStyle = {
        backgroundImage: 'url("https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2019/09/world-warcraft-classic.jpg?tf=3840x")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'cover',
        width: '100vw',
        height: '100vh',
        backgroundAttachment: 'fixed',
        overflow: 'auto',
        margin: '0%',
      };
      
    
      const textoStyle = {
        fontFamily: 'Copperplate, Papyrus, fantasy',
        fontSize: '60px',
        color: 'rgba(255, 165, 0, 0.87)',
        textAlign: 'center',
        marginTop: '250px',
        '--interval': '0.5s',
        filter: 'saturate(60%)',
        animation: 'flicker steps(100) var(--interval) 3s infinite',
        textShadow: '1px 1px 2px black',
      };
    
      const botonStyle = {
        fontWeight: '700',
        color: '#fff', 
        background: 'linear-gradient(90deg, #FFA500 0%, #FF4500 100%)', 
        border: 'none',
        borderRadius: '1000px',
        boxShadow: '12px 12px 24px rgba(79,209,197,.64)',
        transition: 'all 0.3s ease-in-out 0s',
        cursor: 'pointer',
        outline: 'none',
        position: 'relative',
        padding: '15px', 
        minHeight: '80px', 
        fontFamily: 'Nunito, sans-serif',
        fontSize: '24px', 
        textTransform: 'uppercase',
        letterSpacing: '1.3px',
      };

    

    return(
      <div style={backgroundStyle}>
            <div>
              
            </div>
            <h1 style={textoStyle}> VIDEOJUEGOS!</h1>
            <Link to = '/home'>
               <button style={botonStyle}>🎮</button>
            </Link>
        </div>
    )
} 