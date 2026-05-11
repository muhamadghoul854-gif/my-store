/app
  /[locale]           ← EN / AR / FR routing
    /page.tsx          ← الصفحة الرئيسية
    /products
      /page.tsx
      /[slug]/page.tsx
    /checkout/page.tsx
    /orders/page.tsx
    /auth/page.tsx
    /refund-policy/page.tsx
    /contact/page.tsx
    /faq/page.tsx
    /admin
      /dashboard/page.tsx
      /products/page.tsx
      /orders/page.tsx
      /refunds/page.tsx
/api
  /stripe/webhook     ← تأكيد الدفع + تسليم المنتج
  /download/[token]   ← رابط تحميل محمي
  /refund/request
/lib
  /supabase.ts
  /stripe.ts
  /i18n.ts
