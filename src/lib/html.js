// exported for testing purposes
export function template(title, body) {
  const html =
    /* html */
    `
  <html>
    <head>
    <link rel="stylesheet" href="./public/styles.css">
      <title>${title}</title>
    </head>
    <body>
    <script type="module" src="./public/scripts.js"></script>
    <div class="dingdong">
    ${body}
    <div>
    </body>
  </html>`;

  return html;
}

export function indexTemplate() {
  const title = 'Boltadeildin-forsíða';
  const body = /* html */ `
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
  </section>`;
  return template(title, body);
}

export function stadaTemplate(standings) {
  const title = 'Boltadeildin-leikir';
  let standingsHtml = '';

  standings.forEach(([team, points]) => {
    standingsHtml += `<tr><td>${team}</td><td>${points}</td></tr>`;
  });
  const body = /* html */ `
  <section>
  <h2>Staðan í deildinni</h2>
  <table>
  <tr>
    <th>Nafn liðs</th>
    <th>Staða</th>
  </tr>
    ${standingsHtml}
</table>

    </section>`;
  return template(title, body);
}

export function isScoreValid(score) {
  return typeof score === 'number' && score >= 0;
}

// export function isTeamValid(team) {
//   return typeof team === ;
// }

export function gameObjectToHtmlString(gameday) {
  const date = new Date(gameday.date).toDateString();

  let gamesHtml = '';
  gameday.games.forEach((game) => {
    if (isScoreValid(game.home.score) && isScoreValid(game.away.score)) {
      const hometeams = game.home.name;
      const awayteams = game.away.name;
      const homeScore = game.home.score;
      const awayScore = game.away.score;

      gamesHtml += `
      <div class="game-info">
        <div class="team-info home-team">
          <span class="label">Hometeam:</span>
          <span class="team-name">${hometeams}</span>
          <span class="team-score">${homeScore}</span>
        </div>
        <div class="vs">vs</div>
        <div class="team-info away-team">
          <span class="label">Awayteam:</span>
          <span class="team-name">${awayteams}</span>
          <span class="team-score">${awayScore}</span>
        </div>
      </div>`;

      // `<p> Hometeam: <br> ${hometeams} ${homeScore} <br>
      //  Awayteam: <br> ${awayteams} ${awayScore} <br></p>`;
    }
  });

  return `<div class="gameday">
  <button class="date-toggle">${date}</button>
  <div class="games-container" style="display: none;">
    ${gamesHtml}
  </div>
</div>
`;
}

export function leikirTemplate(games) {
  const title = 'Boltadeildin-leikir!';

  games.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  let allGames = '';
  games.forEach((gameday) => {
    allGames += gameObjectToHtmlString(gameday);
    // console.log(gameObjectToHtmlString(game));
  });

  const body = /* html */ `
    <section>
    <h2>Seinustu leikir</h2>
    ${allGames}
  </section>`;

  return template(title, body);
}
