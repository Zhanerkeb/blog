import React from 'react';
import './App.css';

function App() {
  
  const text = `text`;
  const style = {
    marginTop: `10px`,
    textTransform: `uppercase`,
    fontSize: `26px`,
    color: `green`
  }

  return (
    <p style={style}>{text}</p>  
  );
}

export default App;
