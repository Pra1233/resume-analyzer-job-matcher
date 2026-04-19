function ScoreDial({ score = 0 }) {
  const boundedScore = Math.max(0, Math.min(100, Number(score) || 0));

  return (
    <div className="score-dial">
      <div
        className="score-ring"
        style={{
          background: `conic-gradient(var(--accent-strong) ${boundedScore}%, rgba(255,255,255,0.12) 0%)`
        }}
      >
        <div className="score-core">
          <strong>{boundedScore}</strong>
          <span>Match</span>
        </div>
      </div>
    </div>
  );
}

function TagList({ items, emptyText }) {
  if (!items?.length) {
    return <p className="empty-text">{emptyText}</p>;
  }

  return (
    <div className="tag-list">
      {items.map((item) => (
        <span className="tag" key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}

function DetailList({ items, emptyText }) {
  if (!items?.length) {
    return <p className="empty-text">{emptyText}</p>;
  }

  return (
    <ul className="detail-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ResultsPanel({ result, isSubmitting }) {
  if (isSubmitting) {
    return (
      <section className="card results-card state-card">
        <div className="pulse-mark" />
        <h3>Processing your resume</h3>
        <p>The file is being extracted, cleaned, and compared against the role now.</p>
      </section>
    );
  }

  if (!result) {
    return (
      <section className="card results-card state-card">
        <h3>Results will appear here</h3>
        <p>
          After submission, you will see the extraction method, provider, match score, skill alignment,
          missing skills, and suggestions in this panel.
        </p>
      </section>
    );
  }

  const { extraction, match, file } = result;
  const analysis = match.analysis;

  return (
    <section className="card results-card">
      <div className="results-topline">
        <div>
          <h3>{file.originalName}</h3>
          <p>
            Extraction via <strong>{extraction.strategy}</strong> and analysis via <strong>{match.provider}</strong>
          </p>
        </div>
        <ScoreDial score={analysis.matchScore} />
      </div>

      <div className="result-section">
        <h4>Summary</h4>
        <p>{analysis.summary}</p>
      </div>

      <div className="result-grid">
        <div className="result-section">
          <h4>Recommendation</h4>
          <p>{String(analysis.recommendation || "").replaceAll("_", " ")}</p>
        </div>

        <div className="result-section">
          <h4>Required Skills Matched</h4>
          <TagList items={analysis.requiredSkillsMatched} emptyText="No required matches were returned." />
        </div>
      </div>

      <div className="result-grid">
        <div className="result-section">
          <h4>Required Skills Missing</h4>
          <TagList items={analysis.requiredSkillsMissing} emptyText="No required skills were marked missing." />
        </div>

        <div className="result-section">
          <h4>Unverified Requirements</h4>
          <TagList
            items={analysis.unverifiedRequirements}
            emptyText="No unverified requirements were identified."
          />
        </div>
      </div>

      <div className="result-grid">
        <div className="result-section">
          <h4>Nice To Have Matched</h4>
          <TagList items={analysis.niceToHaveMatched} emptyText="No optional matches were returned." />
        </div>

        <div className="result-section">
          <h4>Nice To Have Missing</h4>
          <TagList items={analysis.niceToHaveMissing} emptyText="No optional gaps were identified." />
        </div>
      </div>

      <div className="result-section">
        <h4>Suggestions</h4>
        <DetailList items={analysis.suggestions} emptyText="No suggestions were returned." />
      </div>

      <div className="result-section">
        <h4>Experience Assessment</h4>
        <p>{analysis.experienceAssessment}</p>
      </div>

      <div className="result-grid">
        <div className="result-section">
          <h4>Score Breakdown</h4>
          <DetailList items={analysis.scoreBreakdown} emptyText="No score breakdown was returned." />
        </div>

        <div className="result-section">
          <h4>Date Warnings</h4>
          <DetailList items={analysis.dateWarnings} emptyText="No date warnings were detected." />
        </div>
      </div>

      <details className="raw-text-panel">
        <summary>View extracted resume text</summary>
        <pre>{extraction.text}</pre>
      </details>
    </section>
  );
}
