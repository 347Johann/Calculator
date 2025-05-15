let calculatorDisplay = document.getElementById("calculator-display");
let textColor = "black";
let font = "'Courier New', Courier, monospace";
let invalidState = false;

function selectedNumber(v) {
  let calculatorDisplaySplit = calculatorDisplay.textContent.split(/((?:\(\-|÷|×|\+|-|%|⇒|e))/).filter((text) => text !== "")
  let positiveSpliceCalculatorDisplaySplit = calculatorDisplaySplit.toSpliced(calculatorDisplaySplit.length - 2, 1, "")
  let calculatorDisplaySplitSpliced = calculatorDisplaySplit.toSpliced(calculatorDisplaySplit.length - 1, 0, "(-")
  const left = -1;
  const right = 1;

  function invalidInputAlert() {
    calculatorDisplay.textContent = "Invalid Input";
    font = "Verdana, Geneva, Tahoma, sans-serif";
    textColor = "red";
    invalidState = true;
    setTimeout(() => {
      calculatorDisplay.textContent = "";
      calculatorDisplay.style.color = "black";
      calculatorDisplay.style.textShadow = "0px, 0px, black";
      calculatorDisplay.style.fontFamily = "'Courier New', Courier, monospace";
      textColor = "black";
      font = "'Courier New', Courier, monospace";
      invalidState = false
    }, 1400);
  }

  if (v === "AC") {
    if (invalidState === false) {
    calculatorDisplay.textContent = "";
    calculatorDisplay.style.color = "black";
    calculatorDisplay.style.textShadow = "0px, 0px, black";
    calculatorDisplay.style.fontFamily = ` 'Courier New', Courier, monospace`;
    }
  }
  else if (v === "⌫") {
    if (invalidState === false) {
      lastCharRemovedCalculatorDisplay = calculatorDisplay.textContent.split(""); // Stupid Name -Future Johann
      if (lastCharRemovedCalculatorDisplay[lastCharRemovedCalculatorDisplay.length - 1] === "⇒") {
        lastCharRemovedCalculatorDisplay.splice(lastCharRemovedCalculatorDisplay.length - 2, 1);
        calculatorDisplay.textContent = lastCharRemovedCalculatorDisplay.join("").replace(/,/g, "");
      }
      lastCharRemovedCalculatorDisplay.pop();
      calculatorDisplay.textContent = lastCharRemovedCalculatorDisplay.join("").replace(/,/g, "");
    }
  }
  else if (v === "=") {
    if (invalidState === false)
    for (let i = 0; i < calculatorDisplaySplit.length; i++) {
      if (calculatorDisplaySplit[i] === "(-") {
        calculatorDisplaySplit[i + right] = calculatorDisplaySplit[i + right] - (calculatorDisplaySplit[i + right] * 2);
        calculatorDisplaySplit.splice(i, 1);
      }
    }
    for (let i = 0; i < calculatorDisplaySplit.length; i++) {
      if (calculatorDisplaySplit[i] === "%") {
        if (calculatorDisplaySplit[i + (left * 3)] !== "e") {
          if (calculatorDisplaySplit[i + left] === undefined ||
            isNaN(calculatorDisplaySplit[i + left]) ||
            calculatorDisplaySplit[i + 1 + right] === undefined ||
            isNaN(calculatorDisplaySplit[i + 1 + right])
          ) {
            invalidInputAlert()
            break
          }
          calculatorDisplaySplit[i + left] = (calculatorDisplaySplit[i + left] * 0.01) * calculatorDisplaySplit[i + 1 + right];
          calculatorDisplaySplit.splice(i, 3)
          i--
        }
        else {
          calculatorDisplaySplit[i + left * 4] =
          calculatorDisplaySplit[i + left * 4] * (10 ** calculatorDisplaySplit[i + left])
          calculatorDisplaySplit.splice(i + left * 3, 3)
          calculatorDisplaySplit[i + left * 4] =
          (calculatorDisplaySplit[i + left * 4] * 0.01) * calculatorDisplaySplit[i + left];
          calculatorDisplaySplit.splice(i + left * 3, 3);
          i -= 4
          continue
        }
      }
    }
    for (let i = 0; i < calculatorDisplaySplit.length; i++) {
      if (calculatorDisplaySplit[i] === "÷" || calculatorDisplaySplit[i] === "×") {
        if (calculatorDisplaySplit[i] === "÷") {
          if (calculatorDisplaySplit[i + (left * 3)] !== "e") {
            if (calculatorDisplaySplit[i + left] === undefined ||
              isNaN(calculatorDisplaySplit[i + left]) ||
              calculatorDisplaySplit[i + right] === undefined ||
              isNaN(calculatorDisplaySplit[i + right])
            ) {
              invalidInputAlert()
              break
            }
            else {
              calculatorDisplaySplit[i + left] =
              calculatorDisplaySplit[i + left] / calculatorDisplaySplit[i + right];
              calculatorDisplaySplit.splice(i, 2);
              i--
            }
          }
          else {
            calculatorDisplaySplit[i + left * 4] =
            calculatorDisplaySplit[i + left * 4] * (10 ** calculatorDisplaySplit[i + left])
            calculatorDisplaySplit.splice(i + left * 3, 3)
            calculatorDisplaySplit[i + left * 4] =
            calculatorDisplaySplit[i + left * 4] / calculatorDisplaySplit[i + left * 2];
            calculatorDisplaySplit.splice(i + left * 3, 2);
            i -= 4
            continue
          }
        }
        if (calculatorDisplaySplit[i] === "×") {
          if (calculatorDisplaySplit[i + (left * 3)] !== "e") {
            if (calculatorDisplaySplit[i + left] === undefined ||
              isNaN(calculatorDisplaySplit[i + left]) ||
              calculatorDisplaySplit[i + right] === undefined ||
              isNaN(calculatorDisplaySplit[i + right])
            ) {
              invalidInputAlert()
              break
            }
            else {
              calculatorDisplaySplit[i + left] =
              calculatorDisplaySplit[i + left] * calculatorDisplaySplit[i + right];
              calculatorDisplaySplit.splice(i, 2);
              i--
            }
          }
          else {
            calculatorDisplaySplit[i + left * 4] =
            calculatorDisplaySplit[i + left * 4] * (10 ** calculatorDisplaySplit[i + left])
            calculatorDisplaySplit.splice(i + left * 3, 3)
            calculatorDisplaySplit[i + left * 4] =
            calculatorDisplaySplit[i + left * 4] * calculatorDisplaySplit[i + left * 2];
            calculatorDisplaySplit.splice(i + left * 3, 2);
            i -= 4
            continue
          }
        }
      }
    }
    for (let i = 0; i < calculatorDisplaySplit.length; i++) {
      if (calculatorDisplaySplit[i] === "+" || calculatorDisplaySplit[i] === "-") {
        if (calculatorDisplaySplit[i] === "+") {
          if (calculatorDisplaySplit[i + left] !== "e") {
            if (
              calculatorDisplaySplit[i + left] === undefined ||
              isNaN(calculatorDisplaySplit[i + left]) ||
              calculatorDisplaySplit[i + right] === undefined ||
              isNaN(calculatorDisplaySplit[i + right])
            ) {
              invalidInputAlert()
              break
            }
            calculatorDisplaySplit[i + left] =
            Number(calculatorDisplaySplit[i + left]) + Number(calculatorDisplaySplit[i + right])
            calculatorDisplaySplit.splice(i, 2)
            i--
            break
          }
          else {
            calculatorDisplaySplit[i + left * 2] =
            calculatorDisplaySplit[i + left * 2] * (10 ** calculatorDisplaySplit[i + right])
            calculatorDisplaySplit.splice(i + left, 3)
            i -= 2
            continue
          }
        }

        if (calculatorDisplaySplit[i] === "-") {
          if (
            calculatorDisplaySplit[i + left] === undefined ||
            isNaN(calculatorDisplaySplit[i + left]) ||
            calculatorDisplaySplit[i + right] === undefined ||
            isNaN(calculatorDisplaySplit[i + right])
          ) {
            invalidInputAlert()
            break
          }
          calculatorDisplaySplit[i + left] =
            calculatorDisplaySplit[i + left] - calculatorDisplaySplit[i + right]
          calculatorDisplaySplit.splice(i, 2)
          i--
        }
      }
    }
    if (invalidState === false) {
      if (calculatorDisplaySplit < 0) {
        calculatorDisplaySplit = calculatorDisplaySplit - (calculatorDisplaySplit * 2)
        calculatorDisplay.textContent = `(-${calculatorDisplaySplit}`;
      }
      else {
        calculatorDisplay.textContent = calculatorDisplaySplit;
      }
    }
    calculatorDisplay.style.color = textColor;
    calculatorDisplay.style.fontFamily = font;
  }
  else if (v === "+/-") {
    if (invalidState === false) {
      if (calculatorDisplay.textContent.length < 50) {
        if (calculatorDisplaySplit[calculatorDisplaySplit.length - 2] === "(-") {
          calculatorDisplay.textContent =
          positiveSpliceCalculatorDisplaySplit.join("").replace(/,/g, "");
        }
        else if (!isNaN(calculatorDisplaySplit[calculatorDisplaySplit.length - 1])) {
          calculatorDisplay.textContent =
          calculatorDisplaySplitSpliced.join("").replace(/,/g, "");
        }
        else {
          calculatorDisplay.textContent =
          calculatorDisplaySplit.join("").replace(/,/g, "");
        }
      }
      else {
        alert("Over Character Limit")
      }
    }
  }
  else {
    if (calculatorDisplay.textContent.length < 51) {
      if (invalidState === false)
    calculatorDisplay.textContent += v;
    }
    else {
      alert("Over Character Limit")
    }
  }
}