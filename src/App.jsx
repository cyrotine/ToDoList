import React from 'react';
import NeonBoxes from './NeonBoxes';
import ParticlesGrab from './ParticlesGrab';

function App() {
  return (
    <div style={{ position: 'relative', height: '100vh', background: '#000' }}>
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
      <NeonBoxes />
    </div>
  );
}

export default App;
