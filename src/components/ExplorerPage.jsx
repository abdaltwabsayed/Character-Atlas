import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CharacterCard from './cards/CharacterCard.jsx';
import CardSkeleton from './cards/CardSkeleton.jsx';
import SearchBar from './ui/SearchBar.jsx';
import StatusMessage from './ui/StatusMessage.jsx';
import useFetch from '../hooks/useFetch.js';

const PAGE_SIZE = 12;

export default function ExplorerPage({ franchise }) {
  const [searchText, setSearchText] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState(null);
  const loadMoreController = useRef(null);

  const loadFirstPage = useCallback(
    (signal) => franchise.api.getList({ limit: PAGE_SIZE, page: 0, signal }),
    [franchise],
  );
  const {
    data: firstPage,
    status: listStatus,
    error: listError,
    retry: retryList,
  } = useFetch(loadFirstPage, [loadFirstPage]);

  const searchApiCall = useCallback(
    (signal) => (
      submittedQuery
        ? franchise.api.getByName(submittedQuery, { signal })
        : Promise.resolve(null)
    ),
    [franchise, submittedQuery],
  );
  const {
    data: searchResult,
    status: searchStatus,
    error: searchError,
    retry: retrySearch,
  } = useFetch(searchApiCall, [searchApiCall]);

  useEffect(() => {
    setItems([]);
    setNextPage(null);
    setSearchText('');
    setSubmittedQuery('');
    setLoadMoreError(null);
    loadMoreController.current?.abort();
  }, [franchise.id]);

  useEffect(() => {
    if (listStatus === 'success' && firstPage) {
      setItems(firstPage.items);
      setNextPage(firstPage.nextPage);
    } else if (listStatus === 'not-found') {
      setItems([]);
      setNextPage(null);
    }
  }, [firstPage, listStatus]);

  useEffect(
    () => () => loadMoreController.current?.abort(),
    [],
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchText.trim().toLowerCase();
    return [...items]
      .filter((character) => character.name.toLowerCase().includes(normalizedQuery))
      .sort((first, second) => first.name.localeCompare(second.name));
  }, [items, searchText]);

  async function handleLoadMore() {
    if (nextPage === null || loadingMore) return;
    const controller = new AbortController();
    loadMoreController.current = controller;
    setLoadingMore(true);
    setLoadMoreError(null);

    try {
      const page = await franchise.api.getList({
        limit: PAGE_SIZE,
        page: nextPage,
        signal: controller.signal,
      });
      setItems((current) => {
        const existingIds = new Set(current.map((item) => item.id));
        return [...current, ...page.items.filter((item) => !existingIds.has(item.id))];
      });
      setNextPage(page.nextPage);
    } catch (error) {
      if (!controller.signal.aborted) {
        setLoadMoreError(error);
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoadingMore(false);
      }
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    setSubmittedQuery(searchText.trim());
  }

  return (
    <div className="explorer-page" data-theme={franchise.theme}>
      <section className="explorer-intro">
        <Link className="back-link" to="/">← Back to all worlds</Link>
        <p className="eyebrow">Character explorer</p>
        <h1>{franchise.name}</h1>
        <p>{franchise.description}</p>
      </section>

      <section className="explorer-content" aria-label={`${franchise.name} characters`}>
        <SearchBar
          value={searchText}
          onChange={setSearchText}
          onSearch={handleSearch}
          label={`Search ${franchise.name}`}
        />

        {submittedQuery && (
          <section className="exact-search-result" aria-live="polite">
            <div className="section-heading compact-heading">
              <h2>Search result</h2>
              <button className="text-button" type="button" onClick={() => setSubmittedQuery('')}>
                Clear
              </button>
            </div>
            <StatusMessage
              status={searchStatus}
              error={searchError}
              onRetry={retrySearch}
              emptyMessage={`No exact match found for "${submittedQuery}".`}
            />
            {searchStatus === 'success' && searchResult && (
              <div className="featured-result">
                <CharacterCard character={searchResult} />
              </div>
            )}
          </section>
        )}

        <div className="section-heading explorer-list-heading">
          <div>
            <p className="eyebrow">Browse</p>
            <h2>Characters</h2>
          </div>
          <span className="result-count">{filteredItems.length} shown</span>
        </div>

        {listStatus === 'loading' && (
          <div className="character-grid skeleton-grid" aria-label="Loading characters">
            {Array.from({ length: 6 }, (_, index) => <CardSkeleton key={index} />)}
          </div>
        )}
        {listStatus === 'error' && (
          <StatusMessage status={listStatus} error={listError} onRetry={retryList} />
        )}
        {listStatus === 'not-found' && (
          <StatusMessage
            status="not-found"
            emptyMessage={`No ${franchise.name} characters are available right now.`}
          />
        )}
        {listStatus === 'success' && filteredItems.length === 0 && (
          <StatusMessage
            status="not-found"
            emptyMessage={searchText ? 'No loaded characters match that search.' : 'No characters found.'}
          />
        )}
        {listStatus === 'success' && filteredItems.length > 0 && (
          <div className="character-grid">
            {filteredItems.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )}

        {loadMoreError && (
          <StatusMessage
            status="error"
            error={loadMoreError}
            onRetry={handleLoadMore}
          />
        )}
        {listStatus === 'success' && nextPage !== null && (
          <button
            className="button load-more-button"
            type="button"
            onClick={handleLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading…' : 'Load more'}
          </button>
        )}
      </section>
    </div>
  );
}
