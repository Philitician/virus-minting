export interface INFT {
  token_address: string;
  token_id: string;
  contract_type: string;
  owner_of: string;
  block_number: string;
  block_number_minted: string;
  token_uri?: string | undefined;
  metadata: IMetadata;
  synced_at?: string | undefined;
  amount?: string | undefined;
  name: string;
  symbol: string;
}

export interface IMetadata {
  achievement: string;
  attributes: string[];
  compiler: string;
  date: number;
  description: string;
  dna: string;
  edition: number;
  image: string;
  name: string;
}
