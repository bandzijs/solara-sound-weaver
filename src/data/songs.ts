export interface Song {
  id: number;
  titleLV: string;
  titleEN: string;
  style: string;
  badgeLV: string;
  badgeEN: string;
  youtubeId: string;
  poemLV: string;
  poemEN: string;
  authorNoteLV?: string;
  authorNoteEN?: string;
}

export const songs: Song[] = [
  {
    id: 1,
    titleLV: "Tavā smaidā (∞ liesma)",
    titleEN: "In Your Smile (∞ flame)",
    style: "dance",
    badgeLV: "Oriģināla dziesma",
    badgeEN: "Original",
    youtubeId: "IWEwra0b4p4",
    poemLV: "Tavā smaidā raduošā\nPieskārienā gūtas piedzims plūsma auguoša\nPulsējošās jūtās, jautros smieklos skanuoša\nPiedzimst silta sajūta — liesma klātesuo-ša",
    poemEN: "In your smile, a world is born\nIn your touch, a growing stream\nPulsing feelings, laughter's song\nA warm sensation — flame within",
  },
  {
    id: 2,
    titleLV: "In the Wind of Change",
    titleEN: "In the Wind of Change",
    style: "rock-ballad",
    badgeLV: "Oriģināla dziesma",
    badgeEN: "Original",
    youtubeId: "quZhSi0HpBA",
    poemLV: "Your smile is traced in what tomorrow holds,\nNot in the ashes of a fading fire,\nYour sacred temple opens and unfolds\nWhen dawn of change is born from desire.",
    poemEN: "Your smile is traced in what tomorrow holds,\nNot in the ashes of a fading fire,\nYour sacred temple opens and unfolds\nWhen dawn of change is born from desire.",
  },
  {
    id: 3,
    titleLV: "Tik ilgi mūsu mīlestība snauda",
    titleEN: "So Long Our Love Was Sleeping",
    style: "love-ballad",
    badgeLV: "Oriģināla dziesma",
    badgeEN: "Original",
    youtubeId: "zxCXxZVbQDg",
    poemLV: "Cik ilgi mūsu mīlestība snauda\nTik dziļas jūtas nevēra neviens\nUn tagad pateikt to man atkal dota jauda\nJo sirdi modina tavs siltais pieskāriens.",
    poemEN: "So long our love lay sleeping deep\nSuch feelings no one dared to wake\nNow strength returns these words to speak\nYour gentle touch my heart did take.",
  },
  {
    id: 4,
    titleLV: "Mēs Divi (Aspazijas dzeja — deep trance remix)",
    titleEN: "The Two of Us (Aspazija poetry — deep trance remix)",
    style: "club-remix",
    badgeLV: "Pārstrādāta dzeja",
    badgeEN: "Adapted poetry",
    youtubeId: "e5xSKC2WkdE",
    poemLV: "Mēs skriesim meklēt zemi,\nKas miglā redzas jau.\nTo zemi, balto zemi,\nKur melno skumju nav.",
    poemEN: "We'll run to find the land\nThat shimmers through the mist.\nThat land, the white land,\nWhere dark sorrow can't exist.",
    authorNoteLV: "Dzeja: Aspazija (pārstrādāta)",
    authorNoteEN: "Poetry: Aspazija (adapted)",
  },
  {
    id: 5,
    titleLV: "Burve",
    titleEN: "The Enchantress",
    style: "folk-rock",
    badgeLV: "Oriģināla dziesma",
    badgeEN: "Original",
    youtubeId: "51HjPOMZYFM",
    poemLV: "Kad burve bur, tā sirdī mīlestību kur!\nNav ļauts ar viņu spēlēt —\nVien tīru laimi vēlēt,\nPatiesas mīlestības sēklas sēt.",
    poemEN: "When she enchants, love blooms inside the heart!\nNo games are hers to play —\nOnly pure joy to give away,\nTrue love's seeds to sow and start.",
  },
];

export const styleKeys = ["dance", "rock-ballad", "love-ballad", "club-remix", "folk-rock"] as const;
export type StyleKey = (typeof styleKeys)[number];
