-- المستخدمون
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'customer', -- 'customer' | 'admin'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- المنتجات
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT NOT NULL,
  name_ar TEXT,
  name_fr TEXT,
  desc_en TEXT, desc_ar TEXT, desc_fr TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category TEXT NOT NULL, -- 'ebook' | 'prompt' | 'template' | 'course' ...
  file_url TEXT, -- رابط مشفر في Supabase Storage
  thumbnail_url TEXT,
  download_limit INT DEFAULT 3,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- الطلبات
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  stripe_session_id TEXT UNIQUE,
  status TEXT DEFAULT 'pending', -- 'pending' | 'paid' | 'refunded'
  total DECIMAL(10,2),
  currency TEXT DEFAULT 'usd',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- عناصر الطلب
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  price DECIMAL(10,2),
  download_count INT DEFAULT 0,
  download_token TEXT UNIQUE DEFAULT gen_random_uuid()::TEXT
);

-- طلبات الاسترجاع
CREATE TABLE refunds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  user_id UUID REFERENCES users(id),
  reason TEXT,
  status TEXT DEFAULT 'pending', -- 'pending' | 'approved' | 'rejected'
  stripe_refund_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- المشتركون في النشرة
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
