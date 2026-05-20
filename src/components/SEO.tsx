import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

const OG_IMAGE = "https://i.postimg.cc/TYMZgDs6/Chat-GPT-Image-2025-g-28-okt-11-22-58.png";
const SITE_URL = "https://solaraflames.com";

const SEO_DATA = {
  lv: {
    lang: "lv",
    locale: "lv_LV",
    title: "Solara Music Vibes — Vārdi kļūst par mūziku",
    description:
      "Mūzikas producēšanas pakalpojums ar AI tehnoloģijām. Radām individuālus skaņdarbus privātpersonām, zīmoliem un radošiem projektiem. Tu raksti ideju — mēs veidojam skaņu.",
    keywords: [
      "personalizētas dziesmas",
      "dziesmu pasūtīšana",
      "AI mūzikas producēšana",
      "individuāli skaņdarbi",
      "dziesma dāvanā",
      "unikāla dāvana",
      "dziesma kāzās",
      "dziesma dzimšanas dienā",
      "latviešu mūzika",
      "mīlestības balade",
      "mūzika zīmolam",
      "Solara Music Vibes",
      "custom song Latvia",
      "personalized song Latvia",
      "order a song online",
    ].join(", "),
    ogTitle: "Solara Music Vibes — Vārdi kļūst par mūziku",
    ogDescription:
      "Mūzikas producēšanas pakalpojums ar AI. Tu raksti ideju — mēs veidojam skaņu.",
  },
  en: {
    lang: "en",
    locale: "en_US",
    title: "Solara Music Vibes — Your Words Become Music",
    description:
      "AI-powered music production service. We create individual tracks for individuals, brands and creative projects. You write the idea — we build the sound.",
    keywords: [
      "custom song",
      "personalized song",
      "order a song",
      "AI music production",
      "custom music for brands",
      "song as a gift",
      "custom song for wedding",
      "custom song for birthday",
      "unique gift idea",
      "custom music Latvia",
      "Latvian music artist",
      "song writing service",
      "AI generated music",
      "pop song made to order",
      "Solara Music Vibes",
    ].join(", "),
    ogTitle: "Solara Music Vibes — Your Words Become Music",
    ogDescription:
      "AI-powered music production. You write the idea — we build the sound.",
  },
} as const;

const SEO = () => {
  const { lang } = useLanguage();
  const seo = SEO_DATA[lang] ?? SEO_DATA.lv;

  return (
    <Helmet>
      <html lang={seo.lang} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={seo.ogTitle} />
      <meta property="og:description" content={seo.ogDescription} />
      <meta property="og:locale" content={seo.locale} />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:image" content={OG_IMAGE} />

      {/* Twitter */}
      <meta name="twitter:title" content={seo.ogTitle} />
      <meta name="twitter:description" content={seo.ogDescription} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {/* Hreflang */}
      <link rel="alternate" hrefLang="lv" href={SITE_URL} />
      <link rel="alternate" hrefLang="en" href={SITE_URL} />
      <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
    </Helmet>
  );
};

export default SEO;
