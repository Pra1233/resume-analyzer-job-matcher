const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD ? window.location.origin : "http://localhost:3000");

function buildFormData({ jobTitle, jobDescription, resume }) {
  const formData = new FormData();
  formData.append("jobTitle", jobTitle || "");
  formData.append("jobDescription", jobDescription);
  formData.append("resume", resume);
  return formData;
}

export async function analyzeResume(payload) {
  const response = await fetch(`${API_BASE_URL}/api/v1/resumes/analyze`, {
    method: "POST",
    body: buildFormData(payload)
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data?.error?.message ||
      "The analysis request failed. Please verify the file type, API settings, and server logs.";
    throw new Error(message);
  }

  return data;
}
