import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Target, Eye, ArrowRight, Award, BadgeDollarSign, Users, HeadphonesIcon } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/i18n/LanguageContext";
import { IMG } from "@/data/products";

const MISSION_BG = "https://static.prod-images.emergentagent.com/jobs/0fd45bfd-bef4-4394-9b6c-31145071c28f/images/a4808474fbf06741329e9a6fb49d5420e20a140cc15308258aa670fa9d1f303c.jpeg";
const VISION_BG = "https://static.prod-images.emergentagent.com/jobs/0fd45bfd-bef4-4394-9b6c-31145071c28f/images/ddd191448ccbe7baec172ba0d7b438c1914370026f26c4c5bdb3d57e7ace4871.jpeg";

const DUBAI = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGJ1c2luZXNzJTIwc2t5bGluZSUyMHN1bnNldHxlbnwwfHx8fDE3ODYzNTg2OTZ8MA&ixlib=rb-4.1.0&q=85";

export default function AboutPage() {
  const { t } = useI18n();
  const values = [
    { icon: Award, label: t("about.v1") },
    { icon: BadgeDollarSign, label: t("about.v2") },
    { icon: Users, label: t("about.v3") },
    { icon: HeadphonesIcon, label: t("about.v4") },
  ];

  return (
    <div>
      <PageHero overline={t("about.overline")} title={t("about.title")} subtitle={t("about.p1")} image={IMG.aboutHero} crumbs={[{ label: t("nav.about") }]} />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <Reveal className="relative">
            <img src={DUBAI} alt="Dubai skyline" className="w-full h-[440px] object-cover border border-border" />
            <div className="absolute -top-4 -right-4 rtl:right-auto rtl:-left-4 bg-primary text-white px-5 py-4">
              <p className="overline">{t("about.basedIn")}</p>
              <p className="font-display font-bold">Dubai, UAE</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="overline text-primary">{t("about.overline")}</span>
            <h2 className="font-display font-black text-3xl lg:text-4xl tracking-tight text-foreground mt-3">{t("about.title")}</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">{t("about.p1")}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("about.p2")}</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {values.map((v) => (
                <div key={v.label} className="flex items-center gap-3 border border-border p-4">
                  <v.icon size={22} className="text-primary shrink-0" />
                  <span className="text-sm font-semibold text-foreground">{v.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-secondary">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 grid md:grid-cols-2 gap-6">
          <Reveal>
            <div data-testid="about-mission-card" className="relative overflow-hidden bg-white border border-border p-8 lg:p-10 h-full">
              <img src={MISSION_BG} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-60" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/40" />
              <div className="relative">
                <Target size={32} className="text-primary" />
                <h3 className="font-display font-bold text-2xl text-foreground mt-5">{t("about.missionT")}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("about.missionD")}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div data-testid="about-vision-card" className="relative overflow-hidden bg-[#0A0A0A] text-white p-8 lg:p-10 h-full">
              <img src={VISION_BG} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-70" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/40" />
              <div className="relative">
                <Eye size={32} className="text-primary" />
                <h3 className="font-display font-bold text-2xl mt-5">{t("about.visionT")}</h3>
                <p className="mt-3 text-white/70 leading-relaxed">{t("about.visionD")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <h3 className="font-display font-black text-2xl lg:text-3xl tracking-tight text-center sm:text-start">{t("home.ctaTitle")}</h3>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-7 py-3.5 rounded-sm hover:bg-[#0A0A0A] hover:text-white transition-colors shrink-0">
            {t("nav.quote")} <ArrowRight size={18} className="rtl:rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
}
