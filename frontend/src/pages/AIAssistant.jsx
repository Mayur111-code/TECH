import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Bot } from 'lucide-react'; 
import { GoogleGenerativeAI } from "@google/generative-ai"; // 👈 SDK Import
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const AIAssistant = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    // Initial Greeting
    useEffect(() => {
        if (user && messages.length === 0) {
            setMessages([
                { role: 'ai', content: `Namaste ${user.name}! I'm Infina-AI from Infinatech. How can I assist you with your tech project today?` }
            ]);
        }
    }, [user, messages.length]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const currentInput = input.trim();
        if (!currentInput || loading) return;

        // 1. Setup AI Client
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-pro", // Stable Model
        });

        // 2. Add User Message to UI
        const newUserMsg = { role: 'user', content: currentInput };
        setMessages(prev => [...prev, newUserMsg]);
        setInput('');
        setLoading(true);

        try {
            // 3. Prepare History for Gemini (Skip initial AI greeting)
            // Gemini needs: User -> Model -> User sequence
            const history = messages
                .filter((msg, index) => !(index === 0 && msg.role === 'ai'))
                .map(msg => ({
                    role: msg.role === 'ai' ? 'model' : 'user',
                    parts: [{ text: msg.content }]
                }));

            // 4. Set System Instruction (Gemini Pro style)
            const systemPrompt = `You are Infina-AI, a Technical Product Manager at Infinatech. 
            The user is ${user?.name}. Your expertise: MERN Stack, AI integration, and Cloud. 
            Keep answers professional yet helpful. Use Marathi/Hinglish warmth for connection.`;

            const chat = model.startChat({
                history: [
                    { role: "user", parts: [{ text: systemPrompt }] },
                    { role: "model", parts: [{ text: "Understood. I am Infina-AI, ready to assist." }] },
                    ...history
                ]
            });

            // 5. Get AI Response
            const result = await chat.sendMessage(currentInput);
            const response = await result.response;
            const text = response.text();
            
            setMessages(prev => [...prev, { role: 'ai', content: text }]);

        } catch (error) {
            console.error("Gemini Frontend Error:", error);
            toast.error("AI connection failed. Check your API key or network.");
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-[999] p-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full shadow-2xl text-white border border-white/20"
            >
                <Sparkles size={28} />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-24 right-6 z-[999] w-[90vw] sm:w-[380px] h-[550px] bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-b border-gray-700 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-500 rounded-xl text-white shadow-lg shadow-emerald-500/20">
                                    <Bot size={22} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Infina-AI (Live)</p>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] text-emerald-400 font-medium">Direct Connect</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3.5 rounded-2xl text-[13px] leading-relaxed ${
                                        msg.role === 'user' 
                                        ? 'bg-emerald-600 text-white rounded-br-none shadow-lg shadow-emerald-900/20' 
                                        : 'bg-gray-800/80 text-gray-200 border border-gray-700 rounded-bl-none'
                                    }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-800/80 border border-gray-700 p-4 rounded-2xl flex gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>

                        {/* Input Form */}
                        <form onSubmit={handleSendMessage} className="p-4 bg-gray-900/50 border-t border-gray-800 flex gap-2">
                            <input 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Consult Infina-AI..."
                                className="flex-1 bg-gray-800/50 border border-gray-700 rounded-2xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-emerald-500"
                                disabled={loading}
                            />
                            <button 
                                type="submit" 
                                disabled={loading || !input.trim()}
                                className="p-3 bg-emerald-500 hover:bg-emerald-600 rounded-2xl text-white transition-all shadow-lg"
                            >
                                <Send size={20} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIAssistant;