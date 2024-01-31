import { describe, expect, it } from '@jest/globals';
import {
  gameObjectToHtmlString,
  indexTemplate,
  leikirTemplate,
  sortGamesByDate,
  stadaTemplate,
  template,
} from './html';

describe('html', () => {
  describe('template', () => {
    it('should generate correct index template', () => {
      const title = 'TEST-TITLE';
      const body = 'TEST-BODY';
      const htmlTemplate = template(title, body);

      expect(htmlTemplate).toContain(`<title>${title}</title>`);
    });
  });

  describe('indexTemplate', () => {
    it('should generate correct index template', () => {
      const result = indexTemplate();

      expect(result).toContain('<h1>Velkomin í boltadeildina!</h1>');
      expect(result).toContain(
        '<li><a href="stada.html">Staðan í deildinni</a></li>',
      );
      expect(result).toContain(
        '<li><a href="leikir.html">Seinustu leikir</a></li>',
      );
    });
  });

  describe('stadaTemplate', () => {
    it('generate correct score template', () => {
      const standings = [
        ['Team A', 10],
        ['Team B', 20],
      ];
      const standingsHtml = stadaTemplate(standings);
      expect(standingsHtml).toContain('<tr><td>Team A</td><td>10</td></tr>');
      expect(standingsHtml).toContain('<tr><td>Team B</td><td>20</td></tr>');
    });
  });

  describe('leikirTemplate', () => {
    it('generate correct game template', () => {
      const validTeams = ['Team A', 'Team B', 'Team C', 'Team D'];
      const games = [
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
      const result = leikirTemplate(games, validTeams);
      expect(result.length).toBeGreaterThan(1);
      expect(result).toContain('<title>Boltadeildin-leikir!</title>');
      expect(result).toContain('<h2>Seinustu leikir</h2>');
    });
  });

  describe('gameObjectToHtmlString', () => {
    it('should generate a correct html string', () => {
      const DATE = new Date('2021-01-01T00:00:00.000Z').toDateString();

      const gamesHtml = `
      <div class="game-info">
      <div class="team-info home-team">
        <span class="team-name">Team A</span>
        <span class="team-score">2</span>
      </div>
      <div class="vs">vs</div>
      <div class="team-info away-team">
        <span class="team-name">Team B</span>
        <span class="team-score">3</span>
      </div>
    </div>`;
      const validTeams = ['Team A', 'Team B', 'Team C', 'Team D'];
      const gameday = {
        date: DATE,
        games: [
          {
            home: { name: 'Team A', score: 2 },
            away: { name: 'Team B', score: 3 },
          },
        ],
      };

      const expected = `
      <div class="gameday">
      <button class="date-toggle">${DATE}</button>
      <div class="games-container" style="display: none;">
      ${gamesHtml}
      </div>
      </div>
      `;

      const result = gameObjectToHtmlString(gameday, validTeams);
      expect(result.replace(/\s/g, '')).toContain(expected.replace(/\s/g, ''));
    });

    it('should not include games with invalid scores', () => {
      const gameday = {
        date: '2024-01-31',
        games: [
          {
            home: { name: 'Team A', score: -1 },
            away: { name: 'Team B', score: 3 },
          },
        ],
      };
      const validTeams = ['Team A', 'Team B'];
      const htmlString = gameObjectToHtmlString(gameday, validTeams);

      expect(htmlString).not.toContain('Team A');
      expect(htmlString).not.toContain('-1');
    });

    it('should not include teams not in validTeams', () => {
      const gameday = {
        date: '2024-01-31',
        games: [
          {
            home: { name: 'Team A', score: 2 },
            away: { name: 'Team B', score: 3 },
          },
        ],
      };
      const validTeams = ['Team A'];
      const htmlString = gameObjectToHtmlString(gameday, validTeams);

      expect(htmlString).not.toContain('Team B');
    });
  });

  describe('sortGamesByDate', () => {
    it('should sort games by date', () => {
      const games = [
        { date: '2024-01-15T15:20:53.955Z' },
        { date: '2024-02-13T15:20:53.955Z' },
        { date: '2024-01-27T15:20:53.955Z' },
      ];

      const sortedGames = sortGamesByDate(games);

      expect(sortedGames[0].date).toBe('2024-01-15T15:20:53.955Z');
      expect(sortedGames[1].date).toBe('2024-01-27T15:20:53.955Z');
      expect(sortedGames[2].date).toBe('2024-02-13T15:20:53.955Z');
    });
  });
});
