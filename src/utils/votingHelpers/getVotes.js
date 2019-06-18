export default row => {
  const voting = {};
  for (let i = 2; i < row.length - 1; i += 1) {
    const { td } = row[i];
    const partyVotes = {
      ja: td[1],
      nej: td[2],
      avstaende: td[3],
      franvarande: td[4]
    };
    voting[td[0]] = partyVotes;
  }
  return voting;
};