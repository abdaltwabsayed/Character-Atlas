import { useLanguage } from '../../context/LanguageContext.jsx';
import { getErrorMessage } from '../../hooks/useFetch.js';

export default function StatusMessage({ status, error, onRetry, emptyMessage }) {
  const { t } = useLanguage();

  if (status === 'loading' || status === 'idle' || status === 'success') return null;

  if (status === 'not-found') {
    return <p className="status-message" role="status">{emptyMessage ?? t('noCharactersFound')}</p>;
  }

  return (
    <div className="status-message error-message" role="alert">
      <p>{getErrorMessage(error, t)}</p>
      {onRetry && (
        <button className="button button-outline" type="button" onClick={onRetry}>
          {t('retry')}
        </button>
      )}
    </div>
  );
}
