import React from 'react';
import OptionSelector from './components/OptionSelector';

function App() {
  return (
    <div className="app">
      <h1>DoorDash Settlement Help</h1>
      <p>If you worked for DoorDash in New York between 2017–2020, you may be eligible for a cash settlement.</p>
      <OptionSelector />
    </div>
  );
}

export default App;