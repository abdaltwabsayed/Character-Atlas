import { getErrorMessage } from '../../hooks/useFetch.js';

export default function StatusMessage({ status, error, onRetry, emptyMessage }) {
  if (status === 'loading' || status === 'idle' || status === 'success') return null;

  if (status === 'not-found') {
    return <p className="status-message" role="status">{emptyMessage ?? 'No characters found.'}</p>;
  }

  return (
    <div className="status-message error-message" role="alert">
      <p>{getErrorMessage(error)}</p>
      {onRetry && (
        <button className="button button-outline" type="button" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
