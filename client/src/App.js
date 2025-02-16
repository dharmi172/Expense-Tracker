import React from 'react';
import './App.css';
import Graph from './components/Graph';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
      <h1 className="text-2xl py-3 mb-5 bg-slate-800 text-white rounded">Expense Tracker</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {/* graph */}
        <Graph></Graph>
        {/* form */}
        <Form></Form>
      </div>
      </div>
    </div>
  );
}

export default App;
