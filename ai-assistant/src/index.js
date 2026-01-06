/**
 * Accessibility AI Assistant - Cloudflare Worker
 * 
 * Provides:
 * - Q&A about accessibility and the UA accessibility site
 * - Alt text generation for uploaded images
 */

import { getSystemPrompt, getAltTextPrompt } from './prompts.js';
import { callGemini, callGeminiWithImage } from './gemini.js';
import { getUIHTML } from './ui.js';

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // CORS handling
        const origin = request.headers.get('Origin') || '';
        const allowedOrigins = (env.ALLOWED_ORIGINS || '*.arizona.edu,localhost:*').split(',');
        const isAllowed = allowedOrigins.some(pattern => {
            if (pattern.includes('*')) {
                const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
                return regex.test(origin) || regex.test(origin.replace(/^https?:\/\//, ''));
            }
            return origin.includes(pattern);
        });

        // Handle preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin': isAllowed ? origin : '',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Max-Age': '86400',
                },
            });
        }

        const corsHeaders = {
            'Access-Control-Allow-Origin': isAllowed ? origin : '',
            'Content-Type': 'application/json',
        };

        try {
            // Serve UI
            if (url.pathname === '/' || url.pathname === '/index.html') {
                return new Response(getUIHTML(), {
                    headers: { 'Content-Type': 'text/html' },
                });
            }

            // Health check
            if (url.pathname === '/health') {
                return new Response(JSON.stringify({ status: 'ok' }), { headers: corsHeaders });
            }

            // Chat endpoint
            if (url.pathname === '/api/chat' && request.method === 'POST') {
                const { message, history = [] } = await request.json();

                if (!message || typeof message !== 'string') {
                    return new Response(
                        JSON.stringify({ error: 'Message is required' }),
                        { status: 400, headers: corsHeaders }
                    );
                }

                const response = await callGemini(env.GEMINI_API_KEY, {
                    systemPrompt: getSystemPrompt(),
                    message: message.slice(0, 2000), // Limit input length
                    history: history.slice(-10), // Keep last 10 messages for context
                    maxTokens: parseInt(env.MAX_TOKENS) || 1024,
                });

                return new Response(
                    JSON.stringify({ reply: response }),
                    { headers: corsHeaders }
                );
            }

            // Alt text generation endpoint
            if (url.pathname === '/api/alt-text' && request.method === 'POST') {
                const formData = await request.formData();
                const image = formData.get('image');
                const context = formData.get('context') || '';

                if (!image || !(image instanceof File)) {
                    return new Response(
                        JSON.stringify({ error: 'Image file is required' }),
                        { status: 400, headers: corsHeaders }
                    );
                }

                // Validate image type
                const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
                if (!validTypes.includes(image.type)) {
                    return new Response(
                        JSON.stringify({ error: 'Invalid image type. Supported: JPEG, PNG, GIF, WebP' }),
                        { status: 400, headers: corsHeaders }
                    );
                }

                // Limit file size (4MB)
                if (image.size > 4 * 1024 * 1024) {
                    return new Response(
                        JSON.stringify({ error: 'Image too large. Maximum size: 4MB' }),
                        { status: 400, headers: corsHeaders }
                    );
                }

                const imageData = await image.arrayBuffer();
                const base64Image = btoa(String.fromCharCode(...new Uint8Array(imageData)));

                const response = await callGeminiWithImage(env.GEMINI_API_KEY, {
                    prompt: getAltTextPrompt(context),
                    imageBase64: base64Image,
                    mimeType: image.type,
                    maxTokens: parseInt(env.MAX_TOKENS) || 1024,
                });

                return new Response(
                    JSON.stringify({ altText: response }),
                    { headers: corsHeaders }
                );
            }

            // 404 for unknown routes
            return new Response(
                JSON.stringify({ error: 'Not found' }),
                { status: 404, headers: corsHeaders }
            );

        } catch (error) {
            console.error('Worker error:', error);
            return new Response(
                JSON.stringify({ error: 'Internal server error', details: error.message }),
                { status: 500, headers: corsHeaders }
            );
        }
    },
};
