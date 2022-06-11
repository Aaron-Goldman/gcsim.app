export interface Talent {
  attack: number;
  skill: number;
  burst: number;
}

export interface Weapon {
  name: string;
  refine: number;
  level: number;
  max_level: number;
}

export interface DBItem {
  author: string;
  config: string;
  description: string;
  hash: string;
  team: DBCharInfo[];
  dps: number;
  mode: string;
  duration: number;
  target_count: number;
  viewer_key: string;
}

export interface DBCharInfo {
  name: string;
  con: number;
  weapon: string;
  refine: number;
  er: number;
  talents: Talent;
}
