import React, { useRef } from 'react';
import NeonBoxes from './NeonBoxes';
import ParticlesGrab from './ParticlesGrab';
import Listdo from './Listdo';
import './App.css';

function App() {
  const particleWrapperRef = useRef();

  const handleMouseEnter = () => {
    particleWrapperRef.current.classList.add('disable-particles');
  };

  const handleMouseLeave = () => {
    particleWrapperRef.current.classList.remove('disable-particles');
  };

  return (
    <div style={{ position: 'relative', height: '100vh', background: '#000' }}>
      <div ref={particleWrapperRef} className="particles-wrapper">
        <ParticlesGrab
          config={{
            particles: {
              number: { value: 50 },
              size: { value: 4 },
              opacity: { value: 2 },
              line_linked: {
                color: '#00ffff',
                width: 9
              }
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: 'grab'
                }
              },
              modes: {
                grab: {
                  distance: 300,
                  line_linked: {
                    opacity: 2.0
                  }
                }
              }
            }
          }}
        />
      </div>

      <div className="App" >
        {/* Wrap only the boxes and todo list */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <NeonBoxes />
          <Listdo />
        </div>
      </div>
    </div>
  );
}

export default App;
