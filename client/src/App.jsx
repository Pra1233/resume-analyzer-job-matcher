import { useState } from "react";
import { analyzeResume } from "./api/analyzeResume";
import { HeroPanel } from "./components/HeroPanel";
import { UploadCard } from "./components/UploadCard";
import { ResultsPanel } from "./components/ResultsPanel";
import { StatusBanner } from "./components/StatusBanner";

const INITIAL_FORM = {
  jobTitle: "",
  jobDescription: "",
  resume: null
};

export default function App() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function handleFieldChange(event) {
    const { name, value, files } = event.target;
    setForm((current) => ({
      ...current,
      [name]: files ? files[0] : value
    }));
  }

  function resetView() {
    setResult(null);
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setResult(null);

    if (!form.resume) {
      setError("Please choose a resume file before analyzing.");
      return;
    }

    if (!form.jobDescription.trim()) {
      setError("Please paste a job description so the resume can be matched correctly.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await analyzeResume(form);
      setResult(response.data);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page-shell">
      <div className="page-background" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="grid-glow" />
      </div>

      <main className="app-layout">
        <HeroPanel />

        <section className="workspace-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Analysis Console</p>
              <h2>Upload, compare, and read the result without leaving the page.</h2>
            </div>
            {(result || error) && (
              <button className="ghost-button" type="button" onClick={resetView}>
                Clear result
              </button>
            )}
          </div>

          <StatusBanner error={error} result={result} />

          <div className="workspace-grid">
            <UploadCard
              form={form}
              isSubmitting={isSubmitting}
              onFieldChange={handleFieldChange}
              onSubmit={handleSubmit}
            />
            <ResultsPanel result={result} isSubmitting={isSubmitting} />
          </div>
        </section>
      </main>
    </div>
  );
}
