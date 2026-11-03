export default function CardSkeleton() {
  return (
    <div className="character-card skeleton-card" aria-hidden="true">
      <div className="skeleton-art" />
      <div className="skeleton-copy">
        <span />
        <span />
      </div>
    </div>
  );
}
