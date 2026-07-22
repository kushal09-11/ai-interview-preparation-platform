import React, { useState, useRef } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview.js";
import { Link, useNavigate } from "react-router";
import SiteNavbar from "../../../components/navigation/SiteNavbar.jsx";

const Home = () => {
  const { loading, generateReport, reports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [resumeStatus, setResumeStatus] = useState({ type: "idle", message: "" });
  const resumeInputRef = useRef();

  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    const data = await generateReport({jobDescription, selfDescription, resumeFile});
    if (!data) {
      console.error("Interview report generation failed.");
      return;
    }
    navigate(`/interview/${data._id}`);
  };

  const handleResumeChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      setResumeFileName("");
      setResumeStatus({ type: "idle", message: "" });
      return;
    }

    const isPdf = selectedFile.type === "application/pdf" || selectedFile.name.toLowerCase().endsWith(".pdf");

    setResumeFileName(selectedFile.name);

    if (!isPdf) {
      setResumeStatus({
        type: "error",
        message: "Failed to upload resume. Please try again with a PDF file."
      });
      return;
    }

    setResumeStatus({
      type: "success",
      message: `${selectedFile.name} ✓ Uploaded`
    });
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <h1>Loading your interview plan...</h1>
      </main>
    );
  }

  return (
    <main className="home">
      <SiteNavbar />

      <section className="hero-copy" aria-labelledby="interview-title">
        <p className="eyebrow">AI Interview Planner</p>
        <h1 id="interview-title">Create Your Custom Interview Plan</h1>
        <p className="subtitle">
          Let the UI collect your job requirements and profile details before
          the analysis layer is wired in.
        </p>
      </section>

      <div className="site-container">
        <section className="interview-card" aria-label="Interview inputs">
        <div className="panel-grid">
          <article className="panel panel--left">
            <div className="panel-head">
              <div>
                <p className="panel-kicker">Target Role</p>
                <h2>Job Description</h2>
              </div>
              <span className="status-pill status-pill--required">
                Required
              </span>
            </div>

            <label className="field field--textarea" htmlFor="jobDescription">
              <span className="field-label">
                Paste the full job description
              </span>
              <textarea
                onChange={(e) => {
                  setJobDescription(e.target.value);
                }}
                name="jobDescription"
                id="jobDescription"
                placeholder="Paste the full job description here, for example: Senior Frontend Engineer, React, TypeScript, API integration, and system design."
              />
              <span className="field-meta">0 / 5000 chars</span>
            </label>
          </article>

          <article className="panel panel--right">
            <div className="panel-head">
              <div>
                <p className="panel-kicker">Your Profile</p>
                <h2>Candidate Details</h2>
              </div>
              <span className="status-pill">Most accurate</span>
            </div>

            <div className="field-group">
              <div className="field-group-head">
                <span className="field-label">Upload Resume</span>
                <span className="field-note">PDF only</span>
              </div>
              <label className="dropzone" htmlFor="resume">
                <span className="dropzone-icon" aria-hidden="true">
                  ⬆
                </span>
                <span className="dropzone-title">
                  Click to upload or drag &amp; drop
                </span>
                <span className="dropzone-subtitle">PDF, max 5MB</span>
              </label>
              <input
                ref={resumeInputRef}
                hidden
                type="file"
                name="resume"
                id="resume"
                accept=".pdf"
                onChange={handleResumeChange}
              />
              <div className="resume-status" aria-live="polite">
                {resumeFileName ? (
                  <p className={`resume-status__file resume-status__file--${resumeStatus.type}`}>
                    {resumeStatus.type === "success" ? "✅" : resumeStatus.type === "error" ? "❌" : "📄"} {resumeFileName}
                  </p>
                ) : null}
                {resumeStatus.message ? (
                  <p className={`resume-status__message resume-status__message--${resumeStatus.type}`}>
                    {resumeStatus.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="divider">
              <span>OR</span>
            </div>

            <label className="field field--textarea" htmlFor="selfDescription">
              <span className="field-label">Quick Self-Description</span>
              <textarea
                onChange={(e) => {
                  setSelfDescription(e.target.value);
                }}
                name="selfDescription"
                id="selfDescription"
                placeholder="Briefly describe your experience, key skills, and years of experience if you do not have a resume handy."
              />
            </label>

            <div className="notice">
              <span className="notice-icon" aria-hidden="true">
                i
              </span>
              <p>
                Either a resume or a self description is enough to generate a
                personalized plan.
              </p>
            </div>
          </article>
        </div>

        <div className="panel-footer">
          <p className="footer-note">
            AI-powered strategy generation - approx 30s
          </p>
          <button
            onClick={handleGenerateReport}
            className="button primary-button action-button"
          >
            Generate My Interview Strategy
          </button>
        </div>
      </section>

        {/* recent Reports List */}
        {reports.length > 0 && (
          <section className="recent-reports">
            <h2>My Recent Interview Plans</h2>
            <ul className="reports-list">
              {reports.map((report) => (
                <li key={report._id} className="report-item" onClick={() => navigate(`/interview/${report._id}`)}>
                  <h3>{report.title || 'Untitled Position'}</h3>
                  <p className="report-meta">Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                  <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}> Match Score: {report.matchScore}% </p>
                </li>
              ))}
            </ul>
          </section>
        )}

      </div>

      <footer className="site-footer" aria-label="Site footer">
        <div className="site-footer__inner">
          <p className="site-footer__copy">© {new Date().getFullYear()} Interview Planner — Built with Love</p>
          <nav className="site-footer__nav" aria-label="Footer navigation">
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/help">Help</Link>
          </nav>
        </div>
        <p className="site-footer__credit">Designed &amp; Developed by Sai Kushal</p>
      </footer>
    </main>
  );
};

export default Home;
