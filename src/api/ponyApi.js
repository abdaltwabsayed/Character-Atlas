import axios from 'axios';

const ponyClient = axios.create({
  baseURL: 'https://ponyapi.net/v1/',
  timeout: 15000,
});

function normalizePony(pony) {
  return {
    id: pony.id,
    name: pony.name,
    image: Array.isArray(pony.image) ? pony.image[0] ?? null : pony.image ?? null,
    tags: Array.isArray(pony.kind) ? pony.kind : [],
    url: pony.url ?? null,
  };
}

export async function getList({ limit = 9, page = 0, signal } = {}) {
  const offset = page * limit;
  const { data } = await ponyClient.get('character/all', {
    params: { limit, offset },
    signal,
  });

  if (!Array.isArray(data.data)) {
    throw new Error('The My Little Pony API returned an unexpected character list.');
  }

  return {
    items: data.data.map(normalizePony),
    nextPage: data.data.length === limit ? page + 1 : null,
  };
}

export async function getByName(name, { signal } = {}) {
  const { data } = await ponyClient.get(`character/${encodeURIComponent(name.trim())}`, {
    signal,
  });
  const pony = Array.isArray(data.data) ? data.data[0] : data.data;
  if (!pony) {
    const error = new Error(`No My Little Pony character was found for "${name}".`);
    error.code = 'NOT_FOUND';
    throw error;
  }
  return normalizePony(pony);
}
