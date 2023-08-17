export interface InviteResponse {
  name: string;
}

export interface StudioInviteResponse extends InviteResponse {
  id: string;
  mail: string;
}
