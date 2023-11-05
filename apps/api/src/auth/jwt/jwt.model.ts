export type TokenUser = {
  id: string;
  google_id: string;
  google_mail: string;
  name: string;
  _permissions: {
    isAuthorized: boolean;
  };
};

export type Token = {
  user: TokenUser;
};
