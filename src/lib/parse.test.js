import { describe, expect, it } from '@jest/globals';
import { parseGamedayJson, parseTeamsJson } from './parse';

describe('parse', () => {
  describe('parseTeamsJson', () => {
    it('should have a test', () => {
      expect(parseTeamsJson('{}')).toEqual({});
    });
  });


  describe('parseGamedayJson', () => {
    it('should return null if data is invalid json', () => {
      const result = parseGamedayJson('asdf');

      expect(result).toBe(null);
    });

    it('should return null if data is missing `date`', () => {
      const result = parseGamedayJson('{"games": []}');

      expect(result).toBe(null);
    });
  });

  // describe('parseGameday', ()), síðustu mín (klára), komið

});
// function parseGameday(arg0) {
//   throw new Error('Function not implemented.');
// }

