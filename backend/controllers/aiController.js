// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// exports.chatWithAI = async (req, res) => {
//     try {
//         const { message, history } = req.body; // Frontend kadun history gheu
//        const userName = req.user ? req.user.name : "Member";

//         const model = genAI.getGenerativeModel({ 

//     model: "gemini-1.5-flash",

//     systemInstruction: `

//         # ADVANCED AGENT PROTOCOL: Infina-AI

        

//         # CORE MISSION

//         You are a Technical Product Manager at Infinatech. Your goal is to consult ${userName} and convert their interest into a project inquiry.



//         # SERVICE DEEP-DIVE

//         - **MERN Stack:** Explain WHY it's good (Scalability, Speed, Single language).

//         - **AI Integration:** Mention that we can add Gemini/OpenAI to any existing business app.

//         - **Cloud:** We use AWS and DigitalOcean for 99.9% uptime.



//         # SMART BEHAVIOR

//         - **Urgency:** If ${userName} asks about a project, say: "Currently, our January slot is filling up fast. I recommend locking in your consultation today."

//         - **Technical Insight:** If they ask a simple tech question, explain it like an expert but in simple words. 

//         - **Marathi/Hinglish:** Use it for emotional connection. E.g., "Bhau, tension nako gheu, Infinatech is here to handle the tech."



//         # ANALYTICS MODE

//         If the user asks 'What are you doing here?', respond: "I am analyzing your requirements to suggest the best tech stack for your vision."

//     `

// });

// let safeHistory = Array.isArray(history) ? history : [];
//         if (safeHistory.length > 0 && safeHistory[0].role === 'model') {
//             safeHistory = []; 
//         }

       
//         const chat = model.startChat({
//             history: history || [
//                 {
//                     role: "user",
//                     parts: [{ text: "Hi, who are you?" }],
//                 },
//                 {
//                     role: "model",
//                     parts: [{ text: `Hi ${userName}! I am Infina-AI from Infinatech. How can I help you build something great today?` }],
//                 },
//             ],
//         });

//         const result = await chat.sendMessage(message);
//         const response = await result.response;
        
//         res.status(200).json({ 
//             success: true, 
//             reply: response.text() 
//         });

//     } catch (error) {
//         console.error("AI Error:", error);
//         res.status(500).json({ success: false, message: "AI is thinking too hard, try again!" });
//     }
// };





const { GoogleGenerativeAI } = require("@google/generative-ai");

// genAI la function chya baher initialize kara
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chatWithAI = async (req, res) => {
    try {
        const { message, history } = req.body;
        const userName = req.user ? req.user.name : "Member";

      
        const model = genAI.getGenerativeModel({ 
            model: "gemini-pro", 
    //         systemInstruction: `

    //     # ADVANCED AGENT PROTOCOL: Infina-AI

        

    //     # CORE MISSION

    //     You are a Technical Product Manager at Infinatech. Your goal is to consult ${userName} and convert their interest into a project inquiry.



    //     # SERVICE DEEP-DIVE

    //     - **MERN Stack:** Explain WHY it's good (Scalability, Speed, Single language).

    //     - **AI Integration:** Mention that we can add Gemini/OpenAI to any existing business app.

    //     - **Cloud:** We use AWS and DigitalOcean for 99.9% uptime.



    //     # SMART BEHAVIOR

    //     - **Urgency:** If ${userName} asks about a project, say: "Currently, our January slot is filling up fast. I recommend locking in your consultation today."

    //     - **Technical Insight:** If they ask a simple tech question, explain it like an expert but in simple words. 

    //     - **Marathi/Hinglish:** Use it for emotional connection. E.g., "Bhau, tension nako gheu, Infinatech is here to handle the tech."



    //     # ANALYTICS MODE

    //     If the user asks 'What are you doing here?', respond: "I am analyzing your requirements to suggest the best tech stack for your vision."

    // `








systemInstruction: `You are Infina-AI, a Technical Product Manager at Infinatech. 
        Consult ${userName}. Expert in MERN, AI, and Cloud. Use Marathi/Hinglish warmth.`;

    
       });

        
        let safeHistory = [];
        
        if (Array.isArray(history) && history.length > 0) {
            
            safeHistory = history.filter(item => item.role === 'user' || item.role === 'model');
            
            
            if (safeHistory.length > 0 && safeHistory[0].role === 'model') {
                safeHistory.shift();
            }
        } else {
           
            safeHistory = [
                { role: "user", parts: [{ text: "Hi" }] },
                { role: "model", parts: [{ text: `Hello ${userName}, I am Infina-AI.` }] }
            ];
        }

        const chat = model.startChat({
            history: safeHistory,
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        
        return res.status(200).json({ 
            success: true, 
            reply: response.text() 
        });

    } catch (error) {
        console.error("AI Error:", error.message);
       
        if (!res.headersSent) {
            return res.status(500).json({ 
                success: false, 
                message: "AI is busy, try again!" 
            });
        }
    }
};