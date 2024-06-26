// parse: taka við gögnum og varpa i gagnaformat
export function parseTeamsJson(data) {
  let teamsJSON;
  try {
    teamsJSON = JSON.parse(data);
  } catch (e) {
    console.error('invalid data', e);
    return null;
  }

  if (teamsJSON == null) {
    return null;
  }

  return teamsJSON;
}

/**
 * Tekur 'gameday' gögn, staðfestir og hendir ólöglegum færslum, skilar
 * á normalizeruðu formi.
 * @param {string} data Gögn lesin af disk
 * @returns {null | Array<string>} Gögn á betra formi (eða string[])
 */
export function parseGamedayJson(data) {
  let gamedayJSON;

  try {
    gamedayJSON = JSON.parse(data);
  } catch (e) {
    console.error('invalid data', e);
    return null;
  }

  if (gamedayJSON == null) {
    return null;
  }

  if (gamedayJSON.date == null) {
    return null;
  }

  if (!gamedayJSON) {
    console.warn('parsed data is not an object');
    return null;
  }

  if (!gamedayJSON.games) {
    console.warn('missing games array');
    return null;
  }

  if (!gamedayJSON.date) {
    console.warn('missing date string');
    return null;
  }

  return gamedayJSON;
}
