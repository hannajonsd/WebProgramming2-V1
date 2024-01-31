import { describe, expect, it } from '@jest/globals';
import {
  gameObjectToHtmlString,
  indexTemplate,
  leikirTemplate,
  stadaTemplate,
  template,
} from './html';
import { isScoreValid } from './score';

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
      expect(indexTemplate().length).toBeGreaterThan(1);
      expect(indexTemplate()).toContain(`
      <section>
        <div class="titleContainer">
          <h1>Velkomin í boltadeildina!</h1>
        </div>
        <p>Þetta er síða um boltadeildina! Hér má finna upplýsingar um stöðu hvers liðs innan deildarinnar og
        einnig má finna upplýsingar um síðustu leiki í deildinni.</p>
        <ul>
          <li><a href="stada.html">Staðan í deildinni</a></li>
          <li><a href="leikir.html">Seinustu leikir</a></li>
        </ul>
      </section>`);
    });
  });

  describe('stadaTemplate', () => {
    it('generate correct score template', () => {
      expect(stadaTemplate().length).toBeGreaterThan(1);
      expect(stadaTemplate()).toContain(`
        <section>
        <h2>Staðan í deildinni</h2>
        <table>
        <tr>
          <th>Nafn liðs</th>
          <th>Staða</th>
        </tr>

      </table>
        </section>`);
    });
  });

  describe('leikirTemplate', () => {
    it('should have a test', () => {
      expect(leikirTemplate().length).toBeGreaterThan(1);
      expect(leikirTemplate()).toContain(`
      <section>
        <h2>Seinustu leikir</h2>

      </section>
      `);
    });
  });

  describe('gameObjectToHtmlString', () => {
    it('should have a test', () => {
      expect(gameObjectToHtmlString()).toContain('<html>');
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
