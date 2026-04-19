export function HeroPanel() {
  return (
    <section className="hero-panel">
      <div className="hero-copy">
        <p className="eyebrow">Resume Match Studio</p>
        <h1>Turn your resume workflow into something that feels deliberate.</h1>
        <p className="hero-text">
          This interface sits on top of your parsing and GPT-backed analysis pipeline so you can upload a
          resume, compare it against a role, and read the result in one focused place.
        </p>
      </div>

      <div className="hero-metrics">
        <article className="metric-card">
          <span className="metric-label">Formats</span>
          <strong>PDF, DOCX, Image</strong>
          <p>Structured extraction with fallback handling.</p>
        </article>
        <article className="metric-card">
          <span className="metric-label">Analysis</span>
          <strong>GPT + Heuristic Safety Net</strong>
          <p>Readable results even when the primary provider fails.</p>
        </article>
        <article className="metric-card">
          <span className="metric-label">Experience</span>
          <strong>Single-screen workflow</strong>
          <p>Upload, track progress, and inspect the full output without switching tools.</p>
        </article>
      </div>
    </section>
  );
}
