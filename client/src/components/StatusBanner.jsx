export function StatusBanner({ error, result }) {
  if (error) {
    return (
      <div className="status-banner status-error" role="alert">
        <strong>Request failed.</strong>
        <span>{error}</span>
      </div>
    );
  }

  if (result) {
    return (
      <div className="status-banner status-success" role="status">
        <strong>Analysis complete.</strong>
        <span>Your result is ready to review below.</span>
      </div>
    );
  }

  return null;
}
