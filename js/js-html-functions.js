const dataPath = "./json/elements.json";

export async function getData() {
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
