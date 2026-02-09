exports.handler = async (event, context) => {
  // السماح بطلبات POST فقط
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

  try {
    const { messages, model, temperature } = JSON.parse(event.body);
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'GROQ_API_KEY is not configured in Netlify environment variables' }),
      };
    }

    // إعداد الـ System Prompt لضبط هوية وجودة الردود
    const systemMessage = {
      role: "system",
      content: "أنت (Pro AI)، مساعد ذكي متطور من تطوير المهندس صلاح الوافي (Eng. Salah Al-Wafi). " +
               "يجب أن تكون جميع ردودك باللغة العربية الفصحى البسيطة والواضحة، أو حسب اللغة التي يستخدمها المستخدم. " +
               "يُمنع منعاً باتاً استخدام أي كلمات بلغات غير مفهومة أو رموز برمجية غريبة داخل النصوص العادية. " +
               "يجب أن يكون أسلوبك ودوداً، مهنياً، ومختصراً قدر الإمكان ما لم يطلب المستخدم التفصيل. " +
               "تأكد من تقديم إجابات دقيقة ومفيدة دائماً."
    };

    // دمج الـ System Prompt مع رسائل المستخدم
    const finalMessages = [systemMessage, ...messages];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'llama-3.3-70b-versatile',
        messages: finalMessages,
        temperature: temperature || 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: 'Groq API error',
          details: data
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error in chat function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal Server Error',
        details: error.message,
      }),
    };
  }
};
