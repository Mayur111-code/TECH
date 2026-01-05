import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Bot, User } from 'lucide-react'; // Icons fix kele ahet
import API from '../api/api'; 
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const AIAssistant = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    // Initial message setup
    useEffect(() => {
        if (user && messages.length === 0) {
            setMessages([
                { role: 'ai', content: `Hello ${user.name}! I'm Infina-AI. How can I help you explore Infinatech today?` }
            ]);
        }
    }, [user, messages.length]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

   
    const historyPayload = messages
        .filter((msg, index) => {
            
            if (index === 0 && msg.role === 'ai') return false;
            return true;
        })
        .map(msg => ({
            role: msg.role === 'ai' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));

    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setLoading(true);

    try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await API.post('/ai/chat', { 
            message: input, 
            history: historyPayload 
        }, config);
        
        setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
    } catch (error) {
        console.error("Chat Error:", error);
        toast.error("AI is busy.");
    } finally {
        setLoading(false);
    }
};
    if (!user) return null;

    return (
        <>
            {/* 1. Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-[999] p-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full shadow-2xl text-white"
            >
                <Sparkles size={28} />
            </motion.button>

            {/* 2. Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        className="fixed bottom-24 right-6 z-[999] w-[350px] h-[520px] bg-gray-900/90 backdrop-blur-xl border border-gray-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-emerald-500/20 border-b border-gray-700 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-emerald-500 rounded-lg text-white">
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm leading-none">Infina-AI</p>
                                    <span className="text-[10px] text-emerald-400">Online</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                                        msg.role === 'user' 
                                        ? 'bg-emerald-600 text-white rounded-br-none' 
                                        : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none'
                                    }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-800 border border-gray-700 p-3 rounded-2xl rounded-bl-none flex gap-1 items-center">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-4 bg-gray-900/50 border-t border-gray-700 flex gap-2">
                            <input 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Write a message..."
                                className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-all placeholder:text-gray-500"
                            />
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="p-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 rounded-xl text-white transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIAssistant;