import LegalPage from "../components/LegalPage";

const supportEmail = "saikushal091106@gmail.com";

const sections = [
    {
        title: "Information Collected",
        paragraphs: [
            "We may collect account details such as your name, email address, and authentication metadata when you register or sign in.",
            "We also process the content you provide to generate interview materials."
        ]
    },
    {
        title: "Resume Uploads, Job Descriptions, and Self-Descriptions",
        paragraphs: [
            "Uploaded resumes, job descriptions, and self-descriptions are used to generate personalized interview plans and preparation guidance.",
            "This information may be temporarily stored to provide the service and support your recent interview reports."
        ]
    },
    {
        title: "Authentication Data",
        paragraphs: [
            "Authentication data is used to verify your identity, maintain your session, and protect access to your reports and account-related features."
        ]
    },
    {
        title: "How Information Is Used",
        items: [
            "Generate interview questions, skill-gap insights, and preparation roadmaps.",
            "Improve platform reliability, performance, and user experience.",
            "Maintain account security and provide support."
        ]
    },
    {
        title: "Data Security",
        paragraphs: [
            "We use reasonable technical and organizational safeguards to protect information processed by the platform.",
            "However, no online system can be guaranteed to be completely secure, so you should avoid uploading sensitive information unless necessary."
        ]
    },
    {
        title: "Cookies",
        paragraphs: [
            "Cookies or similar technologies may be used to support authentication, maintain sessions, and improve usability."
        ]
    },
    {
        title: "Third-Party Services",
        items: [
            "Google Gemini API may be used to assist with AI-generated outputs.",
            "MongoDB is used to store application data and reports."
        ]
    },
    {
        title: "User Rights",
        items: [
            "Request access to your data where applicable.",
            "Ask for corrections to inaccurate account information.",
            "Request account deletion or data removal where supported by the platform and law."
        ]
    }
];

const Privacy = () => (
    <LegalPage
        eyebrow="Privacy Policy"
        title="Privacy Policy"
        lead="This policy explains how the Interview Planner platform collects, uses, and protects information while delivering personalized interview preparation support."
        sections={sections}
        supportEmail={supportEmail}
    />
);

export default Privacy;