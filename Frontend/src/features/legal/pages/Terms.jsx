import LegalPage from "../components/LegalPage";

const supportEmail = "saikushal091106@gmail.com";

const sections = [
    {
        title: "Acceptance of Terms",
        paragraphs: [
            "By accessing or using the Interview Planner platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
            "If you do not agree with any part of these terms, you should not use the platform."
        ]
    },
    {
        title: "Description of the Platform",
        paragraphs: [
            "Interview Planner is an AI-assisted preparation tool that helps users generate interview plans, question sets, and preparation roadmaps based on uploaded resumes, job descriptions, and self-descriptions.",
            "The platform is intended to support preparation and should not be treated as a guarantee of employment outcomes."
        ]
    },
    {
        title: "User Responsibilities",
        items: [
            "Provide accurate and lawful information when using the platform.",
            "Do not upload content that infringes on the rights of others or contains harmful material.",
            "Keep your account credentials secure and notify us of unauthorized access.",
            "Use the platform in a lawful, respectful, and ethical manner."
        ]
    },
    {
        title: "AI-Generated Content Disclaimer",
        paragraphs: [
            "The interview questions, answers, and preparation plans may be generated or assisted by artificial intelligence. These outputs are provided for educational and preparatory purposes only.",
            "You are responsible for reviewing, editing, and validating AI-generated content before relying on it."
        ]
    },
    {
        title: "Limitation of Liability",
        paragraphs: [
            "To the maximum extent permitted by law, Interview Planner and its operators will not be liable for indirect, incidental, special, or consequential damages arising from your use of the platform.",
            "We do not guarantee uninterrupted service, error-free output, or that the platform will meet every user expectation."
        ]
    },
    {
        title: "Intellectual Property",
        paragraphs: [
            "All platform design elements, branding, and original software components remain the property of their respective owners.",
            "You retain ownership of the documents and text you upload, subject to the rights you grant us to process that content for providing the service."
        ]
    },
    {
        title: "Prohibited Uses",
        items: [
            "Attempting to disrupt, reverse engineer, or compromise the platform.",
            "Uploading malware, illegal content, or deceptive material.",
            "Using the service to violate applicable laws or the rights of others."
        ]
    },
    {
        title: "Updates to Terms",
        paragraphs: [
            "We may update these terms periodically to reflect product changes, legal requirements, or operational improvements.",
            "Continued use of the platform after updates means you accept the revised terms."
        ]
    }
];

const Terms = () => (
    <LegalPage
        eyebrow="Terms of Service"
        title="Terms of Service"
        lead="These terms outline the expectations, responsibilities, and limitations that apply when using the Interview Planner platform."
        sections={sections}
        supportEmail={supportEmail}
    />
);

export default Terms;