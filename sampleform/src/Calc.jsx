import { useState, useRef } from "react";

export default function Calc() {
  const [currentValue, setCurrentValue] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperator] = useState(null);
  const [response, setResponse] = useState(null);

  const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

  async function calc() {
    const r = await fetch(`${API}/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        num1: previousValue,
        num2: currentValue,
        operation: operation,
      }),
    });
    const j = await r.json();
    if (r.ok) {
      setResponse(j.result);
      setCurrentValue(null);
      setPreviousValue(null);
      setOperator(null);
    } else setResponse(j.error);
  }

  console.log("current value", currentValue);
  console.log("previous value", previousValue);
  console.log("operation", operation);

  const handleClick = (e) => {
    const getSameValue = e.currentTarget.value;
    switch (getSameValue) {
      // Numbers
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        setCurrentValue(
          currentValue === "0" ? getSameValue : currentValue + getSameValue
        );
        break;
      case "x³":
        setCurrentValue(Math.pow(parseFloat(currentValue), 3));
        break;
      case "√":
        setCurrentValue(Math.sqrt(parseFloat(currentValue)));
        break;
      case "+":
      case "-":
      case "*":
      case "%":
      case "^":
        setPreviousValue(currentValue);
        setCurrentValue("");
        setOperator(getSameValue);
        break;
      // error handling for not dividing by 0
      // case "/":
      //   if (currentValue === "0") {
      //     alert("Cannot divide by zero");
      //     break;
      //   }
      //   setPreviousValue(currentValue);
      //   setCurrentValue("");
      //   setOperator(getSameValue);
      //   break;

      //If there is a decimal point
      // case ".":
      //   if (!currentValue.includes(".")) {
      //     setCurrentValue(currentValue + ".");
      //   }
      //   break;

      case "=":
        calc();
        // setCurrentValue(formatValue(computation)); // sets the value to the computation variable
        // setPreviousValue(""); // erases previous value
        // setOperator(null); // erases the value of operator used

        break;
      // case "x²":
      //   setOperator(getSameValue);
      //   calc();
      //   break;

      // Clearing the results
      case "clearAll":
        setCurrentValue("0");
        setPreviousValue(null);
        setOperator(null);
        setResponse(null);
        break;

      case "clearEntry":
        setCurrentValue("0");
        setResponse(null);
        break;
      default:
        setCurrentValue(null);
        break;
    }
  };

  // Add a value attrbute to the buttons
  // Make the buttons 0 - 9, ., +, -, /, * C, CE, %, =
  // place in table of 4 columns(4 elements), 5 rows

  return (
    <div className="App">
      {/*This outputs the value to a paragraph*/}
      <p id="resultScreen">
        {previousValue}
        {operation}
        {currentValue}
        {response}
      </p>
      <div className="calcBtns" id="firstRow">
        <button value="clearAll" className="button-bg_01" onClick={handleClick}>
          AC
        </button>
        <button
          value="clearEntry"
          className="button-bg_01"
          onClick={handleClick}
        >
          CE
        </button>
        <button value="%" onClick={handleClick}>
          %
        </button>
        <button value="/" onClick={handleClick}>
          ÷
        </button>
      </div>
      <div className="calcBtns">
        <button value="x²" onClick={handleClick}>
          x²
        </button>
        <button value="x³" onClick={handleClick}>
          x³
        </button>
        <button value="^" onClick={handleClick}>
          ^
        </button>
        <button value="√" onClick={handleClick}>
          √
        </button>
      </div>
      <div className="calcBtns">
        <button value="7" onClick={handleClick}>
          7
        </button>
        <button value="8" onClick={handleClick}>
          8
        </button>
        <button value="9" onClick={handleClick}>
          9
        </button>
        <button value="*" onClick={handleClick}>
          x
        </button>
      </div>
      <div className="calcBtns">
        <button value="4" onClick={handleClick}>
          4
        </button>
        <button value="5" onClick={handleClick}>
          5
        </button>
        <button value="6" onClick={handleClick}>
          6
        </button>
        <button value="-" onClick={handleClick}>
          -
        </button>
      </div>
      <div className="calcBtns">
        <button value="1" onClick={handleClick}>
          1
        </button>
        <button value="2" onClick={handleClick}>
          2
        </button>
        <button value="3" onClick={handleClick}>
          3
        </button>
        <button value="+" onClick={handleClick}>
          +
        </button>
      </div>
      <div className="calcBtns">
        <button
          id="bigZero"
          className="button-bg_02"
          value="0"
          onClick={handleClick}
        >
          0
        </button>
        <button value="." onClick={handleClick}>
          .
        </button>
        <button value="=" onClick={handleClick}>
          =
        </button>
      </div>
    </div>
  );
}
