# 1. رفع المشروع على GitHub
git push origin main

# 2. ربط Vercel
vercel --prod

# 3. إضافة متغيرات البيئة في Vercel Dashboard:
# SUPABASE_URL, SUPABASE_ANON_KEY, STRIPE_SECRET_KEY...

# 4. تفعيل Stripe Webhook على:
# https://dashboard.stripe.com/webhooks
# → Add endpoint: https://yoursite.com/api/stripe/webhook
# → Events: checkout.session.completed
