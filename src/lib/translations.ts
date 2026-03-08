export const translations = {
  lv: {
    nav: {
      listen: "Klausīties",
      about: "Par projektu",
      submit: "Iesūtīt",
      community: "Kopiena",
    },
    hero: {
      tagline: "Iedod man vārdus. Es tos pārvērtīšu mūzikā.",
      listenBtn: "Klausīties",
      submitBtn: "Iesūtīt vārdus",
    },
    about: {
      heading: "Par projektu",
      text: "Solara Music Vibes ir vieta, kur vārdi kļūst par melodiju. Dzeja. Emocijas. Mūzika. Kopā.",
    },
    howItWorks: {
      heading: "Kā tas notiek",
      steps: ["Tu iedod vārdus", "Mēs radām kopā", "Dziesma top"],
    },
    music: {
      heading: "Mūzika",
      filterAll: "Visi",
      comments: "komentāri",
    },
    form: {
      heading: "Tavi vārdi gaida savu melodiju",
      name: "Vārds",
      email: "E-pasts",
      text: "Tavs teksts",
      mood: "Noskaņa",
      moodOptions: ["Melanholiska", "Mīlestība", "Daba", "Kosmoss", "Cits"],
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
      listen: "Listen",
      about: "About",
      submit: "Submit",
      community: "Community",
    },
    hero: {
      tagline: "Give me your words. I will turn them into music.",
      listenBtn: "Listen",
      submitBtn: "Send your words",
    },
    about: {
      heading: "About",
      text: "Solara Music Vibes is a place where words become melody. Poetry. Emotion. Music. Together.",
    },
    howItWorks: {
      heading: "How it works",
      steps: ["You give the words", "We create together", "The song becomes yours"],
    },
    music: {
      heading: "Music",
      filterAll: "All",
      comments: "comments",
    },
    form: {
      heading: "Your words are waiting for their melody",
      name: "Name",
      email: "Email",
      text: "Your text",
      mood: "Mood",
      moodOptions: ["Melancholic", "Love", "Nature", "Cosmic", "Other"],
      submit: "Send your words",
      success: "Your words are on their way to becoming music. ✦",
      selectMood: "Select a mood",
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
