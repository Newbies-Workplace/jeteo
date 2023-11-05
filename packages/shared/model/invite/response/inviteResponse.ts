import { UserResponse } from "../../user/response/user.response";

export interface InviteResponse {
  name: string;
}

export interface InviteDetailsResponse extends InviteResponse {
  id: string;
  mail: string;
  inviter: UserResponse;
  lecture: {
    id: string;
    slug: string;
    title: string;
    from: string;
    to: string;
  };
  event: {
    id: string;
    slug: string;
    title: string;
  };
}
