// api/stripe/webhook/route.ts
export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')!;
  const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // 1. إنشاء order في Supabase
    // 2. توليد download_token مشفر
    // 3. إرسال Email بالرابط
  }
}
