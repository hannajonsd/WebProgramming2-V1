import { describe, expect, it } from '@jest/globals';
import { calculateStandings, isScoreValid } from './score';

describe('score', () => {
  describe.only('calculateStandings', () => {
    it('returns empty array with no valid teams', () => {
      const data = [
        {
          date: '2024-01-01T00:00:00.000Z',
          games: [
            {
              home: {
                name: 'Óhemjurnar',
                score: 4,
              },
              away: {
                name: 'Markaskorarnir',
                score: 0,
              },
            },
          ],
        },
      ];

      const validTeams = [];
      const standings = calculateStandings(data, validTeams);

      expect(standings).toEqual([]);
    });

    it('returns empty array if there arent any games', () => {
      const data = [];
      const validTeams = ['Óhemjurnar', 'Markaskorarnir'];

      const standings = calculateStandings(data, validTeams);
      expect(standings).toEqual([]);
    });

    it('should calculate standings correctly', () => {
      const validTeams = ['Team A', 'Team B', 'Team C', 'Team D'];
      const data = [
        {
          date: '2024-01-01T00:00:00.000Z',
          games: [
            {
              home: {
                name: 'Team A',
                score: 4,
              },
              away: {
                name: 'Team B',
                score: 0,
              },
            },
          ],
        },
      ];

      const standings = calculateStandings(data, validTeams);
      expect(standings).toEqual([
        ['Team A', 3],
        ['Team B', 0],
      ]); // score, 3 points for win
    });
  });

  describe('isScoreValid', () => {
    it.skip('should return true of score is valid, else return false', () => {
      expect(isScoreValid(1)).toBe(true);
      expect(isScoreValid(-1)).toBe(false);
      expect(isScoreValid(99)).toBe(true);
    });
  });
});
