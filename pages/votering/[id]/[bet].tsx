import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Container from '@material-ui/core/Container';

import Breadcrumbs from '../../../src/components/Breadcrumbs';
import SocialMediaShare from '../../../src/components/SocialMediaShare';
import { apiLinks } from '../../../src/utils';
import PageTitle from '../../../src/components/PageTitle';
import { Vote, fetchVote } from '../../../src/containers/Vote';

interface Props {
  vote: any;
  bet: string | string[];
}

const VoteContainer: NextPage<Props> = ({ vote, bet }) => (
  <>
    <Head>
      <title>{vote.document.titel} | Votering | Partiguiden.nu</title>
      <meta
        name="description"
        content={`Hur har partiernat röstat i voteringen om ${vote.document.titel}`}
      />
    </Head>
    <PageTitle title={`${vote.document.titel} förslagspunkt ${bet}`} variant="h3" />
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Breadcrumbs
          links={[
            { href: '/voteringar', label: 'Voteringar' },
            { href: '#', label: 'Votering' },
          ]}
        />
        <SocialMediaShare title={`${vote.document.titel} förslagspunkt ${bet}`} />
      </div>
      <Vote {...vote} />
    </Container>
  </>
);

VoteContainer.getInitialProps = async ({ query }) => {
  const url = `${apiLinks.riksdagenApi}/dokumentstatus/${query.id}.json`;
  const vote = await fetchVote({ bet: query.bet, url });
  return { vote, bet: query.bet };
};

export default VoteContainer;