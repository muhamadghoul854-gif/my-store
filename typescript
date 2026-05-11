// api/checkout/route.ts
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { productId, userId } = await req.json();
  
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{ price: product.stripe_price_id, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/products`,
    metadata: { userId, productId }
  });
  
  return Response.json({ url: session.url });
}
