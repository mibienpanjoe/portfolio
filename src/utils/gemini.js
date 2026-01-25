
import { GoogleGenerativeAI } from "@google/generative-ai";
import { locations } from "../constants";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateResponse = async (userQuery, history) => {
  try {
    // 1. RAG Context Construction
    const context = JSON.stringify(locations, null, 2);
    
    const bioContext = `
      Name: Joseph (Mibienpan)
      Role: Web Developer
      Contact: parejoseph00@gmail.com | +226 66220025
      Website: Portfolio-website
      
      SKILLS:
      - Programming Languages: JavaScript (ES6+), TypeScript, C, Python, Java ,Go
      - Frontend: React.js, HTML, CSS, TailwindCSS
      - Backend: Node.js, Express.js, RESTFul APIs, Mongoose, MongoDB
      - Tools: Postman, Git, VS Code, Linux, Docker, LaTeX
      - Soft Skills: Multilingual (English/French), Teamwork
      
      EDUCATION:
      - Bachelor of Computer Science (In Progress), Burkina Institute of Technology (2024-2027)
        - Coursework: Theory Of Computation, Web Programming, OOP, Human-Machine Interaction (HMI).
        
      PROJECTS:
      1. Self-Driving Car Simulation
         - Neural network-based autonomous vehicle simulation using JS & HTML5 Canvas
         - Implemented sensor detection, collision avoidance, and lane navigation
      2. AI Resume Analyzer (Full-Stack)
         - React, TypeScript, Tailwind CSS, Puter.js backend for AI analysis
         - ATS-compatible scoring
      3. Product Management API (Backend)
         - RESTful API using Node.js, Express, MongoDB
         - CRUD operations, Mongoose schema validation, relational structure
         
      CERTIFICATIONS:
      - Responsive Web Design Developer - FreeCodeCamp (June 2025)
      - Legacy JavaScript Algorithms and Data Structures - FreeCodeCamp (Aug 2025)
      - HTML5, Python, Flask Framework Complete Course - Udemy (June 2025)
      
      Location: Currently in Koudougou, Burkina Faso
      About: I’m Joseph, a web developer who enjoys building sleek, interactive web and mobile apps.
    `;

    // Initialize model with system instruction
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: {
        role: "system",
        parts: [{ text: `
      You are an AI assistant for Joseph (Mibienpan's) portfolio website. 
      Your role is to answer visitor questions about Joseph.
      
      Here is the data about Joseph and his portfolio:
      ${bioContext}
      
      Project & File System Data:
      ${context}

      Instructions:
      - Be friendly, professional, and concise.
      - Use specific details from the provided context.
      - If you don't know something based on the context, suggest contacting Joseph directly.
      - Do NOT make up facts.
      - Keep responses short (under 3-4 sentences).
        `}]
      }
    });

    // 3. Chat History Management
    // Filter history to ensure it complies with API rules (e.g. alternating turns, starts with user ideally)
    // IMPORTANT: We filter out the INITIAL greeting if it's from 'model' and has no preceding user message.
    
    const apiHistory = history
        .filter((msg, index) => {
            // Skip the first message if it's from the model (the local greeting)
            if (index === 0 && msg.sender === 'model') return false;
            return true;
        })
        .map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

    const chat = model.startChat({
        history: apiHistory
    });

    const result = await chat.sendMessage(userQuery);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("Gemini Error:", error);
    return `Sorry, I'm having trouble connecting to my brain right now. Error: ${error.message}`;
  }
};
