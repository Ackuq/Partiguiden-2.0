import stripJsonComments from 'strip-json-comments';
import fetch from 'isomorphic-unfetch';

import { getVotes } from '../../utils/votingHelpers';

const getMatches = (suggestion: string, referens: Array<any>) => {
  let newSuggestion = suggestion.replace(/(<br>)|<BR(\/)>/gm, '');
  const re = /\b([0-9][0-9][0-9][0-9]\/[0-9][0-9]):(\S+).*/gm;
  const processedDocuments = [] as Array<any>;
  let match;

  do {
    match = re.exec(newSuggestion);
    if (match) processedDocuments.push(match);
  } while (match);

  for (let i = 0; i < processedDocuments.length; i += 1) {
    newSuggestion = newSuggestion.replace(processedDocuments[i][0], `[${i}]`);
  }
  for (let i = 0; i < processedDocuments.length; i += 1) {
    for (let j = 0; j < referens.length; j += 1) {
      if (
        processedDocuments[i][1] === referens[j].ref_dok_rm &&
        processedDocuments[i][2] === referens[j].ref_dok_bet
      ) {
        processedDocuments[i][3] = referens[j].ref_dok_id;
      }
    }
  }

  return { processedDocuments, suggestion: newSuggestion };
};

interface Props {
  bet: number;
  url: string;
}

const fetchVote = ({ bet, url }: Props) =>
  fetch(url)
    .then((res) => res.text())
    .then((json) => {
      const result = JSON.parse(stripJsonComments(json));
      const { dokumentstatus } = result;
      const { utskottsforslag } = dokumentstatus.dokutskottsforslag;
      const currUtskottsforslag = Array.isArray(utskottsforslag)
        ? utskottsforslag[bet - 1]
        : utskottsforslag;

      const { processedDocuments, suggestion } = getMatches(
        currUtskottsforslag.forslag,
        dokumentstatus.dokreferens.referens
      );

      const { uppgift } = dokumentstatus.dokuppgift;

      const decision = uppgift.find((el: any) => {
        return el.kod === 'rdbeslut';
      });

      const description = uppgift.find((el: any) => {
        return el.kod === 'notis';
      });

      const title = uppgift.find((el: any) => {
        return el.kod === 'notisrubrik';
      });

      const { table } = currUtskottsforslag.votering_sammanfattning_html;
      const tableRow = Array.isArray(table) ? table[table.length - 1].tr : table.tr;
      return {
        suggestion,
        processedDocuments,
        document: dokumentstatus.dokument,
        appendix: dokumentstatus.dokbilaga ? dokumentstatus.dokbilaga.bilaga : null,
        decision: decision ? decision.text : '',
        voting: getVotes(tableRow),
        title: title.text,
        description: description.text,
      };
    });

export default fetchVote;
