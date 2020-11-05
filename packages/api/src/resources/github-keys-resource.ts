export interface GithubKeysResource {
  id: number;
  key: string;
  url: string;
  title: string;
  verified: boolean;
  created_at: string;
  read_only: boolean;
}

export interface MinifiedGithubKeysResource {
  id: number;
  url: string;
  title: string;
}
