import {expect, test} from 'vitest';
import { getElementData } from './js/element-data.js';

test('Element Atomic Number matches', async() => {
    const element = await getElementData();
    expect(element.elementByNumber.get('1').Name).toEqual('Hydrogen');
    expect(element.elementByNumber.get('8').Name).toEqual('Oxygen');
    expect(element.elementByNumber.get('20').Name).toEqual('Calcium');
})