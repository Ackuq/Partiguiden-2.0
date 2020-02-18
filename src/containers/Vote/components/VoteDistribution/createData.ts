export default voting => {
  const result = [] as any;

  // eslint-disable-next-line array-callback-return
  Object.keys(voting).map(party => {
    if (party !== '-' && party !== 'Totalt') {
      result.push({
        name: party,
        Ja: voting[party].ja,
        Nej: voting[party].nej,
        Avstående: voting[party].avstaende,
        Frånvarande: voting[party].franvarande,
      });
    }
  });
  return result;
};