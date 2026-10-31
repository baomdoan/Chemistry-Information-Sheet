const container = document.getElementById("element-display");

export function renderData(elementData) {
  const unorderList = document.createElement("ul");

  Object.entries(elementData).forEach(([key, value]) => {
    const listElement = document.createElement("li");
    if (key === "CPKHexColor") return;

    listElement.textContent = `${key.replace(/([A-Z])/g, " $1").trim()}: ${value ? value : 0}`;
    if (key === "AtomicMass") {
      listElement.textContent = `${key.replace(/([A-Z])/g, " $1").trim()}: ${value ? value + "\u00B5" : "N/A"}`;
    }
    if (key === "IonizationEnergy" || key === "ElectronAffinity") {
      listElement.textContent = `${key.replace(/([A-Z])/g, " $1").trim()}: ${value ? value + " eV" : "N/A"}`;
    }
    if (key === "AtomicRadius") {
      listElement.textContent = `${key.replace(/([A-Z])/g, " $1").trim()}: ${value ? value + " pm" : "N/A"}`;
    }
    if (key === "MeltingPoint" || key === "BoilingPoint") {
      listElement.textContent = `${key.replace(/([A-Z])/g, " $1").trim()}: ${value ? value + " K" : "N/A"}`;
    }
    if (key === "Density") {
      listElement.textContent = `${key.replace(/([A-Z])/g, " $1").trim()}: ${value ? value + "g/cm\u00B3" : 0}`;
    }
    unorderList.appendChild(listElement);
  });

  container.appendChild(unorderList);
}
