import fetch from 'isomorphic-unfetch';
import stripJsonComments from 'strip-json-comments';
import { checkVote } from '../../../../utils/votingHelpers';

const checkIfVotesExist = ({ url }) =>
  fetch(url)
    .then(res => res.text())
    .then(json => {
      const result = JSON.parse(stripJsonComments(json));
      const { dokumentstatus } = result;

      if (dokumentstatus.dokutskottsforslag) {
        return { votesExist: checkVote(dokumentstatus.dokutskottsforslag.utskottsforslag) };
      }
      return { votesExist: false };
    });

export default checkIfVotesExist;