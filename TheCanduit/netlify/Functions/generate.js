// JavaScript source code
// netlify/functions/generate.js

const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { endpoint, payload } = JSON.parse(event.body);
  const apiKey = process.env.GOOGLE_API_KEY; // Your API key is stored here.

  let apiUrl;
  if (endpoint === 'generate-image') {
    apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;
  } else {
    apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('API call error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch from external API' }),
    };
  }
};
