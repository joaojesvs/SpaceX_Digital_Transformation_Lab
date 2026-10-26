export const agreedIds = ["F-01", "F-02", "F-03"] as const;

export type AgreedId = (typeof agreedIds)[number];

export type AcceptedMap = Record<AgreedId, boolean>;

export const noneAccepted: AcceptedMap = {
  "F-01": false,
  "F-02": false,
  "F-03": false,
};

export function isAgreedId(id: string): id is AgreedId {
  return agreedIds.some((item) => item === id);
}

export function openAgreed(accepted: AcceptedMap) {
  return agreedIds.reduce((count, id) => count + (accepted[id] ? 0 : 1), 0);
}
