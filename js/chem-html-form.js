const form = document.getElementById('element-form');
const elementInput = document.getElementById('element-input');
const elementInputError = document.getElementById('element-input-error');

const numberOnly = /^\d+$/;

async function getData() {
    try {
        const response = await fetch("../json/elements.json");
        if (!response.ok) 
        {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message);
    }
}

form.noValidate = true;

form.addEventListener('submit', async (e) => 
{
    e.preventDefault();
    let isValid = true;

    //Clear message
    elementInputError.innerText = '';
    let validInput = elementInput.value.trim().toLowerCase();

    if (validInput.length === 0) {
        elementInputError.innerText = "Please enter a valid element name or symbol!";
        isValid = false;
    }
    else if (numberOnly.test(validInput))
    {
        const AtomicNumber = parseInt(validInput);
        if (AtomicNumber < 1 || AtomicNumber > 118)
        {
            elementInputError.innerText = 'Please enter a valid Atomic Number between 1 and 118!';
            isValid = false;
        }
    }

    if (isValid)
    {
        const elements = await getData();
        alert("Form successfully submitted!");
        elementInput.value = '';
    }
})

