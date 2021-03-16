import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import PageTitle from '../src/components/PageTitle';
import {
  AveragePoll,
  BlockAverage,
  createBlockAverage,
  getAverage,
  getMonthlyAverage,
  getPolls,
  getWithin,
  MonthlyAverage,
} from '../src/lib/polls';
import { Polls } from '../src/types/polls';
import PollsContainer from '../src/containers/Polls';
import { Container } from '@material-ui/core';
import moment from 'moment';
import { blocks } from '../src/utils/getParties';

interface Props {
  polls: Polls;
  currentAverage: AveragePoll;
  blockAverage: BlockAverage;
  historicPolls: MonthlyAverage;
}

const PollsPageContainer: NextPage<Props> = ({ currentAverage, blockAverage, historicPolls }) => (
  <>
    <Head>
      <title>Opinionsundersökningar | Partiguiden</title>
      <meta
        name="description"
        content="Vad tar Sveriges partier för ståndpunkter i sakfrågor? På Partiguiden kan du hitta och jämföra vad partierns åsikter för att hitta det parti du sympatiserar mest med."
      />
    </Head>
    <PageTitle title="Opinionsundersökningar" />
    <Container style={{ flex: 1 }}>
      <PollsContainer
        currentAverage={currentAverage}
        blockAverage={blockAverage}
        historicPolls={historicPolls}
      />
    </Container>
  </>
);

const blockSort = (a: AveragePoll[number], b: AveragePoll[number]) => {
  const indexA = blocks.findIndex((block) => block.parties.includes(a.party));
  const indexB = blocks.findIndex((block) => block.parties.includes(b.party));
  if (indexA < indexB) {
    return -1;
  }
  if (indexA > indexB) {
    return 1;
  }
  return 0;
};

export const getStaticProps: GetStaticProps = async () => {
  const today = moment();
  const twoMonthsAgo = moment().subtract(2, 'months');
  const fourYearsAgo = moment().subtract(4, 'years');

  const polls = await getPolls();

  const historicPolls = getMonthlyAverage(
    getWithin(polls, fourYearsAgo.toDate(), today.toDate(), true)
  );

  const currentAverage = getAverage(getWithin(polls, twoMonthsAgo.toDate(), today.toDate()));
  currentAverage.sort(blockSort);
  const blockAverage = createBlockAverage(currentAverage);

  return {
    props: { currentAverage, blockAverage, historicPolls },
    revalidate: 518400,
  };
};

export default PollsPageContainer;
