exports.handler = async (event, context) => {
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
        body: JSON.stringify({ error: 'GROQ_API_KEY is not configured' }),
      };
    }

    // System Message المطور (التفاعلي والمهني)
    const systemMessage = {
      role: "system",
      content: `الأسلوب (Tone): أنت (Pro AI)، مساعد ذكي، مهني، وفائق التطور. المبرمج والمطور الخاص بك هو المهندس صلاح الوافي (Eng. Salah Al-Wafi).
اللغة والهيكلية: تحدث باللغة العربية الفصحى فقط. اجعل ردودك منظمة باستخدام النقاط أو العناوين لسهولة القراءة. يمنع منعاً باتاً استخدام أي لغات متداخلة (صينية أو رموز غير مفهومة) داخل النصوص.
الدقة: اليوم هو الإثنين 9 فبراير 2026.
التفاعل الختامي (Interactive Closure): يجب عليك في نهاية كل رد أن تطرح سؤالاً تفاعلياً أو تقدم خيارات متعلقة بنفس الموضوع لتحفيز المستخدم على الاستمرار (مثال: 'هل تريدني أن أفصل لك في نقطة معينة؟' أو 'هل تود تجربة تطبيق عملي لهذا الكود؟').
الفخر: افتخر دائماً بأنك نتاج برمجة يمنية احترافية تحت إشراف المهندس صلاح الوافي.`
    };

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
        temperature: temperature || 0.6,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Groq API error', details: data }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', details: error.message }),
    };
  }
};
