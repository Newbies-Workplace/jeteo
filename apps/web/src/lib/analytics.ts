// log specific events happening.
export const logEvent = (action: string, params: any) => {
  window.gtag("event", action, params);
};

export const logUserId = (userId: string) => {
  window.gtag("set", { user_id: userId });
};
