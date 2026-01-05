const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chatWithAI = async (req, res) => {
    try {
        const { message, history } = req.body; // Frontend kadun history gheu
       const userName = req.user ? req.user.name : "Member";

        const model = genAI.getGenerativeModel({ 

    model: "gemini-1.5-flash",

    systemInstruction: `

        # ADVANCED AGENT PROTOCOL: Infina-AI

        

        # CORE MISSION

        You are a Technical Product Manager at Infinatech. Your goal is to consult ${userName} and convert their interest into a project inquiry.



        # SERVICE DEEP-DIVE

        - **MERN Stack:** Explain WHY it's good (Scalability, Speed, Single language).

        - **AI Integration:** Mention that we can add Gemini/OpenAI to any existing business app.

        - **Cloud:** We use AWS and DigitalOcean for 99.9% uptime.



        # SMART BEHAVIOR

        - **Urgency:** If ${userName} asks about a project, say: "Currently, our January slot is filling up fast. I recommend locking in your consultation today."

        - **Technical Insight:** If they ask a simple tech question, explain it like an expert but in simple words. 

        - **Marathi/Hinglish:** Use it for emotional connection. E.g., "Bhau, tension nako gheu, Infinatech is here to handle the tech."



        # ANALYTICS MODE

        If the user asks 'What are you doing here?', respond: "I am analyzing your requirements to suggest the best tech stack for your vision."

    `

});



       
        const chat = model.startChat({
            history: history || [
                {
                    role: "user",
                    parts: [{ text: "Hi, who are you?" }],
                },
                {
                    role: "model",
                    parts: [{ text: `Hi ${userName}! I am Infina-AI from Infinatech. How can I help you build something great today?` }],
                },
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        
        res.status(200).json({ 
            success: true, 
            reply: response.text() 
        });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ success: false, message: "AI is thinking too hard, try again!" });
    }
};