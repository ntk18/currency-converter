import { useState } from 'react'

import './App.css';

import CurrencyConverter from './components/CurrencyConverter';
import CurrencySelector from './components/CurrencySelector';
import Header from './components/Header';

function App() {
  const [values, setValues] = useState({
    fromCurrency: 'USD',
    toCurrency: 'EUR'
  });

  const handleValueChange = (identifier, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [identifier]: value
    }));
  };

  return (
    <div className="App">
      <Header />
      <CurrencySelector
        identifier = 'fromCurrency'
        value = { values.fromCurrency }
        onValueChange = { handleValueChange }
        id='fromCurrency'
        label='Choose a currency to convert from:'
      />
    
      <CurrencySelector
        identifier = 'toCurrency'
        value = { values.toCurrency }
        onValueChange = { handleValueChange }
        id='toCurrency' 
        label='Choose a currency to convert to:'/>
      
      <CurrencyConverter values = { values }/>
    </div>
  );
}

export default App;
