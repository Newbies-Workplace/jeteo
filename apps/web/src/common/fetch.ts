const baseUrl: string = process.env["NEXT_PUBLIC_BACKEND_URL"]!;

export const myFetch = async (
  input: RequestInfo,
  init?: RequestInit,
  failIfNotOk: boolean = true
): Promise<Response> => {
  const inp: RequestInfo =
    typeof input === "string"
      ? baseUrl + input
      : {
          // @ts-ignore
          url: baseUrl + input.url,
          ...input,
        };

  return await fetch(inp, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  }).then((res) => {
    if (failIfNotOk && !res.ok) {
      return Promise.reject("response is not ok");
    }

    return res;
  });
};
