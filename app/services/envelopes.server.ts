export type Envelope = {
  id: string;
  tenantId: string;
  practiceId: string;
  createdAt: string;
  payload: ArrayBuffer;
  meta: any;
};

const store = new Map<string, Envelope[]>();

export function putEnvelope(env: Envelope) {
  const list = store.get(env.tenantId) ?? [];
  list.unshift(env);
  store.set(env.tenantId, list);
}

export function listEnvelopes(tenantId: string): Envelope[] {
  return store.get(tenantId) ?? [];
}
