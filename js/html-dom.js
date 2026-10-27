const container = document.getElementById("element-display");

export function renderData(elementData) {
  const unorderList = document.createElement("ul");

  Object.entries(elementData).forEach(([key, value]) => {
    const listElement = document.createElement("li");
    if (key === "CPKHexColor") return;

    listElement.textContent = `${key.replace(/([A-Z])/g, " $1").trim()}: ${value ? value : 0}`;
    if (key === "MeltingPoint" || key === "BoilingPoint") {
      listElement.textContent = `${key.replace(/([A-Z])/g, " $1").trim()}: ${value ? value + " K" : "N/A"}`;
    }
    if (key === "Density") {
      listElement.textContent = `${key.replace(/([A-Z])/g, " $1").trim()}: ${value ? value + "g/cm^3" : 0}`;
    }
    unorderList.appendChild(listElement);
  });

  container.appendChild(unorderList);
}
