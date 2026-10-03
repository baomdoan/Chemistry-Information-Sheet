import {expect, test} from 'vitest';
import { getElementData } from './js/element-data.js';

// Test atomic number matches
test('Element Atomic Number matches', async() => {
    const element = await getElementData();
    expect(element.elementByNumber.get('1').Name).toEqual('Hydrogen');
    expect(element.elementByNumber.get('8').Name).toEqual('Oxygen');
    expect(element.elementByNumber.get('20').Name).toEqual('Calcium');
})

// Test not match atomic number
test('Element atomic number matches with name and symbol', async() => {
    const element = await getElementData();
    expect(element.elementByNumber.get('2').Name).not.toEqual('Hydrogen');
    expect(element.elementByNumber.get('30').Symbol).not.toEqual('Ca');
})

// Test search with name
test('Element name matches with symbol', async() => {
    const element = await getElementData();
    expect(element.elementByName.get('Helium').Symbol).toEqual('He');
    expect(element.elementByName.get('Helium').Symbol).not.toEqual('he');
})

// Test search with symbol
test('Element symbol matches with name or number', async() => {
    const element = await getElementData();
    expect(element.elementBySymbol.get('H').AtomicNumber).toEqual('1');
    expect(element.elementBySymbol.get('He').Name).toEqual('Helium');
    expect(element.elementBySymbol.get('He').Name).not.toEqual('elium');
})