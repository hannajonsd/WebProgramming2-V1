import { describe, expect, it } from '@jest/globals';
import { parseGamedayJson, parseTeamsJson } from './parse';

describe('parse', () => {
  describe('parseTeamsJson', () => {
    it('should return null if data is invalid json', () => {
      const result = parseTeamsJson('asdf');

      expect(result).toBe(null);
    });

    it('should return null if data is null', () => {
      const result = parseTeamsJson('null');

      expect(result).toBe(null);
    });
  });

  describe('parseGamedayJson', () => {
    it('should return null if data is invalid json', () => {
      const result = parseGamedayJson('asdf');

      expect(result).toBe(null);
    });

    it('should return null if data is null', () => {
      const result = parseGamedayJson('null');

      expect(result).toBe(null);
    });

    it('should return null if data is missing `date`', () => {
      const result = parseGamedayJson('{"games": []}');

      expect(result).toBe(null);
    });

    it('should return null if data is missing `games`', () => {
      const result = parseGamedayJson('{"date": "2021-01-01"}');

      expect(result).toBe(null);
    });
  });
});
