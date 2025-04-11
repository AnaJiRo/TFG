import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Ping from './Ping';  // 👈 Este es el nuevo componente

function App() {
  return (
    <div>
      <h1>React + Django Test</h1>
      <Ping />  {/* 👈 Aquí lo usamos */}
    </div>
  );
}

export default App;