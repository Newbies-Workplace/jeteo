import { myFetch } from "@/common/fetch";
import { cookies } from "next/headers";
import { InviteDetailsResponse } from "shared/model/invite/response/inviteResponse";

export const getMyInvites = async (): Promise<InviteDetailsResponse[]> => {
  const res = await myFetch(
    `/rest/v1/invites/@me`,
    {
      cache: "no-store",
      headers: {
        Cookie: (await cookies()).toString(),
      },
    },
    false
  );
  if (!res.ok) {
    // @ts-ignore
    return undefined;
  }
  return res.json();
};
