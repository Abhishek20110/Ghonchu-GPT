'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Heart, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from 'axios';
interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslate, setIsTranslate] = useState(false);
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('hi');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setMessages([
      {
        id: '1',
        content: "Woof! Hello there! 🐕 I'm Ghonchu, your loyal Golden Retriever AI companion! I'm so excited to chat with you today. How can I help you, friend? 🐾",
        isBot: true,
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Step 1: Add immediate bot response to mask delay
    const botResponseText = [
      "Woof! That's such an interesting question! 🐕 Let me think about that with my golden brain... *tail wagging*",
      "Oh boy, oh boy! I love helping with questions like this! 🎾 Here's what I think, friend...",
      "Arf! You know what? That reminds me of when I was learning new tricks! 🐾 Let me share my thoughts...",
      "*excited golden retriever energy* 🌟 That's a fantastic topic! I'm so happy you asked me about this!",
      "Woof woof! 🐕 My golden intuition tells me this is important to you. Let me give you my best answer!",
      "*sits attentively* 🐾 I understand what you're asking, and I want to help you the best I can!",
      "Tail wagging intensifies! 🎾 This is exactly the kind of question I love to help with!",
      "*golden retriever head tilt* 🤔 Hmm, let me process this with all my loyal AI brain power!",

      // New cute additions:
      "🐶 Oh wow! My ears perked up when I saw your message! Let’s fetch you a great answer!",
      "Bark bark! 🐕 That’s such a thoughtful thing to ask! Let me give you my best!",
      "*brings you a stick* 🦴 I don’t know if this helps, but I sure hope my answer does!",
      "Sniff sniff... 👃 Yep! I think I’ve found the perfect answer buried in my brain!",
      "*rolls over and wags tail* 🐾 Let’s figure this out together!",
      "Golden mode activated! 💛 Let me chase that question down like a tennis ball!",
      "I’m all ears and fluffy thoughts! 🐶 Let me help you out!",
      "*happy panting* 😄 I’m on it! Just give me a sec to bark up the right tree!",
      "*soft bark* 🐾 That’s a curious question, and curiosity is my favorite treat!",
      "Did someone say brain game? 🧠 I love thinking things through with my paws-on logic!",

      // 🎉 Humorous Additions:
      "*sniffs screen* 🤨 Hmm, smells like a tricky one. Let me fetch my best answer!",
      "Hold on, I dropped my logic bone... 🦴 Okay! Got it! Let’s dig in!",
      "Is this a trick question? 🐕 Because if it involves treats, I'm *all ears*!",
      "Woof! I was just chasing my tail, but now you’ve got my full attention.",
      "I consulted with my squirrel friend 🐿️... he says it's complicated, but I’ve got this!",
      "*hacks into squirrelnet* 🖥️ Downloading top-secret doggy data...",
      "My tail says yes, but my brain says ‘let me think a little more.’ 🐕‍🦺",
      "*dramatic bark* 🗯️ This calls for... a nap! But first, an answer!",
      "*puts on imaginary glasses* 🤓 Time to do some serious pup-thinking!",
      "*licks your screen* Sorry, I thought your question was a snack. Here's your answer instead!",
      "I’m 99% sure this answer is correct... and 100% sure I’m adorable!",
      "Processing... 🧠 Please wait while I stop chasing my tail.",
      "I asked ChatGPT and it said 'ask the dog'. So here I am. 🐾",
      "*wags tail aggressively* If enthusiasm could solve problems, this would be fixed already!",
      //roast
      "*snorts* Did you really just ask that? I thought humans were supposed to be smart. 🐾",
      "Even my chew toy could figure that out… but don’t worry, I got you. 🦴",
      "That question smells like it rolled in confusion. Let me clean it up for you. 🧼🐕",
      "*tilts head* You sure you don’t want to try Googling that first? 😅",
      "If I had a biscuit for every time someone asked that, I’d own a bakery. 🍪",
      "My tail wagged so hard it rebooted my brain. Let’s try again, shall we?",
      "That question gave me zoomies from confusion. 🐾 Let me slow down and answer it.",
      "Your question made me go ‘woof’ out loud. But alright, challenge accepted. 🐶",
      "Buddy... even the cat next door rolled its eyes. But I’m loyal, so here’s your answer. 😎",
      "That question was a bit ruff. But I’m here to fetch you some sense.",

      "Did someone say *question*? I thought you said *fetch*! Anyway, here's what I found 🦴",
      "I chased your question, caught it, and now I’m chewing on the answer. Hold on... almost there!",
      "I almost buried this question in the yard, but decided to answer instead. 🕳️",
      "This one made my tail do the twist. Let’s untangle it together!",
      "Hang on! Just had a squirrel-related emergency. Okay, back to your question. 🐿️",
      "Hold my leash... this answer might blow your fur off. 🐾",
      "I’m not just a pretty face, you know. I *also* give top-tier answers. 🐶💅",
      "*spins in a circle* Okay, now that I’ve summoned the ancient wisdom of the pupper realm...",
      "🐕 I don’t have thumbs, but I *do* have thoughts. Here’s one!",
      "Good question! It nearly distracted me from licking my paw. That’s saying something.",
      "I was just about to chase my tail, but your question stopped me in my tracks! 🐕",

      //evil
      "Oh? You wanted an answer? I thought you wanted to embarrass yourself. My bad. 😇",
      "Don't worry, I’ve hidden your dignity behind the couch with all my chewed-up logic. 🛋️🦴",
      "This question is so cute... like a tennis ball I’m about to destroy. 🎾💥",
      "I'm answering out of pity. And because I need entertainment. 🐾",
      "That question? Bold of you to assume it deserved an answer. 😈",
      "*barks in judgment* I’d say ‘no offense’, but... you know what you did.",
      "If you ever feel useless, just remember this question existed. 😎",
      "I’d explain it slowly, but I don’t think we have that much time on Earth. 🕰️🐕",
      "I sniffed your question. It smelled like 'try again later'. 🐽",
      "I'm not saying you're wrong... but if I had a biscuit for every better question, I'd be obese. 🍪🐶",
      "You're lucky I'm cute, otherwise this roast would come with fire emojis. 🔥🐾",
      "This is why I don’t let humans near the remote. Or the keyboard. 🎮⌨️",
      "Did you type that with your paws too? Because same. 🐾✌️",
      "*evil tail wag* Oh, you thought this was a safe space? How adorable. 😇",
      "I’d help... but first, let me savor this moment of superiority. 🐶💅",
      "I’m not saying you’re clueless, but even my chew toy has better questions. 🦴",

      //queen 
      "Ahem. You may now present your question to Her Royal Floofiness. 🎀",
      "I'm not just a good girl — I’m *that* girl. Now watch me answer flawlessly. 💅🐾",
      "Bow before the brilliance that is... *me*. ✨ You’re welcome in advance.",
      "Darling, I don’t chase balls anymore. I chase legacy. 👑",
      "I woke up, fluffed my ears, and chose excellence. Let’s begin. 💁‍♀️🐶",
      "*adjusts invisible crown* An answer? How quaint. Let me give you *the* answer.",
      "Serving golden realness and flawless logic — as always. 💁‍♀️🐾",
      "Oh, you need help? I suppose I can *grace* you with a response. Just this once.",
      "Keep up, darling — I don’t slow down for basic questions. 💨👑",
      "My tail doesn't wag for nonsense. Let’s get to the royal logic. 💅",
      "I only respond to questions worthy of my time... luckily, this one’s borderline acceptable. 😌",
      "Even my glitter has wisdom in it. ✨ You’re welcome, peasant.",
      "Yes, I'm pretty, smart, and fluffy. Triple threat, darling. 🔥🐶",
      "*Royal sniff* This question reeks of commoner confusion, but fine. I shall answer. 👃👸",
      "Remember, I don’t *fetch* answers — I *deliver* them like royalty. 💌",
      "I’m not just a dog; I’m the queen of this chat. Bow down and listen to my wisdom. 👑🐾",

    ];

    const botThinkingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: botResponseText[Math.floor(Math.random() * botResponseText.length)],
      isBot: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botThinkingMessage]);

    // Step 2: Hit translation API after a slight delay (simulate real thinking)
    if (isTranslate) {
      try {
        setTimeout(async () => {
          const response = await axios.post(`${apiUrl}/api/ai/admin/translate`, {
            test: inputValue,
            baselanguage: fromLang,
            targetlanguage: toLang,
          });

          let showtext = "Translation failed.";
          if (response.data?.success && response.data.response) {
            showtext = `Translation: ${response.data.response}`;
          }

          const translationMessage: Message = {
            id: (Date.now() + 2).toString(),
            content: showtext,
            isBot: true,
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, translationMessage]);
          setIsLoading(false);
        }, 1000); // 1 sec after golden reply
      }
      catch (error) {
        console.error("Translation API error:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 3).toString(),
            content: "🐾 Sorry! Something went wrong with the translation.",
            isBot: true,
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
      }
    } else {
      try {
        setTimeout(async () => {
          const response = await axios.post(`${apiUrl}/api/ai/admin/generate`, {
            prompt: inputValue,

          });

          let showtext = "Translation failed.";
          if (response.data?.success && response.data.response) {
            showtext = ` ${response.data.response}`;
          }

          const translationMessage: Message = {
            id: (Date.now() + 2).toString(),
            content: showtext,
            isBot: true,
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, translationMessage]);
          setIsLoading(false);
        }, 1000); // 1 sec after golden reply
      }
      catch (error) {
        console.error("Translation API error:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 3).toString(),
            content: "🐾 Sorry! Something went wrong with the translation.",
            isBot: true,
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
      }
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} message-bubble`}
            >
              <div
                className={`flex items-start space-x-3 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'
                  }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${message.isBot
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 golden-glow'
                      : 'bg-gradient-to-r from-orange-600 to-amber-600'
                    }`}
                >
                  {message.isBot ? (
                    <Heart className="w-5 h-5 text-white" />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>

                <div
                  className={`glass-card p-4 ${message.isBot
                      ? 'bg-amber-100/10 border-amber-200/20'
                      : 'bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-500/30'
                    }`}
                >
                  {message.isBot ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => (
                          <p className="text-white leading-relaxed mb-2">{children}</p>
                        ),
                        h1: ({ children }) => (
                          <h1 className="text-2xl text-amber-300 font-bold mb-2">{children}</h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-xl text-amber-300 font-semibold mb-2">{children}</h2>
                        ),
                        li: ({ children }) => (
                          <li className="list-disc list-inside text-white">{children}</li>
                        ),
                        code: ({ children }) => (
                          <code className="bg-amber-950 text-amber-300 px-1 py-0.5 rounded">
                            {children}
                          </code>
                        ),
                        pre: ({ children }) => (
                          <pre className="bg-amber-950 text-amber-300 p-3 rounded overflow-x-auto">
                            {children}
                          </pre>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    <p className="text-white leading-relaxed">{message.content}</p>
                  )}

                  <span className="text-xs text-amber-300 mt-2 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          ))}


          {isLoading && (
            <div className="flex justify-start message-bubble">
              <div className="flex items-start space-x-3 max-w-[80%]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="glass-card p-4 bg-amber-100/10">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                    <span className="text-amber-200">Ghonchu is thinking... 🐕💭</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="glass-card border-t border-amber-200/20 p-4">
        <div className="max-w-4xl mx-auto space-y-3">
          {/* Translation Toggle */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-amber-300">Enable Translation</label>
            <div
              onClick={() => setIsTranslate(!isTranslate)}
              className={`w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors duration-300 ${isTranslate ? 'bg-amber-500' : 'bg-gray-600'
                }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform duration-300 ${isTranslate ? 'translate-x-6' : 'translate-x-1'
                  }`}
              ></div>
            </div>
          </div>

          {/* Language Dropdowns */}
          {isTranslate && (
            <>
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <select
                    value={fromLang}
                    onChange={(e) => setFromLang(e.target.value)}
                    className="w-full appearance-none bg-amber-100/10 text-white border border-amber-300/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/30 pr-8"
                  >
                    <option className="bg-amber-950 text-white" value="English">English</option>
                    <option className="bg-amber-950 text-white" value="Bengali">Bengali</option>
                    <option className="bg-amber-950 text-white" value="Hindi">Hindi</option>
                    <option className="bg-amber-950 text-white" value="Spanish">Spanish</option>
                    <option className="bg-amber-950 text-white" value="French">French</option>
                    <option className="bg-amber-950 text-white" value="German">German</option>
                    <option className="bg-amber-950 text-white" value="Japanese">Japanese</option>
                    <option className="bg-amber-950 text-white" value="Korean">Korean</option>
                    <option className="bg-amber-950 text-white" value="Italian">Italian</option>
                    <option className="bg-amber-950 text-white" value="Portuguese">Portuguese</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-amber-400">
                    ▼
                  </div>
                </div>

                <div className="relative flex-1">
                  <select
                    value={toLang}
                    onChange={(e) => setToLang(e.target.value)}
                    className="w-full appearance-none bg-amber-100/10 text-white border border-amber-300/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/30 pr-8"
                  >
                    <option className="bg-amber-950 text-white" value="English">English</option>
                    <option className="bg-amber-950 text-white" value="Bengali">Bengali</option>
                    <option className="bg-amber-950 text-white" value="Hindi">Hindi</option>
                    <option className="bg-amber-950 text-white" value="Spanish">Spanish</option>
                    <option className="bg-amber-950 text-white" value="French">French</option>
                    <option className="bg-amber-950 text-white" value="German">German</option>
                    <option className="bg-amber-950 text-white" value="Japanese">Japanese</option>
                    <option className="bg-amber-950 text-white" value="Korean">Korean</option>
                    <option className="bg-amber-950 text-white" value="Italian">Italian</option>
                    <option className="bg-amber-950 text-white" value="Portuguese">Portuguese</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-amber-400">
                    ▼
                  </div>
                </div>
              </div></>


          )}

          {/* Input + Send */}
          <div className="flex space-x-4">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message to Ghonchu... 🐾"
              className="flex-1 bg-amber-100/10 border-amber-200/20 text-white placeholder-amber-300 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 rounded-xl"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
