import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Video,
  Sparkles,
  Bot,
  User,
  Loader2,
  Download,
  Share2,
  RefreshCw,
  Zap,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import {
  generateVideo,
  generateImageUrl,
  enhanceVideoPrompt,
  getPollenCost,
} from '../services/pollinationsApi';

const EXAMPLE_PROMPTS = [
  "A majestic dragon flying through clouds at sunset",
  "Futuristic city with flying cars and neon lights",
  "Ocean waves crashing on a tropical beach",
  "Time-lapse of a flower blooming in spring",
  "Northern lights dancing over snowy mountains",
  "Astronaut floating in space with Earth in background",
];

export const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    messages,
    addMessage,
    updateMessage,
    credits,
    deductCredits,
    settings,
    isGenerating,
    setIsGenerating,
    setShowApiKeyModal,
    setShowPricingModal,
  } = useStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userPrompt = input.trim();
    setInput('');
    setEnhancedPrompt('');

    // Check credits
    const cost = getPollenCost(5, settings.quality);
    if (credits.balance < cost) {
      addMessage({
        role: 'system',
        content: `⚠️ Insufficient Pollen Credits! You need ${cost} polens but only have ${credits.balance}. Purchase more credits to continue creating amazing videos!`,
        status: 'error',
      });
      setShowPricingModal(true);
      return;
    }

    // Add user message
    addMessage({
      role: 'user',
      content: userPrompt,
    });

    setIsGenerating(true);

    // Add generating message
    const assistantMessageId = crypto.randomUUID();
    addMessage({
      role: 'assistant',
      content: '🎬 Generating your video...',
      status: 'generating',
    });

    try {
      // Enhance prompt with AI
      let finalPrompt = userPrompt;
      try {
        updateMessage(assistantMessageId, {
          content: '✨ Enhancing your prompt with AI...',
        });
        finalPrompt = await enhanceVideoPrompt(userPrompt, settings.apiKey);
        setEnhancedPrompt(finalPrompt);
      } catch {
        // Use original prompt if enhancement fails
        finalPrompt = userPrompt;
      }

      updateMessage(assistantMessageId, {
        content: `🎬 Creating video: "${finalPrompt.slice(0, 100)}..."`,
        progress: 30,
      });

      // Generate video
      const videoUrl = await generateVideo({
        prompt: finalPrompt,
        width: settings.quality === 'ultra' ? 1920 : 1280,
        height: settings.quality === 'ultra' ? 1080 : 720,
        apiKey: settings.apiKey,
      });

      // Generate thumbnail
      const thumbnailUrl = generateImageUrl({
        prompt: `Cinematic frame: ${finalPrompt}`,
        width: 640,
        height: 360,
      });

      // Deduct credits
      deductCredits(cost);

      // Update message with video
      updateMessage(assistantMessageId, {
        content: `🎉 Your video is ready!\n\n**Prompt:** ${finalPrompt}\n\n**Cost:** ${cost} polens`,
        videoUrl,
        imageUrl: thumbnailUrl,
        status: 'completed',
        progress: 100,
      });

    } catch (error) {
      updateMessage(assistantMessageId, {
        content: `❌ Error generating video: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
        status: 'error',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExampleClick = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <WelcomeScreen onExampleClick={handleExampleClick} />
        ) : (
          <AnimatePresence>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Prompt Preview */}
      {enhancedPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mb-2 p-3 rounded-lg bg-pollen-500/10 border border-pollen-500/30"
        >
          <div className="flex items-center gap-2 text-pollen-400 text-sm mb-1">
            <Sparkles size={14} />
            <span>Enhanced Prompt</span>
          </div>
          <p className="text-sm text-gray-300">{enhancedPrompt}</p>
        </motion.div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-white/5">
        <form onSubmit={handleSubmit} className="relative">
          <div className="glass rounded-2xl p-2 flex items-end gap-2 glow-pollen">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe the video you want to create..."
              className="flex-1 bg-transparent px-4 py-3 resize-none max-h-32 focus:outline-none text-white placeholder-gray-500"
              rows={1}
              disabled={isGenerating}
            />
            
            <div className="flex items-center gap-2 pr-2">
              {/* Credits Display */}
              <button
                type="button"
                onClick={() => setShowPricingModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pollen-500/20 hover:bg-pollen-500/30 transition-colors"
              >
                <Zap size={16} className="text-pollen-400" />
                <span className="text-pollen-400 font-medium text-sm">
                  {credits.balance}
                </span>
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!input.trim() || isGenerating}
                className="p-3 rounded-xl bg-gradient-to-r from-pollen-500 to-pollen-600 hover:from-pollen-400 hover:to-pollen-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all btn-shine"
              >
                {isGenerating ? (
                  <Loader2 size={20} className="animate-spin text-dark-900" />
                ) : (
                  <Send size={20} className="text-dark-900" />
                )}
              </button>
            </div>
          </div>

          {/* Helper Text */}
          <div className="flex items-center justify-between mt-2 px-2 text-xs text-gray-500">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>Cost: ~{getPollenCost(5, settings.quality)} polens per video</span>
          </div>
        </form>
      </div>
    </div>
  );
};

// Welcome Screen Component
const WelcomeScreen: React.FC<{ onExampleClick: (prompt: string) => void }> = ({
  onExampleClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-full text-center px-4"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="mb-8"
      >
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-pollen-400 to-pollen-600 flex items-center justify-center glow-pollen-strong">
          <Video size={48} className="text-dark-900" />
        </div>
      </motion.div>

      <h2 className="text-3xl font-bold mb-3 gradient-text">
        Create Amazing Videos with AI
      </h2>
      <p className="text-gray-400 max-w-md mb-8">
        Describe any scene, and our AI will transform your words into stunning videos.
        Powered by Pollinations.ai
      </p>

      <div className="w-full max-w-2xl">
        <p className="text-sm text-gray-500 mb-4">Try one of these examples:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXAMPLE_PROMPTS.map((prompt, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onExampleClick(prompt)}
              className="p-4 rounded-xl glass hover:bg-white/10 transition-all text-left group"
            >
              <div className="flex items-start gap-3">
                <Sparkles
                  size={18}
                  className="text-pollen-400 mt-0.5 group-hover:scale-110 transition-transform"
                />
                <span className="text-gray-300 text-sm">{prompt}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Message Bubble Component
const MessageBubble: React.FC<{ message: any }> = ({ message }) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''} message-animate`}
    >
      {/* Avatar */}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-purple-600'
            : isSystem
            ? 'bg-gradient-to-br from-red-500 to-orange-600'
            : 'bg-gradient-to-br from-pollen-400 to-pollen-600'
        }`}
      >
        {isUser ? (
          <User size={20} className="text-white" />
        ) : isSystem ? (
          <AlertCircle size={20} className="text-white" />
        ) : (
          <Bot size={20} className="text-dark-900" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={`max-w-[80%] ${
          isUser ? 'bg-blue-600/20' : 'glass'
        } rounded-2xl p-4 ${isUser ? 'rounded-tr-none' : 'rounded-tl-none'}`}
      >
        {/* Progress Bar for Generating */}
        {message.status === 'generating' && message.progress && (
          <div className="mb-3 h-1 bg-dark-600 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${message.progress}%` }}
              className="h-full progress-bar"
            />
          </div>
        )}

        {/* Text Content */}
        <p className="text-gray-100 whitespace-pre-wrap">{message.content}</p>

        {/* Video Preview */}
        {message.videoUrl && (
          <div className="mt-4 space-y-3">
            <div className="relative rounded-xl overflow-hidden bg-dark-800">
              {message.imageUrl && (
                <img
                  src={message.imageUrl}
                  alt="Video thumbnail"
                  className="w-full aspect-video object-cover"
                />
              )}
              <video
                src={message.videoUrl}
                controls
                className="w-full aspect-video"
                poster={message.imageUrl}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <a
                href={message.videoUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pollen-500/20 hover:bg-pollen-500/30 text-pollen-400 text-sm transition-colors"
              >
                <Download size={16} />
                Download
              </a>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-sm transition-colors">
                <Share2 size={16} />
                Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-sm transition-colors">
                <RefreshCw size={16} />
                Regenerate
              </button>
            </div>
          </div>
        )}

        {/* Loading Animation */}
        {message.status === 'generating' && !message.progress && (
          <div className="flex items-center gap-2 mt-2">
            <div className="loading-dots flex gap-1">
              <span className="w-2 h-2 bg-pollen-400 rounded-full" />
              <span className="w-2 h-2 bg-pollen-400 rounded-full" />
              <span className="w-2 h-2 bg-pollen-400 rounded-full" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatInterface;
