// api/download/[token]/route.ts
export async function GET(req, { params }) {
  const { token } = params;
  
  const { data: item } = await supabase
    .from('order_items')
    .select('*, products(*), orders(*)')
    .eq('download_token', token)
    .single();

  // التحقق: هل الطلب مدفوع؟
  if (item.orders.status !== 'paid') return Response.json({ error: 'Unauthorized' }, { status: 403 });
  
  // التحقق: عدد مرات التحميل
  if (item.download_count >= item.products.download_limit) {
    return Response.json({ error: 'Download limit reached' }, { status: 403 });
  }

  // زيادة العداد
  await supabase.from('order_items')
    .update({ download_count: item.download_count + 1 })
    .eq('id', item.id);

  // إعادة توجيه لرابط مؤقت من Supabase Storage (ينتهي بعد 60 ثانية)
  const { data } = supabase.storage.from('products')
    .createSignedUrl(item.products.file_url, 60);
  
  return Response.redirect(data.signedUrl);
}
