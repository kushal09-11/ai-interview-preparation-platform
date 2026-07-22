import React, { useState, useEffect } from 'react';
import "../style/interview.scss";
import { useInterview } from '../hooks/useInterview.js';
import { Link, useParams } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth.js';

// const interviewData = {
//     matchScore: 62,
//     technicalQuestions: [
//         {
//             question: "Can you explain the Node.js Event Loop in detail, specifically focusing on the different phases (like timers, poll, check) and how asynchronous I/O is handled?",
//             intention: "To test the candidate's core understanding of Node.js architecture, non-blocking I/O, and asynchronous execution, which is vital for building high-performance APIs.",
//             answer: "The candidate should describe the Event Loop phases: Timers (setTimeout/setInterval), Pending Callbacks, Idle/Prepare, Poll (retrieving new I/O events), Check (setImmediate), and Close Callbacks. They should explain how microtask queues (process.nextTick and Promises) are executed between phases. The response should emphasize how Node.js achieves high concurrency using a single thread by delegating heavy I/O tasks to the system kernel or Libuv's thread pool."
//         },
//         {
//             question: "In your projects using MongoDB (like SharePlate), how would you identify and optimize a slow-performing database query in a production environment?",
//             intention: "To assess database design skills and practical knowledge of query optimization, indexing, and profiling as required by the job description.",
//             answer: "The candidate should mention using MongoDB's explain() plan to analyze execution stats, identifying COLLSCAN (collection scans) versus IXSCAN (index scans). They should explain how to create targeted single-field or compound indexes, the importance of covering queries, and how to avoid index overhead. Additionally, they should mention monitoring tools like MongoDB Atlas Profiler or APMs."
//         },
//         {
//             question: "Given that the JD emphasizes caching, how would you design a caching layer using Redis in a Node.js Express application? What cache invalidation strategy would you choose for dynamic data?",
//             intention: "To evaluate the candidate's understanding of caching strategies, Redis integration, and data consistency challenges in distributed systems.",
//             answer: "The candidate should explain the Cache-Aside (Lazy Loading) pattern where the app checks Redis first, falls back to MongoDB on a miss, and then writes the result to Redis. For invalidation, they should discuss setting an appropriate TTL (Time-To-Live) and write-through/write-invalidate strategies to ensure data consistency when MongoDB updates occur."
//         }
//     ],
//     behavioralQuestions: [
//         {
//             question: "Your resume indicates you are currently a 2nd-year student at CBIT graduating in 2028, but your self-description mentions around 3 years of backend experience. Can you clarify how you managed your academic commitments alongside gaining this hands-on backend experience?",
//             intention: "To verify the candidate's experience timeline, integrity, and time management capabilities under demanding schedules.",
//             answer: "The candidate should clarify the nature of their 3 years of experience (e.g., freelance, intensive self-study, open-source contributions, or personal projects). They should demonstrate strong time management skills, highlighting how they maintain a 9.6 CGPA while simultaneously building complex full-stack applications and leading hackathon teams."
//         },
//         {
//             question: "Describe a scenario where you had to work with a technology required for a project (such as Docker or Redis) that you had little prior experience with. How did you approach learning and implementing it under a tight deadline?",
//             intention: "To assess the candidate's self-directed learning capability, adaptability, and performance under pressure, especially given their lack of production-level Docker and Redis experience.",
//             answer: "The candidate should use the STAR method. They should describe the situation (e.g., a hackathon or personal project), the task, the specific actions they took (reading documentation, watching tutorials, starting with simple configurations), and the successful outcome. They should highlight resourcefulness and the ability to rapidly prototype."
//         }
//     ],
//     skillGaps: [
//         {
//             skill: "3+ years of professional, production-level backend experience",
//             severity: "high"
//         },
//         {
//             skill: "Production-grade containerization (Docker) and CI/CD pipelines",
//             severity: "medium"
//         },
//         {
//             skill: "Experience with Microservices and Message Queues (Kafka/RabbitMQ)",
//             severity: "medium"
//         }
//     ],
//     preparationPlan: [
//         {
//             day: 1,
//             focus: "Node.js Architecture & Asynchronous Programming",
//             tasks: [
//                 "Study the internal mechanics of Libuv, Event Loop phases, and thread pool.",
//                 "Practice coding examples utilizing async/await, promises, and custom event emitters.",
//                 "Review common Node.js performance bottlenecks and memory leak identification."
//             ]
//         },
//         {
//             day: 2,
//             focus: "MongoDB Deep Dive & Optimization",
//             tasks: [
//                 "Learn how to use explain('executionStats') to diagnose query execution pathways.",
//                 "Study compound indexes, ESR (Equal, Sort, Range) rule, and partial/TTL indexes.",
//                 "Understand schema design patterns for scalability (Embedding vs. Referencing)."
//             ]
//         },
//         {
//             day: 3,
//             focus: "Caching Strategies with Redis",
//             tasks: [
//                 "Implement a Redis caching layer locally in an Express.js app.",
//                 "Study cache-aside, write-through, and cache-invalidation strategies.",
//                 "Understand Redis data structures (Strings, Hashes, Lists, Sets) and TTL usage."
//             ]
//         },
//         {
//             day: 4,
//             focus: "Docker & Basic Devops Pipelines",
//             tasks: [
//                 "Write custom Dockerfiles for a multi-container MERN application (Express + Mongo + Redis).",
//                 "Understand Docker Compose for managing multi-service local environments.",
//                 "Read about basic CI/CD deployment workflows (e.g., GitHub Actions)."
//             ]
//         },
//         {
//             day: 5,
//             focus: "System Design, Microservices & Message Queues",
//             tasks: [
//                 "Study the fundamentals of Microservices architecture vs Monoliths.",
//                 "Learn the basics of pub/sub messaging patterns using RabbitMQ or Apache Kafka.",
//                 "Review RESTful API design best practices, rate limiting, and JWT authentication flow."
//             ]
//         },
//         {
//             day: 6,
//             focus: "Behavioral Preparation & Experience Clarification",
//             tasks: [
//                 "Formulate clear, honest answers resolving the experience timeline mismatch.",
//                 "Prepare STAR stories focusing on team leadership in hackathons and self-learning.",
//                 "Conduct a mock technical interview focusing on system design and resume defense."
//             ]
//         }
//     ]
// }

const Interview = () => {
    const { user } = useAuth();
    const sectionTabs = [
        { key: "technicalQuestions", label: "Technical questions" },
        { key: "behavioralQuestions", label: "Behavioral questions" },
        { key: "preparationPlan", label: "Road Map" }
    ];

    const [activeSection, setActiveSection] = useState(sectionTabs[0].key)
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()
    const displayName = user?.username || user?.name || user?.fullName || user?.email?.split("@")[0]
    const welcomeMessage = displayName ? `Hi, ${displayName}! Ready to ace your next interview?` : "Welcome!"

    useEffect(()=>{
        if(interviewId) {
            getReportById(interviewId)
        }
    }, [interviewId])

    const activeSectionConfig = sectionTabs.find((section) => section.key === activeSection) ?? sectionTabs[0];

    if(loading || !report) {
        return (
            <main className="loading-screen">
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }
    const renderActiveSection = () => {
        if (activeSection === "technicalQuestions") {
            return (
                <section className="content-block content-block--featured content-block--stage" aria-labelledby="technical-title">
                    <div className="content-block__header">
                        <h2 id="technical-title"></h2>
                        <span>{report.technicalQuestions.length} prompts</span>
                    </div>
                    <div className="question-list">
                        {report.technicalQuestions.map((item, index) => (
                            <article className="question-card" key={item.question}>
                                <p className="question-card__index">0{index + 1}</p>
                                <h3>{item.question}</h3>
                                <p className="question-card__label">Intention</p>
                                <p className="question-card__text">{item.intention}</p>
                                <p className="question-card__label">Expected answer </p>
                                <p className="question-card__text">{item.answer}</p>
                            </article>
                        ))}
                    </div>
                </section>
            );
        }

        if (activeSection === "behavioralQuestions") {
            return (
                <section className="content-block content-block--stage" aria-labelledby="behavioral-title">
                    <div className="content-block__header">
                        <h2 id="behavioral-title"></h2>
                        <span>{report.behavioralQuestions.length} prompts</span>
                    </div>
                    <div className="question-list question-list--compact">
                        {report.behavioralQuestions.map((item, index) => (
                            <article className="question-card question-card--compact" key={item.question}>
                                <p className="question-card__index">0{index + 1}</p>
                                <h3>{item.question}</h3>
                                <p className="question-card__label">Intention</p>
                                <p className="question-card__text">{item.intention}</p>
                                <p className="question-card__label">Expected answer </p>
                                <p className="question-card__text">{item.answer}</p>
                            </article>
                        ))}
                    </div>
                </section>
            );
        }

        return (
            <section className="content-block content-block--roadmap content-block--stage" aria-labelledby="roadmap-title">
                <div className="content-block__header">
                    <h2 id="roadmap-title"></h2>
                    <span>{report.preparationPlan.length}-day plan</span>
                </div>
                <div className="roadmap-grid roadmap-grid--single">
                    {report.preparationPlan.map((day) => (
                        <article className="roadmap-card" key={day.day}>
                            <p className="roadmap-card__day">Day {day.day}</p>
                            <h3>{day.focus}</h3>
                            <ul>
                                {day.tasks.map((task) => (
                                    <li key={task}>{task}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </section>
        );
    };

    return (
        <main className="interview-page">
            <section className="interview-shell" aria-label="Interview report layout">
                <aside className="side-panel side-panel--left" aria-label="Navigation">
                    <div className="side-panel__header">
                        <p className="eyebrow">Interview Report</p>
                        <h1>Contents</h1>
                    </div>

                    <nav className="section-nav">
                        {sectionTabs.map((section) => (
                            <button
                                key={section.key}
                                type="button"
                                className={`section-nav__item ${activeSection === section.key ? "section-nav__item--active" : ""}`}
                                onClick={() => setActiveSection(section.key)}
                                aria-pressed={activeSection === section.key}
                            >
                                {section.label}
                            </button>
                        ))}
                    </nav>
                    <button className="button primary-button"
                            onClick={() => getResumePdf(interviewId)}
                    >
                        <svg height={"1rem"} style={{marginRight:"0.8rem"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
                        Download Resume
                    </button>
                </aside>

                <section className="content-panel" aria-label="Main content">
                    <div className="welcome-banner" aria-label="Welcome message">
                        <p className="eyebrow">Welcome</p>
                        <h2>{welcomeMessage}</h2>
                    </div>

                    <div className="content-panel__hero">
                        <p className="eyebrow">Match score</p>
                        <div className="match-score">
                            <span>{report.matchScore}%</span>
                            <p>Aligned to the job description</p>
                        </div>
                    </div>

                    <div className="content-stage">
                        <div className="content-stage__header">
                            <div>
                                <p className="content-stage__eyebrow"></p>
                                <h2>{activeSectionConfig.label}</h2>
                            </div>
                            <span className="content-stage__hint"></span>
                        </div>

                        {renderActiveSection()}
                    </div>
                </section>

                <aside className="side-panel side-panel--right" aria-label="Skill gaps">
                    <div className="side-panel__header">
                         <p className="eyebrow">Skill Gaps</p>
                        <h2>Key Focus Areas</h2>
                    </div>

                    <div className="chip-cloud">
                        {report.skillGaps.map((gap) => (
                            <span key={gap.skill} className={`chip chip--${gap.severity}`}>
                                {gap.skill}
                            </span>
                        ))}
                    </div>

                    <div className="summary-card">
                        <p className="summary-card__label">Overview</p>
                        <p className="summary-card__text">
                            Everything you need to prepare — review your match score, practice questions, identify skill gaps, and follow your personalized roadmap.
                        </p>
                    </div>
                </aside>
            </section>

            {/* Page Footer */}
            <footer className="site-footer" aria-label="Site footer">
                <div className="site-footer__inner">
                    <p className="site-footer__copy">© {new Date().getFullYear()} Interview Planner — Built with Love</p>
                    <nav className="site-footer__nav" aria-label="Footer navigation">
                        <Link to="/terms">Terms</Link>
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/help">Help</Link>
                    </nav>
                </div>
            </footer>
        </main>
    );
};

export default Interview;