const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
// const { zodToJsonSchema } = require("zod-to-json-schema")
// const puppeteer = require("puppeteer")
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    title: z.string().describe(
        "Infer the most appropriate job title from the job description. Examples: Generative AI Engineer, Backend Developer, Full Stack Developer, Data Scientist, Machine Learning Engineer."
    ),
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skills which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high"]).describe("The severity of the skill gap, whether it is low, medium or high"),
    })).describe("List of skill gaps that the candidate has along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, algorithms, system design, behavioral questions etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a book, watch a video, solve problems etc.")
    })).describe("A day-wise preparation plan for the candidate to follow interview, including the focus for each day")
})

const jsonSchema = z.toJSONSchema(interviewReportSchema);

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


    const prompt = `Generate a detailed interview report for a candidate with the the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
                    Infer the most suitable job title from the job description and return only valid JSON matching the schema.
    `
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: jsonSchema
        }
    })

    return JSON.parse(response.text); 
    // (Above one is Main line)
    // console.log(JSON.parse(response.text)) (Trial line)
    // console.log(interviewReportByAi) (Trial line)
    // return {
    //     title: "Backend Developer",
    //     matchScore: 85,

    //     technicalQuestions: [
    //         {
    //             question: "Explain the Node.js Event Loop.",
    //             intention: "Checks understanding of asynchronous programming.",
    //             answer: "Explain event loop phases, callback queue, microtasks and macrotasks."
    //         },
    //         {
    //             question: "How does JWT authentication work?",
    //             intention: "Tests authentication knowledge.",
    //             answer: "Explain token generation, verification and middleware."
    //         }
    //     ],

    //     behavioralQuestions: [
    //         {
    //             question: "Tell me about yourself.",
    //             intention: "Checks communication skills.",
    //             answer: "Talk about your education, projects and backend experience."
    //         },
    //         {
    //             question: "Describe a challenging project.",
    //             intention: "Evaluates problem-solving.",
    //             answer: "Use the STAR method."
    //         }
    //     ],

    //     skillGaps: [
    //         {
    //             skill: "Redis",
    //             severity: "medium"
    //         },
    //         {
    //             skill: "Docker",
    //             severity: "low"
    //         }
    //     ],

    //     preparationPlan: [
    //         {
    //             day: 1,
    //             focus: "Node.js Fundamentals",
    //             tasks: [
    //                 "Revise Event Loop",
    //                 "Practice Async/Await",
    //                 "Solve 5 backend questions"
    //             ]
    //         },
    //         {
    //             day: 2,
    //             focus: "MongoDB",
    //             tasks: [
    //                 "Study Indexing",
    //                 "Aggregation Pipeline",
    //                 "Practice Queries"
    //             ]
    //         },
    //         {
    //             day: 3,
    //             focus: "System Design",
    //             tasks: [
    //                 "Design URL Shortener",
    //                 "Study Load Balancing"
    //             ]
    //         }
    //     ]
    // };  
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
    });

    const page = await browser.newPage();

    await page.setContent(htmlContent, {
        waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
        format: "A4",
        margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm",
        },
    });

    await browser.close();

    return pdfBuffer;
}
// async function generatePdfFromHtml(htmlContent) {
//     const browser = await puppeteer.launch({
//         executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
//         headless: true,
//         args: [
//             "--no-sandbox",
//             "--disable-setuid-sandbox"
//         ]
//     })

//     const page = await browser.newPage()
     
//     await page.setContent(htmlContent, { waitUntil: 'networkidle0' })

//     const pdfBuffer = await page.pdf({ 
//         format: 'A4', margin: {
//             top: '20mm',
//             bottom: '20mm',
//             left: '15mm',
//             right: '15mm'
//         }
//     } )

//     await browser.close()

//     return pdfBuffer
// }

async function generateResumePdf({resume, selfDescription, jobDescription}) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can beconverted to PDF using a PDF generation library like Puppeteer or jsPDF")
    })

    const prompt = `Generate a resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field 'html' containing the HTML content of the resume which can be convered to PDF using any library like Puppeteer or jsPDF.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of the resume should be not sound like its generated by AI and should be as close as possible to a real human-written resume. 
                        you can highlight the content using some colors or different font styles, but the overall design should be professional and clean.
                        The content should be ATS friendly , i.e. its should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.  
    `
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: z.toJSONSchema(resumePdfSchema)
        }
    })

    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer    
}



//     const response = await ai.models.generateContent({
//         model: "gemini-3.1-pro-preview",
//         contents: "Hello gemini ! Explain what is interview ?" 
//     })

//     console.log(response.text)
// }

module.exports = { generateInterviewReport, generateResumePdf }