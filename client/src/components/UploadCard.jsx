export function UploadCard({ form, isSubmitting, onFieldChange, onSubmit }) {
  return (
    <section className="card upload-card">
      <div className="card-heading">
        <h3>Start a new analysis</h3>
        <p>Paste the target role, attach a resume, and send it to the API.</p>
      </div>

      <form className="upload-form" onSubmit={onSubmit}>
        <label className="field">
          <span>Job Title</span>
          <input
            type="text"
            name="jobTitle"
            placeholder="Frontend Developer"
            value={form.jobTitle}
            onChange={onFieldChange}
          />
        </label>

        <label className="field">
          <span>Job Description</span>
          <textarea
            name="jobDescription"
            rows="10"
            placeholder="Paste the job description here..."
            value={form.jobDescription}
            onChange={onFieldChange}
          />
        </label>

        <label className="field file-field">
          <span>Resume File</span>
          <input
            type="file"
            name="resume"
            accept=".pdf,.docx,.png,.jpg,.jpeg"
            onChange={onFieldChange}
          />
          <small>{form.resume ? `Selected: ${form.resume.name}` : "Supported: PDF, DOCX, PNG, JPG"}</small>
        </label>

        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Analyzing resume..." : "Analyze Resume"}
        </button>
      </form>
    </section>
  );
}
