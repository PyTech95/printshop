const BASE = "https://static.prod-images.emergentagent.com/jobs/8afa54cc-c35d-4307-871a-804a8988f632/images";
const NEW = "https://static.prod-images.emergentagent.com/jobs/0fd45bfd-bef4-4394-9b6c-31145071c28f/images";
const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;
const P = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

export const IMG = {
  hero: `${BASE}/89b31d736e852125861eb870773d767575e442f36778d70427ba9cb927a8f188.jpeg`,
  labels: `${BASE}/1495628e4922d2bd911438b3928e4d4b33da4bc087834151c98bc30d9e19c87a.jpeg`,
  ribbons: `${BASE}/f4e6a449441145c06bb44699ac10cafca8f6cd209e3b30c1775a8d22763b0961.jpeg`,
  assetTags: `${BASE}/1cabd47147d5454df33eccca1a2e6e60bf16fb8e2682d8da9db2e77c841ba726.jpeg`,
  rackLabels: `${BASE}/c0e85da65cd5c9e6ea3e14a9faf873e09f916bd6c95375f5d5d124181b5162a5.jpeg`,
  largeFormat: `${BASE}/f6d735f72749d4a9d08ab132c19c01a23ae37c298e6a20c12fccb39c9bc78363.jpeg`,
  vehicle: `${BASE}/2d9a3c7112766c38630007ece0ad7b99638bc939fc89149098a6e81f906b8b0d.jpeg`,
  promo: `${BASE}/10a4c505a92d6b8971370935e1ed02d2be8542c0f794aa110e74f1a7438ec830.jpeg`,
  boxes: `${BASE}/56e87386602b91e04cb252e2d64918d2667aafc23c399e9ac942f75f45366b72.jpeg`,
  paperBags: `${BASE}/22697760f029b06b5717de792f09ccba28ebc501971a049164f8f1d75d191d02.jpeg`,
  labelsRolls: `${NEW}/5339ffbef30e7510c4b998662cb6806da79d3fca6a48afefaeb93a53bba21eac.jpeg`,
  printedLabelSheet: `${NEW}/780c5751945c1520da829871045416cb0f07862b8e071241738239e04dcadf60.jpeg`,
  assetTagsGrid: `${NEW}/cbc85eb5f0220395a062b0b89c0aa7b9efb4f3bf387d88ee8f735ff7a2695100.jpeg`,
  assetTagsAngled: `${NEW}/13fcc7b995cf310d5351ab09880c935ab0ad1f8f9745a241c56b2016aaecebe8.jpeg`,
  assetTagLaptop: `${NEW}/6820b5692cbb4d5c9c770eda500c9857349b1fcc2f4de6f2f83ef263dd8addb9.jpeg`,
  assetTagHand: `${NEW}/6f7d025bf3e5cdc8cab4de0c7434da53603471c02aa8f6154e6c90e280d3cc69.jpeg`,
  offsetAll: `${NEW}/c37697ab086b6f146615881dafc0baf32b4fda3e32842046e75b96b2a3021005.jpeg`,
  brochuresFlyers: `${NEW}/9a57bc4506fc75e69dc307c9fb39bee472ac44641b7a24d1a1d6bd1db4e61d6f.jpeg`,
  shoppingBags: `${NEW}/e8c23e103c177bc40a36646b1f07bfad1104fd91205af4119ee6377d392955ad.jpeg`,
  customBoxes: `${NEW}/20262296744aba46a9e5bb526244ec7c2ab77ead21d4754a41dc06e70a5d9dd3.jpeg`,
  booklets: `${NEW}/e48a0f424f1a506f12e719344998f24cff5b2816746a9464c5faed936b4efcce.jpeg`,
  largeFormatNew: `${NEW}/439f98388f59a05b083aefb93657c65053f9d99983fdf4d63a8651e2e1626a07.jpeg`,
  vinylPasting: `${NEW}/3f35bb4110a1ad9d6dfca552fa68b12831ff3ccf9ac4de3dfbe2329f5cc4fdd2.jpeg`,
  dtf: `${NEW}/022f709cc01d2bb3cc227fdcb4b7ade4f04a40908c7f08064c46a98eeb9a6acf.jpeg`,
  screenPrint: `${NEW}/6660ee7b32ac6a958140d18291913b662caf49e53776d976ee2361a7bbd9bfd0.jpeg`,
  uniforms: `${NEW}/8292455e8b40bd033290e3c4dad99223b359b72174ced624d7037914afcda50c.jpeg`,
  promoNew: `${NEW}/d84be1b8e2df01bc372fc38c24fb3c55a35f96adc358d9f327e77ab6416de9f3.jpeg`,
  engraving: `${NEW}/78fa0bad542392cf0bb808f01da6050d266c693f466b94d0d491c32376d271c1.jpeg`,
  factoryHero: `${NEW}/ac98812a932511517042f9129d631dd7129f52ae9c5ed2ef1d743879322ec213.jpeg`,
  engraveMachine: `${NEW}/1f1c88b1267f8a6b65ca4bba14a2c4f15cfb2a3415a4ed152d921ea146bd5bf9.jpeg`,
  engravePlates: `${NEW}/4f409843d7ded69e5d915faadb9de8a4d02875cff4ae8b719e83eefb6e71a147.jpeg`,
  engraveAwards: `${NEW}/76a3586ae045e504ece75a9a11fcd7c45713d41f4dfbe67292639eba757c3520.jpeg`,
  dtfMachine: `${NEW}/5718efce22d920a265149414e4cec3c5558e9b349f33bd5755be28c0eec0a824.jpeg`,
  dtfFilms: `${NEW}/ef994ee32b7ad6903762af1524fff65b2306f98468cb8cc8fed8e66c0c3af417.jpeg`,
  dtfPress: `${NEW}/13519f81437d4509f525640a23bcd6f58313ae6a3734ce271b8f24e16c1e209a.jpeg`,
  screenRack: `${NEW}/63117b274f55148d93d724e7138f7fd1e645315f06bb35315b025907ae5d6fda.jpeg`,
  screenPress: `${NEW}/d4152deabd0e36705c12e135a06b59270862e5e92b3d0b2f9cde05a564da59a2.jpeg`,
  uniformEmbroidery: `${NEW}/00d2b255756b90ba74b3c9bf99447bd18a11002c5e0e12ce93640371b589687d.jpeg`,
  uniformRail: `${NEW}/1f4b6ade989cb236ca9bf879b1f3bdc9689e558e905f140817a23342af9cc45a.jpeg`,
  rakQc: `${NEW}/abf99c8b910cd5e3f3a9c1fb41ba2523e957f715f3051bb11b2184021370d844.jpeg`,
  rakMachine: `${NEW}/af69647624be1df01c5835bfea96c65b8e1d619353743af324232631f89e5cb3.jpeg`,
  rakApplied: `${NEW}/d8e1ab736d80b581406fb516cd62caf8502fcc4b52a08233286264223ecd4445.jpeg`,
  promoCloseup: `${NEW}/a892c6f0c71fecf64b6e7add9cf369a30f05f6d29a9a1f674bdf015146ab0132.jpeg`,
  aboutHero: `${NEW}/0c0c1de71b0e10c5adaabf3d6b6e498491f27e23d0c2cc2566f60c291946a88c.jpeg`,
  contactHero: `${NEW}/2e8d8819f6b738435b54e23882073c1e413625d5706ea4f6898f16d160d48e39.jpeg`,
  whyHero: `${NEW}/7f5055707bee3254732bc1a3d25bd769b60b511de0ddbb8689c9ded3a4d50a23.jpeg`,
  rackUpright: `${NEW}/a72f9125f1207f812298537a90b27fa23d5f4b2dfa035c6639e54e4b20432ba6.jpeg`,
  rackAisleSigns: `${NEW}/8150a609902ce3771eca7fd43a4c7a3e5da57b8b795278aa7b8264d19f1ef22a.jpeg`,
  rackPlacard: `${NEW}/7c65dc2abeabda438b4c255fe4540911be3269a80e30e4b241a3f93cf3e63266.jpeg`,
  rackBaySigns: `${NEW}/8165fc78ca7a6dfd6624d22d00dc76944dcc38cd11e63d9b4ec657d79e235d81.jpeg`,
  shelfBeamLabels: `${NEW}/44ddc95c45da968502e5dd962147ad9f49ec664da6a4825beede2d4c7103bf6d.jpeg`,
  shelfLabelRow: `${NEW}/d9cfe50d1a05e4da0e0242f0ac595d55858be70b5f099bf7eddfe991890cf86f.jpeg`,
  shelfLabelApply: `${NEW}/75724c50ccbbfb80a8b2b22e315401b6d7cdc2263e000ef127ea6cb39b30d570.jpeg`,
  shelfLabelMacro: `${NEW}/5417f54b6751502c73cfea28580bc3604147f4cbd325487089bccbdba2b6ae8c.jpeg`,
  hivisVestPair: `${NEW}/ef76ac183d9ba1accfb3748ce957f418f31fc2c5807eb3c5b5d9cee84bd699c7.jpeg`,
  hivisVestWorn: `${NEW}/8f88400254a31fb7a1318b8036a042753968c989e73bfd4969ef5fd0adc20e2c.jpeg`,
  toteBagsPair: `${NEW}/b4c1c0b05a558e7eae707090d3e4ae1add351438ccad02d19a9779167c01c41e.jpeg`,
  toteBagsStack: `${NEW}/b18bb957693c9ea92249781d1694b97a3ec52553860b23328d6ec3988f6ae624.jpeg`,
  spKraftMailers: `${NEW}/430f10013f0c5dbfc0d5054a6fb0bd820a36c526b3d9dd0035dbd92b8066be9a.jpeg`,
  spMailerInside: `${NEW}/a1cc8c3abc52e657d4384b31a5e2bb621fcd8c12e41ca0f58efb60f8d00074b3.jpeg`,
  spToteIllustration: `${NEW}/42a19b22a9d29cb4559ba5ea13611a1ae7be961962a3f4b49a3d0e4f7c8c33bb.jpeg`,
  spToteTrio: `${NEW}/100d62a67c09c42e9190e6d1d229420c0afb294356378517e926cc4e4577caf8.jpeg`,
  spPrintingBox: `${NEW}/1cf159d7bec3df90ad96e54e75a92fba1c12b76f15813aeda3120455b153b1e6.jpeg`,
};

export const products = [
  {
    slug: "custom-labels-ribbons",
    category: "labels",
    name: "Custom Labels & Ribbons",
    name_ar: "الملصقات والأشرطة المخصصة",
    tagline: "Plain • Printed • Custom",
    tagline_ar: "سادة • مطبوعة • مخصصة",
    short: "Plain and fully customised printed labels and ribbons for products, packaging and branding.",
    short_ar: "ملصقات وأشرطة سادة ومطبوعة ومخصصة بالكامل للمنتجات والتغليف والعلامة التجارية.",
    description:
      "Plain and fully customised printed labels and ribbons for products, packaging, branding and business requirements. From plain labels to full-colour printed product and packaging labels — plus custom printed ribbons — we produce durable, high-resolution results in any shape, size and finish, including matt, gloss, transparent and metallic.",
    description_ar:
      "ملصقات وأشرطة سادة ومطبوعة ومخصصة بالكامل للمنتجات والتغليف والعلامة التجارية ومتطلبات الأعمال. من الملصقات السادة إلى ملصقات المنتجات والتغليف المطبوعة بالكامل — إضافة إلى الأشرطة المطبوعة المخصصة — ننتج نتائج متينة عالية الدقة بأي شكل وحجم وتشطيب.",
    image: IMG.rakApplied,
    gallery: [IMG.rakApplied, IMG.labelsRolls, IMG.printedLabelSheet, IMG.rakQc, IMG.rakMachine, IMG.labels, IMG.ribbons],
    features: ["Plain labels", "Printed product labels", "Compliance labelling", "Custom printed ribbons"],
    applications: ["Retail products", "Food & beverage", "Cosmetics & pharma", "Logistics & shipping"],
  },
  {
    slug: "asset-tags",
    category: "labels",
    name: "Asset Tags",
    name_ar: "بطاقات الأصول",
    tagline: "Durable • Trackable",
    tagline_ar: "متينة • قابلة للتتبع",
    short: "Durable, customised asset tags for equipment, machinery, inventory and offices.",
    short_ar: "بطاقات أصول متينة ومخصصة للمعدات والآلات والمخزون والمكاتب.",
    description:
      "Durable and customised asset tags for equipment, machinery, inventory, offices and business assets. Options include barcode labels, QR code tags, serial number tags, tamper-evident and durable metal/polyester labels for reliable, long-life asset identification.",
    description_ar:
      "بطاقات أصول متينة ومخصصة للمعدات والآلات والمخزون والمكاتب وأصول الأعمال. تشمل الخيارات ملصقات الباركود ورموز QR والترقيم المتسلسل والبطاقات المقاومة للعبث والمعدنية المتينة لتعريف موثوق وطويل الأمد للأصول.",
    image: IMG.assetTagsGrid,
    gallery: [IMG.assetTagsGrid, IMG.assetTagsAngled, IMG.assetTagLaptop, IMG.assetTagHand],
    features: ["Barcode labels", "QR code tags", "Serial number tags", "Durable equipment labels"],
    applications: ["IT & equipment", "Facilities management", "Inventory tracking", "Government & utilities"],
  },
  {
    slug: "rack-shelf-labels",
    category: "warehouse",
    name: "Rack & Shelf Labels",
    name_ar: "ملصقات الرفوف والأرفف المعدنية",
    tagline: "Warehouse • Barcoded",
    tagline_ar: "المستودعات • باركود",
    short: "Durable barcoded rack, shelf, bay and aisle labels for warehouses and cold stores.",
    short_ar: "ملصقات رفوف وممرات وخانات متينة بالباركود للمستودعات والمخازن المبردة.",
    description:
      "Hard-wearing warehouse location labelling built for daily scanning — colour-coded rack upright labels, magnetic and adhesive shelf beam labels, bay and aisle identification signs, hanging aisle boards and load-capacity placards. Printed with high-contrast barcodes on laminated polyester or magnetic stock so they survive forklift knocks, cold stores, dust and wash-downs while staying scannable for years.",
    description_ar:
      "ملصقات مواقع للمستودعات مصنوعة للاستخدام اليومي والمسح المتكرر — ملصقات أعمدة الرفوف بترميز لوني، وملصقات عوارض لاصقة ومغناطيسية، ولوحات تعريف الممرات والخانات، ولوحات معلقة، ولوحات حدود الأحمال. تُطبع بباركود عالي التباين على بولي إستر مغلّف أو مادة مغناطيسية لتتحمل الصدمات والغبار والبرودة والتنظيف مع بقائها قابلة للمسح لسنوات.",
    image: IMG.shelfBeamLabels,
    gallery: [
      IMG.shelfBeamLabels,
      IMG.rackUpright,
      IMG.shelfLabelRow,
      IMG.rackAisleSigns,
      IMG.shelfLabelApply,
      IMG.rackPlacard,
      IMG.shelfLabelMacro,
      IMG.rackBaySigns,
    ],
    features: ["Rack & beam labels", "Bay & aisle signs", "Magnetic & adhesive", "Barcode & colour-coded"],
    applications: ["Warehouses & 3PL", "Cold stores", "Distribution centres", "Retail stockrooms"],
  },
  {
    slug: "offset-printing",
    category: "packaging",
    name: "Offset Printing",
    name_ar: "طباعة الأوفست",
    tagline: "Business Cards • Brochures",
    tagline_ar: "بطاقات • بروشورات",
    short: "High-quality offset printing for business cards, brochures, flyers, stationery and catalogues.",
    short_ar: "طباعة أوفست عالية الجودة لبطاقات العمل والبروشورات والفلايرات والقرطاسية والكتالوجات.",
    description:
      "High-quality offset printing for business cards, brochures, flyers, stationery, catalogues and other marketing materials. Sharp, consistent colour and premium paper stocks and finishes for a professional finish on every print run — small or large volume.",
    description_ar:
      "طباعة أوفست عالية الجودة لبطاقات العمل والبروشورات والفلايرات والقرطاسية والكتالوجات وسائر المواد التسويقية. ألوان دقيقة ومتسقة وأوراق فاخرة لتشطيب احترافي في كل طلب — بكميات صغيرة أو كبيرة.",
    image: IMG.offsetAll,
    gallery: [IMG.offsetAll, IMG.brochuresFlyers, IMG.shoppingBags, IMG.customBoxes, IMG.booklets],
    features: ["Business cards", "Brochures & flyers", "Booklets & catalogues", "Shopping bags & boxes"],
    applications: ["Corporate branding", "Marketing campaigns", "Events & launches", "Retail & hospitality"],
  },
  {
    slug: "large-format-vinyl",
    category: "largeformat",
    name: "Large Format Printing & Vinyl Pasting",
    name_ar: "الطباعة كبيرة الحجم ولصق الفينيل",
    tagline: "Banners • Signage • Vinyl",
    tagline_ar: "لافتات • لوحات • فينيل",
    short: "Banners, posters, signage, stickers and professional vinyl pasting for shops, offices and vehicles.",
    short_ar: "لافتات وملصقات ولوحات وفينيل ولصق احترافي للمحلات والمكاتب والمركبات.",
    description:
      "Large format printing, banners, posters, signage, stickers and professional vinyl pasting for shops, offices, vehicles and promotional displays. High-resolution, UV-fade-resistant output for indoor and outdoor use — including vehicle vinyl wraps and shop-front signage.",
    description_ar:
      "طباعة كبيرة الحجم ولافتات وملصقات ولوحات وفينيل ولصق احترافي للمحلات والمكاتب والمركبات وواجهات العرض الترويجية. إنتاج عالي الدقة مقاوم للبهتان للاستخدام الداخلي والخارجي — بما في ذلك تغليف المركبات بالفينيل ولافتات الواجهات.",
    image: IMG.largeFormatNew,
    gallery: [IMG.largeFormatNew, IMG.vinylPasting, IMG.largeFormat, IMG.vehicle],
    features: ["Banners & posters", "Shop & office signage", "Vinyl stickers & pasting", "Vehicle vinyl wraps"],
    applications: ["Events & exhibitions", "Retail POS", "Construction hoarding", "Fleet & vehicles"],
  },
  {
    slug: "screen-printing",
    category: "apparel",
    name: "Screen Printing",
    name_ar: "طباعة الشاشة الحريرية",
    tagline: "Durable • Bulk",
    tagline_ar: "متينة • بالجملة",
    short: "Single-colour and multi-colour screen printing on garments, kraft boxes, canvas bags and more.",
    short_ar: "طباعة شاشة بلون واحد أو عدة ألوان على الملابس وصناديق الكرافت والحقائب القماشية وغيرها.",
    description:
      "Professional screen printing across garments and packaging — T-shirts, uniforms and promotional clothing, plus bold single-colour branding on kraft mailer boxes, folding cartons and natural canvas tote bags. Thick, opaque ink lays down crisp logos, line-art illustrations and patterns that stay vivid wash after wash, and the process gets cheaper per piece the bigger the run, making it ideal for corporate branding, retail packaging and event merchandise.",
    description_ar:
      "طباعة شاشة احترافية للملابس والتغليف — تيشيرتات وزي موحد وملابس ترويجية، إضافة إلى طباعة بلون واحد جذاب على صناديق الكرافت والعلب المطوية وحقائب القماش الطبيعي. الحبر السميك والمعتم يمنح شعارات ورسومات خطية وأنماطاً واضحة تبقى زاهية بعد كل غسلة، وتقل الكلفة للقطعة مع زيادة الكمية، ما يجعلها مثالية للعلامات المؤسسية وتغليف التجزئة وهدايا المناسبات.",
    image: IMG.spKraftMailers,
    gallery: [IMG.spKraftMailers, IMG.spToteIllustration, IMG.spToteTrio, IMG.spMailerInside, IMG.spPrintingBox, IMG.screenPress, IMG.screenRack, IMG.screenPrint],
    features: ["Kraft box branding", "Canvas tote printing", "Garments & uniforms", "Single or multi-colour"],
    applications: ["Retail packaging", "Event merchandise", "Staff uniforms", "Promotional wear"],
  },
  {
    slug: "dtf-printing",
    category: "apparel",
    name: "DTF Printing",
    name_ar: "طباعة DTF",
    tagline: "Direct-to-Film • Apparel",
    tagline_ar: "مباشر على الفيلم • ملابس",
    short: "Professional Direct-to-Film printing for T-shirts, garments, uniforms and branded apparel.",
    short_ar: "طباعة احترافية مباشرة على الفيلم للتيشيرتات والملابس والزي الموحد والملابس المطبوعة.",
    description:
      "Professional Direct-to-Film (DTF) printing for custom T-shirts, garments, uniforms, promotional clothing and branded apparel. Vibrant, durable prints with fine detail, suitable for a wide range of fabrics and available for both small and bulk orders.",
    description_ar:
      "طباعة احترافية مباشرة على الفيلم (DTF) للتيشيرتات والملابس والزي الموحد والملابس الترويجية والمطبوعة. طبعات زاهية ومتينة بتفاصيل دقيقة تناسب مجموعة واسعة من الأقمشة ومتوفرة للطلبات الصغيرة والكبيرة.",
    image: IMG.dtfMachine,
    gallery: [IMG.dtfMachine, IMG.dtfFilms, IMG.dtfPress, IMG.dtf],
    features: ["Vibrant custom designs", "Small & bulk orders", "Suits many garments", "Durable wash-fast prints"],
    applications: ["Custom T-shirts", "Uniforms & workwear", "Promotional clothing", "Branded apparel"],
  },
  {
    slug: "uniform-tshirt-printing",
    category: "apparel",
    name: "Uniform & T-Shirt Printing",
    name_ar: "طباعة الزي الموحد والتيشيرتات",
    tagline: "Corporate • Staff",
    tagline_ar: "مؤسسي • للموظفين",
    short: "Custom branded uniforms and T-shirts for companies, teams, events and staff.",
    short_ar: "زي موحد وتيشيرتات مطبوعة مخصصة للشركات والفرق والفعاليات والموظفين.",
    description:
      "Custom branded uniforms and T-shirts for companies, teams, events, staff, promotions and businesses. From corporate uniforms and staff T-shirts to workwear and event apparel — branded to your identity with durable printing that lasts.",
    description_ar:
      "زي موحد وتيشيرتات مطبوعة مخصصة للشركات والفرق والفعاليات والموظفين والعروض والأعمال. من الزي المؤسسي وتيشيرتات الموظفين إلى ملابس العمل وملابس الفعاليات — مطبوعة بهويتك بطباعة متينة.",
    image: IMG.uniforms,
    gallery: [IMG.uniforms, IMG.hivisVestPair, IMG.hivisVestWorn, IMG.uniformRail, IMG.uniformEmbroidery],
    features: ["Corporate uniforms", "Staff T-shirts", "Hi-vis safety vests", "Workwear & branded apparel"],
    applications: ["Companies & offices", "Retail & hospitality", "Events & teams", "Promotions"],
  },
  {
    slug: "promotional-items",
    category: "packaging",
    name: "Promotional Items",
    name_ar: "المواد الترويجية",
    tagline: "Corporate Gifts • Merch",
    tagline_ar: "هدايا الشركات • منتجات",
    short: "Custom promotional items and branded merchandise for businesses, events and gifting.",
    short_ar: "مواد ترويجية مخصصة ومنتجات مطبوعة للشركات والفعاليات والهدايا.",
    description:
      "Custom promotional items and branded merchandise for businesses, events, marketing campaigns and corporate gifting. Mugs, pens, keychains, bags and bespoke corporate gifts — printed with your brand and available with premium gift packaging.",
    description_ar:
      "مواد ترويجية مخصصة ومنتجات مطبوعة للشركات والفعاليات والحملات التسويقية وهدايا الشركات. أكواب وأقلام وميداليات وحقائب وهدايا مؤسسية مخصصة — مطبوعة بعلامتك ومتوفرة بتغليف هدايا فاخر.",
    image: IMG.promoNew,
    gallery: [IMG.promoNew, IMG.toteBagsPair, IMG.toteBagsStack, IMG.promoCloseup, IMG.promo],
    features: ["Mugs & drinkware", "Pens & keychains", "Canvas tote bags", "Corporate gifts"],
    applications: ["Corporate gifting", "Events & expos", "Employee kits", "Marketing giveaways"],
  },
  {
    slug: "engraving-services",
    category: "engraving",
    name: "Engraving Services",
    name_ar: "خدمات النقش",
    tagline: "Nameplates • Awards",
    tagline_ar: "لوحات أسماء • جوائز",
    short: "Professional engraving for nameplates, signage, gifts, awards and identification.",
    short_ar: "نقش احترافي للوحات الأسماء واللافتات والهدايا والجوائز والتعريف.",
    description:
      "Professional engraving on suitable materials for nameplates, signage, gifts, awards, identification and business applications. Precise, permanent marking on metal, acrylic, wood and more — ideal for corporate awards, door and desk nameplates, branded gifts and asset identification.",
    description_ar:
      "نقش احترافي على المواد المناسبة للوحات الأسماء واللافتات والهدايا والجوائز والتعريف وتطبيقات الأعمال. علامات دقيقة ودائمة على المعدن والأكريليك والخشب وغيرها — مثالية للجوائز المؤسسية ولوحات الأسماء والهدايا والتعريف.",
    image: IMG.engravePlates,
    gallery: [IMG.engravePlates, IMG.engraveMachine, IMG.engraveAwards],
    features: ["Nameplates & signage", "Awards & trophies", "Corporate gifts", "Asset & ID marking"],
    applications: ["Corporate awards", "Office nameplates", "Branded gifts", "Identification"],
  },
];

export const productBySlug = (slug) => products.find((p) => p && p.slug === slug);

export const industries = [
  { key: "retail", name: "Retail & FMCG", name_ar: "التجزئة والسلع الاستهلاكية", desc: "Product labels, price tags and shelf-ready packaging.", desc_ar: "ملصقات المنتجات وبطاقات الأسعار والتغليف الجاهز للرفوف." },
  { key: "food", name: "Food & Beverage", name_ar: "الأغذية والمشروبات", desc: "Food-grade labels, boxes and compliance labelling.", desc_ar: "ملصقات آمنة للطعام وصناديق وملصقات مطابقة." },
  { key: "logistics", name: "Logistics & Warehousing", name_ar: "اللوجستيات والتخزين", desc: "Asset tags, barcodes and inventory tracking labels.", desc_ar: "بطاقات الأصول والباركود وملصقات تتبع المخزون." },
  { key: "manufacturing", name: "Manufacturing", name_ar: "التصنيع", desc: "Durable asset tags, safety and product identification.", desc_ar: "بطاقات أصول متينة وتعريف السلامة والمنتجات." },
  { key: "pharma", name: "Pharmaceutical", name_ar: "الأدوية", desc: "Precise, regulated labels and serialised barcoding.", desc_ar: "ملصقات دقيقة ومنظمة وباركود متسلسل." },
  { key: "events", name: "Events & Marketing", name_ar: "الفعاليات والتسويق", desc: "Banners, signage, apparel printing and promo items.", desc_ar: "لافتات ولوحات وطباعة ملابس ومواد ترويجية." },
];

export const marketAreas = [
  {
    emirate: "Dubai",
    emirate_ar: "دبي",
    slug: "dubai",
    hero: U("photo-1728418570376-50c5778c487f"),
    localCopy: "From Business Bay towers and DIFC offices to retail in Deira and warehouses in Jebel Ali and Al Quoz, Dubai businesses rely on us for product labels, retail signage, exhibition banners, branded uniforms and corporate gifts — produced in-house and delivered across the city, often same day.",
    metaDesc: "Professional printing services in Dubai — custom labels, asset tags, offset & large-format printing, DTF, screen printing, uniforms and promotional items. Serving Business Bay, Dubai Marina, JLT, Deira, Al Quoz and more.",
    blurb: "My Labels UAE delivers fast, high-quality printing across Dubai — from custom labels, asset tags and offset printing to large-format signage, DTF and screen-printed apparel, uniforms and promotional items. Same-day options and reliable delivery across every business district.",
    areas: ["Business Bay", "Dubai Marina", "JLT (Jumeirah Lake Towers)", "Downtown Dubai", "Dubai Internet City", "Dubai Media City", "Al Quoz", "Deira", "Bur Dubai", "Jebel Ali", "Dubai Silicon Oasis", "DIFC"],
  },
  {
    emirate: "Al Ain",
    emirate_ar: "العين",
    slug: "al-ain",
    hero: U("photo-1753703986159-7dd19429b1c0"),
    localCopy: "Serving the Garden City in the shadow of Jebel Hafeet — from shops at Al Ain City Centre and offices in the Central District to factories in Sanaiya and the Al Ain Industrial Area. We supply durable asset tags, product and compliance labels, large-format signage, uniforms and promotional items for retail, manufacturing and government clients.",
    metaDesc: "Printing services in Al Ain — custom labels, asset tags, offset & large-format printing, DTF, screen printing, uniforms and promotional items across Al Jimi, Al Muwaiji, Sanaiya, Zakher and more.",
    blurb: "Serving businesses across Al Ain with custom labels, asset tags, offset and large-format printing, DTF and screen-printed apparel, uniforms, engraving and promotional items — delivered on time to every district and industrial area.",
    areas: ["Al Ain City Centre", "Central District", "Al Jimi", "Al Mutaredh", "Al Muwaiji", "Al Markhaniya", "Al Khalidiya", "Al Foah", "Sanaiya (Industrial Area)", "Zakher", "Al Ain Industrial Area"],
  },
  {
    emirate: "Fujairah",
    emirate_ar: "الفجيرة",
    slug: "fujairah",
    hero: U("photo-1730626480563-10d80cab5201"),
    localCopy: "On the UAE's east coast, from Fujairah City and the Corniche to the Industrial Area, Free Zone and the port, we produce shipping and product labels, outdoor signage built for coastal weather, vehicle and shopfront vinyl, uniforms and promotional gifts for logistics, hospitality and marine businesses.",
    metaDesc: "Printing services in Fujairah — custom labels, signage, large-format printing, DTF, screen printing, apparel, engraving and promotional items across Fujairah City, the Industrial Area, Dibba and more.",
    blurb: "From custom labels and asset tags to large-format signage, DTF and screen-printed apparel, uniforms and promotional items — My Labels UAE provides reliable printing across Fujairah City, its industrial and free zones, and the east-coast towns.",
    areas: ["Fujairah City", "Hamad Bin Abdullah Road", "Al Faseel", "Al Ghurfa", "Al Hayl", "Sakamkam", "Madhab", "Fujairah Industrial Area", "Fujairah Free Zone", "Dibba Al-Fujairah", "Mirbah", "Qidfa", "Al Aqah"],
  },
  {
    emirate: "Ras Al Khaimah",
    emirate_ar: "رأس الخيمة",
    slug: "ras-al-khaimah",
    hero: U("photo-1766825344244-1f2df18334ca"),
    localCopy: "For Ras Al Khaimah — from Al Nakheel and Al Hamra to Mina Al Arab, Al Marjan Island and RAKEZ — we deliver RAK-compliant labels, asset tags, large-format signage, DTF and screen-printed apparel, uniforms and promotional items for manufacturing, tourism and free-zone companies.",
    metaDesc: "Printing services in Ras Al Khaimah (RAK) — RAK-compliant labels, asset tags, offset & large-format printing, DTF, screen printing, uniforms and promotional items across Al Nakheel, Al Hamra, RAKEZ and more.",
    blurb: "My Labels UAE supports RAK businesses with RAK-compliant labels, asset tags, offset and large-format printing, DTF and screen-printed apparel, uniforms, engraving and promotional items — from Al Nakheel and Al Hamra to RAKEZ and the industrial areas.",
    areas: ["RAK City / Al Nakheel", "Al Qasimia", "Al Mairid", "Al Dhait", "Al Mamourah", "Al Seer", "Al Rams", "Khuzam", "Al Hamra Village", "Mina Al Arab", "Al Marjan Island", "RAKEZ (Economic Zone)", "Al Ghail Industrial Area", "Al Jazeera Al Hamra", "Al Hulaila"],
  },
];

export const slugifyArea = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
export const findRegion = (slug) => marketAreas.find((m) => m.slug === slug);
export const findArea = (regionSlug, areaSlug) => {
  const r = findRegion(regionSlug);
  if (!r) return null;
  const area = r.areas.find((a) => slugifyArea(a) === areaSlug);
  return area ? { region: r, area } : null;
};

const hashStr = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
};

const sectorFor = (area) => {
  const a = area.toLowerCase();
  if (a.includes("industrial") || a.includes("sanaiya") || a.includes("al quoz") || a.includes("jebel ali") || a.includes("al ghail") || a.includes("al hayl"))
    return "durable asset tags, product and safety labels, large-format signage and workwear for factories and warehouses";
  if (a.includes("free zone") || a.includes("rakez") || a.includes("economic"))
    return "compliant labels, corporate stationery, signage and branded merchandise for free-zone companies";
  if (a.includes("marina") || a.includes("beach") || a.includes("island") || a.includes("hamra") || a.includes("aqah") || a.includes("mina") || a.includes("corniche") || a.includes("faseel") || a.includes("rams"))
    return "outdoor signage, menus, retail labels, uniforms and promotional items for hospitality and leisure businesses";
  if (a.includes("difc") || a.includes("media") || a.includes("internet") || a.includes("business bay") || a.includes("downtown") || a.includes("jlt") || a.includes("central district") || a.includes("abdullah"))
    return "premium business cards, offset stationery, office signage, uniforms and corporate gifts";
  if (a.includes("centre") || a.includes("deira") || a.includes("bur dubai") || a.includes("qasimia") || a.includes("nakheel") || a.includes("jimi") || a.includes("city"))
    return "retail labels, shopfront signage, flyers, price tags and promotional printing";
  return "custom labels, signage, apparel printing, promotional items and everyday business printing";
};

const AREA_TEMPLATES = [
  (area, emirate, sector, nearby) => `Serving businesses in and around ${area}, ${emirate}, we handle everything from ${sector}. Our team delivers to ${area} and nearby areas such as ${nearby} — keeping your printing fast, consistent and on time.`,
  (area, emirate, sector, nearby) => `${area} is a key part of our ${emirate} coverage. Whether you're near ${nearby}, we produce ${sector}, with quick turnarounds and reliable delivery straight to your door in ${area}.`,
  (area, emirate, sector, nearby) => `From startups to established firms in ${area}, ${emirate}, we're the go-to print partner for ${sector}. We also serve neighbouring areas including ${nearby}.`,
  (area, emirate, sector, nearby) => `Need printing in ${area}? My Labels UAE supports ${emirate} businesses — including ${nearby} — with ${sector}, all delivered on time across ${area}.`,
  (area, emirate, sector, nearby) => `Businesses across ${area}, ${emirate} rely on us for ${sector}. Our ${emirate} delivery network reaches ${area} and surrounding areas such as ${nearby}.`,
];

export const buildAreaCopy = (regionSlug, areaName) => {
  const region = findRegion(regionSlug);
  if (!region) return "";
  const idx = region.areas.indexOf(areaName);
  const nearbyArr = [];
  for (let k = 1; k <= 3 && k < region.areas.length; k++) nearbyArr.push(region.areas[(idx + k) % region.areas.length]);
  const nearby = nearbyArr.filter((a) => a !== areaName).slice(0, 3).join(", ");
  const tmpl = AREA_TEMPLATES[Math.abs(hashStr(areaName)) % AREA_TEMPLATES.length];
  return tmpl(areaName, region.emirate, sectorFor(areaName), nearby);
};

export const popularAreas = [
  { region: "dubai", area: "Business Bay" },
  { region: "dubai", area: "Dubai Marina" },
  { region: "dubai", area: "DIFC" },
  { region: "dubai", area: "Deira" },
  { region: "al-ain", area: "Al Ain City Centre" },
  { region: "al-ain", area: "Sanaiya (Industrial Area)" },
  { region: "fujairah", area: "Fujairah City" },
  { region: "fujairah", area: "Fujairah Free Zone" },
  { region: "ras-al-khaimah", area: "Al Hamra Village" },
  { region: "ras-al-khaimah", area: "Al Marjan Island" },
  { region: "ras-al-khaimah", area: "RAKEZ (Economic Zone)" },
  { region: "dubai", area: "JLT (Jumeirah Lake Towers)" },
];

export const CONTACT = {
  phones: ["+971 56 115 9894", "+971 56 834 8960"],
  whatsapp: "971561159894",
  email: "sales@mylabelsuae.com",
  location: "Dubai, United Arab Emirates",
  company: "My Labels Packaging Materials Manufacturing L.L.C.",
};
