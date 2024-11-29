import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrencyTable = () => {
    const [rates, setRates] = useState([]);
    const apiKey = 'your-apikey';

    useEffect(() => {
        axios.get(`https://api.currencyfreaks.com/latest?apikey=${apiKey}`)
            .then(response => {
                const data = response.data.rates;
                const selectedCurrencies = ["CAD", "IDR", "JPY", "CHF", "EUR", "GBP"];
                
                const filteredRates = selectedCurrencies.map(currency => ({
                    currency,
                    exchangeRate: parseFloat(data[currency]),
                    weBuy: parseFloat(data[currency]) * 1.05,
                    weSell: parseFloat(data[currency]) * 0.95
                }));
                
                setRates(filteredRates);
            })
            .catch(error => console.error('Error fetching currency rates:', error));
    }, []);

    return (
        <div style={{ backgroundColor: '#FF7F50', borderRadius: '8px', color: '#fff', height: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <div style={{marginBottom: '20px'}}><h1>Currency Exchange Rates</h1></div>
            <div>
            <table style={{ width: '100%', color: '#fff', textAlign: 'center', borderSpacing: '10px'}}>
                <thead>
                    <tr>
                        <th>Currency</th>
                        <th>We Buy</th>
                        <th>Exchange Rate</th>
                        <th>We Sell</th>
                    </tr>
                </thead>
                <tbody>
                    {rates.map((rate) => (
                        <tr key={rate.currency}>
                            <td>{rate.currency}</td>
                            <td>{rate.weBuy.toFixed(4)}</td>
                            <td>{rate.exchangeRate.toFixed(4)}</td>
                            <td>{rate.weSell.toFixed(4)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <div style={{ marginTop: '20px' }}>
            <p style={{ fontSize: '12px', textAlign: 'center', marginTop: '10px' }}>
                Rates are based from 1 USD. This application uses API from <a href="https://currencyfreaks.com" style={{ color: '#fff' }} target="_blank" rel="noopener noreferrer">CurrencyFreaks</a>.
            </p></div>
        </div>
    );
};

export default CurrencyTable;
