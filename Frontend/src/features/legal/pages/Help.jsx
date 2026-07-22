import LegalPage from "../components/LegalPage";

const supportEmail = "saikushal091106@gmail.com";

const sections = [
    {
        title: "How to Use the Platform",
        paragraphs: [
            "Upload your resume or add a self-description, paste the job description, and generate a personalized interview plan.",
            "After generation, review the technical questions, behavioral prompts, skill gaps, and roadmap sections to guide your preparation."
        ]
    },
    {
        title: "Supported File Formats",
        items: [
            "PDF (.pdf)",
            "Microsoft Word (.doc)",
            "Microsoft Word Open XML (.docx)"
        ]
    },
    {
        title: "Troubleshooting",
        items: [
            "Why isn't my resume uploading? Check the file type and ensure it is within the supported size limit.",
            "Why is interview generation taking time? AI generation and file processing can take a short moment, especially with larger inputs.",
            "How do I download my generated resume? Use the Download Resume button on the interview report page.",
            "What file types are supported? PDF, DOC, and DOCX are supported for resume uploads."
        ]
    },
    {
        title: "Frequently Asked Questions",
        items: [
            "Can I use the platform without a resume? Yes, you can provide a self-description instead.",
            "Do I need to be signed in? Yes, the report generation experience is designed for authenticated users.",
            "Are the interview questions guaranteed to match every role? No, they are generated to help you prepare and should be reviewed critically."
        ]
    }
];

const Help = () => (
    <LegalPage
        eyebrow="Help & Support"
        title="Help & Support"
        lead="If you experience any issues or have questions regarding the platform, please contact support directly or review the quick guidance below."
        sections={sections}
        supportEmail={supportEmail}
    />
);

export default Help;