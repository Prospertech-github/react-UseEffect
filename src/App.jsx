// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import React, { useEffect, useState } from "react";

function App() {
  const [fromAmount, setFromAmount] = useState(1);
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("CAD");
  const [finalAmount, setFinalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convert() {
        setIsLoading(true)
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${fromAmount}&from=${fromCurr}&to=${toCurr}`
        );
        const data = await res.json();
        setFinalAmount(data.rates[toCurr]);
        setIsLoading(false)
      }
      if(fromCurr === toCurr) return setFinalAmount(fromAmount)
      convert();
    },
    [fromAmount, fromCurr, toCurr]
  );

  return (
    <div>
      <input
        type="text"
        value={fromAmount}
        onChange={(e) => setFromAmount(e.target.value)}
        disabled={isLoading}
      />

      <select
        value={fromCurr}
        onChange={(e) => setFromCurr(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      <select
        value={toCurr}
        onChange={(e) => setToCurr(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {" "}
        {finalAmount} {toCurr}
      </p>
    </div>
  );
}

export default App;
