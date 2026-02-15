addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: { ...corsHeaders, 'Allow': 'POST' } });
  }

  const groqApiKey = GROQ_API_KEY; // Access the environment variable
  if (!groqApiKey) {
    return new Response('GROQ_API_KEY is not set', { status: 500, headers: corsHeaders });
  }

  try {
    const requestBody = await request.json();
    const { messages, history } = requestBody; // Assuming 'messages' and 'history' are in the request body

    // Construct the messages array for Groq API
    let groqMessages = [];
    if (history && Array.isArray(history)) {
      groqMessages = history.map(msg => ({ role: msg.role, content: msg.content }));
    }
    if (messages && Array.isArray(messages)) {
      groqMessages = groqMessages.concat(messages.map(msg => ({ role: msg.role, content: msg.content })));
    }

    // Ensure there's at least one message
    if (groqMessages.length === 0) {
      return new Response('No messages provided', { status: 400, headers: corsHeaders });
    }

    const groqPayload = {
      model: 'llama-3.3-70b-versatile',
      messages: groqMessages,
      stream: true // Assuming streaming is desired
    };

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqApiKey}`
      },
      body: JSON.stringify(groqPayload)
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error('Groq API Error:', groqResponse.status, errorText);
      return new Response(`Groq API Error: ${groqResponse.status} - ${errorText}`, { status: groqResponse.status, headers: corsHeaders });
    }

    // Stream the response back to the client
    const { readable, writable } = new TransformStream();
    groqResponse.body.pipeTo(writable);

    return new Response(readable, {
      headers: {
        'Content-Type': groqResponse.headers.get('Content-Type'),
        ...corsHeaders // Add CORS headers to the streaming response
      }
    });

  } catch (error) {
    console.error('Worker error:', error);
    return new Response(`Worker error: ${error.message}`, { status: 500, headers: corsHeaders });
  }
}
