import { useEffect, useState } from 'react';

import Card from './UI/Card';
import './CurrencyConverter.css';

export default function CurrencyConverter({ values }) {   
    const [amountEntered, setAmountEntered] = useState('1000');
    const [conversionResult, setConversionResult] = useState();

    useEffect (() => {
        const URL = 'https://api.exchangerate.host/convert?';
        const from = 'from=' + values.fromCurrency;
        const to = '&to=' + values.toCurrency;            
        const amount = '&amount=' + amountEntered;
            
        fetch(URL + from + to + amount)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.result != null) {
                    console.log(data.result.toFixed(2));
                    setConversionResult(data.result.toFixed(2));
                }
            });   
    }, [amountEntered, values.fromCurrency, values.toCurrency]);
    
    return (
        <div>
            <Card className = 'converter'>
                <label htmlFor='amount'>Please enter an amount:</label> <br />
                <input 
                    type='number'
                    value={ amountEntered }
                    onChange={ (e) => setAmountEntered(e.target.value) }
                    id='amount'
                />
            </Card>
            <Card className = 'answer'>
                {conversionResult && (
                    <Answer
                        inputAmt = { amountEntered }
                        outputAmt = { conversionResult }
                        inputCur = { values.fromCurrency }
                        outputCur = { values.toCurrency }
                    />
                )}
            </Card>
        </div>
    );
}

function Answer(props) {
    const formattedInput = props.inputAmt.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    const formattedOutput = props.outputAmt.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    
    return (
        <div>
            <h1> { formattedInput } { props.inputCur } is { formattedOutput } { props.outputCur }.</h1>
        </div>
    );
}