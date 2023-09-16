export interface InviteResponse {
  name: string;
}

export interface InviteDetailsResponse extends InviteResponse {
  id: string;
  mail: string;
}
