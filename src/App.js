import { useEffect, useState } from "react";
import CustomInput from "./components/CustomInput";
import './style/app.scss'

function App() {
  const [amount1, setAmount1] = useState(0)
  const [amount2, setAmount2] = useState(0)
  const [type1, setType1] = useState('UAH')
  const [type2, setType2] = useState('USD')
  const [rates, setTypes] = useState({})
  const [eur, setEur] = useState(0)
  const [usd, setUsd] = useState(0)

  const getExchange = () => {
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        const rates = {}
        const arr = [...data, { cc: 'UAH', rate: 1 }]
        arr.forEach(e => {
          rates[e.cc] = e.rate
          if(e.cc === 'USD') setUsd((e.rate).toFixed(3));
          if(e.cc === 'EUR') setEur((e.rate).toFixed(3));
        })
        setTypes(rates)
      })
  }

  const changeAmount1 = (firstValue) => {
    setAmount1(firstValue)
    setAmount2((firstValue / rates[type2] * rates[type1]).toFixed(3))
  }
  const changeType1 = (type1) => {
    setType1(type1)
    setAmount2((amount1 * rates[type1] / rates[type2]).toFixed(3))
  }
  const changeAmount2 = (secondValue) => {
    setAmount2(secondValue)
    setAmount1((secondValue / rates[type1] * rates[type2]).toFixed(3))
  }
  const changeType2 = (type2) => {
    setType2(type2)
    setAmount2((amount1 / rates[type2] * rates[type1]).toFixed(3))
  }

  useEffect(() => {
    getExchange()
  }, [])

  useEffect(() => {
    if (amount1 === '' || amount2 === '') {
      setAmount1('')
      setAmount2('')
    }
  }, [amount1, amount2])

  return (
    <div className="App">
      <div className="converter">
        <header className="header">
          <span className="eur">$: {usd}</span>
          <span className="usd">&#x20ac; {eur}</span>
        </header>
        <h1>
          Converter
        </h1>
        <CustomInput
          currencyAmount={amount1}
          currencyType={type1}
          arrTypes={Object.keys(rates)}
          changeAmount={changeAmount1}
          changeType={changeType1}
        />
        <CustomInput
          currencyAmount={amount2}
          currencyType={type2}
          arrTypes={Object.keys(rates)}
          changeAmount={changeAmount2}
          changeType={changeType2}
        />
      </div>
    </div>
  );
}

export default App;
