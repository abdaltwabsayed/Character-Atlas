import axios from 'axios';

const spongebobClient = axios.create({
  baseURL: 'https://spongebob.fandom.com/api.php',
  timeout: 15000,
});

function normalizePage(page) {
  return {
    id: page.pageid,
    name: page.title,
    image: page.thumbnail?.source ?? null,
    tags: ['SpongeBob Wiki'],
    url: page.fullurl ?? `https://spongebob.fandom.com/wiki/${encodeURIComponent(page.title)}`,
  };
}

function getPages(response) {
  if (response.data.error) {
    throw new Error(response.data.error.info ?? 'The SpongeBob Wiki API returned an error.');
  }

  return Object.values(response.data.query?.pages ?? {});
}

function isCharacterPage(page) {
  return !page.title.includes(':') && !/^list of /i.test(page.title);
}

export async function getList({ limit = 9, page = null, signal } = {}) {
  const { data } = await spongebobClient.get('', {
    params: {
      action: 'query',
      generator: 'categorymembers',
      gcmtitle: 'Category:Main characters',
      gcmlimit: limit,
      gcmnamespace: 0,
      gcmcontinue: typeof page === 'string' ? page : undefined,
      prop: 'pageimages|info',
      inprop: 'url',
      piprop: 'thumbnail',
      pithumbsize: 400,
      format: 'json',
      origin: '*',
    },
    signal,
  });

  const pages = getPages({ data });
  return {
    items: pages.filter(isCharacterPage).map(normalizePage),
    nextPage: data.continue?.gcmcontinue ?? null,
  };
}

export async function getByName(name, { signal } = {}) {
  const { data } = await spongebobClient.get('', {
    params: {
      action: 'query',
      titles: name.trim(),
      prop: 'pageimages|info',
      inprop: 'url',
      piprop: 'thumbnail',
      pithumbsize: 400,
      format: 'json',
      origin: '*',
    },
    signal,
  });

  const [page] = getPages({ data });
  if (!page || page.missing !== undefined) {
    const error = new Error(`No SpongeBob Wiki page was found for "${name}".`);
    error.code = 'NOT_FOUND';
    throw error;
  }

  return normalizePage(page);
}
