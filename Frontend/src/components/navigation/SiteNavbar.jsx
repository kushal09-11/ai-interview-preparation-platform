import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { InterviewContext } from "../../features/interview/interview.context.jsx";
import { useAuth } from "../../features/auth/hooks/useAuth.js";
import "./site-navbar.scss";

const navItems = [
    { to: "/", label: "Home", end: true },
    { to: "/terms", label: "Terms" },
    { to: "/privacy", label: "Privacy" },
    { to: "/help", label: "Help" }
];

const SiteNavbar = () => {
    const navigate = useNavigate();
    const { user, handleLogout, loading: authLoading } = useAuth();
    const interviewContext = useContext(InterviewContext);
    const resetInterviewState = interviewContext?.resetInterviewState;
    const [logoutError, setLogoutError] = useState("");
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogoutClick = async () => {
        setLogoutError("");
        setIsLoggingOut(true);

        try {
            await handleLogout();
            resetInterviewState?.();
            navigate("/login");
        } catch (err) {
            setLogoutError(err?.message || "Unable to log out");
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <header className="site-navbar" aria-label="Primary navigation">
            <div className="site-navbar__inner">
                <div className="site-navbar__brand">
                    <p className="site-navbar__eyebrow">AI Interview Planner</p>
                </div>

                <nav className="site-navbar__nav" aria-label="Primary">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                `site-navbar__link ${isActive ? "site-navbar__link--active" : ""}`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                    {user ? (
                        <button
                            type="button"
                            className="site-navbar__link site-navbar__link--logout"
                            onClick={handleLogoutClick}
                            disabled={authLoading || isLoggingOut}
                            aria-busy={authLoading || isLoggingOut}
                        >
                            <span className="site-navbar__logout-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10 17l5-5-5-5" />
                                    <path d="M15 12H3" />
                                    <path d="M21 3v18" />
                                </svg>
                            </span>
                            {isLoggingOut ? "Logging out..." : "Logout"}
                        </button>
                    ) : null}
                </nav>
                {logoutError ? (
                    <p className="site-navbar__error" role="alert">
                        {logoutError}
                    </p>
                ) : null}
            </div>
        </header>
    );
};

export default SiteNavbar;