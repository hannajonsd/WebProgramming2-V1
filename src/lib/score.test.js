import { describe, expect, it } from '@jest/globals';
import { calculateStandings } from './score';

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
  });
});
