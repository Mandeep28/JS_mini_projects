console.log("this is calculator project in js");
//  operator array
let operator = ["-", "+", "*", "/", "%"];

const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

// loop on all buttons
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // case 1 : if the data type of button is Allclear which means to clear all input value
    if (e.currentTarget.dataset.type === "Allclear") {
      display.value = "";
    }
    // case 2 : if the data type of button is clear last input value
    else if (e.currentTarget.dataset.type === "clear") {
      console.log(display.value.length);
      display.value = display.value.slice(0, display.value.length - 1);
    }

    // case 3 : if the data type of button is op which means it is the operator
    else if (e.currentTarget.dataset.type === "op") {
      let strlength = display.value.length;
      if (strlength > 0) {
        let checkVal = display.value.slice(strlength - 1, strlength);
        if (operator.includes(checkVal)) {
          display.value = display.value.slice(0, display.value.length - 1);
          display.value = display.value + e.currentTarget.innerText;
        } else {
          display.value = display.value + e.currentTarget.innerText;
        }
      }
    }
    //  case 4 : if the data type of the button is result which means the user press "="
    else if (e.currentTarget.dataset.type === "result") {
      let strlength = display.value.length;
      if (strlength > 1) {
        let checkVal = display.value.slice(strlength - 1, strlength);
        if (checkVal === "-") {
          display.value = display.value + 0;
        } else if (operator.includes(checkVal)) {
          display.value = display.value + 1;
        }
        display.value = eval(display.value);
      }
    }
    // case 5 : that mens the user press the number button like  0, 1, 2, 3 .....9
    else {
      let btnValue = e.currentTarget.innerText;
      let displayText = display.value;
      display.value = displayText + btnValue;
    }
  });
});
