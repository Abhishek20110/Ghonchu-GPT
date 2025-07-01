'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, PawPrint, Copy, Code, Key, Zap, RefreshCw, Languages, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function DocsPage() {
  const [copiedCode, setCopiedCode] = useState<string>('');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    toast.success(`${label} copied to clipboard! 🐾`);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const CodeBlock = ({ code, language = 'javascript', label }: { code: string; language?: string; label: string }) => (
    <div className="relative">
      <div className="flex items-center justify-between bg-black/40 px-4 py-2 rounded-t-lg border border-amber-200/20">
        <span className="text-amber-300 text-sm font-mono">{language}</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => copyToClipboard(code, label)}
          className="h-6 text-amber-300 hover:text-white"
        >
          {copiedCode === label ? (
            <CheckCircle className="w-3 h-3" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </Button>
      </div>
      <pre className="bg-black/60 p-4 rounded-b-lg border-x border-b border-amber-200/20 overflow-x-auto">
        <code className="text-green-400 text-sm font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Heart className="w-12 h-12 text-amber-400 wag-animation" />
            <PawPrint className="w-8 h-8 text-amber-300 paw-bounce" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            🐕 Ghonchu GPT API Documentation
          </h1>
          <p className="text-xl text-amber-200 max-w-3xl mx-auto">
            Learn how to integrate with Ghonchu GPT API for text generation, rewriting, and translation features
          </p>
        </div>

        {/* Quick Start */}
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <Zap className="w-6 h-6 text-amber-400" />
            <span>Quick Start 🎾</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-amber-600/20 rounded-lg flex items-center justify-center mx-auto">
                <Key className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-semibold text-white">1. Get API Keys</h3>
              <p className="text-amber-200 text-sm">Create an app in your dashboard to get App ID and App Secret</p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-amber-600/20 rounded-lg flex items-center justify-center mx-auto">
                <Code className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-semibold text-white">2. Make API Calls</h3>
              <p className="text-amber-200 text-sm">Use your credentials to authenticate and call our endpoints</p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-amber-600/20 rounded-lg flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-semibold text-white">3. Build Amazing Apps</h3>
              <p className="text-amber-200 text-sm">Integrate AI-powered features into your applications</p>
            </div>
          </div>

          <div className="bg-amber-100/10 p-4 rounded-lg border border-amber-200/20">
            <p className="text-amber-200 text-sm">
              <span className="font-semibold">🔑 Base URL:</span> <code className="bg-black/20 px-2 py-1 rounded text-green-400">https://ghonchu-gpt-backend.vercel.app/</code>
            </p>
          </div>
        </Card>

        {/* API Endpoints */}
        <Tabs defaultValue="authentication" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-amber-100/10 border border-amber-200/20">
            <TabsTrigger value="authentication" className="data-[state=active]:bg-amber-600/20 data-[state=active]:text-amber-300">
              Authentication
            </TabsTrigger>
            <TabsTrigger value="generation" className="data-[state=active]:bg-amber-600/20 data-[state=active]:text-amber-300">
              Generation
            </TabsTrigger>
            <TabsTrigger value="rewrite" className="data-[state=active]:bg-amber-600/20 data-[state=active]:text-amber-300">
              Rewrite
            </TabsTrigger>
            <TabsTrigger value="translate" className="data-[state=active]:bg-amber-600/20 data-[state=active]:text-amber-300">
              Translation
            </TabsTrigger>
          </TabsList>

          {/* Authentication */}
          <TabsContent value="authentication">
            <Card className="glass-card p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Key className="w-5 h-5 text-amber-400" />
                <span>Authentication 🔐</span>
              </h3>

              <p className="text-amber-200 mb-6">
                All API requests require authentication using your App ID and App Secret. Include these in the request headers.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Headers Required:</h4>
                  <CodeBlock
                    code={`X-App-ID: your_app_id_here
X-App-Secret: your_app_secret_here
Content-Type: application/json`}
                    language="http"
                    label="Auth Headers"
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Example Request:</h4>
                  <CodeBlock
                    code={`const response = await fetch('{BASE_URL}/api/ai/generate', {
  method: 'POST',
  headers: {
    'X-App-ID': 'ghonchu_abc123def456',
    'X-App-Secret': 'sk_secret123456789',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: 'Write a story about a golden retriever',
  
  })
});

const data = await response.json();
console.log(data.response);`}
                    label="Auth Example"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Generation */}
          <TabsContent value="generation">
            <Card className="glass-card p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <span>Text Generation ✨</span>
              </h3>

              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">POST</Badge>
                  <code className="text-amber-300">api/ai/generate</code>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Request Body:</h4>
                  <CodeBlock
                    code={`{
  "prompt": "Write a creative story about...",
  "max_tokens": 150, //optional
  "temperature": 0.7, //optional
  "model": "ghonchu-v1" //optional
}`}
                    language="json"
                    label="Generation Request"
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Response:</h4>
                  <CodeBlock
                    code={`{
    "success": true,
    "appName": "Test App case",
    "response": "Old Man Tiber, a lighthouse keeper, witnessed storms for decades. One night, a small, 
    glowing boat appeared amidst the waves, carrying a silent child. Tiber raised her as his own, 
    the sea forever whispering her origins."
}`}
                    language="json"
                    label="Generation Response"
                  />
                </div>

                {/*   <div>
                  <h4 className="font-semibold text-white mb-2">Complete Example:</h4>
                  <CodeBlock
                    code={`async function generateText(prompt) {
  try {
    const response = await fetch('https://api.ghonchugpt.com/v1/generate', {
      method: 'POST',
      headers: {
        'X-App-ID': 'your_app_id',
        'X-App-Secret': 'your_app_secret',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.7
      })
    });

    const data = await response.json();
    
    if (data.success) {
      return data.data.generated_text;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Generation failed:', error);
    throw error;
  }
}

// Usage
generateText('Write a story about a loyal dog')
  .then(text => console.log(text))
  .catch(error => console.error(error));`}
                    label="Generation Complete Example"
                  />
                </div> */}
              </div>
            </Card>
          </TabsContent>

          {/* Rewrite */}
          <TabsContent value="rewrite">
            <Card className="glass-card p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <RefreshCw className="w-5 h-5 text-amber-400" />
                <span>Text Rewriting 🔄</span>
              </h3>

              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">POST</Badge>
                  <code className="text-amber-300">api/ai/rewrite</code>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Request Body:</h4>
                  <CodeBlock
                    code={`{
  "text": "The original text you want to rewrite",
}`}
                    language="json"
                    label="Rewrite Request"
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Response:</h4>
                  <CodeBlock
                    code={`{
  "success": true,
  "response": "The rewritten text",
}`}
                    language="json"
                    label="Rewrite Response"
                  />
                </div>


              </div>
            </Card>
          </TabsContent>

          {/* Translation */}
          <TabsContent value="translate">
            <Card className="glass-card p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Languages className="w-5 h-5 text-amber-400" />
                <span>Translation 🌍</span>
              </h3>

              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">POST</Badge>
                  <code className="text-amber-300">/v1/translate</code>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Request Body:</h4>
                  <CodeBlock
                    code={`{
  "text": "Generate a story in on paraghaph max 50 words",
  "baselanguage": "English",
  "targetlanguage": "Bengali"
}`}
                    language="json"
                    label="Translation Request"
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Supported Languages:</h4>
                  <div className="bg-amber-100/10 p-4 rounded-lg border border-amber-200/20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-amber-200">
                      <div>  English</div>
                      <div>  Spanish</div>
                      <div>  French</div>
                      <div>  German</div>
                      <div>  Italian</div>
                      <div>  Portuguese</div>
                      <div>  Russian</div>
                      <div>  Japanese</div>
                      <div>  Korean</div>
                      <div>  Chinese</div>
                      <div>  Arabic</div>
                      <div>  Hindi</div>
                      <div>  Bengali</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Response:</h4>
                  <CodeBlock
                    code={`{
    "success": true,
    "appName": "Test App case",
    "response": "একটি গল্প তৈরি করুন, সর্বোচ্চ ৫০ শব্দে একটি অনুচ্ছেদে।\n"
}`}
                    language="json"
                    label="Translation Response"
                  />
                </div>


              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Error Handling */}
        <Card className="glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <span>⚠️</span>
            <span>Error Handling</span>
          </h3>

          <div className="space-y-4">
            <p className="text-amber-200">
              The API returns standard HTTP status codes and structured error responses:
            </p>

            <div>
              <h4 className="font-semibold text-white mb-2">Common Status Codes:</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">200</Badge>
                  <span className="text-amber-200">Success</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">400</Badge>
                  <span className="text-amber-200">Bad Request - Invalid parameters</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">401</Badge>
                  <span className="text-amber-200">Unauthorized - Invalid credentials</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">403</Badge>
                  <span className="text-amber-200">Forbidden - App not approved or feature disabled</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">429</Badge>
                  <span className="text-amber-200">Rate Limit Exceeded</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">500</Badge>
                  <span className="text-amber-200">Internal Server Error</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-2">Error Response Format:</h4>
              <CodeBlock
                code={`{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid App ID or App Secret",
    "details": "Please check your authentication credentials"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`}
                language="json"
                label="Error Response"
              />
            </div>
          </div>
        </Card>

        {/* Rate Limits */}
        <Card className="glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <span>⏱️</span>
            <span>Rate Limits & Usage</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Rate Limits:</h4>
              <div className="space-y-2 text-amber-200">
                <div className="flex justify-between">
                  <span>Free Tier:</span>
                  <span>100 requests/hour</span>
                </div>
                <div className="flex justify-between">
                  <span>Pro Tier:</span>
                  <span>1,000 requests/hour</span>
                </div>
                <div className="flex justify-between">
                  <span>Enterprise:</span>
                  <span>Custom limits</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Response Headers:</h4>
              <div className="space-y-2 text-amber-200 text-sm">
                <div><code>X-RateLimit-Limit</code> - Request limit per hour</div>
                <div><code>X-RateLimit-Remaining</code> - Requests remaining</div>
                <div><code>X-RateLimit-Reset</code> - Reset time (Unix timestamp)</div>
              </div>
            </div>
          </div>
        </Card>

        {/* SDKs and Libraries */}
        <Card className="glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <Code className="w-5 h-5 text-amber-400" />
            <span>SDKs & Libraries 📚</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-2xl">🟨</span>
              </div>
              <h4 className="font-semibold text-white">JavaScript/Node.js</h4>
              <p className="text-amber-200 text-sm">Official SDK coming soon</p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-2xl">🐍</span>
              </div>
              <h4 className="font-semibold text-white">Python</h4>
              <p className="text-amber-200 text-sm">Official SDK coming soon</p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-2xl">♦️</span>
              </div>
              <h4 className="font-semibold text-white">Ruby</h4>
              <p className="text-amber-200 text-sm">Official SDK coming soon</p>
            </div>
          </div>
        </Card>

        {/* Support */}
        <Card className="glass-card p-6 text-center">
          <div className="space-y-4">
            <div className="text-4xl">🐕💝</div>
            <h3 className="text-2xl font-bold text-white">Need Help?</h3>
            <p className="text-amber-200 max-w-2xl mx-auto">
              Ghonchu is here to help! If you have questions about the API or need assistance with integration,
              don't hesitate to reach out to our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                onClick={() => (window.location.href = 'mailto:ab.dey2001@gmail.com')}
              >
                Contact Support 🎾
              </Button>
              <Button variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-100/10">
                Join Community 🐾
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}