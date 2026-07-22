import { NavLink } from "react-router";
import "./site-navbar.scss";

const navItems = [
    { to: "/", label: "Home", end: true },
    { to: "/terms", label: "Terms" },
    { to: "/privacy", label: "Privacy" },
    { to: "/help", label: "Help" }
];

const SiteNavbar = () => {
    return (
        <header className="site-navbar" aria-label="Primary navigation">
            <div className="site-navbar__inner">
                <div className="site-navbar__brand">
                    <p className="site-navbar__eyebrow">AI Interview Planner</p>
                    <p className="site-navbar__title">Prepare with clarity</p>
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
                </nav>
            </div>
        </header>
    );
};

export default SiteNavbar;