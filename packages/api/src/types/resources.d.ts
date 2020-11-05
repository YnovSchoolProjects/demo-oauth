import { OAuthProviderTypes } from '@/types/enum';

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

export interface GithubUser {
  id: string;
  emails: [
    {
      value: string;
    },
  ];
  displayName: string;
  username: string;
}

export interface OAuth {
  provider: OAuthProviderTypes;
  accessToken: string;
  refreshToken: string;
}
