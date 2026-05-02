export const curriculum = {
  English: {
    title: "English Alphabet",
    totalLetters: 26,
    vowels: [
      { upper: 'A', lower: 'a', name: 'Ay', examples: 'apple, acorn' },
      { upper: 'E', lower: 'e', name: 'Ee', examples: 'egg, equal' },
      { upper: 'I', lower: 'i', name: 'Eye', examples: 'it, ice' },
      { upper: 'O', lower: 'o', name: 'Oh', examples: 'octopus, open' },
      { upper: 'U', lower: 'u', name: 'You', examples: 'up, use' },
    ],
    consonants: [
      { upper: 'B', lower: 'b', name: 'Bee', sound: 'ball' },
      { upper: 'C', lower: 'c', name: 'See', sound: 'cat, city' },
      { upper: 'D', lower: 'd', name: 'Dee', sound: 'dog' },
      // ... more can be added
    ],
    units: [
      { id: 1, title: 'Basics: Vowels', type: 'lesson' },
      { id: 2, title: 'Basics: Consonants', type: 'lesson' },
      { id: 3, title: 'Special: Diphthongs', type: 'lesson' },
    ]
  },
  Hindi: {
    title: "Hindi Alphabet (Devanagari)",
    totalLetters: 49,
    vowels: [
      { letter: 'अ', roman: 'a', example: 'up' },
      { letter: 'आ', roman: 'aa', example: 'father' },
      { letter: 'इ', roman: 'i', example: 'in' },
      { letter: 'ई', roman: 'ee', example: 'feet' },
    ],
    units: [
      { id: 1, title: 'Vowels (Swar)', type: 'lesson' },
      { id: 2, title: 'K Group Consonants', type: 'lesson' },
      { id: 3, title: 'CH Group Consonants', type: 'lesson' },
    ]
  },
  Bengali: {
    title: "Bengali Alphabet (Bangla Lipi)",
    totalLetters: 50,
    units: [
      { id: 1, title: 'Vowels (Shorborno)', type: 'lesson' },
      { id: 2, title: 'K Group Consonants', type: 'lesson' },
    ]
  },
  Tamil: {
    title: "Tamil Alphabet (தமிழ் அரிச்சுவடி)",
    totalLetters: 31,
    units: [
      { id: 1, title: 'Vowels (Uyir)', type: 'lesson' },
      { id: 2, title: 'Hard Consonants', type: 'lesson' },
    ]
  },
  Telugu: {
    title: "Telugu Alphabet (తెలుగు లిపి)",
    totalLetters: 54,
    units: [
      { id: 1, title: 'Vowels (Achchulu)', type: 'lesson' },
      { id: 2, title: 'K Group Consonants', type: 'lesson' },
    ]
  },
  Kannada: {
    title: "Kannada Alphabet (ಕನ್ನಡ ಲಿಪಿ)",
    totalLetters: 50,
    units: [
      { id: 1, title: 'Vowels (Svagalu)', type: 'lesson' },
      { id: 2, title: 'K Group Consonants', type: 'lesson' },
    ]
  },
  Malayalam: {
    title: "Malayalam Alphabet (മലയാളം ലിപി)",
    totalLetters: 53,
    units: [
      { id: 1, title: 'Vowels (Svaram)', type: 'lesson' },
      { id: 2, title: 'Consonants', type: 'lesson' },
    ]
  },
  Gujarati: {
    title: "Gujarati Alphabet (ગુજરાતી લિપિ)",
    totalLetters: 46,
    units: [
      { id: 1, title: 'Vowels (Svar)', type: 'lesson' },
      { id: 2, title: 'Consonants', type: 'lesson' },
    ]
  },
  Punjabi: {
    title: "Punjabi Alphabet (ਗੁਰਮੁਖੀ ਲਿਪੀ)",
    totalLetters: 47, // 35 base + 9 signs + 3 aux
    vowels: [
      { letter: 'ੳ', roman: 'ura', example: 'vowel carrier u/oo' },
      { letter: 'ਅ', roman: 'aira', example: 'inherent a' },
      { letter: 'ੲ', roman: 'iri', example: 'vowel carrier i/ee' },
    ],
    units: [
      { id: 1, title: 'Vowel Carriers & Signs', type: 'lesson' },
      { id: 2, title: 'K & CH Group Consonants', type: 'lesson' },
      { id: 3, title: 'Tonal Pronunciation & Tippi', type: 'lesson' },
    ]
  },
  Odia: {
    title: "Odia Alphabet (ଓଡ଼ିଆ ଲିପି)",
    totalLetters: 49,
    vowels: [
      { letter: 'ଅ', roman: 'a', example: 'up' },
      { letter: 'ଆ', roman: 'aa', example: 'father' },
      { letter: 'ଇ', roman: 'i', example: 'in' },
      { letter: 'ଈ', roman: 'ee', example: 'feet' },
    ],
    units: [
      { id: 1, title: 'Vowels (Swar)', type: 'lesson' },
      { id: 2, title: 'K Group Consonants', type: 'lesson' },
      { id: 3, title: 'Bowl-shaped Characters', type: 'lesson' },
    ]
  }
}
