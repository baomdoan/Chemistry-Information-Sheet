const form = document.getElementById("element-form");
const elementInput = document.getElementById("element-input");
const elementInputError = document.getElementById("element-input-error");
const dataPath = "./json/elements.json";

const numberOnly = /^\d+$/;

async function getData() {
  try {
    const response = await fetch(dataPath);
    if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);

    // Parse JSON content to be done next
    const elementData = await response.json();
    elementData.forEach((element) => {
      element.AtomicNumber = Number(element.AtomicNumber);
    });

    return elementData;
  } catch (err) {
    document.getElementById("element-display").textContent =
      `Unable to load JSON data, Error ${err.message}`;
    return "Failed";
  }
}

form.noValidate = true;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let isValid = true;

  //Clear message
  elementInputError.innerText = "";
  let validInput = elementInput.value.trim().toLowerCase();

  if (validInput.length === 0) {
    elementInputError.innerText =
      "Please enter a valid element name or symbol!";
    isValid = false;
  } else if (numberOnly.test(validInput)) {
    const AtomicNumber = parseInt(validInput);
    if (AtomicNumber < 1 || AtomicNumber > 118) {
      elementInputError.innerText =
        "Please enter a valid Atomic Number between 1 and 118!";
      isValid = false;
    }
  }

  if (isValid) {
    const elements = await getData();
    alert("Form successfully submitted!");
    elementInput.value = "";
  }
});
