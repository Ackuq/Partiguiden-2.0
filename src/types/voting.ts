export type votingResult = {
  yes: Array<string>;
  no: Array<string>;
  winner: 'yes' | 'no' | 'draw';
};

export type voteDesc = 'yes' | 'no' | 'refrain' | 'abscent';

export type votingEntry = Record<voteDesc, string>;

export type votingDict = Record<string, votingEntry>;

export interface VoteListEntry {
  title: string;
  results: votingResult;
  authority: string;
  documentId: string;
  proposition: string;
  subtitle: string;
}

export interface ProcessedDocument {
  id: string;
  label: string;
  proposals?: string;
}

export interface Vote {
  title: string;
  description: string;
  authority: string;
  propositionText: string;
  processedDocuments: Array<ProcessedDocument>;
  appendix: any;
  decision: string;
  voting: Record<string, Record<voteDesc, string>>;
}