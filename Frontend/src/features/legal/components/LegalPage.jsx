import { Link } from "react-router";
import SiteNavbar from "../../../components/navigation/SiteNavbar.jsx";
import "../style/legal.scss";

const LegalPage = ({ eyebrow, title, lead, sections, supportEmail }) => {
    return (
        <main className="legal-page">
            <SiteNavbar />
            <section className="legal-shell" aria-labelledby="legal-title">
                <header className="legal-hero">
                    <p className="eyebrow">{eyebrow}</p>
                    <h1 id="legal-title">{title}</h1>
                    <p className="legal-hero__lead">{lead}</p>
                </header>

                <div className="legal-grid">
                    {sections.map((section) => (
                        <article className="legal-card" key={section.title}>
                            <h2>{section.title}</h2>
                            {section.paragraphs?.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                            {section.items?.length ? (
                                <ul>
                                    {section.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            ) : null}
                        </article>
                    ))}

                    <article className="legal-card legal-card--contact">
                        <h2>Contact Information</h2>
                        <p>
                            If you have questions about these policies or need help with the platform, reach out at{" "}
                            <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
                        </p>
                    </article>
                </div>
            </section>

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

export default LegalPage;