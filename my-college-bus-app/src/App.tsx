// src/App.tsx
import React from 'react';
import './styles/global.css';
import { Select } from './components/ui/select';
import { Dialog } from './components/ui/dialog';

function App() {
  return (
    <div className="App">
      <h1>React UI Components</h1>
      <Select />
      <Dialog>
        <p>This is a dialog body content.</p>
      </Dialog>
    </div>
  );
}

export default App;
