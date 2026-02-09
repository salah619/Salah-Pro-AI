const axios = require('axios');

exports.handler = async (event, context) => {
  // السماح بطلبات POST فقط
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { messages, model, temperature } = JSON.parse(event.body);
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'GROQ_API_KEY is not configured' }),
      };
    }

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: model || 'llama-3.3-70b-versatile',
        messages: messages,
        temperature: temperature || 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error calling Groq API:', error);
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({
        error: 'Failed to fetch from Groq API',
        details: error.message,
      }),
    };
  }
};
