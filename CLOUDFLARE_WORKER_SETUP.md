# إعداد Cloudflare Worker للـ Pro AI

## الخطوات التفصيلية لإنشاء وتفعيل Worker

### الخطوة 1: الدخول إلى لوحة Cloudflare

1. توجه إلى [Cloudflare Dashboard](https://dash.cloudflare.com)
2. اختر حسابك وتسجيل الدخول إذا لم تكن مسجلاً

### الخطوة 2: إنشاء Worker جديد

1. من القائمة الجانبية، اختر **Workers & Pages**
2. انقر على **Create Application**
3. اختر **Create a Worker**
4. اسم الـ Worker: `salah-pro-ai-api`
5. انقر **Deploy**

### الخطوة 3: نسخ كود الـ Worker

1. في محرر الـ Worker، احذف الكود الافتراضي
2. انسخ الكود من ملف `worker.js` في المستودع
3. الصق الكود بالكامل في محرر Cloudflare

### الخطوة 4: إضافة متغير البيئة (Environment Variable)

1. في صفحة الـ Worker، اختر **Settings**
2. اختر **Environment Variables**
3. انقر **Add Variable**
4. أضف المتغير التالي:
   - **Variable name:** `GROQ_API_KEY`
   - **Value:** (ضع مفتاح Groq API الخاص بك هنا)
5. انقر **Save**

### الخطوة 5: الحصول على رابط الـ Worker

1. بعد الحفظ، ستجد رابط الـ Worker في الأعلى
2. الصيغة: `https://salah-pro-ai-api.YOUR_SUBDOMAIN.workers.dev`
3. استبدل `YOUR_SUBDOMAIN` برقم حسابك على Cloudflare

### الخطوة 6: تحديث ملف index.html

1. افتح ملف `index.html` في المستودع
2. ابحث عن جميع مواضع `YOUR_SUBDOMAIN`
3. استبدلها برقم حسابك الفعلي على Cloudflare
4. مثال: `https://salah-pro-ai-api.a1b2c3d4e5f6g7h8.workers.dev`

### الخطوة 7: رفع التحديثات

```bash
git add .
git commit -m "Update Worker endpoint with actual Cloudflare subdomain"
git push origin master
```

### الخطوة 8: نشر الموقع على Cloudflare Pages

1. توجه إلى **Pages** في Cloudflare Dashboard
2. اختر مشروعك `Salah-Pro-AI`
3. اختر **Deployments**
4. انقر **Redeploy** لأحدث نسخة
5. أو قم بـ push جديد إلى المستودع لتفعيل النشر التلقائي

## اختبار الـ Worker

### اختبار من خلال الموقع

1. افتح موقعك على Cloudflare Pages
2. أرسل رسالة نصية
3. تحقق من أن الرد يأتي من Groq API عبر الـ Worker

### اختبار من خلال cURL (اختياري)

```bash
curl -X POST https://salah-pro-ai-api.YOUR_SUBDOMAIN.workers.dev \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "مرحبا"}],
    "history": []
  }'
```

## استكشاف الأخطاء

### خطأ 401 (Unauthorized)

- تحقق من أن `GROQ_API_KEY` صحيح
- تأكد من أن المفتاح لم ينته صلاحيته

### خطأ 403 (Forbidden)

- تحقق من صلاحيات الـ Worker
- تأكد من أن الـ Worker مفعل

### خطأ CORS

- تم دعم CORS في الـ Worker بشكل كامل
- إذا استمرت المشكلة، تحقق من رؤوس الطلب (Headers)

### الموقع لا يستجيب

- تحقق من أن رابط الـ Worker صحيح في `index.html`
- تأكد من أن الـ Worker مفعل في Cloudflare
- افتح أدوات المطور (F12) وتحقق من أخطاء الكونسول

## الميزات المدعومة

✅ إرسال رسائل نصية متعددة
✅ سجل محادثات كامل
✅ دعم CORS بدون قيود
✅ معالجة الأخطاء التلقائية
✅ دعم Groq API الكامل
✅ بدون كشف API Key في الكود

## الأمان

- **API Key محمي:** لا يتم إرسال المفتاح إلى المتصفح
- **CORS آمن:** يتم التعامل مع طلبات CORS بشكل آمن
- **Encryption:** جميع الاتصالات عبر HTTPS

## الدعم والمساعدة

إذا واجهت أي مشاكل، تحقق من:
1. أن الـ Worker مفعل
2. أن المتغيرات البيئية صحيحة
3. أن رابط الـ Worker محدث في `index.html`
4. أن حسابك على Cloudflare نشط

---

**تم إنشاؤه بواسطة:** Manus AI  
**التاريخ:** 2025
