import { party, partyAbbrev } from '../types/party';

export interface PartyInfo {
  readonly name: party;
  readonly letter: partyAbbrev;
  readonly color: string;
}

const parties: ReadonlyArray<PartyInfo> = [
  { name: 'Socialdemokraterna', letter: 'S', color: '#c0392b' },
  { name: 'Moderaterna', letter: 'M', color: '#3a539b' },
  { name: 'Sverigedemokraterna', letter: 'SD', color: '#f4d03f' },
  { name: 'Centerpartiet', letter: 'C', color: '#1e824c' },
  { name: 'Vänsterpartiet', letter: 'V', color: '#cf000f' },
  { name: 'Kristdemokraterna', letter: 'KD', color: '#22a7f0' },
  { name: 'Liberalerna', letter: 'L', color: '#5c97bf' },
  { name: 'Miljöpartiet', letter: 'MP', color: '#26a65b' },
] as const;

export const blocks = [
  { name: 'Vänsterblocket', parties: ['S', 'V', 'MP'] as Array<partyAbbrev>, color: '#c0392b' },
  { name: 'Sverigedemokraterna', parties: ['SD'] as Array<partyAbbrev>, color: '#f4d03f' },
  { name: 'Högerblocket', parties: ['M', 'C', 'KD', 'L'] as Array<partyAbbrev>, color: '#3a539b' },
] as const;

export const partiesMap = parties.reduce(
  (prev, curr) => ({ ...prev, [curr.letter]: curr }),
  {} as Record<partyAbbrev, PartyInfo>
);

export default parties;
