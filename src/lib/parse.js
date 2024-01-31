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
  // console.log(data);
  // console.log('parseGamedayJson');
  try {
    gamedayJSON = JSON.parse(data);
    // console.log(gamedayJSON);
    // console.log(typeof gamedayJSON);
  } catch (e) {
    console.log('invalid data', e);
    return null;
  }


  if (gamedayJSON == null) {
    return null;
  }

  if (gamedayJSON.date == null) {
    return null;
  }


  if (!gamedayJSON) {
    console.warn('parsed data is not an object')
    return null;
  }

  if (!gamedayJSON.games) {
    console.warn('missing games array');
  }

  if (!gamedayJSON.date) {
    console.warn('missing date string');
    return null;
  }


  return gamedayJSON;
}

// lesa daginn, lesa leikina yfir daginn
// parse-a gameday files
