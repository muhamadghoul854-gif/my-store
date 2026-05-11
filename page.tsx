"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────
type Lang = "en" | "ar" | "fr";

interface Product {
  id: string;
  emoji: string;
  bg: string;
  badge?: { label: string; color: string };
  category: { en: string; ar: string; fr: string };
  name: { en: string; ar: string; fr: string };
  description: { en: string; ar: string; fr: string };
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
}

// ─── Translations ─────────────────────────────────────────────────────────────
const t = {
  en: {
    brand: "Digimart",
    nav: { home: "Home", products: "Products", about: "About", contact: "Contact", signin: "Sign In" },
    heroBadge: "✦ Premium Digital Products",
    heroTitle: ["The ", "smarter", " way to sell\ndigital products"],
    heroSub: "High-quality eBooks, AI prompts, templates, and courses — curated for creators who value excellence.",
    heroCta: "Browse Products →",
    heroCta2: "See How It Works",
    stats: ["Products", "Customers", "Rating", "Paid Out"],
    catLabel: "BROWSE BY CATEGORY",
    catTitle: "What are you looking for?",
    featLabel: "BEST SELLERS",
    featTitle: "Featured Products",
    featSub: "Handpicked premium digital goods loved by thousands of creators",
    addCart: "Add to Cart",
    features: [
      { icon: "⚡", title: "Instant Delivery", desc: "Download your files immediately after payment is confirmed" },
      { icon: "🔒", title: "Secure Payments", desc: "Powered by Stripe — Visa & Mastercard accepted worldwide" },
      { icon: "↩️", title: "Refund Policy", desc: "3-day refund window if you encounter a technical issue" },
      { icon: "🌍", title: "Global Access", desc: "Shop in English, Arabic, or French from anywhere in the world" },
    ],
    testiLabel: "TESTIMONIALS",
    testiTitle: "Loved by creators worldwide",
    nlTitle: "Stay in the loop",
    nlSub: "Get notified about new products, exclusive deals, and creator tips",
    nlPlaceholder: "your@email.com",
    nlBtn: "Subscribe",
    footerAbout: "Premium digital products for creators, marketers, and entrepreneurs who demand excellence.",
    footerCols: [
      { title: "Products", links: ["eBooks", "AI Prompts", "Templates", "Courses"] },
      { title: "Support", links: ["FAQ", "Contact Us", "Refund Policy", "Downloads"] },
      { title: "Legal", links: ["Privacy Policy", "Terms of Use", "Cookie Policy", "GDPR"] },
    ],
    copyright: "© 2025 Digimart. All rights reserved.",
    toastCart: "added to cart!",
    toastSub: "Subscribed! Check your inbox.",
    toastEmail: "Please enter a valid email.",
    langFlag: "🇺🇸",
    langCode: "EN",
  },
  ar: {
    brand: "ديجيمارت",
    nav: { home: "الرئيسية", products: "المنتجات", about: "عنّا", contact: "تواصل", signin: "تسجيل الدخول" },
    heroBadge: "✦ منتجات رقمية مميزة",
    heroTitle: ["الطريقة ", "الأذكى", " لبيع\nالمنتجات الرقمية"],
    heroSub: "كتب إلكترونية، برومبتات AI، قوالب، ودورات عالية الجودة — مختارة بعناية للمبدعين الطموحين.",
    heroCta: "← تصفح المنتجات",
    heroCta2: "كيف يعمل الموقع",
    stats: ["منتج", "عميل", "تقييم", "أرباح موزعة"],
    catLabel: "تصفح حسب الفئة",
    catTitle: "ماذا تبحث عن؟",
    featLabel: "الأكثر مبيعاً",
    featTitle: "المنتجات المميزة",
    featSub: "منتجات رقمية مختارة يحبها آلاف المبدعين حول العالم",
    addCart: "أضف للسلة",
    features: [
      { icon: "⚡", title: "توصيل فوري", desc: "حمّل ملفاتك فور تأكيد الدفع مباشرة" },
      { icon: "🔒", title: "دفع آمن", desc: "مدعوم بـ Stripe — فيزا وماستركارد عالمياً" },
      { icon: "↩️", title: "سياسة الاسترجاع", desc: "نافذة استرجاع 3 أيام في حال وجود مشكلة تقنية" },
      { icon: "🌍", title: "وصول عالمي", desc: "تسوق بالعربية أو الإنجليزية أو الفرنسية من أي مكان" },
    ],
    testiLabel: "آراء العملاء",
    testiTitle: "يحبنا المبدعون حول العالم",
    nlTitle: "ابقَ على اطلاع",
    nlSub: "احصل على إشعارات بالمنتجات الجديدة والعروض الحصرية ونصائح المبدعين",
    nlPlaceholder: "بريدك الإلكتروني",
    nlBtn: "اشترك",
    footerAbout: "منتجات رقمية مميزة للمبدعين والمسوقين ورواد الأعمال الطموحين.",
    footerCols: [
      { title: "المنتجات", links: ["كتب إلكترونية", "برومبتات AI", "قوالب", "دورات"] },
      { title: "الدعم", links: ["الأسئلة الشائعة", "تواصل معنا", "سياسة الاسترجاع", "التحميلات"] },
      { title: "القانوني", links: ["سياسة الخصوصية", "شروط الاستخدام", "سياسة الكوكيز", "GDPR"] },
    ],
    copyright: "© 2025 ديجيمارت. جميع الحقوق محفوظة.",
    toastCart: "تمت الإضافة إلى السلة!",
    toastSub: "تم الاشتراك! تحقق من بريدك.",
    toastEmail: "أدخل بريداً إلكترونياً صحيحاً.",
    langFlag: "🇸🇦",
    langCode: "ع",
  },
  fr: {
    brand: "Digimart",
    nav: { home: "Accueil", products: "Produits", about: "À propos", contact: "Contact", signin: "Connexion" },
    heroBadge: "✦ Produits Numériques Premium",
    heroTitle: ["La façon ", "intelligente", " de vendre\ndu numérique"],
    heroSub: "eBooks, prompts IA, templates et cours de haute qualité — sélectionnés pour les créateurs exigeants.",
    heroCta: "Voir les produits →",
    heroCta2: "Comment ça marche",
    stats: ["Produits", "Clients", "Note", "Versé"],
    catLabel: "PARCOURIR PAR CATÉGORIE",
    catTitle: "Que cherchez-vous ?",
    featLabel: "MEILLEURES VENTES",
    featTitle: "Produits en vedette",
    featSub: "Des produits numériques premium adorés par des milliers de créateurs",
    addCart: "Ajouter au panier",
    features: [
      { icon: "⚡", title: "Livraison instantanée", desc: "Téléchargez vos fichiers dès confirmation du paiement" },
      { icon: "🔒", title: "Paiements sécurisés", desc: "Propulsé par Stripe — Visa & Mastercard acceptés partout" },
      { icon: "↩️", title: "Politique de remboursement", desc: "Fenêtre de 3 jours en cas de problème technique" },
      { icon: "🌍", title: "Accès mondial", desc: "Achetez en français, arabe ou anglais, depuis n'importe où" },
    ],
    testiLabel: "TÉMOIGNAGES",
    testiTitle: "Adoré par les créateurs du monde entier",
    nlTitle: "Restez informé",
    nlSub: "Recevez des alertes sur les nouveaux produits et offres exclusives",
    nlPlaceholder: "votre@email.com",
    nlBtn: "S'abonner",
    footerAbout: "Produits numériques premium pour créateurs, marketeurs et entrepreneurs.",
    footerCols: [
      { title: "Produits", links: ["eBooks", "Prompts IA", "Templates", "Cours"] },
      { title: "Support", links: ["FAQ", "Contactez-nous", "Remboursements", "Téléchargements"] },
      { title: "Légal", links: ["Confidentialité", "Conditions d'utilisation", "Cookies", "GDPR"] },
    ],
    copyright: "© 2025 Digimart. Tous droits réservés.",
    toastCart: "ajouté au panier !",
    toastSub: "Abonné ! Vérifiez votre boîte mail.",
    toastEmail: "Veuillez entrer un email valide.",
    langFlag: "🇫🇷",
    langCode: "FR",
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const categories = [
  { icon: "📘", key: "ebooks", count: 142, name: { en: "eBooks", ar: "كتب إلكترونية", fr: "eBooks" } },
  { icon: "🤖", key: "prompts", count: 89, name: { en: "AI Prompts", ar: "برومبتات AI", fr: "Prompts IA" } },
  { icon: "📐", key: "templates", count: 216, name: { en: "Templates", ar: "قوالب", fr: "Templates" } },
  { icon: "🎓", key: "courses", count: 54, name: { en: "Courses", ar: "دورات", fr: "Cours" } },
  { icon: "🎨", key: "canva", count: 198, name: { en: "Canva Kits", ar: "قوالب كانفا", fr: "Kits Canva" } },
  { icon: "📋", key: "notion", count: 77, name: { en: "Notion", ar: "نوشن", fr: "Notion" } },
  { icon: "📱", key: "social", count: 134, name: { en: "Social Media", ar: "سوشيال ميديا", fr: "Réseaux sociaux" } },
  { icon: "📁", key: "files", count: 91, name: { en: "Files & Assets", ar: "ملفات وأصول", fr: "Fichiers & Assets" } },
];

const products: Product[] = [
  {
    id: "1", emoji: "🤖", bg: "#f0f7ff",
    badge: { label: "NEW", color: "#2563eb" },
    category: { en: "AI Prompts", ar: "برومبتات AI", fr: "Prompts IA" },
    name: { en: "Ultimate ChatGPT Prompt Pack", ar: "حزمة برومبتات ChatGPT الشاملة", fr: "Pack Ultime de Prompts ChatGPT" },
    description: { en: "500+ elite prompts for marketers, designers & developers", ar: "أكثر من 500 برومبت احترافي للمسوقين والمصممين", fr: "500+ prompts d'élite pour marketeurs et designers" },
    price: 29, originalPrice: 49, rating: 5, reviews: 312,
  },
  {
    id: "2", emoji: "📘", bg: "#fff7ed",
    badge: { label: "HOT", color: "#ef4444" },
    category: { en: "eBook", ar: "كتاب إلكتروني", fr: "eBook" },
    name: { en: "Digital Income Mastery", ar: "إتقان الدخل الرقمي", fr: "Maîtriser les Revenus Numériques" },
    description: { en: "The complete guide to building a 6-figure digital product business", ar: "الدليل الكامل لبناء عمل رقمي بدخل 6 أرقام", fr: "Le guide complet pour bâtir un business numérique à 6 chiffres" },
    price: 19, rating: 5, reviews: 187,
  },
  {
    id: "3", emoji: "🎨", bg: "#f0fdf4",
    category: { en: "Canva Templates", ar: "قوالب كانفا", fr: "Templates Canva" },
    name: { en: "Luxury Brand Identity Kit", ar: "حزمة هوية العلامة التجارية الفاخرة", fr: "Kit Identité de Marque Luxe" },
    description: { en: "120 premium Canva templates for modern luxury brands", ar: "120 قالب كانفا مميز للعلامات التجارية الفاخرة", fr: "120 templates Canva premium pour marques de luxe" },
    price: 24, originalPrice: 39, rating: 4, reviews: 94,
  },
  {
    id: "4", emoji: "📋", bg: "#fdf4ff",
    category: { en: "Notion Templates", ar: "قوالب نوشن", fr: "Templates Notion" },
    name: { en: "Second Brain Productivity System", ar: "نظام الدماغ الثاني للإنتاجية", fr: "Système Second Cerveau Productivité" },
    description: { en: "Full Notion workspace setup for ultimate productivity", ar: "إعداد كامل لمساحة عمل نوشن لأقصى إنتاجية", fr: "Configuration complète Notion pour une productivité maximale" },
    price: 34, rating: 5, reviews: 421,
  },
  {
    id: "5", emoji: "📱", bg: "#fff1f0",
    category: { en: "Social Media", ar: "سوشيال ميديا", fr: "Réseaux sociaux" },
    name: { en: "Instagram Growth Pack 2025", ar: "حزمة نمو انستغرام 2025", fr: "Pack Croissance Instagram 2025" },
    description: { en: "300 post templates, captions, and strategy guide", ar: "300 قالب منشور، تعليقات، ودليل استراتيجية", fr: "300 templates de posts, légendes et guide stratégique" },
    price: 27, originalPrice: 45, rating: 5, reviews: 256,
  },
  {
    id: "6", emoji: "🎓", bg: "#f5f3ff",
    category: { en: "Course", ar: "دورة تدريبية", fr: "Cours" },
    name: { en: "Freelance Design Masterclass", ar: "ماستر كلاس التصميم الحر", fr: "Masterclass Design Freelance" },
    description: { en: "Build a profitable freelance career with 8+ hours of content", ar: "ابنِ مسيرة مهنية مربحة مع أكثر من 8 ساعات محتوى", fr: "Bâtissez une carrière freelance rentable avec +8h de contenu" },
    price: 79, rating: 4, reviews: 143,
  },
];

const testimonials = [
  {
    quote: { en: '"The Notion template completely changed how I manage my business. Worth every penny — I was up and running in 20 minutes."', ar: '"قالب نوشن غيّر طريقة إدارتي لعملي تماماً. يستحق كل سنت — كنت جاهزاً في 20 دقيقة فقط."', fr: '"Le template Notion a complètement changé ma façon de gérer mon activité. Je le recommande vivement!"' },
    name: "Sarah M.", role: "Freelance Designer, NYC", initials: "SM", color: "#2563eb",
  },
  {
    quote: { en: '"Best AI prompt pack I\'ve ever bought. Saved me hours of work and my content quality went through the roof."', ar: '"أفضل حزمة AI Prompts اشتريتها على الإطلاق. وفرت عليّ ساعات من العمل وتضاعفت جودة محتواي."', fr: '"Le meilleur pack de prompts IA que j\'aie jamais acheté. Économisé des heures de travail!"' },
    name: "Karim A.", role: "Content Creator, Dubai", initials: "KA", color: "#0f6e56",
  },
  {
    quote: { en: '"The Canva templates are absolutely beautiful. The quality far exceeds the price. Highly recommend to any brand designer."', ar: '"قوالب كانفا رائعة جداً. الجودة تفوق السعر بكثير. أنصح بها كل مصمم علامات تجارية."', fr: '"Les templates Canva sont absolument magnifiques. La qualité dépasse largement le prix. Je recommande!"' },
    name: "Léa B.", role: "Brand Strategist, Paris", initials: "LB", color: "#533ab7",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const Stars = ({ count, rating }: { count: number; rating: number }) => (
  <div className="flex items-center gap-1">
    <div className="flex">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= rating ? "text-amber-400" : "text-gray-200"} style={{ fontSize: 13 }}>★</span>
      ))}
    </div>
    <span className="text-xs text-gray-400">({count})</span>
  </div>
);

// ─── Page Component ───────────────────────────────────────────────────────────
export default function HomePage() {
  const [lang, setLang] = useState<Lang>("en");
  const [langOpen, setLangOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<{ msg: string; show: boolean }>({ msg: "", show: false });
  const [cartCount, setCartCount] = useState(0);

  const tx = t[lang];
  const isRtl = lang === "ar";

  // Auto-detect language
  useEffect(() => {
    const browserLang = navigator.language || "";
    if (browserLang.startsWith("ar")) setLang("ar");
    else if (browserLang.startsWith("fr")) setLang("fr");
    else setLang("en");
  }, []);

  // Apply RTL
  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  const showToast = (msg: string) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast((p) => ({ ...p, show: false })), 2800);
  };

  const addToCart = (product: Product) => {
    setCartCount((c) => c + 1);
    showToast(`${product.name[lang]} — ${tx.toastCart}`);
  };

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) { showToast(tx.toastEmail); return; }
    showToast(tx.toastSub);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] font-sans" dir={isRtl ? "rtl" : "ltr"}>

      {/* ── TOAST ── */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-xl flex items-center gap-2"
          >
            <span className="text-green-400">✓</span> {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── LANG POPUP ── */}
      <AnimatePresence>
        {langOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed top-20 right-6 z-50 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 min-w-[170px]"
          >
            {(["en", "ar", "fr"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setLangOpen(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm flex items-center gap-3 transition-colors ${lang === l ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
              >
                <span>{t[l].langFlag}</span>
                <span>{l === "en" ? "English" : l === "ar" ? "العربية" : "Français"}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 px-6 lg:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-blue-600 text-xl font-bold select-none">◆</span>
          <span className="font-playfair text-xl font-semibold text-gray-900 tracking-tight">{tx.brand}</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {Object.entries(tx.nav).filter(([k]) => k !== "signin").map(([key, label]) => (
            <a key={key} href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{label}</a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Cart */}
          <button className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors">
            <span className="text-lg">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Language selector */}
          <button
            onClick={() => setLangOpen((o) => !o)}
            className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-600 text-sm px-3 py-1.5 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-all"
          >
            <span>{tx.langFlag}</span>
            <span className="font-medium">{tx.langCode}</span>
            <span className="text-xs opacity-60">▾</span>
          </button>

          <button className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            {tx.nav.signin}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f5f0e8] via-white to-[#dbeafe] px-6 lg:px-10 pt-20 pb-16 text-center">
        {/* Decorative blob */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-medium px-4 py-1.5 rounded-full border border-blue-100 mb-6">
            {tx.heroBadge}
          </div>

          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight max-w-3xl mx-auto mb-5" style={{ letterSpacing: "-0.5px" }}>
            {tx.heroTitle[0]}
            <em className="text-blue-600 not-italic">{tx.heroTitle[1]}</em>
            {tx.heroTitle[2].split("\n").map((line, i) => (
              <span key={i}>{i === 1 ? <br /> : null}{line}</span>
            ))}
          </h1>

          <p className="text-base text-gray-500 max-w-lg mx-auto mb-8 leading-relaxed font-light">
            {tx.heroSub}
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <motion.button
              whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(37,99,235,0.2)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-900 text-white text-sm font-medium px-7 py-3.5 rounded-xl hover:bg-blue-600 transition-colors"
            >
              {tx.heroCta}
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-gray-800 text-sm font-medium px-7 py-3.5 rounded-xl border border-gray-200 hover:border-gray-800 transition-colors"
            >
              {tx.heroCta2}
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-10 mt-14 pt-8 border-t border-black/5"
        >
          {[["2,400+", tx.stats[0]], ["18k+", tx.stats[1]], ["4.9★", tx.stats[2]], ["$1.2M", tx.stats[3]]].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="font-playfair text-3xl font-semibold text-gray-900">{num}</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-medium text-blue-600 uppercase tracking-widest mb-2">{tx.catLabel}</p>
          <h2 className="font-playfair text-3xl font-semibold text-gray-900">{tx.catTitle}</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
              className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center gap-2 hover:border-blue-200 transition-all cursor-pointer"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">{cat.name[lang]}</span>
              <span className="text-[10px] text-gray-400">{cat.count}</span>
            </motion.button>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <hr className="border-gray-100" />
      </div>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-medium text-blue-600 uppercase tracking-widest mb-2">{tx.featLabel}</p>
          <h2 className="font-playfair text-3xl font-semibold text-gray-900 mb-2">{tx.featTitle}</h2>
          <p className="text-sm text-gray-400 font-light">{tx.featSub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.09)" }}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer transition-all"
            >
              {/* Thumbnail */}
              <div className="h-40 flex items-center justify-center relative" style={{ background: product.bg }}>
                {product.badge && (
                  <span
                    className="absolute top-3 left-3 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide"
                    style={{ background: product.badge.color }}
                  >
                    {product.badge.label}
                  </span>
                )}
                <span className="text-5xl">{product.emoji}</span>
              </div>

              {/* Body */}
              <div className="p-5">
                <p className="text-[11px] font-medium text-blue-600 uppercase tracking-wider mb-1.5">{product.category[lang]}</p>
                <h3 className="font-playfair text-base font-medium text-gray-900 mb-2 leading-snug">{product.name[lang]}</h3>
                <Stars count={product.reviews} rating={product.rating} />
                <p className="text-xs text-gray-400 leading-relaxed mt-2 mb-4">{product.description[lang]}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    {product.originalPrice && (
                      <span className="text-xs text-gray-300 line-through">${product.originalPrice}</span>
                    )}
                    <span className="text-lg font-semibold text-gray-900">${product.price}</span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product)}
                    className="bg-gray-900 text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {tx.addCart}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES STRIP ── */}
      <section className="max-w-6xl mx-auto px-6 lg:px-10 mb-16">
        <div className="bg-white border border-gray-100 rounded-2xl p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {tx.features.map((feat) => (
              <div key={feat.title} className="flex gap-4">
                <div className="w-10 h-10 min-w-[40px] bg-blue-50 rounded-xl flex items-center justify-center text-xl">
                  {feat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">{feat.title}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#f5f0e8] py-16 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-medium text-blue-600 uppercase tracking-widest mb-2">{tx.testiLabel}</p>
            <h2 className="font-playfair text-3xl font-semibold text-gray-900">{tx.testiTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((testi) => (
              <motion.div
                key={testi.name}
                whileHover={{ y: -3 }}
                className="bg-white border border-[#e8e0d0] rounded-2xl p-6 transition-all"
              >
                <p className="text-sm text-gray-500 leading-relaxed mb-5 italic">{testi.quote[lang]}</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                    style={{ background: testi.color }}
                  >
                    {testi.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{testi.name}</p>
                    <p className="text-xs text-gray-400">{testi.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="bg-gray-900 text-white py-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-3xl font-semibold mb-3">{tx.nlTitle}</h2>
          <p className="text-sm text-white/50 mb-8 max-w-sm mx-auto">{tx.nlSub}</p>
          <div className="flex gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              placeholder={tx.nlPlaceholder}
              className="flex-1 bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors"
            />
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSubscribe}
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-3 rounded-xl transition-colors whitespace-nowrap"
            >
              {tx.nlBtn}
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-gray-100 px-6 lg:px-10 pt-12 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-blue-600 font-bold text-lg">◆</span>
                <span className="font-playfair text-lg font-semibold text-gray-900">{tx.brand}</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-[220px]">{tx.footerAbout}</p>
            </div>
            {tx.footerCols.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-medium text-gray-800 mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-6 flex flex-wrap justify-between items-center gap-3">
            <p className="text-xs text-gray-400">{tx.copyright}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-300 mr-1">Secured by</span>
              {["VISA", "MC", "🔒 Stripe"].map((p) => (
                <span key={p} className="bg-gray-50 border border-gray-100 rounded text-xs font-medium text-gray-500 px-2 py-1">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

