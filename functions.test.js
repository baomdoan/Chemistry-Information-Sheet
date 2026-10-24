import { beforeEach, describe, expect, it, test, vi } from "vitest";
//import { getElementData } from "./js/element-data.js";
//import { filterElement } from "./js/element-data.js";
import { getData } from "./js/js-html-functions";

/*
// Test atomic number matches
test("Element Atomic Number matches", async () => {
  const element = await getElementData();
  expect(element.elementByNumber.get(1).Name).toEqual("Hydrogen");
  expect(element.elementByNumber.get(8).Name).toEqual("Oxygen");
  expect(element.elementByNumber.get(20).Name).toEqual("Calcium");
});

// // Test not match atomic number
test("Element atomic number matches with name and symbol", async () => {
  const element = await getElementData();
  expect(element.elementByNumber.get(2).Name).not.toEqual("Hydrogen");
  expect(element.elementByNumber.get(30).Symbol).not.toEqual("Ca");
});

// Test search with name
test("Element name matches with symbol", async () => {
  const element = await getElementData();
  expect(element.elementByName.get("helium").Symbol).toEqual("He");
  expect(element.elementByName.get("helium").Symbol).not.toEqual("he");
});

// Test search with symbol
test("Element symbol matches with name or number", async () => {
  const element = await getElementData();
  expect(element.elementBySymbol.get("h").AtomicNumber).toEqual(1);
  expect(element.elementBySymbol.get("he").Name).toEqual("Helium");
  expect(element.elementBySymbol.get("he").Name).not.toEqual("elium");
});

// Test the size of the map
test("Each map contains 118 element, the size needs to be 118", async () => {
  const element = await getElementData();
  expect(element.elementByName.size).toBe(118);
  expect(element.elementBySymbol.size).toBe(118);
  expect(element.elementByNumber.size).toBe(118);
});

// Test search with cross map
test("Testing cross maps lookup", async () => {
  const element = await getElementData();
  expect(element.elementByName.get("helium").AtomicNumber).toEqual(2);
  expect(element.elementBySymbol.get("ca").Name).toEqual("Calcium");
  expect(element.elementByName.get("potassium").AtomicNumber).not.toEqual(18);
  expect(element.elementByNumber.get(19).Symbol).not.toEqual("br");
  expect(element.elementByNumber.get(19).Symbol).toEqual("K");
});
*/

/*
// Find element by number
test("Filter element finds a match", async () => {
  const elementData = await getElementData();
  const element = await filterElement(8, elementData);

  expect(element.Name).toEqual("Oxygen");
  expect(element.Symbol).toEqual("O");
  expect(element.Symbol).not.toEqual("H");
});

// Find element by symbol
test("Filter ement finds a match", async () => {
  const elementData = await getElementData();
  const element = await filterElement("Ca", elementData);

  expect(element.Name).not.toEqual("Oxygen");
  expect(element.AtomicNumber).toEqual(20);
  expect(element.AtomicNumber).not.toEqual(40);
});

// Find element by Name
test("Filter ement finds a match", async () => {
  const elementData = await getElementData();
  const element = await filterElement("Calcium", elementData);

  expect(element.Symbol).not.toEqual("ca");
  expect(element.Symbol).toEqual("Ca");
  expect(element.AtomicNumber).toEqual(20);
  expect(element.AtomicNumber).not.toEqual(40);
});

// Test error handling when atomic number goes beyond 118
test("Reject invalid atomic number", async () => {
  const elementData = await getElementData();
  await expect(filterElement(200, elementData)).rejects.toThrow(
    "Element not found",
  );
});

// Test error handling when element name not found
test("Reject invalid element name", async () => {
  const elementData = await getElementData();
  await expect(filterElement("asdfasdfa", elementData)).rejects.toThrow(
    "Element not found",
  );
});

// Test error handling for element symbol
test("Reject unknown element symbol", async () => {
  const elementData = await getElementData();
  await expect(filterElement("ps", elementData)).rejects.toThrow(
    "Element not found",
  );
});
// Test error handling for blank input
test("reject blank input", async () => {
  const elementData = await getElementData();
  await expect(filterElement("", elementData)).rejects.toThrow(
    "Element not found",
  );
});

// Test error handling for white spaces
test("reject white spaces input", async () => {
  const elementData = await getElementData();
  await expect(filterElement("     ", elementData)).rejects.toThrow(
    "Element not found",
  );
});
*/

const mockFetch = vi.fn();

global.fetch = mockFetch;

describe("getData", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("Load elements and check atmic number conversion", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([{ Name: "Hydrogen", AtomicNumber: "1" }]),
    });

    const elements = await getData();
    expect(mockFetch).toHaveBeenCalledWith("./json/elements.json");
    expect(elements[0].Name).toEqual("Hydrogen");
    expect(elements[0].AtomicNumber).toEqual(1);
  });
});
