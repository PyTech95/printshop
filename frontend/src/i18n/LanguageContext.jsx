import React, { createContext, useContext, useEffect, useState } from "react";

const translations = {
  en: {
    dir: "ltr",
    nav: {
      home: "Home",
      about: "About",
      products: "Products",
      industries: "Industries",
      why: "Why Choose Us",
      gallery: "Gallery",
      faq: "FAQ",
      contact: "Contact",
      quote: "Request a Quote",
      allProducts: "All Products & Services",
      marketAreas: "Market Areas",
    },
    common: {
      exploreProducts: "Explore Products",
      getQuote: "Get a Quote",
      enquireNow: "Enquire Now",
      learnMore: "Learn More",
      viewAll: "View All",
      sendRequest: "Send Quote Request",
      sending: "Sending...",
      callUs: "Call Us",
      whatsapp: "WhatsApp",
      backToProducts: "Back to Products",
      readMore: "Read More",
      alwaysOnTime: "Always On Time",
    },
    hero: {
      badge: "Dubai • Labelling Solutions",
      l1: "Labels, Printing &",
      l2: "Packaging",
      l3: "Solutions",
      sub: "From barcode labels and asset tags to large-format banners and custom packaging — My Labels UAE delivers precision printing with the promise that keeps us moving:",
      stat1: "Always On Time",
      stat1s: "Same-day options",
      stat3: "UAE-Wide Delivery",
      stat3s: "Fast dispatch",
      years: "Years of Precision",
    },
    home: {
      trustedTitle: "Trusted by businesses across the UAE",
      productsOverline: "Products & Services",
      productsTitle: "Everything you need to label, brand & pack",
      productsSub: "A complete range of printing and packaging solutions, manufactured in-house and customised to your exact requirements.",
      manifestoOverline: "The My Labels Standard",
      manifestoTitle: "Precision is a promise, not a coincidence",
      ch1t: "In-house Manufacturing",
      ch1d: "We control every stage — from material to print to finish — so quality never leaves our hands.",
      ch2t: "Always On Time",
      ch2d: "Reliable turnaround with same-day options. Your deadline is the one we work back from.",
      ch3t: "Precision & Innovation",
      ch3d: "Latest offset, digital and thermal technology for crisp, consistent, scannable output.",
      ch4t: "Eco-Conscious",
      ch4d: "Secure, sustainable materials and recyclable stocks across our packaging range.",
      industriesOverline: "Industries We Serve",
      industriesTitle: "Solutions built for your sector",
      industriesSub: "Tailored labelling, printing and packaging for the industries that power the UAE economy.",
      ctaTitle: "Let's bring your brand to life",
      ctaSub: "Tell us what you need and our team will respond with pricing and lead times — fast.",
    },
    about: {
      overline: "About My Labels",
      title: "A trusted printing & packaging partner in Dubai",
      p1: "My Labels Packaging Materials Manufacturing L.L.C. is a Dubai-based manufacturer specialising in label, offset and digital printing. We combine precision technology with a commitment to quality, competitive pricing and on-time delivery.",
      p2: "From a single roll of labels to full packaging production lines, we help businesses across the UAE brand, label and package their products with confidence — always on time.",
      missionT: "Our Mission",
      missionD: "To deliver precise, high-quality printing and packaging that helps brands stand out — reliably and on time, every time.",
      visionT: "Our Vision",
      visionD: "To be the UAE's most trusted partner for labels, printing and packaging manufacturing.",
      valuesT: "Our Values",
      v1: "Quality Assurance",
      v2: "Competitive Prices",
      v3: "Satisfied Customers",
      v4: "Dedicated Support",
      basedIn: "Based in",
    },
    why: {
      overline: "Why Choose Us",
      title: "Precision you can trust, delivery you can rely on",
      sub: "The reasons UAE businesses choose My Labels for their printing and packaging.",
      r1t: "Quality Assurance", r1d: "Rigorous checks on every batch for crisp, consistent output.",
      r2t: "Competitive Prices", r2d: "Direct-from-manufacturer pricing with no hidden costs.",
      r3t: "Always On Time", r3d: "Reliable turnaround with same-day options available.",
      r4t: "Satisfied Customers", r4d: "Trusted by businesses across the UAE for repeat orders.",
      r5t: "Precision & Innovation", r5d: "Latest offset & digital technology for fine detail.",
      r6t: "Dedicated Support", r6d: "Expert guidance from your first enquiry to delivery.",
    },
    products: {
      overline: "Products & Services",
      title: "Our complete range",
      sub: "Explore our full catalogue of printing and packaging solutions.",
      keyFeatures: "Key Features",
      applications: "Applications",
      relatedTitle: "Other Products & Services",
      provide: "What We Provide",
      useCases: "Use Cases",
    },
    market: {
      overline: "Market Areas",
      title: "Areas We Serve Across the UAE",
      sub: "Professional printing, labels, promotional products, apparel printing and large-format solutions across key business and commercial areas in the UAE.",
      cta: "Need printing services in this area?",
      ctaBtn: "Get a Quote",
      note: "These are presented as target service and market areas we serve — not physical branch locations.",
    },
    industriesPage: {
      overline: "Industries",
      title: "Purpose-built for every sector",
      sub: "We understand the labelling, printing and packaging demands of the industries we serve.",
    },
    gallery: {
      overline: "Our Work",
      title: "A showcase of precision",
      sub: "A glimpse of the labels, packaging and print we produce for brands across the UAE.",
      all: "All Work",
      labels: "Labels",
      warehouse: "Warehouse",
      packaging: "Packaging",
      apparel: "Apparel",
      largeformat: "Large Format",
      engraving: "Engraving",
      empty: "Nothing in this category yet.",
    },
    showreel: {
      overline: "Showreel",
      title: "Print that speaks for itself",
      sub: "A live strip of recent labels, packaging, apparel and signage work. Tap any piece to inspect the detail.",
    },
    faq: {
      overline: "FAQ",
      title: "Frequently asked questions",
      sub: "Everything you need to know before you order.",
      items: [
        { q: "What is your typical turnaround time?", a: "Most orders are delivered within 2–4 working days, with same-day and express options available for many products. Share your deadline and we'll work back from it." },
        { q: "Do you offer custom sizes and shapes?", a: "Yes. All our labels, boxes and packaging are fully customisable — any size, shape, material and finish to match your product and brand." },
        { q: "Is there a minimum order quantity?", a: "Minimums vary by product. We handle everything from small speciality runs to high-volume production. Contact us for exact quantities and pricing." },
        { q: "Which printers are your barcode ribbons compatible with?", a: "Our wax, resin and wax-resin ribbons are compatible with all major thermal transfer printer brands. Tell us your printer model and we'll match the right ribbon." },
        { q: "Do you deliver across the UAE?", a: "Yes, we deliver throughout the UAE from our Dubai facility, with fast dispatch and reliable logistics." },
        { q: "Can you help with design?", a: "Absolutely. Our team can guide you on materials, finishes and artwork setup to get the best result from your files." },
      ],
    },
    contact: {
      overline: "Request a Quote",
      title: "Let's talk about your project",
      sub: "Tell us what you need and our team will get back to you with pricing and lead times. Prefer to chat? Call or WhatsApp us directly.",
      form: {
        name: "Full Name", company: "Company", email: "Email", phone: "Phone",
        product: "Product / Service", quantity: "Estimated Quantity", message: "Message",
        namePh: "Your name", companyPh: "Company name", emailPh: "you@company.com",
        phonePh: "+971 ...", quantityPh: "e.g. 5000 units", messagePh: "Tell us about sizes, materials, finishes, deadlines...",
        selectProduct: "Select a product", other: "Other / General Enquiry",
        required: "Please fill in your name, email, phone and product.",
        success: "Thank you! Your quote request has been received. Opening WhatsApp so you can send it to us too.",
        error: "Something went wrong. Please try again or WhatsApp us.",
        alsoWhatsapp: "Also send this enquiry via WhatsApp",
      },
    },
    footer: {
      tagline: "Precision label, offset & digital printing plus packaging manufacturing in Dubai — Always On Time.",
      products: "Products",
      company: "Company",
      getInTouch: "Get in Touch",
      rights: "All rights reserved.",
      admin: "Login Admin",
    },
  },
  ar: {
    dir: "rtl",
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      products: "المنتجات",
      industries: "القطاعات",
      why: "لماذا تختارنا",
      gallery: "معرض الأعمال",
      faq: "الأسئلة الشائعة",
      contact: "اتصل بنا",
      quote: "اطلب عرض سعر",
      allProducts: "جميع المنتجات والخدمات",
      marketAreas: "مناطق الخدمة",
    },
    common: {
      exploreProducts: "استكشف المنتجات",
      getQuote: "احصل على عرض سعر",
      enquireNow: "استفسر الآن",
      learnMore: "اعرف المزيد",
      viewAll: "عرض الكل",
      sendRequest: "إرسال طلب عرض السعر",
      sending: "جارٍ الإرسال...",
      callUs: "اتصل بنا",
      whatsapp: "واتساب",
      backToProducts: "العودة للمنتجات",
      readMore: "اقرأ المزيد",
      alwaysOnTime: "دائماً في الوقت المحدد",
    },
    hero: {
      badge: "دبي • حلول الملصقات",
      l1: "الملصقات والطباعة",
      l2: "وحلول",
      l3: "التغليف",
      sub: "من ملصقات الباركود وبطاقات الأصول إلى اللافتات كبيرة الحجم والتغليف المخصص — تقدّم ماي لِيبلز طباعة دقيقة مع الوعد الذي يبقينا في المقدمة:",
      stat1: "دائماً في الوقت",
      stat1s: "خيارات في نفس اليوم",
      stat3: "توصيل بكل الإمارات",
      stat3s: "شحن سريع",
      years: "سنوات من الدقة",
    },
    home: {
      trustedTitle: "موثوق من الشركات في جميع أنحاء الإمارات",
      productsOverline: "المنتجات والخدمات",
      productsTitle: "كل ما تحتاجه للملصقات والعلامة التجارية والتغليف",
      productsSub: "مجموعة كاملة من حلول الطباعة والتغليف، مُصنّعة داخلياً ومخصصة حسب متطلباتك بالضبط.",
      manifestoOverline: "معيار ماي لِيبلز",
      manifestoTitle: "الدقة وعد، وليست صدفة",
      ch1t: "تصنيع داخلي",
      ch1d: "نتحكم في كل مرحلة — من المواد إلى الطباعة إلى التشطيب — حتى لا تغادر الجودة أيدينا.",
      ch2t: "دائماً في الوقت المحدد",
      ch2d: "إنجاز موثوق مع خيارات في نفس اليوم. موعدك النهائي هو ما نعمل وفقه.",
      ch3t: "الدقة والابتكار",
      ch3d: "أحدث تقنيات الأوفست والرقمية والحرارية لإنتاج واضح ومتسق وقابل للمسح.",
      ch4t: "صديق للبيئة",
      ch4d: "مواد آمنة ومستدامة وقابلة لإعادة التدوير عبر مجموعة التغليف لدينا.",
      industriesOverline: "القطاعات التي نخدمها",
      industriesTitle: "حلول مصممة لقطاعك",
      industriesSub: "ملصقات وطباعة وتغليف مخصص للقطاعات التي تقود اقتصاد الإمارات.",
      ctaTitle: "لنُبرز علامتك التجارية",
      ctaSub: "أخبرنا بما تحتاجه وسيرد فريقنا بالأسعار ومواعيد التسليم — بسرعة.",
    },
    about: {
      overline: "عن ماي لِيبلز",
      title: "شريك موثوق للطباعة والتغليف في دبي",
      p1: "ماي لِيبلز لتصنيع مواد التغليف ذ.م.م هي شركة تصنيع مقرها دبي متخصصة في طباعة الملصقات والأوفست والرقمية. نجمع بين التقنية الدقيقة والالتزام بالجودة والأسعار التنافسية والتسليم في الوقت المحدد.",
      p2: "من لفة ملصقات واحدة إلى خطوط إنتاج تغليف كاملة، نساعد الشركات في جميع أنحاء الإمارات على وسم وتغليف منتجاتها بثقة — دائماً في الوقت المحدد.",
      missionT: "مهمتنا",
      missionD: "تقديم طباعة وتغليف دقيق وعالي الجودة يساعد العلامات على التميّز — بموثوقية وفي الوقت المحدد في كل مرة.",
      visionT: "رؤيتنا",
      visionD: "أن نكون الشريك الأكثر ثقة في الإمارات للملصقات والطباعة وتصنيع التغليف.",
      valuesT: "قيمنا",
      v1: "ضمان الجودة",
      v2: "أسعار تنافسية",
      v3: "عملاء راضون",
      v4: "دعم مخصص",
      basedIn: "مقرنا في",
    },
    why: {
      overline: "لماذا تختارنا",
      title: "دقة تثق بها وتسليم تعتمد عليه",
      sub: "الأسباب التي تجعل شركات الإمارات تختار ماي لِيبلز لطباعتها وتغليفها.",
      r1t: "ضمان الجودة", r1d: "فحوصات صارمة على كل دفعة لإنتاج واضح ومتسق.",
      r2t: "أسعار تنافسية", r2d: "أسعار مباشرة من المصنع دون تكاليف خفية.",
      r3t: "دائماً في الوقت", r3d: "إنجاز موثوق مع خيارات في نفس اليوم.",
      r4t: "عملاء راضون", r4d: "موثوق من الشركات في الإمارات للطلبات المتكررة.",
      r5t: "الدقة والابتكار", r5d: "أحدث تقنيات الأوفست والرقمية للتفاصيل الدقيقة.",
      r6t: "دعم مخصص", r6d: "إرشاد خبير من أول استفسار حتى التسليم.",
    },
    products: {
      overline: "المنتجات والخدمات",
      title: "مجموعتنا الكاملة",
      sub: "استكشف كتالوجنا الكامل لحلول الطباعة والتغليف.",
      keyFeatures: "الميزات الرئيسية",
      applications: "التطبيقات",
      relatedTitle: "منتجات وخدمات أخرى",
      provide: "ما نقدمه",
      useCases: "الاستخدامات",
    },
    market: {
      overline: "مناطق الخدمة",
      title: "المناطق التي نخدمها في الإمارات",
      sub: "طباعة احترافية وملصقات ومنتجات ترويجية وطباعة ملابس وحلول كبيرة الحجم في أهم المناطق التجارية بالإمارات.",
      cta: "تحتاج خدمات طباعة في هذه المنطقة؟",
      ctaBtn: "احصل على عرض سعر",
      note: "تُعرض كمناطق خدمة وأسواق مستهدفة نخدمها — وليست مواقع فروع فعلية.",
    },
    industriesPage: {
      overline: "القطاعات",
      title: "مصمم خصيصاً لكل قطاع",
      sub: "نفهم متطلبات الملصقات والطباعة والتغليف للقطاعات التي نخدمها.",
    },
    gallery: {
      overline: "أعمالنا",
      title: "عرض للدقة",
      sub: "لمحة عن الملصقات والتغليف والطباعة التي ننتجها للعلامات في الإمارات.",
      all: "كل الأعمال",
      labels: "الملصقات",
      warehouse: "المستودعات",
      packaging: "التغليف",
      apparel: "الملابس",
      largeformat: "الطباعة الكبيرة",
      engraving: "النقش",
      empty: "لا يوجد شيء في هذه الفئة بعد.",
    },
    showreel: {
      overline: "أعمالنا المتحركة",
      title: "طباعة تتحدث عن نفسها",
      sub: "شريط حيّ لأحدث أعمال الملصقات والتغليف والملابس واللافتات. اضغط أي صورة لتفاصيل أقرب.",
    },
    faq: {
      overline: "الأسئلة الشائعة",
      title: "الأسئلة المتكررة",
      sub: "كل ما تحتاج معرفته قبل الطلب.",
      items: [
        { q: "ما هو وقت التنفيذ المعتاد لديكم؟", a: "تُسلّم معظم الطلبات خلال ٢–٤ أيام عمل، مع توفر خيارات في نفس اليوم وسريعة لكثير من المنتجات. شاركنا موعدك النهائي وسنعمل وفقه." },
        { q: "هل تقدمون أحجاماً وأشكالاً مخصصة؟", a: "نعم. جميع ملصقاتنا وصناديقنا وتغليفنا قابلة للتخصيص بالكامل — أي حجم وشكل ومادة وتشطيب يناسب منتجك وعلامتك." },
        { q: "هل هناك حد أدنى للطلب؟", a: "يختلف الحد الأدنى حسب المنتج. نتعامل مع كل شيء من الكميات الصغيرة الخاصة إلى الإنتاج الكبير. تواصل معنا للكميات والأسعار." },
        { q: "مع أي طابعات تتوافق أشرطة الباركود لديكم؟", a: "أشرطتنا الشمعية والراتنجية والمختلطة متوافقة مع جميع العلامات الكبرى لطابعات النقل الحراري. أخبرنا بطراز طابعتك وسنوفر الشريط المناسب." },
        { q: "هل توصلون في جميع أنحاء الإمارات؟", a: "نعم، نوصّل في جميع أنحاء الإمارات من منشأتنا في دبي مع شحن سريع ولوجستيات موثوقة." },
        { q: "هل يمكنكم المساعدة في التصميم؟", a: "بالتأكيد. يمكن لفريقنا إرشادك بشأن المواد والتشطيبات وإعداد التصميم للحصول على أفضل نتيجة من ملفاتك." },
      ],
    },
    contact: {
      overline: "اطلب عرض سعر",
      title: "لنتحدث عن مشروعك",
      sub: "أخبرنا بما تحتاجه وسيعاود فريقنا التواصل معك بالأسعار ومواعيد التسليم. تفضّل الدردشة؟ اتصل بنا أو راسلنا على واتساب مباشرة.",
      form: {
        name: "الاسم الكامل", company: "الشركة", email: "البريد الإلكتروني", phone: "الهاتف",
        product: "المنتج / الخدمة", quantity: "الكمية المقدرة", message: "الرسالة",
        namePh: "اسمك", companyPh: "اسم الشركة", emailPh: "you@company.com",
        phonePh: "+971 ...", quantityPh: "مثال: ٥٠٠٠ وحدة", messagePh: "أخبرنا عن الأحجام والمواد والتشطيبات والمواعيد...",
        selectProduct: "اختر منتجاً", other: "أخرى / استفسار عام",
        required: "يرجى إدخال الاسم والبريد والهاتف والمنتج.",
        success: "شكراً لك! تم استلام طلبك. سنفتح واتساب لترسله إلينا أيضاً.",
        error: "حدث خطأ ما. حاول مرة أخرى أو راسلنا على واتساب.",
        alsoWhatsapp: "أرسل هذا الاستفسار عبر واتساب أيضاً",
      },
    },
    footer: {
      tagline: "طباعة ملصقات وأوفست ورقمية دقيقة مع تصنيع التغليف في دبي — دائماً في الوقت المحدد.",
      products: "المنتجات",
      company: "الشركة",
      getInTouch: "تواصل معنا",
      rights: "جميع الحقوق محفوظة.",
      admin: "دخول الإدارة",
    },
  },
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    if (urlLang === "ar" || urlLang === "en") return urlLang;
    return localStorage.getItem("ml_lang") || "en";
  });

  useEffect(() => {
    const dir = translations[lang].dir;
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("ml_lang", lang);
  }, [lang]);

  const toggle = () => setLang((l) => (l === "en" ? "ar" : "en"));

  const t = (path) => {
    const parts = path.split(".");
    let cur = translations[lang];
    for (const p of parts) {
      cur = cur?.[p];
      if (cur === undefined) return path;
    }
    return cur;
  };

  const dir = translations[lang].dir;
  return (
    <LanguageContext.Provider value={{ lang, dir, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
};
