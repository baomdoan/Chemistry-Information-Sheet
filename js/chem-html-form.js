const form = document.getElementById("element-form");
const elementInput = document.getElementById("element-input");
const elementInputError = document.getElementById("element-input-error");
const elementDisplay = document.getElementById("element-display");
import { getData } from "./element-data.js";
import { filterElement } from "./js-html-functions.js";
import { renderData } from "./html-dom.js";

form.noValidate = true;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let isValid = true;

  //Clear message
  elementInputError.textContent = "";
  elementDisplay.textContent = "";

  if (isValid) {
    const input = elementInput.value;
    const elements = await getData();

    try {
      const element = filterElement(input, elements);
      renderData(element);
      elementInput.value = "";
    } catch (err) {
      elementInputError.textContent = err.message;
    }
  }
});
