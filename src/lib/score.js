export function isScoreValid(score) {
  return typeof score === 'number' && score >= 0;
}

export function sortTeamsByPoints(teamPoints) {
  return Object.entries(teamPoints).sort((a, b) => b[1] - a[1]);
}

export function calculateStandings(data, validTeams) {
  // console.log('checka', validTeams);

  const teamPoints = {};

  data.forEach((gameday) => {
    gameday.games.forEach((game) => {
      const hometeams = game.home.name;
      const awayteams = game.away.name;
      const homeScore = game.home.score;
      const awayScore = game.away.score;

      if (validTeams.includes(hometeams) && validTeams.includes(awayteams)) {
        if (!teamPoints[hometeams]) teamPoints[hometeams] = 0;
        if (!teamPoints[awayteams]) teamPoints[awayteams] = 0;

        // console.log('valid team', hometeams, awayteams);
        if (isScoreValid(homeScore) && isScoreValid(awayScore)) {
          if (homeScore > awayScore) {
            teamPoints[hometeams] += 3;
          } else if (homeScore < awayScore) {
            teamPoints[awayteams] += 3;
          } else {
            teamPoints[hometeams] += 1;
            teamPoints[awayteams] += 1;
          }
        }
      }
    });
  });

  const teams = sortTeamsByPoints(teamPoints);

  return teams;
}

/*
  skoða hvort liðið sé gilt, þá ekki birta
  svo leita af liðinu i games.home.name og games.away.name
  ef það er þar þá birta, telja score í leiðinni
*/

// file les
// parse json
// utreikningar i score.js
