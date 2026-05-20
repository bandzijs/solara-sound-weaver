export const translations = {
  lv: {
    nav: {
      listen: "Klausīties portfolio",
      about: "Par projektu",
      submit: "Sazinies ar mums",
      community: "Kopiena",
    },
    hero: {
      tagline: "Mūzikas producēšanas pakalpojums, kas izmanto mākslīgo intelektu, lai paātrinātu radošo procesu veidojot individuālus skaņdarbus privātpersonām, zīmoliem un radošiem projektiem.",
      listenBtn: "Klausīties portfolio",
      submitBtn: "Iesūtīt vārdus",
    },
    about: {
      heading: "Par projektu",
      text: "Solara Music Vibes ir projekts, kura mērķis ir palīdzēt māksliniekiem, dzejniekiem un citiem radoši domājošiem cilvēkiem atklāt, savu potenciālu pārvēršot to muzikālā izpildījumā. Projekts apvieno, mūzikas producēšanu un modernās AI tehnoloģijas, lai radīšanas procesu padarītu pieejamāku, ātrāku un vienkāršāku.\n\nPateicoties mākslīgā intelekta rīkiem un mūsu pieredzei mūzikas producēšanā, spējam īsā laikā palīdzēt radīt oriģinālus muzikālus skaņdarbus gan privātpersonām, gan uzņēmumiem. Solara Music Vibes piedāvā iespēju attīstīt idejas no vienkārša teksta, dzejas vai emocijas līdz pilnvērtīgam audio darbam.\n\nMūsu pieeja palīdz atvieglot producēšanas, dziedāšanas un tekstu rakstīšanas procesu cilvēkiem, kuriem māksla ir sirdī, bet ikdienā trūkst laika, tehnisko zināšanu vai profesionālas pieredzes, lai savas idejas realizētu pašu spēkiem\n\nSolara Music Vibes tic, ka radošumam nav robežu, un tehnoloģijas var kļūt par tiltu starp ideju un tās muzikālu realizāciju.",
    },
    howItWorks: {
      heading: "Kā tas notiek",
      steps: ["Tu raksti ideju", "Mēs veidojam skaņu", "Klausies rezultātu"],
    },
    music: {
      heading: "Portfolio",
      filterAll: "Visi",
      comments: "komentāri",
    },
    form: {
      heading: "Tavi vārdi gaida savu melodiju",
      name: "Vārds",
      email: "E-pasts",
      text: "Tavs teksts",
      mood: "Noskaņa",
      moodOptions: ["Pops (Pop)", "Hiphops / Reps (Hip-Hop / Rap)", "Roks (Rock)", "Latīņamerikas mūzika (Latin)", "Elektroniskā deju mūzika (EDM)", "Nezinu, palīdzi man"],
      submit: "Sūtīt vārdus",
      success: "Tavi vārdi ir ceļā uz melodiju. ✦",
      selectMood: "Izvēlies noskaņu",
    },
    community: {
      heading: "Pievienojies sarunai",
      namePlaceholder: "Tavs vārds",
      messagePlaceholder: "Tava ziņa...",
      send: "Sūtīt",
    },
    footer: {
      poetic: "Kur zvaigznes satiek vārdus.",
      copyright: "© 2026 Solara Music Vibes. Visas tiesības aizsargātas.",
    },
    moods: {
      melancholic: "Melanholiska",
      love: "Mīlestība",
      nature: "Daba",
      cosmic: "Kosmoss",
      other: "Cits",
    },
    styles: {
      "dance": "Deju mūzika",
      "rock-ballad": "Rock balāde",
      "love-ballad": "Mīlestības balāde",
      "club-remix": "Club Remix",
      "folk-rock": "Folk Rock",
    },
  },
  en: {
    nav: {
      listen: "Listen to portfolio",
      about: "About",
      submit: "Contact us",
      community: "Community",
    },
    hero: {
      tagline: "Music production service that uses AI to accelerate the creative process delivering custom tracks for individuals, brands, and creative projects.",
      listenBtn: "Listen to portfolio",
      submitBtn: "Send your words",
    },
    about: {
      heading: "About",
      text: "Solara Music Vibes is a project dedicated to helping artists, poets, and creative thinkers discover their potential by transforming it into musical expression. The project brings together music production and modern AI technology to make the creative process more accessible, efficient, and straightforward.\n\nThrough the power of artificial intelligence tools and our expertise in music production, we are able to help individuals and businesses create original musical compositions in a short amount of time. Solara Music Vibes offers the opportunity to develop ideas from a simple piece of text, a poem, or an emotion into a fully realized audio work.\n\nOur approach is designed to ease the process of production, songwriting, and lyric writing for those who have art in their hearts but lack the time, technical knowledge, or professional experience in their daily lives to bring their ideas to life with our help.\n\nSolara Music Vibes believes that creativity knows no boundaries, and that technology can become the bridge between an idea and its musical realization.",
    },
    howItWorks: {
      heading: "How it works",
      steps: ["You give the words", "We create together", "The song becomes yours"],
    },
    music: {
      heading: "Portfolio",
      filterAll: "All",
      comments: "comments",
    },
    form: {
      heading: "Your words are waiting for their melody",
      name: "Name",
      email: "Email",
      text: "Your text",
      mood: "Mood",
      moodOptions: ["Pop", "Hip-Hop / Rap", "Rock", "Latin", "EDM (Electronic Dance Music)", "I'm not sure, help me"],
      submit: "Send your words",
      success: "Your words are on their way to becoming music. ✦",
      selectMood: "Choose a genre",
    },
    community: {
      heading: "Join the conversation",
      namePlaceholder: "Your name",
      messagePlaceholder: "Your message...",
      send: "Send",
    },
    footer: {
      poetic: "Where stars meet words.",
      copyright: "© 2026 Solara Music Vibes. All rights reserved.",
    },
    moods: {
      melancholic: "Melancholic",
      love: "Love",
      nature: "Nature",
      cosmic: "Cosmic",
      other: "Other",
    },
    styles: {
      "dance": "Dance",
      "rock-ballad": "Rock Ballad",
      "love-ballad": "Love Ballad",
      "club-remix": "Club Remix",
      "folk-rock": "Folk Rock",
    },
  },
} as const;

export type Language = "lv" | "en";
export type Translations = (typeof translations)["lv"] | (typeof translations)["en"];
