import { useEffect, useState } from 'react';

import Card from './UI/Card';

import './CurrencySelector.css'

export default function CurrencySelector({ identifier, value, onValueChange, id, label}) {
  const handleChange = (event) => {
    onValueChange(identifier, event.target.value);
  };
  
  const [options, setOptions] = useState([])

  const fetchOptions = () => {
    const URL = 'https://api.exchangerate.host/symbols'
    fetch(URL)
      .then(response => {
        return response.json()
      })
      .then(data => {
        data = Object.values(data.symbols);
        setOptions(data)
      })
  }

  useEffect(() => {
    fetchOptions()
  }, [])

  return (
    <div>
      <Card className = 'currencySelector'>
        <form>
          <label htmlFor = { id }> { label } </label> <br />
          <select value = { value } onChange = { handleChange } id={ id }>
              {options.map(option => (
                <option
                  value={ option.code }
                  key={Math.random()}
                >
                  {option.description} ({option.code})
                </option>
              ))}
          </select>
        </form>
      </Card>
    </div>
  );
}