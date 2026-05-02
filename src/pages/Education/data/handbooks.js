export const handbooks = {
  Punjabi: {
    title: "Punjabi — ਗੁਰਮੁਖੀ ਲਿਪੀ",
    subtitle: "Rounded Script · 35 Consonants · 10 Vowel Signs",
    intro: "Gurmukhi means 'from the mouth of the Guru'. It is a distinctly rounded script with no horizontal top line, standardized in the 16th century. Punjabi is a tonal language, unique among Indo-Aryan languages.",
    totalLetters: "35 consonants + 10 signs",
    specialNote: "Punjabi is a tonal language — the same word can mean different things depending on the tone (High, Low, Level).",
    sections: [
      {
        type: "vowel-carriers",
        title: "1️⃣ Vowel Carriers (Supporting Letters)",
        description: "Vowels cannot stand alone in Gurmukhi. These carriers are used when a word starts with a vowel sound.",
        letters: [
          { char: "ਅ", roman: "aira", use: "initial a/aa" },
          { char: "ੳ", roman: "ura", use: "initial u/oo/o" },
          { char: "ੲ", roman: "iri", use: "initial i/ee/e" }
        ]
      },
      {
        type: "vowel-signs",
        title: "2️⃣ Vowel Signs (Laga Matra) — shown on ਕ",
        letters: [
          { char: "ਕ", roman: "ka", name: "Mukta (a)" },
          { char: "ਕਾ", roman: "kaa", name: "Kanna (aa)" },
          { char: "ਕਿ", roman: "ki", name: "Sihari (i)" },
          { char: "ਕੀ", roman: "kee", name: "Bihari (ee)" },
          { char: "ਕੁ", roman: "ku", name: "Onkar (u)" },
          { char: "ਕੂ", roman: "koo", name: "Dulankar (oo)" },
          { char: "ਕੇ", roman: "ke", name: "Hora (e)" },
          { char: "ਕੈ", roman: "kai", name: "Dulain (ai)" },
          { char: "ਕੋ", roman: "ko", name: "Kanauda (o)" },
          { char: "ਕੌ", roman: "kau", name: "Kanaura (au)" }
        ]
      },
      {
        type: "consonants",
        title: "3️⃣ Consonants (Vyanjan - ਵਿਅੰਜਨ) — 35 Letters",
        groups: [
          {
            name: "Row 1: Velar (K Group)",
            letters: [
              { char: "ਕ", roman: "ka", sound: "k (kite)", example: "ਕਮਲ (lotus)" },
              { char: "ਖ", roman: "kha", sound: "kh (khaki)", example: "ਖਰਗੋਸ਼ (rabbit)" },
              { char: "ਗ", roman: "ga", sound: "g (go)", example: "ਗਾਜਰ (carrot)" },
              { char: "ਘ", roman: "gha", sound: "gh (ghost)", example: "ਘਰ (house)" },
              { char: "ਙ", roman: "nga", sound: "ng (sing)", example: "nasal" }
            ]
          },
          {
            name: "Row 2: Palatal (CH Group)",
            letters: [
              { char: "ਚ", roman: "cha", sound: "ch (chair)", example: "ਚਾਵਲ (rice)" },
              { char: "ਛ", roman: "chha", sound: "chh (chhota)", example: "ਛੱਤ (roof)" },
              { char: "ਜ", roman: "ja", sound: "j (jump)", example: "ਜਲ (water)" },
              { char: "ਝ", roman: "jha", sound: "jh (jhumka)", example: "ਝੰਡਾ (flag)" },
              { char: "ਞ", roman: "nya", sound: "ny (canyon)", example: "nasal" }
            ]
          },
          {
            name: "Row 3: Retroflex (T Group)",
            letters: [
              { char: "ਟ", roman: "Ta", sound: "hard T", example: "ਟਮਾਟਰ (tomato)" },
              { char: "ਠ", roman: "Tha", sound: "hard Th", example: "ਠੰਡਾ (cold)" },
              { char: "ਡ", roman: "Da", sound: "hard D", example: "ਡੱਬਾ (box)" },
              { char: "ਢ", roman: "Dha", sound: "hard Dh", example: "ਢੱਕਣ (lid)" },
              { char: "ਣ", roman: "Na", sound: "hard N", example: "ਗੁਣ (quality)" }
            ]
          },
          {
            name: "Row 4: Dental (T Group)",
            letters: [
              { char: "ਤ", roman: "ta", sound: "soft t", example: "ਤਾਰਾ (star)" },
              { char: "ਥ", roman: "tha", sound: "soft th", example: "ਥਾਲੀ (plate)" },
              { char: "ਦ", roman: "da", sound: "soft d", example: "ਦਿਨ (day)" },
              { char: "ਧ", roman: "dha", sound: "soft dh", example: "ਧਨ (wealth)" },
              { char: "ਨ", roman: "na", sound: "n (no)", example: "ਨਦੀ (river)" }
            ]
          },
          {
            name: "Row 5: Labial (P Group)",
            letters: [
              { char: "ਪ", roman: "pa", sound: "p (pen)", example: "ਪਾਣੀ (water)" },
              { char: "ਫ", roman: "pha", sound: "ph (phone)", example: "ਫਲ (fruit)" },
              { char: "ਬ", roman: "ba", sound: "b (bat)", example: "ਬਾਗ (garden)" },
              { char: "ਭ", roman: "bha", sound: "bh (abhor)", example: "ਭਾਰਤ (India)" },
              { char: "ਮ", roman: "ma", sound: "m (man)", example: "ਮਨ (mind)" }
            ]
          },
          {
            name: "Row 6: Semi-Vowels & Others",
            letters: [
              { char: "ਯ", roman: "ya", sound: "y (yes)", example: "ਯਾਦ (memory)" },
              { char: "ਰ", roman: "ra", sound: "tapped r", example: "ਰਾਤ (night)" },
              { char: "ਲ", roman: "la", sound: "l (love)", example: "ਲੋਕ (people)" },
              { char: "ਵ", roman: "va", sound: "v/w sound", example: "ਵਣ (forest)" },
              { char: "ੜ", roman: "Ra", sound: "hard R", example: "ਘੋੜਾ (horse)" },
              { char: "ਸ", roman: "sa", sound: "s (sun)", example: "ਸੱਪ (snake)" },
              { char: "ਹ", roman: "ha", sound: "h (hat)", example: "ਹੱਥ (hand)" }
            ]
          },
          {
            name: "Loanword Letters (Nuqta)",
            letters: [
              { char: "ਖ਼", roman: "kh", sound: "guttural kh", example: "ਖ਼ਰਾਬ (bad)" },
              { char: "ਗ਼", roman: "gh", sound: "guttural gh", example: "ਗ਼ਲਤ (wrong)" },
              { char: "ਜ਼", roman: "z", sound: "z (zoo)", example: "ਜ਼ਮੀਨ (land)" },
              { char: "ਫ਼", roman: "f", sound: "f (fan)", example: "ਫ਼ੈਸલા (decision)" },
              { char: "ਲ਼", roman: "L", sound: "hard L", example: "ਕਾਲ਼ਾ (black)" }
            ]
          }
        ]
      },
      {
        type: "diacritics",
        title: "4️⃣ Auxiliary Signs",
        letters: [
          { char: "ਂ", name: "Bindi", use: "Nasalization" },
          { char: "ੱ", name: "Adhak", use: "Doubles consonant" },
          { char: "੍", name: "Halant", use: "Removes vowel" }
        ]
      },
      {
        type: "numbers",
        title: "5️⃣ Punjabi Numbers (੦-੯)",
        letters: [
          { char: "੦", roman: "0 (sifar)" },
          { char: "੧", roman: "1 (ikk)" },
          { char: "੨", roman: "2 (do)" },
          { char: "੩", roman: "3 (tin)" },
          { char: "੪", roman: "4 (chaar)" },
          { char: "੫", roman: "5 (panj)" },
          { char: "੬", roman: "6 (chhay)" },
          { char: "੭", roman: "7 (satt)" },
          { char: "੮", roman: "8 (atth)" },
          { char: "੯", roman: "9 (nau)" }
        ]
      },
      {
        type: "words",
        title: "6️⃣ Common Punjabi Words",
        words: [
          { native: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", roman: "Sat Sri Akaal", meaning: "Hello" },
          { native: "ਪਾਣੀ", roman: "paanee", meaning: "Water" },
          { native: "ਚਾਵਲ", roman: "chaaval", meaning: "Rice" },
          { native: "ਮੈਂ", roman: "main", meaning: "I / Me" },
          { native: "ਤੁਸੀਂ", roman: "tuseen", meaning: "You (formal)" },
          { native: "ਘਰ", roman: "ghar", meaning: "House" },
          { native: "ਮਾਂ", roman: "maan", meaning: "Mother" },
          { native: "ਪਿਤਾ", roman: "pitaa", meaning: "Father" },
          { native: "ਧੰਨਵਾਦ", roman: "dhannvaad", meaning: "Thank you" },
          { native: "ਚੰਗਾ", roman: "changa", meaning: "Good" }
        ]
      }
    ]
  },

  Odia: {
    title: "Odia — ଓଡ଼ିଆ ଲିପି",
    subtitle: "Curved Script · 11 Vowels · 36 Consonants",
    intro: "The Odia script is instantly recognizable by its unique curved, bowl-shaped top line. This distinctive curve evolved from writing on palm leaves, where straight lines would tear the leaf.",
    totalLetters: "49",
    specialNote: "Odia ଅ (a) is pronounced like 'up', similar to Hindi, but different from the Bengali 'o' sound.",
    sections: [
      {
        type: "vowels",
        title: "1️⃣ Vowels (Swar - ସ୍ୱର) — 11 Letters",
        letters: [
          { char: "ଅ", roman: "a", sound: "uh (up)" },
          { char: "ଆ", roman: "aa", sound: "aa (father)" },
          { char: "ଇ", roman: "i", sound: "i (in)" },
          { char: "ଈ", roman: "ee", sound: "ee (feet)" },
          { char: "ଉ", roman: "u", sound: "u (put)" },
          { char: "ଊ", roman: "oo", sound: "oo (boot)" },
          { char: "ଋ", roman: "ri", sound: "ri (ring)" },
          { char: "ଏ", roman: "e", sound: "ay (they)" },
          { char: "ଐ", roman: "ai", sound: "ai (cat)" },
          { char: "ଓ", roman: "o", sound: "oh (go)" },
          { char: "ଔ", roman: "au", sound: "ow (out)" }
        ]
      },
      {
        type: "consonants",
        title: "2️⃣ Consonants (Byanjan - ବ୍ୟଞ୍ଜନ) — 36 Letters",
        groups: [
          {
            name: "କ-ବର୍ଗ (K Group) — Velar",
            letters: [
              { char: "କ", roman: "ka", sound: "k (kite)", example: "କମଳ (lotus)" },
              { char: "ଖ", roman: "kha", sound: "kh (khaki)", example: "ଖର୍ଚ୍ଚ (expense)" },
              { char: "ଗ", roman: "ga", sound: "g (go)", example: "ଗାଈ (cow)" },
              { char: "ଘ", roman: "gha", sound: "gh (ghost)", example: "ଘର (house)" },
              { char: "ଙ", roman: "nga", sound: "ng (sing)", example: "ଅଙ୍ଗ (body part)" }
            ]
          },
          {
            name: "ଚ-ବର୍ଗ (CH Group) — Palatal",
            letters: [
              { char: "ଚ", roman: "cha", sound: "ch (chair)", example: "ଚାକି (key)" },
              { char: "ଛ", roman: "chha", sound: "chh (chhota)", example: "ଛାତି (chest)" },
              { char: "ଜ", roman: "ja", sound: "j (jump)", example: "ଜଳ (water)" },
              { char: "ଝ", roman: "jha", sound: "jh (jhumka)", example: "ଝିଅ (daughter)" },
              { char: "ଞ", roman: "nya", sound: "ny (canyon)", example: "ଜ୍ଞାନ (knowledge)" }
            ]
          },
          {
            name: "ଟ-ବର୍ଗ (T Group) — Retroflex",
            letters: [
              { char: "ଟ", roman: "Ta", sound: "hard T", example: "ଟମାଟ (tomato)" },
              { char: "ଠ", roman: "Tha", sound: "hard Th", example: "ଠିକ (correct)" },
              { char: "ଡ", roman: "Da", sound: "hard D", example: "ଡାକ୍ତର (doctor)" },
              { char: "ଢ", roman: "Dha", sound: "hard Dh", example: "ଢୋଲ (drum)" },
              { char: "ଣ", roman: "Na", sound: "hard N", example: "ଗୁଣ (quality)" }
            ]
          },
          {
            name: "ତ-ବର୍ଗ (T Group) — Dental",
            letters: [
              { char: "ତ", roman: "ta", sound: "soft t", example: "ତାରਾ (star)" },
              { char: "ଥ", roman: "tha", sound: "soft th", example: "ଥାଳି (plate)" },
              { char: "ଦ", roman: "da", sound: "soft d", example: "ଦଶ (ten)" },
              { char: "ଧ", roman: "dha", sound: "soft dh", example: "ଧନ (wealth)" },
              { char: "ନ", roman: "na", sound: "n (no)", example: "ନଦୀ (river)" }
            ]
          },
          {
            name: "ପ-ବର୍ଗ (P Group) — Labial",
            letters: [
              { char: "ପ", roman: "pa", sound: "p (pen)", example: "ପାଣି (water)" },
              { char: "ଫ", roman: "pha", sound: "ph (phone)", example: "ଫଳ (phala - fruit)" },
              { char: "බ", roman: "ba", sound: "b (bat)", example: "ବାଟ (way)" },
              { char: "ଭ", roman: "bha", sound: "bh (abhor)", example: "ଭାରତ (India)" },
              { char: "ମ", roman: "ma", sound: "m (man)", example: "ମନ (mind)" }
            ]
          },
          {
            name: "Semi-Vowels & Sibilants",
            letters: [
              { char: "ଯ", roman: "ya", sound: "y (yes)" },
              { char: "ର", roman: "ra", sound: "rolled r" },
              { char: "ଲ", roman: "la", sound: "l (love)" },
              { char: "ଵ", roman: "va", sound: "v (van)" },
              { char: "ଶ", roman: "sha", sound: "sh (ship)" },
              { char: "ଷ", roman: "Sha", sound: "harder sh" },
              { char: "ସ", roman: "sa", sound: "s (sun)" },
              { char: "ହ", roman: "ha", sound: "h (hat)" },
              { char: "ଳ", roman: "La", sound: "hard L" },
              { char: "କ୍ଷ", roman: "ksha", sound: "ksh sound" },
              { char: "ଜ୍ଞ", roman: "gya", sound: "gya sound" }
            ]
          }
        ]
      },
      {
        type: "diacritics",
        title: "3️⃣ Vowel Signs (Matra) — shown with କ",
        letters: [
          { char: "କ", roman: "ka", name: "Mukta" },
          { char: "କା", roman: "kaa", name: "aa-matra" },
          { char: "କି", roman: "ki", name: "i-matra" },
          { char: "କୀ", roman: "kee", name: "ee-matra" },
          { char: "କୁ", roman: "ku", name: "u-matra" },
          { char: "କୂ", roman: "koo", name: "oo-matra" },
          { char: "କୃ", roman: "kri", name: "ri-matra" },
          { char: "କେ", roman: "ke", name: "e-matra" },
          { char: "କୈ", roman: "kai", name: "ai-matra" },
          { char: "କୋ", roman: "ko", name: "o-matra" },
          { char: "କୌ", roman: "kau", name: "au-matra" }
        ]
      },
      {
        type: "numbers",
        title: "4️⃣ Odia Numbers (୦-୯)",
        letters: [
          { char: "୦", roman: "0 (shunya)" },
          { char: "୧", roman: "1 (eka)" },
          { char: "୨", roman: "2 (dui)" },
          { char: "୩", roman: "3 (tini)" },
          { char: "୪", roman: "4 (chaari)" },
          { char: "୫", roman: "5 (paancha)" },
          { char: "୬", roman: "6 (chhaa)" },
          { char: "୭", roman: "7 (saata)" },
          { char: "୮", roman: "8 (aatha)" },
          { char: "୯", roman: "9 (naa)" }
        ]
      },
      {
        type: "words",
        title: "5️⃣ Common Odia Words",
        words: [
          { native: "ନମସ୍କାର", roman: "namaskaara", meaning: "Hello" },
          { native: "ପାଣି", roman: "paani", meaning: "Water" },
          { native: "ଭାତ", roman: "bhaata", meaning: "Rice" },
          { native: "ମୁଁ", roman: "mun", meaning: "I / Me" },
          { native: "ଆପଣ", roman: "aapaNa", meaning: "You (formal)" },
          { native: "ଘର", roman: "ghara", meaning: "House" },
          { native: "ମା", roman: "maa", meaning: "Mother" },
          { native: "ବାପା", roman: "baapaa", meaning: "Father" },
          { native: "ଧନ୍ୟବାଦ", roman: "dhanyabaada", meaning: "Thank you" },
          { native: "ଭଲ", roman: "bhala", meaning: "Good" }
        ]
      }
    ]
  },
  
  Hindi: {
    title: "Hindi — देवनागरी (Devanagari)",
    subtitle: "Devanagari Script · 13 Vowels · 33 Consonants · 3 Combined",
    totalLetters: "49-56",
    sections: [
      {
        type: "vowels",
        title: "1️⃣ Vowels (स्वर) — 13 Letters",
        description: "These can stand alone at the beginning of a syllable.",
        letters: [
          { char: "अ", roman: "a", sound: "u in up" },
          { char: "आ", roman: "aa", sound: "a in father" },
          { char: "इ", roman: "i", sound: "i in in" },
          { char: "ई", roman: "ee", sound: "ee in feet" },
          { char: "उ", roman: "u", sound: "u in put" },
          { char: "ऊ", roman: "oo", sound: "oo in boot" },
          { char: "ऋ", roman: "ri", sound: "ri in ring" },
          { char: "ए", roman: "e", sound: "e in they" },
          { char: "ऐ", roman: "ai", sound: "a in cat" },
          { char: "ओ", roman: "o", sound: "o in go" },
          { char: "औ", roman: "au", sound: "ou in our" },
          { char: "अं", roman: "an / am", sound: "nasal sound" },
          { char: "अः", roman: "ah", sound: "aspirated 'h'" },
        ]
      },
      {
        type: "vowel-signs",
        title: "Vowels Chart with Matras (shown on क)",
        description: "When attached to a consonant, vowels change form into Matras.",
        letters: [
          { char: "क", roman: "ka", sign: "(none)", sound: "ka" },
          { char: "का", roman: "kaa", sign: "ा", sound: "kaa" },
          { char: "कि", roman: "ki", sign: "ि", sound: "ki" },
          { char: "की", roman: "kee", sign: "ी", sound: "kee" },
          { char: "कु", roman: "ku", sign: "ु", sound: "ku" },
          { char: "कू", roman: "koo", sign: "ू", sound: "koo" },
          { char: "कृ", roman: "kri", sign: "ृ", sound: "kri" },
          { char: "के", roman: "ke", sign: "े", sound: "ke" },
          { char: "कै", roman: "kai", sign: "ै", sound: "kai" },
          { char: "को", roman: "ko", sign: "ो", sound: "ko" },
          { char: "कौ", roman: "kau", sign: "ौ", sound: "kau" },
          { char: "कं", roman: "kam", sign: "ं", sound: "kam" },
          { char: "कः", roman: "kah", sign: "ः", sound: "kah" },
        ]
      },
      {
        type: "consonants",
        title: "2️⃣ Consonants (व्यंजन) — 33 Letters",
        description: "These have the inherent vowel अ (a) unless a vowel sign removes it.",
        groups: [
          {
            name: "K-Varga — Guttural",
            letters: [
              { char: "क", roman: "ka", sound: "k in kite", example: "कमल (lotus)" },
              { char: "ख", roman: "kha", sound: "kh aspirated", example: "खजाना" },
              { char: "ग", roman: "ga", sound: "g in go", example: "गमला" },
              { char: "घ", roman: "gha", sound: "gh aspirated", example: "घर (house)" },
              { char: "ङ", roman: "nga", sound: "ng in sing", example: "अङ्गूर" },
            ]
          },
          {
            name: "CH-Varga — Palatal",
            letters: [
              { char: "च", roman: "cha", sound: "ch in chair", example: "चम्मच" },
              { char: "छ", roman: "chha", sound: "chh aspirated", example: "छत" },
              { char: "ज", roman: "ja", sound: "j in jump", example: "जल" },
              { char: "झ", roman: "jha", sound: "jh aspirated", example: "झंडा" },
              { char: "ञ", roman: "nya", sound: "ny in canyon", example: "ज्ञान" },
            ]
          },
          {
            name: "T-Varga — Retroflex",
            letters: [
              { char: "ट", roman: "Ta", sound: "hard T", example: "टमाटर" },
              { char: "ठ", roman: "Tha", sound: "hard T aspirated", example: "ठंड" },
              { char: "ड", roman: "Da", sound: "hard D", example: "डर" },
              { char: "ढ", roman: "Dha", sound: "hard D aspirated", example: "ढक्कन" },
              { char: "ण", roman: "Na", sound: "hard N", example: "कर्ण" },
            ]
          },
          {
            name: "T-Varga — Dental",
            letters: [
              { char: "त", roman: "ta", sound: "soft t", example: "ताला" },
              { char: "थ", roman: "tha", sound: "soft t aspirated", example: "थैला" },
              { char: "द", roman: "da", sound: "soft d", example: "दाल" },
              { char: "ध", roman: "dha", sound: "soft d aspirated", example: "धन" },
              { char: "न", roman: "na", sound: "n in no", example: "नमक" },
            ]
          },
          {
            name: "P-Varga — Labial",
            letters: [
              { char: "प", roman: "pa", sound: "p in pen", example: "पानी" },
              { char: "फ", roman: "pha", sound: "ph aspirated", example: "फल" },
              { char: "ब", roman: "ba", sound: "b in bat", example: "बाल" },
              { char: "भ", roman: "bha", sound: "bh aspirated", example: "भालू" },
              { char: "म", roman: "ma", sound: "m in man", example: "मकान" },
            ]
          },
          {
            name: "Semi-Vowels & Sibilants",
            letters: [
              { char: "य", roman: "ya", sound: "y in yes", example: "यमुना" },
              { char: "र", roman: "ra", sound: "rolled r", example: "रात" },
              { char: "ल", roman: "la", sound: "l in love", example: "लाल" },
              { char: "व", roman: "va", sound: "v/w sound", example: "वन" },
              { char: "श", roman: "sha", sound: "sh in ship", example: "शरद" },
              { char: "ष", roman: "Sha", sound: "harder sh", example: "कृष्ण" },
              { char: "स", roman: "sa", sound: "s in sun", example: "सब" },
              { char: "ह", roman: "ha", sound: "h in hat", example: "हाथ" },
            ]
          }
        ]
      },
      {
        type: "consonants",
        title: "3️⃣ Special Combined Consonants",
        groups: [
          {
            name: "Sanyukt Vyanjan",
            letters: [
              { char: "क्ष", roman: "ksha", sound: "k + sh", example: "क्षेत्र" },
              { char: "त्र", roman: "tra", sound: "t + r", example: "त्रिभुज" },
              { char: "ज्ञ", roman: "gya", sound: "g + y + a", example: "ज्ञान" },
            ]
          }
        ]
      },
      {
        type: "consonants",
        title: "4️⃣ Nuqta Letters (Loanwords)",
        groups: [
          {
            name: "Foreign Sounds (Persian, Arabic, English)",
            letters: [
              { char: "क़", roman: "q", sound: "guttural k", example: "क़त्ल" },
              { char: "ख़", roman: "kh", sound: "guttural kh", example: "ख़त" },
              { char: "ग़", roman: "gh", sound: "guttural gh", example: "ग़लत" },
              { char: "ज़", roman: "z", sound: "z in zoo", example: "ज़मीन" },
              { char: "ड़", roman: "R", sound: "hard r (flap)", example: "पेड़" },
              { char: "ढ़", roman: "Rh", sound: "aspirated hard r", example: "पढ़ना" },
              { char: "फ़", roman: "f", sound: "f in fan", example: "साफ़" },
            ]
          }
        ]
      },
      {
        type: "numbers",
        title: "🔢 Hindi Numbers (0-9)",
        letters: [
          { char: "०", roman: "0" }, { char: "१", roman: "1" }, { char: "२", roman: "2" },
          { char: "३", roman: "3" }, { char: "४", roman: "4" }, { char: "५", roman: "5" },
          { char: "६", roman: "6" }, { char: "७", roman: "7" }, { char: "८", roman: "8" }, { char: "९", roman: "9" },
        ]
      },
      {
        type: "words",
        title: "✍️ Example Words",
        words: [
          { native: "नमस्ते", roman: "Namaste", meaning: "Hello" },
          { native: "पानी", roman: "Paani", meaning: "Water" },
          { native: "घर", roman: "Ghar", meaning: "House" },
          { native: "आम", roman: "Aam", meaning: "Mango" },
          { native: "खाना", roman: "Khaana", meaning: "Food" },
          { native: "स्कूल", roman: "School", meaning: "School" },
          { native: "धन्यवाद", roman: "Dhanyavaad", meaning: "Thank you" },
          { native: "आप कैसे हैं?", roman: "Aap kaise hain?", meaning: "How are you?" },
          { native: "हिन्दी", roman: "Hindi", meaning: "Hindi language" },
        ]
      }
    ]
  },

  English: {
    title: "English — Latin Alphabet",
    subtitle: "Latin Script · 5 Vowels · 21 Consonants",
    intro: "English uses the Latin alphabet (also called Roman script). It is written left to right. Unlike Indian scripts, English letters have no inherent vowel — each letter represents a sound by itself, and vowels can represent multiple different sounds depending on the word.",
    totalLetters: "26",
    specialNote: "English pronunciation can be tricky because spelling does not always match sound. Also, English is stress-timed, not syllable-timed like most Indian languages.",
    sections: [
      {
        type: "vowels",
        title: "🔤 Full A-Z Alphabet",
        description: "The complete 26-letter modern English alphabet.",
        letters: [
          { char: "A", roman: "a" }, { char: "B", roman: "b" }, { char: "C", roman: "c" }, { char: "D", roman: "d" }, { char: "E", roman: "e" },
          { char: "F", roman: "f" }, { char: "G", roman: "g" }, { char: "H", roman: "h" }, { char: "I", roman: "i" }, { char: "J", roman: "j" },
          { char: "K", roman: "k" }, { char: "L", roman: "l" }, { char: "M", roman: "m" }, { char: "N", roman: "n" }, { char: "O", roman: "o" },
          { char: "P", roman: "p" }, { char: "Q", roman: "q" }, { char: "R", roman: "r" }, { char: "S", roman: "s" }, { char: "T", roman: "t" },
          { char: "U", roman: "u" }, { char: "V", roman: "v" }, { char: "W", roman: "w" }, { char: "X", roman: "x" }, { char: "Y", roman: "y" }, { char: "Z", roman: "z" },
        ]
      },
      {
        type: "vowels",
        title: "1️⃣ Vowels — 5 Letters",
        description: "Each vowel can make multiple sounds — short, long, and diphthongs. 'Y' can also function as a vowel.",
        letters: [
          { char: "A", roman: "a", name: "Ay", sound: "apple /æ/ | acorn /eɪ/", example: "father, about" },
          { char: "E", roman: "e", name: "Ee", sound: "egg /ɛ/ | equal /iː/", example: "her, pretty" },
          { char: "I", roman: "i", name: "Eye", sound: "it /ɪ/ | ice /aɪ/", example: "bird, machine" },
          { char: "O", roman: "o", name: "Oh", sound: "octopus /ɒ/ | open /oʊ/", example: "move, woman" },
          { char: "U", roman: "u", name: "You", sound: "up /ʌ/ | use /juː/", example: "put, busy" },
        ]
      },
      {
        type: "consonants",
        title: "2️⃣ Consonants — 21 Letters",
        groups: [
          {
            name: "B to H",
            letters: [
              { char: "B", roman: "b", name: "Bee", sound: "ball /b/" },
              { char: "C", roman: "c", name: "See", sound: "cat /k/ or city /s/" },
              { char: "D", roman: "d", name: "Dee", sound: "dog /d/" },
              { char: "F", roman: "f", name: "Ef", sound: "fish /f/" },
              { char: "G", roman: "g", name: "Jee", sound: "go /g/ or gym /dʒ/" },
              { char: "H", roman: "h", name: "Aitch", sound: "hat /h/" },
            ]
          },
          {
            name: "J to P",
            letters: [
              { char: "J", roman: "j", name: "Jay", sound: "jump /dʒ/" },
              { char: "K", roman: "k", name: "Kay", sound: "kite /k/" },
              { char: "L", roman: "l", name: "El", sound: "love /l/" },
              { char: "M", roman: "m", name: "Em", sound: "man /m/" },
              { char: "N", roman: "n", name: "En", sound: "no /n/" },
              { char: "P", roman: "p", name: "Pee", sound: "pen /p/" },
            ]
          },
          {
            name: "Q to Z",
            letters: [
              { char: "Q", roman: "q", name: "Queue", sound: "queen /kw/" },
              { char: "R", roman: "r", name: "Ar", sound: "run /r/" },
              { char: "S", roman: "s", name: "Es", sound: "sun /s/ or is /z/" },
              { char: "T", roman: "t", name: "Tee", sound: "top /t/" },
              { char: "V", roman: "v", name: "Vee", sound: "van /v/ (teeth on lip)" },
              { char: "W", roman: "w", name: "Double-U", sound: "water /w/ (rounded lips)" },
              { char: "X", roman: "x", name: "Ex", sound: "box /ks/ or xylophone /z/" },
              { char: "Y", roman: "y", name: "Why", sound: "yes /j/ or my /aɪ/" },
              { char: "Z", roman: "z", name: "Zed/Zee", sound: "zebra /z/" },
            ]
          }
        ]
      },
      {
        type: "consonants",
        title: "3️⃣ Common Digraphs & Diphthongs",
        description: "Digraphs (2 letters = 1 sound) and Diphthongs (2 vowel sounds blended).",
        groups: [
          {
            name: "Consonant Digraphs",
            letters: [
              { char: "sh", sound: "ship /ʃ/", example: "she, fish" },
              { char: "ch", sound: "chair /tʃ/", example: "church" },
              { char: "th", sound: "think /θ/ (voiceless)", example: "three" },
              { char: "th", sound: "the /ð/ (voiced)", example: "that" },
              { char: "ph", sound: "phone /f/", example: "photo" },
              { char: "ng", sound: "sing /ŋ/", example: "ring" },
            ]
          },
          {
            name: "Common Diphthongs",
            letters: [
              { char: "ay", sound: "cake /eɪ/", example: "day, play" },
              { char: "ie", sound: "ice /aɪ/", example: "bye, fly" },
              { char: "oi", sound: "oil /ɔɪ/", example: "boy, coin" },
              { char: "ou", sound: "out /aʊ/", example: "cow, house" },
            ]
          }
        ]
      },
      {
        type: "numbers",
        title: "🔢 English Numbers (0-9)",
        letters: [
          { char: "0", roman: "Zero" }, { char: "1", roman: "One" }, { char: "2", roman: "Two" },
          { char: "3", roman: "Three" }, { char: "4", roman: "Four" }, { char: "5", roman: "Five" },
          { char: "6", roman: "Six" }, { char: "7", roman: "Seven" }, { char: "8", roman: "Eight" }, { char: "9", roman: "Nine" },
        ]
      },
      {
        type: "words",
        title: "✍️ Example Words (Common in India)",
        words: [
          { native: "Hello", roman: "/həˈloʊ/", meaning: "हेलो" },
          { native: "Thank you", roman: "/ˈθæŋk juː/", meaning: "थैंक्यू" },
          { native: "Please", roman: "/pliːz/", meaning: "प्लीज़" },
          { native: "Sorry", roman: "/ˈsɑːri/", meaning: "सॉरी" },
          { native: "Water", roman: "/ˈwɔːtər/", meaning: "वॉटर" },
          { native: "School", roman: "/skuːl/", meaning: "स्कूल" },
          { native: "Hospital", roman: "/ˈhɑːspɪtəl/", meaning: "हॉस्पिटल" },
          { native: "India", roman: "/ˈɪndiə/", meaning: "इंडिया" },
          { native: "English", roman: "/ˈɪŋɡlɪʃ/", meaning: "इंग्लिश" },
        ]
      }
    ]
  },

  Tamil: {
    title: "Tamil — தமிழ் அரிச்சுவடி",
    subtitle: "Tamil Arichuvadi · 12 Vowels · 18 Consonants · 1 Special",
    intro: "Tamil is one of the oldest living languages in the world. The script has no aspirated sounds and no voicing distinction (k and g are the same letter). It uses rounded, looped shapes originally designed for writing on palm leaves.",
    totalLetters: "31",
    specialNote: "Unlike Hindi or English, Tamil has no aspirated consonants (kh, gh, chh, jh, th, dh, ph, bh). It also features the unique 'ZH' (ழ) sound which is a retroflex approximant.",
    sections: [
      {
        type: "vowels",
        title: "1️⃣ Vowels (Uyir - உயிர்) — 12 Letters",
        description: "Vowels are called 'Uyir' meaning 'life' in Tamil because they give life to consonants.",
        letters: [
          { char: "அ", roman: "a", sound: "u in up" },
          { char: "ஆ", roman: "aa", sound: "a in father" },
          { char: "இ", roman: "i", sound: "i in in" },
          { char: "ஈ", roman: "ee", sound: "ee in feet" },
          { char: "உ", roman: "u", sound: "u in put" },
          { char: "ஊ", roman: "oo", sound: "oo in boot" },
          { char: "எ", roman: "e", sound: "e in pet" },
          { char: "ஏ", roman: "ae", sound: "a in fame" },
          { char: "ஐ", roman: "ai", sound: "i in ice" },
          { char: "ஒ", roman: "o", sound: "o in old" },
          { char: "ஓ", roman: "oa", sound: "o in go" },
          { char: "ஔ", roman: "au", sound: "ou in our" },
        ]
      },
      {
        type: "consonants",
        title: "2️⃣ Consonants (Mei - மெய்) — 18 Letters",
        description: "In their pure form, consonants have a dot (pulli - ்) above them.",
        groups: [
          {
            name: "Hard Consonants (Vallinam)",
            letters: [
              { char: "க்", roman: "k", sound: "k in kite" },
              { char: "ச்", roman: "ch/s", sound: "ch/s" },
              { char: "ட்", roman: "T", sound: "hard T" },
              { char: "த்", roman: "th", sound: "soft th" },
              { char: "ப்", roman: "p", sound: "p in pen" },
              { char: "ற்", roman: "R", sound: "rolled R" },
            ]
          },
          {
            name: "Soft Consonants / Nasals (Mellinam)",
            letters: [
              { char: "ங்", roman: "ng", sound: "ng in sing" },
              { char: "ஞ்", roman: "ny", sound: "ny in canyon" },
              { char: "ண்", roman: "N", sound: "hard N" },
              { char: "ந்", roman: "n", sound: "dental n" },
              { char: "ம்", roman: "m", sound: "m in man" },
              { char: "ன்", roman: "n", sound: "alveolar n" },
            ]
          },
          {
            name: "Medium Consonants (Idaiyinam)",
            letters: [
              { char: "ய்", roman: "y", sound: "y in yes" },
              { char: "ர்", roman: "r", sound: "tapped r" },
              { char: "ல்", roman: "l", sound: "l in love" },
              { char: "வ்", roman: "v", sound: "v in van" },
              { char: "ழ்", roman: "zh", sound: "unique Tamil zha" },
              { char: "ள்", roman: "L", sound: "hard L" },
            ]
          }
        ]
      },
      {
        type: "diacritics",
        title: "3️⃣ Special Character",
        letters: [
          { char: "ஃ", name: "Aytham", use: "Glottal stop" }
        ]
      },
      {
        type: "numbers",
        title: "4️⃣ Tamil Numbers (0-9)",
        letters: [
          { char: "௦", roman: "0" }, { char: "௧", roman: "1" }, { char: "௨", roman: "2" },
          { char: "௩", roman: "3" }, { char: "௪", roman: "4" }, { char: "௫", roman: "5" },
          { char: "௬", roman: "6" }, { char: "௭", roman: "7" }, { char: "௮", roman: "8" }, { char: "௯", roman: "9" }
        ]
      },
      {
        type: "words",
        title: "5️⃣ Common Words",
        words: [
          { native: "வணக்கம்", roman: "Vanakkam", meaning: "Hello" },
          { native: "நன்றி", roman: "Nandri", meaning: "Thank you" },
          { native: "நீர்", roman: "Neer", meaning: "Water" },
          { native: "அம்மா", roman: "Amma", meaning: "Mother" },
          { native: "அப்பா", roman: "Appa", meaning: "Father" },
          { native: "தமிழ்", roman: "Tamil", meaning: "Tamil" }
        ]
      }
    ]
  },

  Bengali: {
    title: "Bengali — বাংলা লিপি",
    subtitle: "Bangla Script · 11 Vowels · 39 Consonants",
    intro: "Bengali script has a straight but slightly angled horizontal top line. It is written left to right. Bengali is spoken in West Bengal, Tripura, Assam, and Bangladesh.",
    totalLetters: "50",
    specialNote: "Bengali অ is pronounced 'o' (like 'on') — not 'a' like in Hindi. The script has no 'v' sound; 'ব' is always 'b'.",
    sections: [
      {
        type: "vowels",
        title: "1️⃣ Vowels (Shorborno - স্বরবর্ণ) — 11 Letters",
        letters: [
          { char: "অ", roman: "o", sound: "aw (on)" },
          { char: "আ", roman: "aa", sound: "aa (father)" },
          { char: "ই", roman: "i", sound: "i (in)" },
          { char: "ঈ", roman: "ee", sound: "ee (feet)" },
          { char: "উ", roman: "u", sound: "u (put)" },
          { char: "ঊ", roman: "oo", sound: "oo (boot)" },
          { char: "ঋ", roman: "ri", sound: "ri (ring)" },
          { char: "এ", roman: "e", sound: "ay (they)" },
          { char: "ঐ", roman: "oi", sound: "oi (oil)" },
          { char: "ও", roman: "o", sound: "oh (go)" },
          { char: "ঔ", roman: "ou", sound: "ou (out)" }
        ]
      },
      {
        type: "consonants",
        title: "2️⃣ Consonants (Byanjonborno - ব্যঞ্জনবর্ণ) — 39 Letters",
        groups: [
          {
            name: "ক-বর্গ (K Group) — Velar",
            letters: [
              { char: "ক", roman: "k", sound: "ko (kite)" },
              { char: "খ", roman: "kh", sound: "kho (khaki)" },
              { char: "গ", roman: "g", sound: "go (go)" },
              { char: "ঘ", roman: "gh", sound: "gho (ghost)" },
              { char: "ঙ", roman: "ng", sound: "ngo (sing)" }
            ]
          },
          {
            name: "চ-বর্গ (Ch Group) — Palatal",
            letters: [
              { char: "চ", roman: "ch", sound: "cho (chair)" },
              { char: "ছ", roman: "chh", sound: "chho (chhota)" },
              { char: "জ", roman: "j", sound: "jo (jump)" },
              { char: "ঝ", roman: "jh", sound: "jho (jhumka)" },
              { char: "ঞ", roman: "n", sound: "no (canyon)" }
            ]
          },
          {
            name: "ট-বর্গ (T Group) — Retroflex",
            letters: [
              { char: "ট", roman: "T", sound: "To (hard T)" },
              { char: "ঠ", roman: "Th", sound: "Tho (hard Th)" },
              { char: "ড", roman: "D", sound: "Do (hard D)" },
              { char: "ঢ", roman: "Dh", sound: "Dho (hard Dh)" },
              { char: "ণ", roman: "N", sound: "No (hard N)" }
            ]
          },
          {
            name: "ত-বর্গ (T Group) — Dental",
            letters: [
              { char: "ত", roman: "t", sound: "to (soft t)" },
              { char: "থ", roman: "th", sound: "tho (thank)" },
              { char: "দ", roman: "d", sound: "do (soft d)" },
              { char: "ধ", roman: "dh", sound: "dho (soft dh)" },
              { char: "ন", roman: "n", sound: "no (no)" }
            ]
          },
          {
            name: "প-বর্গ (P Group) — Labial",
            letters: [
              { char: "প", roman: "p", sound: "po (pen)" },
              { char: "ফ", roman: "ph/f", sound: "pho/fo (fan)" },
              { char: "ব", roman: "b", sound: "bo (bat)" },
              { char: "ভ", roman: "bh", sound: "bho (abhor)" },
              { char: "ম", roman: "m", sound: "mo (man)" }
            ]
          },
          {
            name: "Semi-Vowels & Special",
            letters: [
              { char: "য", roman: "j/y", sound: "jo/yo" },
              { char: "র", roman: "r", sound: "ro (rolled)" },
              { char: "ল", roman: "l", sound: "lo (love)" },
              { char: "শ", roman: "sh", sound: "sho (ship)" },
              { char: "ষ", roman: "Sh", sound: "Sho (harder sh)" },
              { char: "স", roman: "s", sound: "so (sun)" },
              { char: "হ", roman: "h", sound: "ho (hat)" },
              { char: "ড়", roman: "r", sound: "ro (hard r)" },
              { char: "ঢ়", roman: "rh", sound: "rho (hard rh)" },
              { char: "য়", roman: "y", sound: "yo (soft y)" },
              { char: "ৎ", roman: "t", sound: "t (final t)" },
              { char: "ং", roman: "ng", sound: "ng (nasal)" },
              { char: "ঃ", roman: "h", sound: "h (aspiration)" },
              { char: "ঁ", roman: "~", sound: "nasal sound" }
            ]
          }
        ]
      },
      {
        type: "diacritics",
        title: "3️⃣ Vowel Signs (Kar - কার) — shown on ক",
        letters: [
          { char: "ক", roman: "ko", name: "Mukta" },
          { char: "কা", roman: "kaa", name: "aa-kar া" },
          { char: "কি", roman: "ki", name: "i-kar ি" },
          { char: "কী", roman: "kee", name: "ee-kar ী" },
          { char: "কু", roman: "ku", name: "u-kar ু" },
          { char: "কূ", roman: "koo", name: "oo-kar ূ" },
          { char: "কৃ", roman: "kri", name: "ri-kar ৃ" },
          { char: "কে", roman: "ke", name: "e-kar ে" },
          { char: "কৈ", roman: "koi", name: "oi-kar ৈ" },
          { char: "কো", roman: "ko", name: "o-kar ো" },
          { char: "কৌ", roman: "kou", name: "ou-kar ৌ" }
        ]
      },
      {
        type: "conjuncts",
        title: "4️⃣ Common Conjuncts (Juktakkhor)",
        letters: [
          { char: "ক্ত", roman: "kt", name: "rokto (blood)" },
          { char: "চ্চ", roman: "ccho", name: "accha (okay)" },
          { char: "জ্ঞ", roman: "ggo", name: "gyan (knowledge)" },
          { char: "ত্র", roman: "tro", name: "trish (thirty)" },
          { char: "ষ্ণ", roman: "sno", name: "Krishno" }
        ]
      },
      {
        type: "numbers",
        title: "5️⃣ Bengali Numbers (0-9)",
        letters: [
          { char: "০", roman: "0 (shunno)" },
          { char: "১", roman: "1 (ek)" },
          { char: "২", roman: "2 (dui)" },
          { char: "৩", roman: "3 (tin)" },
          { char: "৪", roman: "4 (chaar)" },
          { char: "৫", roman: "5 (paanch)" },
          { char: "৬", roman: "6 (chhoy)" },
          { char: "৭", roman: "7 (saat)" },
          { char: "৮", roman: "8 (aat)" },
          { char: "৯", roman: "9 (noy)" }
        ]
      },
      {
        type: "words",
        title: "6️⃣ Common Bengali Words",
        words: [
          { native: "নমস্কার", roman: "nomoskar", meaning: "Hello" },
          { native: "পানি", roman: "paani", meaning: "Water" },
          { native: "মা", roman: "maa", meaning: "Mother" },
          { native: "বাবা", roman: "baabaa", meaning: "Father" },
          { native: "ভাই", roman: "bhaai", meaning: "Brother" },
          { native: "বোন", roman: "bon", meaning: "Sister" },
          { native: "ধন্যবাদ", roman: "dhonnobad", meaning: "Thank you" },
          { native: "ভালো", roman: "bhaalo", meaning: "Good" },
          { native: "সুন্দর", roman: "shundor", meaning: "Beautiful" },
          { native: "বাংলা", roman: "Bangla", meaning: "Bengali" }
        ]
      }
    ]
  },

  Marathi: {
    title: "Marathi — मराठी वर्णमाला",
    subtitle: "Devanagari Script · 13 Vowels · 34 Consonants",
    intro: "Marathi uses the Devanagari script, similar to Hindi, but includes an extra letter ळ. It is spoken by over 83 million people primarily in Maharashtra.",
    totalLetters: "47",
    specialNote: "The letter ळ (hard L) is unique to Marathi in the Devanagari family. Marathi also has a neuter gender, unlike Hindi.",
    sections: [
      {
        type: "vowels",
        title: "1️⃣ Vowels (Swar - स्वर) — 13 Letters",
        letters: [
          { char: "अ", roman: "a", sound: "uh (up)" },
          { char: "आ", roman: "aa", sound: "aa (father)" },
          { char: "इ", roman: "i", sound: "i (in)" },
          { char: "ई", roman: "ee", sound: "ee (feet)" },
          { char: "उ", roman: "u", sound: "u (put)" },
          { char: "ऊ", roman: "oo", sound: "oo (boot)" },
          { char: "ऋ", roman: "ri", sound: "ri (ring)" },
          { char: "ए", roman: "e", sound: "ay (they)" },
          { char: "ऐ", roman: "ai", sound: "ai (cat)" },
          { char: "ओ", roman: "o", sound: "oh (go)" },
          { char: "औ", roman: "au", sound: "ow (out)" },
          { char: "अं", roman: "am", sound: "am/un (nasal)" },
          { char: "अः", roman: "ah", sound: "ah (aha)" }
        ]
      },
      {
        type: "consonants",
        title: "2️⃣ Consonants (Vyanjan - व्यंजन) — 34 Letters",
        groups: [
          {
            name: "क-वर्ग (K Group) — Velar",
            letters: [
              { char: "क", roman: "ka", sound: "k (kite)", example: "कमल (lotus)" },
              { char: "ख", roman: "kha", sound: "kh (khaki)", example: "खर (donkey)" },
              { char: "ग", roman: "ga", sound: "g (go)", example: "गाय (cow)" },
              { char: "घ", roman: "gha", sound: "gh (ghost)", example: "घर (house)" },
              { char: "ङ", roman: "nga", sound: "ng (sing)", example: "अंग (body)" }
            ]
          },
          {
            name: "च-वर्ग (CH Group) — Palatal",
            letters: [
              { char: "च", roman: "cha", sound: "ch (chair)", example: "चहा (tea)" },
              { char: "छ", roman: "chha", sound: "chh (chhota)", example: "छत्र (umbrella)" },
              { char: "ज", roman: "ja", sound: "j (jump)", example: "जल (water)" },
              { char: "झ", roman: "jha", sound: "jh (jhumka)", example: "झाडू (broom)" },
              { char: "ञ", roman: "nya", sound: "ny (canyon)", example: "ज्ञान (knowledge)" }
            ]
          },
          {
            name: "ट-वर्ग (T Group) — Retroflex",
            letters: [
              { char: "ट", roman: "Ta", sound: "hard T", example: "टोपी (hat)" },
              { char: "ठ", roman: "Tha", sound: "hard Th", example: "ठंड (cold)" },
              { char: "ड", roman: "Da", sound: "hard D", example: "डबा (box)" },
              { char: "ढ", roman: "Dha", sound: "hard Dh", example: "ढक्कन (lid)" },
              { char: "ण", roman: "Na", sound: "hard N", example: "कण (particle)" }
            ]
          },
          {
            name: "त-वर्ग (T Group) — Dental",
            letters: [
              { char: "त", roman: "ta", sound: "soft t", example: "तारा (star)" },
              { char: "थ", roman: "tha", sound: "soft th", example: "थंड (cold)" },
              { char: "द", roman: "da", sound: "soft d", example: "दार (door)" },
              { char: "ध", roman: "dha", sound: "soft dh", example: "धन (wealth)" },
              { char: "न", roman: "na", sound: "n (no)", example: "नाक (nose)" }
            ]
          },
          {
            name: "प-वर्ग (P Group) — Labial",
            letters: [
              { char: "प", roman: "pa", sound: "p (pen)", example: "पाणी (water)" },
              { char: "फ", roman: "pha", sound: "ph (phone)", example: "फूल (flower)" },
              { char: "ब", roman: "ba", sound: "b (bat)", example: "बाग (garden)" },
              { char: "भ", roman: "bha", sound: "bh (abhor)", example: "भाऊ (brother)" },
              { char: "म", roman: "ma", sound: "m (man)", example: "मन (mind)" }
            ]
          },
          {
            name: "Semi-Vowels & Sibilants",
            letters: [
              { char: "य", roman: "ya", sound: "y (yes)" },
              { char: "र", roman: "ra", sound: "rolled r" },
              { char: "ल", roman: "la", sound: "l (love)" },
              { char: "व", roman: "va", sound: "v (van)" },
              { char: "श", roman: "sha", sound: "sh (ship)" },
              { char: "ष", roman: "Sha", sound: "harder sh" },
              { char: "স", roman: "sa", sound: "s (sun)" },
              { char: "হ", roman: "ha", sound: "h (hat)" },
              { char: "ळ", roman: "La", sound: "hard L (unique)" }
            ]
          }
        ]
      },
      {
        type: "diacritics",
        title: "3️⃣ Vowel Signs (Matra) — shown with क",
        letters: [
          { char: "क", roman: "ka", name: "Mukta" },
          { char: "का", roman: "kaa", name: "aa-matra" },
          { char: "कि", roman: "ki", name: "i-matra" },
          { char: "की", roman: "kee", name: "ee-matra" },
          { char: "कु", roman: "ku", name: "u-matra" },
          { char: "कू", roman: "koo", name: "oo-matra" },
          { char: "कृ", roman: "kri", name: "ri-matra" },
          { char: "के", roman: "ke", name: "e-matra" },
          { char: "कै", roman: "kai", name: "ai-matra" },
          { char: "को", roman: "ko", name: "o-matra" },
          { char: "कौ", roman: "kau", name: "au-matra" }
        ]
      },
      {
        type: "numbers",
        title: "4️⃣ Marathi Numbers (0-9)",
        letters: [
          { char: "०", roman: "0 (shoonya)" },
          { char: "१", roman: "1 (ek)" },
          { char: "२", roman: "2 (don)" },
          { char: "३", roman: "3 (teen)" },
          { char: "४", roman: "4 (chaar)" },
          { char: "५", roman: "5 (paach)" },
          { char: "६", roman: "6 (sahaa)" },
          { char: "७", roman: "7 (saat)" },
          { char: "८", roman: "8 (aath)" },
          { char: "९", roman: "9 (nau)" }
        ]
      },
      {
        type: "words",
        title: "5️⃣ Common Marathi Words",
        words: [
          { native: "नमस्कार", roman: "Namaskar", meaning: "Hello" },
          { native: "पाणी", roman: "Paanee", meaning: "Water" },
          { native: "आई", roman: "Aai", meaning: "Mother" },
          { native: "बाबा", roman: "Baabaa", meaning: "Father" },
          { native: "भाऊ", roman: "Bhaau", meaning: "Brother" },
          { native: "बहीण", roman: "BaheeN", meaning: "Sister" },
          { native: "धन्यवाद", roman: "Dhanyavaad", meaning: "Thank you" },
          { native: "होय", roman: "Hoy", meaning: "Yes" },
          { native: "नाही", roman: "Naahee", meaning: "No" },
          { native: "चांगले", roman: "Chaangle", meaning: "Good" }
        ]
      }
    ]
  },

  Telugu: {
    title: "Telugu — తెలుగు లిపి",
    subtitle: "Italian of the East · 16 Vowels · 36 Consonants",
    intro: "Telugu is known for its rounded, circular shapes and melodic sound. Every word in Telugu ends with a vowel, earning it the nickname 'Italian of the East'.",
    totalLetters: "54",
    specialNote: "The script was designed for palm leaves, which is why it lacks straight lines that would tear the leaves.",
    sections: [
      {
        type: "vowels",
        title: "1️⃣ Vowels (Achchulu - అచ్చులు) — 16 Letters",
        letters: [
          { char: "అ", roman: "a", sound: "uh (up)" },
          { char: "ఆ", roman: "aa", sound: "aa (father)" },
          { char: "ఇ", roman: "i", sound: "i (in)" },
          { char: "ఈ", roman: "ee", sound: "ee (feet)" },
          { char: "ఉ", roman: "u", sound: "u (put)" },
          { char: "ఊ", roman: "oo", sound: "oo (boot)" },
          { char: "ఋ", roman: "ri", sound: "ri (ring)" },
          { char: "ౠ", roman: "ree", sound: "ree (long ri)" },
          { char: "ఎ", roman: "e", sound: "eh (pet)" },
          { char: "ఏ", roman: "ae", sound: "ay (say)" },
          { char: "ఐ", roman: "ai", sound: "eye (ice)" },
          { char: "ఒ", roman: "o", sound: "o (pot)" },
          { char: "ఓ", roman: "oa", sound: "oh (go)" },
          { char: "ఔ", roman: "au", sound: "ow (out)" },
          { char: "అం", roman: "am", sound: "um (nasal)" },
          { char: "అః", roman: "ah", sound: "ah (aha)" }
        ]
      },
      {
        type: "consonants",
        title: "2️⃣ Consonants (Hallulu - హల్లులు) — 36 Letters",
        groups: [
          {
            name: "క-వర్గం (K Group) — Velar",
            letters: [
              { char: "క", roman: "ka", sound: "k (kite)", example: "కమలం (lotus)" },
              { char: "ఖ", roman: "kha", sound: "kh (khaki)", example: "ఖర్చు (expense)" },
              { char: "గ", roman: "ga", sound: "g (go)", example: "గమనం (movement)" },
              { char: "ఘ", roman: "gha", sound: "gh (ghost)", example: "ఘర్షణ (friction)" },
              { char: "ఙ", roman: "nga", sound: "ng (sing)", example: "మఙ్గళ (auspicious)" }
            ]
          },
          {
            name: "చ-వర్గం (CH Group) — Palatal",
            letters: [
              { char: "చ", roman: "cha", sound: "ch (chair)", example: "చదువు (study)" },
              { char: "ఛ", roman: "chha", sound: "chh (chhota)", example: "ఛాయ (shadow)" },
              { char: "జ", roman: "ja", sound: "j (jump)", example: "జలం (water)" },
              { char: "ఝ", roman: "jha", sound: "jh (jhumka)", example: "ఝంఝా (storm)" },
              { char: "ఞ", roman: "nya", sound: "ny (canyon)", example: "ఞానము (knowledge)" }
            ]
          },
          {
            name: "ట-వర్గం (T Group) — Retroflex",
            letters: [
              { char: "ట", roman: "Ta", sound: "hard T", example: "టమాట (tomato)" },
              { char: "ఠ", roman: "Tha", sound: "hard Th", example: "ఠీవి (style)" },
              { char: "డ", roman: "Da", sound: "hard D", example: "డబ్బు (money)" },
              { char: "ఢ", roman: "Dha", sound: "hard Dh", example: "ఢంకా (drum)" },
              { char: "ణ", roman: "Na", sound: "hard N", example: "గుణం (quality)" }
            ]
          },
          {
            name: "త-వర్గం (T Group) — Dental",
            letters: [
              { char: "త", roman: "ta", sound: "soft t", example: "తల (head)" },
              { char: "థ", roman: "tha", sound: "soft th", example: "థాంక్స్ (thanks)" },
              { char: "ద", roman: "da", sound: "soft d", example: "దయ (kindness)" },
              { char: "ధ", roman: "dha", sound: "soft dh", example: "ధనం (wealth)" },
              { char: "న", roman: "na", sound: "n (no)", example: "నది (river)" }
            ]
          },
          {
            name: "ప-వర్గం (P Group) — Labial",
            letters: [
              { char: "ప", roman: "pa", sound: "p (pen)", example: "పని (work)" },
              { char: "ఫ", roman: "pha", sound: "ph (phone)", example: "ఫలం (fruit)" },
              { char: "బ", roman: "ba", sound: "b (bat)", example: "బడి (school)" },
              { char: "భ", roman: "bha", sound: "bh (abhor)", example: "భయం (fear)" },
              { char: "మ", roman: "ma", sound: "m (man)", example: "మనసు (heart)" }
            ]
          },
          {
            name: "Semi-Vowels & Sibilants",
            letters: [
              { char: "య", roman: "ya", sound: "y (yes)" },
              { char: "ర", roman: "ra", sound: "rolled r" },
              { char: "ల", roman: "la", sound: "l (love)" },
              { char: "వ", roman: "va", sound: "v (van)" },
              { char: "శ", roman: "sha", sound: "sh (ship)" },
              { char: "ష", roman: "Sha", sound: "harder sh" },
              { char: "స", roman: "sa", sound: "s (sun)" },
              { char: "హ", roman: "ha", sound: "h (hat)" },
              { char: "ళ", roman: "La", sound: "hard L" }
            ]
          }
        ]
      },
      {
        type: "diacritics",
        title: "3️⃣ Vowel Signs (Gunintamulu) — shown with క",
        letters: [
          { char: "క", roman: "ka", name: "Mukta" },
          { char: "కా", roman: "kaa", name: "aa-gunita" },
          { char: "కి", roman: "ki", name: "i-gunita" },
          { char: "కీ", roman: "kee", name: "ee-gunita" },
          { char: "కు", roman: "ku", name: "u-gunita" },
          { char: "కూ", roman: "koo", name: "oo-gunita" },
          { char: "కృ", roman: "kri", name: "ri-gunita" },
          { char: "కె", roman: "ke", name: "e-gunita" },
          { char: "కే", roman: "kae", name: "ae-gunita" },
          { char: "కై", roman: "kai", name: "ai-gunita" },
          { char: "కొ", roman: "ko", name: "o-gunita" },
          { char: "కో", roman: "koa", name: "oa-gunita" },
          { char: "కౌ", roman: "kau", name: "au-gunita" }
        ]
      },
      {
        type: "numbers",
        title: "4️⃣ Telugu Numbers (0-9)",
        letters: [
          { char: "౦", roman: "0 (sunna)" },
          { char: "౧", roman: "1 (okati)" },
          { char: "౨", roman: "2 (rendu)" },
          { char: "౩", roman: "3 (mudu)" },
          { char: "౪", roman: "4 (nalugu)" },
          { char: "౫", roman: "5 (aidu)" },
          { char: "౬", roman: "6 (aaru)" },
          { char: "౭", roman: "7 (edu)" },
          { char: "౮", roman: "8 (enimidi)" },
          { char: "౯", roman: "9 (tommidi)" }
        ]
      },
      {
        type: "words",
        title: "5️⃣ Common Telugu Words",
        words: [
          { native: "నమస్కారం", roman: "Namaskaaram", meaning: "Hello" },
          { native: "నీళ్ళు", roman: "Neellu", meaning: "Water" },
          { native: "అమ్మ", roman: "Amma", meaning: "Mother" },
          { native: "నాన్న", roman: "Naanna", meaning: "Father" },
          { native: "అన్న", roman: "Anna", meaning: "Brother" },
          { native: "అక్క", roman: "Akka", meaning: "Sister" },
          { native: "ధన్యవాదాలు", roman: "Dhanyavaadaalu", meaning: "Thank you" },
          { native: "అవును", roman: "Avunu", meaning: "Yes" },
          { native: "కాదు", roman: "Kaadu", meaning: "No" },
          { native: "బాగుంది", roman: "Baagundi", meaning: "Good" }
        ]
      }
    ]
  },

  Gujarati: {
    title: "Gujarati — ગુજરાતી લિપિ",
    subtitle: "No Top Bar · 12 Vowels · 34 Consonants",
    intro: "Gujarati script is derived from the Devanagari script but has no horizontal top bar (shirorekha). It is spoken by over 55 million people and is known for its rounded and flowing appearance.",
    totalLetters: "46",
    specialNote: "The letter ળ (hard L) is a unique feature of Gujarati, not found in standard Hindi. Like Marathi, Gujarati also has a neuter gender.",
    sections: [
      {
        type: "vowels",
        title: "1️⃣ Vowels (Svar - સ્વર) — 12 Letters",
        letters: [
          { char: "અ", roman: "a", sound: "uh (up)" },
          { char: "આ", roman: "aa", sound: "aa (father)" },
          { char: "ઇ", roman: "i", sound: "i (in)" },
          { char: "ઈ", roman: "ee", sound: "ee (feet)" },
          { char: "ઉ", roman: "u", sound: "u (put)" },
          { char: "ઊ", roman: "oo", sound: "oo (boot)" },
          { char: "ઋ", roman: "ri", sound: "ri (ring)" },
          { char: "એ", roman: "e", sound: "ay (they)" },
          { char: "ઐ", roman: "ai", sound: "ai (cat)" },
          { char: "ઓ", roman: "o", sound: "oh (go)" },
          { char: "ઔ", roman: "au", sound: "ow (out)" },
          { char: "અં", roman: "am", sound: "am/un (nasal)" }
        ]
      },
      {
        type: "consonants",
        title: "2️⃣ Consonants (Vyanjan - વ્યંજન) — 34 Letters",
        groups: [
          {
            name: "ક-વર્ગ (K Group) — Velar",
            letters: [
              { char: "ક", roman: "ka", sound: "k (kite)", example: "કમળ (lotus)" },
              { char: "ખ", roman: "kha", sound: "kh (khaki)", example: "ખરચ (expense)" },
              { char: "ગ", roman: "ga", sound: "g (go)", example: "ગાય (cow)" },
              { char: "ઘ", roman: "gha", sound: "gh (ghost)", example: "ઘર (house)" },
              { char: "ઙ", roman: "nga", sound: "ng (sing)", example: "અંગ (body part)" }
            ]
          },
          {
            name: "ચ-વર્ગ (CH Group) — Palatal",
            letters: [
              { char: "ચ", roman: "cha", sound: "ch (chair)", example: "ચાવી (key)" },
              { char: "છ", roman: "chha", sound: "chh (chhota)", example: "છત (roof)" },
              { char: "જ", roman: "ja", sound: "j (jump)", example: "જમીન (land)" },
              { char: "ઝ", roman: "jha", sound: "jh (jhumka)", example: "ઝડપ (speed)" },
              { char: "ઞ", roman: "nya", sound: "ny (canyon)", example: "જ્ઞાન (knowledge)" }
            ]
          },
          {
            name: "ટ-વર્ગ (T Group) — Retroflex",
            letters: [
              { char: "ટ", roman: "Ta", sound: "hard T", example: "ટબ (tub)" },
              { char: "ઠ", roman: "Tha", sound: "hard Th", example: "ઠંડું (cold)" },
              { char: "ડ", roman: "Da", sound: "hard D", example: "ડબ્બો (box)" },
              { char: "ઢ", roman: "Dha", sound: "hard Dh", example: "ઢોલ (drum)" },
              { char: "ણ", roman: "Na", sound: "hard N", example: "ગુણ (quality)" }
            ]
          },
          {
            name: "પ-વર્ગ (P Group) — Labial",
            letters: [
              { char: "પ", roman: "pa", sound: "p (pen)", example: "પાણી (water)" },
              { char: "ફ", roman: "pha", sound: "ph (phone)", example: "ફળ (fruit)" },
              { char: "બ", roman: "ba", sound: "b (bat)", example: "બાગ (garden)" },
              { char: "ભ", roman: "bha", sound: "bh (abhor)", example: "ભાઈ (brother)" },
              { char: "મ", roman: "ma", sound: "m (man)", example: "મન (mind)" }
            ]
          },
          {
            name: "Semi-Vowels & Sibilants",
            letters: [
              { char: "ય", roman: "ya", sound: "y (yes)" },
              { char: "ર", roman: "ra", sound: "rolled r" },
              { char: "લ", roman: "la", sound: "l (love)" },
              { char: "વ", roman: "va", sound: "v (van)" },
              { char: "શ", roman: "sha", sound: "sh (ship)" },
              { char: "ષ", roman: "Sha", sound: "harder sh" },
              { char: "સ", roman: "sa", sound: "s (sun)" },
              { char: "હ", roman: "ha", sound: "h (hat)" },
              { char: "ળ", roman: "La", sound: "hard L" }
            ]
          }
        ]
      },
      {
        type: "diacritics",
        title: "3️⃣ Vowel Signs (Matra) — shown with ક",
        letters: [
          { char: "ક", roman: "ka", name: "Mukta" },
          { char: "કા", roman: "kaa", name: "aa-matra" },
          { char: "કિ", roman: "ki", name: "i-matra" },
          { char: "કી", roman: "kee", name: "ee-matra" },
          { char: "કુ", roman: "ku", name: "u-matra" },
          { char: "કૂ", roman: "koo", name: "oo-matra" },
          { char: "કૃ", roman: "kri", name: "ri-matra" },
          { char: "કે", roman: "ke", name: "e-matra" },
          { char: "કૈ", roman: "kai", name: "ai-matra" },
          { char: "કો", roman: "ko", name: "o-matra" },
          { char: "કૌ", roman: "kau", name: "au-matra" },
          { char: "કં", roman: "kam", name: "Anusvar" }
        ]
      },
      {
        type: "numbers",
        title: "4️⃣ Gujarati Numbers (0-9)",
        letters: [
          { char: "૦", roman: "0 (shunya)" },
          { char: "૧", roman: "1 (ek)" },
          { char: "૨", roman: "2 (bay)" },
          { char: "૩", roman: "3 (tran)" },
          { char: "૪", roman: "4 (chaar)" },
          { char: "૫", roman: "5 (paanch)" },
          { char: "૬", roman: "6 (chhah)" },
          { char: "૭", roman: "7 (saat)" },
          { char: "૮", roman: "8 (aath)" },
          { char: "૯", roman: "9 (nav)" }
        ]
      },
      {
        type: "words",
        title: "5️⃣ Common Gujarati Words",
        words: [
          { native: "નમસ્તે", roman: "namaste", meaning: "Hello" },
          { native: "પાણી", roman: "paanee", meaning: "Water" },
          { native: "ઘર", roman: "ghar", meaning: "House" },
          { native: "મા", roman: "maa", meaning: "Mother" },
          { native: "પિતા", roman: "pitaa", meaning: "Father" },
          { native: "ભાઈ", roman: "bhaaee", meaning: "Brother" },
          { native: "બહેન", roman: "bahen", meaning: "Sister" },
          { native: "હા", roman: "haa", meaning: "Yes" },
          { native: "ના", roman: "naa", meaning: "No" },
          { native: "સારું", roman: "saarun", meaning: "Good" }
        ]
      }
    ]
  },
  Kannada: {
    title: "Kannada — ಕನ್ನಡ ಲಿಪಿ",
    subtitle: "Rounded Loops · 16 Vowels · 34 Consonants",
    intro: "Kannada script is known for its beautiful rounded loops. It is very similar to Telugu, as both evolved from the same ancient script.",
    totalLetters: "50",
    specialNote: "Kannada has no horizontal top line. The letters are written as distinct loops.",
    sections: [
      {
        type: "vowels",
        title: "1️⃣ Vowels (Svagalu - ಸ್ವಗಳು) — 16 Letters",
        letters: [
          { char: "ಅ", roman: "a", sound: "uh (up)" },
          { char: "ಆ", roman: "aa", sound: "aa (father)" },
          { char: "ಇ", roman: "i", sound: "i (in)" },
          { char: "ಈ", roman: "ee", sound: "ee (feet)" },
          { char: "ಉ", roman: "u", sound: "u (put)" },
          { char: "ಊ", roman: "oo", sound: "oo (boot)" },
          { char: "ಋ", roman: "ri", sound: "ri (ring)" },
          { char: "ೠ", roman: "ree", sound: "ree (long ri)" },
          { char: "ಎ", roman: "e", sound: "eh (pet)" },
          { char: "ಏ", roman: "ae", sound: "ay (say)" },
          { char: "ಐ", roman: "ai", sound: "eye (ice)" },
          { char: "ಒ", roman: "o", sound: "o (pot)" },
          { char: "ಓ", roman: "oa", sound: "oh (go)" },
          { char: "ಔ", roman: "au", sound: "ow (out)" },
          { char: "ಅಂ", roman: "am", sound: "um (nasal)" },
          { char: "ಅಃ", roman: "ah", sound: "ah (aha)" }
        ]
      },
      {
        type: "consonants",
        title: "2️⃣ Consonants (Vyanjanagalu - ವ್ಯಂಜನಗಳು) — 34 Letters",
        groups: [
          {
            name: "ಕ-ವರ್ಗ (K Group) — Velar",
            letters: [
              { char: "ಕ", roman: "ka", sound: "k (kite)", example: "ಕಮಲ (lotus)" },
              { char: "ಖ", roman: "kha", sound: "kh (khaki)", example: "ಖರೀದಿ (purchase)" },
              { char: "ಗ", roman: "ga", sound: "g (go)", example: "ಗಾಡಿ (vehicle)" },
              { char: "ಘ", roman: "gha", sound: "gh (ghost)", example: "ಘಂಟೆ (bell)" },
              { char: "ಙ", roman: "nga", sound: "ng (sing)", example: "ಮಙ್ಗಳ (auspicious)" }
            ]
          },
          {
            name: "ಚ-ವರ್ಗ (CH Group) — Palatal",
            letters: [
              { char: "ಚ", roman: "cha", sound: "ch (chair)", example: "ಚಹಾ (tea)" },
              { char: "ಛ", roman: "chha", sound: "chh (chhota)", example: "ಛತ್ರ (umbrella)" },
              { char: "ಜ", roman: "ja", sound: "j (jump)", example: "ಜಲ (water)" },
              { char: "ಝ", roman: "jha", sound: "jh (jhumka)", example: "ಝರಿ (waterfall)" },
              { char: "ಞ", roman: "nya", sound: "ny (canyon)", example: "ಞಾನ (knowledge)" }
            ]
          },
          {
            name: "ಟ-ವರ್ಗ (T Group) — Retroflex",
            letters: [
              { char: "ಟ", roman: "Ta", sound: "hard T", example: "ಟೊಮೇಟೊ (tomato)" },
              { char: "ಠ", roman: "Tha", sound: "hard Th", example: "ಠಕ್ಕ (cheat)" },
              { char: "ಡ", roman: "Da", sound: "hard D", example: "ಡಬ್ಬ (box)" },
              { char: "ಢ", roman: "Dha", sound: "hard Dh", example: "ಢक्के (push)" },
              { char: "ಣ", roman: "Na", sound: "hard N", example: "ಗುಣ (quality)" }
            ]
          },
          {
            name: "ತ-ವರ್ಗ (T Group) — Dental",
            letters: [
              { char: "ತ", roman: "ta", sound: "soft t", example: "ತಲೆ (head)" },
              { char: "ಥ", roman: "tha", sound: "soft th", example: "ಥಾಳಿ (plate)" },
              { char: "ದ", roman: "da", sound: "soft d", example: "ದಿನ (day)" },
              { char: "ಧ", roman: "dha", sound: "soft dh", example: "ಧന (wealth)" },
              { char: "ನ", roman: "na", sound: "n (no)", example: "ನದಿ (river)" }
            ]
          },
          {
            name: "ಪ-ವರ್ಗ (P Group) — Labial",
            letters: [
              { char: "ಪ", roman: "pa", sound: "p (pen)", example: "ಪುಸ್ತಕ (book)" },
              { char: "ಫ", roman: "pha", sound: "ph (phone)", example: "ಫಲ (fruit)" },
              { char: "ಬ", roman: "ba", sound: "b (bat)", example: "ಬಾಗಿಲು (door)" },
              { char: "ಭ", roman: "bha", sound: "bh (abhor)", example: "ಭಾರತ (India)" },
              { char: "ಮ", roman: "ma", sound: "m (man)", example: "ಮನ (mind)" }
            ]
          },
          {
            name: "Semi-Vowels & Sibilants",
            letters: [
              { char: "ಯ", roman: "ya", sound: "y (yes)" },
              { char: "ರ", roman: "ra", sound: "rolled r" },
              { char: "ಲ", roman: "la", sound: "l (love)" },
              { char: "ವ", roman: "va", sound: "v (van)" },
              { char: "ಶ", roman: "sha", sound: "sh (ship)" },
              { char: "ಷ", roman: "Sha", sound: "harder sh" },
              { char: "ಸ", roman: "sa", sound: "s (sun)" },
              { char: "ಹ", roman: "ha", sound: "h (hat)" },
              { char: "ಳ", roman: "La", sound: "hard L" }
            ]
          }
        ]
      },
      {
        type: "diacritics",
        title: "3️⃣ Vowel Signs (Gunitakshara) — shown with ಕ",
        letters: [
          { char: "ಕ", roman: "ka", name: "Mukta" },
          { char: "ಕಾ", roman: "kaa", name: "aa-matra" },
          { char: "ಕಿ", roman: "ki", name: "i-matra" },
          { char: "ಕೀ", roman: "kee", name: "ee-matra" },
          { char: "ಕು", roman: "ku", name: "u-matra" },
          { char: "ಕೂ", roman: "koo", name: "oo-matra" },
          { char: "ಕೃ", roman: "kri", name: "ri-matra" },
          { char: "ಕೆ", roman: "ke", name: "e-matra" },
          { char: "ಕೇ", roman: "kae", name: "e-long-matra" },
          { char: "ಕೈ", roman: "kai", name: "ai-matra" },
          { char: "ಕೊ", roman: "ko", name: "o-matra" },
          { char: "ಕೋ", roman: "koa", name: "o-long-matra" },
          { char: "ಕೌ", roman: "kau", name: "au-matra" }
        ]
      },
      {
        type: "numbers",
        title: "4️⃣ Kannada Numbers (೦-೯)",
        letters: [
          { char: "೦", roman: "0 (sonne)" },
          { char: "೧", roman: "1 (ondu)" },
          { char: "೨", roman: "2 (eradu)" },
          { char: "೩", roman: "3 (mooru)" },
          { char: "೪", roman: "4 (naalku)" },
          { char: "೫", roman: "5 (aidu)" },
          { char: "೬", roman: "6 (aaru)" },
          { char: "೭", roman: "7 (aelu)" },
          { char: "೮", roman: "8 (entu)" },
          { char: "೯", roman: "9 (ombattu)" }
        ]
      },
      {
        type: "words",
        title: "5️⃣ Common Kannada Words",
        words: [
          { native: "ನಮಸ್ಕಾರ", roman: "namaskaara", meaning: "Hello" },
          { native: "ನೀರು", roman: "neeru", meaning: "Water" },
          { native: "ಅನ್ನ", roman: "anna", meaning: "Rice" },
          { native: "ನಾನು", roman: "naanu", meaning: "I / Me" },
          { native: "ನೀನು", roman: "neenu", meaning: "You" },
          { native: "ಮನೆ", roman: "mane", meaning: "House" },
          { native: "ತಾಯಿ", roman: "taayi", meaning: "Mother" },
          { native: "ತಂದೆ", roman: "tande", meaning: "Father" },
          { native: "ಧನ್ಯವಾದಗಳು", roman: "dhanyavaadagalu", meaning: "Thank you" },
          { native: "ಹೌದು", roman: "houdu", meaning: "Yes" }
        ]
      }
    ]
  },

  Malayalam: {
    title: "Malayalam — മലയാളം ലിപി",
    subtitle: "Full Alphabet Guide · Vowels, Consonants, Signs & Chillu",
    intro: "Malayalam is a syllabic alphabet used primarily in Kerala. It has a rich phonetic system represented by beautiful curved characters.",
    totalLetters: "53+",
    specialNote: "Unique sounds include ഴ (ḻa) and distinct r/n variations. Chillu letters like ൻ, ർ are consonants without vowels.",
    sections: [
      {
        type: "vowels",
        title: "1️⃣ Vowels (Swarangal - സ്വരങ്ങൾ) — 15 Letters",
        letters: [
          { char: "അ", roman: "a", sound: "like 'about'", hindi: "अ", tamil: "அ", telugu: "అ", kannada: "ಅ", bengali: "অ" },
          { char: "ആ", roman: "aa", sound: "like 'father'", hindi: "आ", tamil: "ஆ", telugu: "ఆ", kannada: "ಆ", bengali: "আ" },
          { char: "ഇ", roman: "i", sound: "like 'ink'", hindi: "इ", tamil: "இ", telugu: "ఇ", kannada: "ಇ", bengali: "ই" },
          { char: "ഈ", roman: "ee", sound: "like 'see'", hindi: "ई", tamil: "ஈ", telugu: "ఈ", kannada: "ಈ", bengali: "ঈ" },
          { char: "ഉ", roman: "u", sound: "like 'put'", hindi: "उ", tamil: "உ", telugu: "ఉ", kannada: "ಉ", bengali: "উ" },
          { char: "ഊ", roman: "oo", sound: "like 'boot'", hindi: "ऊ", tamil: "ஊ", telugu: "ఊ", kannada: "ಊ", bengali: "ঊ" },
          { char: "ഋ", roman: "ri", sound: "like 'ri' in 'river'", hindi: "ऋ", tamil: "(ரி)", telugu: "ఋ", kannada: "ಋ", bengali: "ঋ" },
          { char: "ൠ", roman: "ree", sound: "long ree (rare)", hindi: "ॠ", telugu: "ౠ", kannada: "ೠ" },
          { char: "ഌ", roman: "lri", sound: "like 'lri' (rare)", hindi: "ऌ", telugu: "ఌ", kannada: "ಌ" },
          { char: "എ", roman: "e", sound: "like 'bet'", hindi: "ए", tamil: "எ", telugu: "ఎ", kannada: "ಎ", bengali: "এ" },
          { char: "ഏ", roman: "ey", sound: "like 'say'", hindi: "ऐ", tamil: "ஏ", telugu: "ఏ", kannada: "ಏ", bengali: "এ" },
          { char: "ഐ", roman: "ai", sound: "like 'my'", hindi: "ऐ", tamil: "ஐ", telugu: "ఐ", kannada: "ಐ", bengali: "ঐ" },
          { char: "ഒ", roman: "o", sound: "like 'go'", hindi: "ओ", tamil: "ஒ", telugu: "ఒ", kannada: "ಒ", bengali: "ও" },
          { char: "ഓ", roman: "oa", sound: "like 'slow'", hindi: "ओ", tamil: "ஓ", telugu: "ఓ", kannada: "ಓ", bengali: "ও" },
          { char: "ഔ", roman: "au", sound: "like 'now'", hindi: "औ", tamil: "ஔ", telugu: "ఔ", kannada: "ಔ", bengali: "ঔ" }
        ]
      },
      {
        type: "consonants",
        title: "2️⃣ Consonants (Vyanjanam - വ്യഞ്ജനം) — 36 Letters",
        groups: [
          {
            name: "Velars (K Group) - കവർഗ്ഗം",
            letters: [
              { char: "ക", roman: "ka", hindi: "क", tamil: "க", telugu: "క", kannada: "ಕ", bengali: "ক" },
              { char: "ഖ", roman: "kha", hindi: "ख", tamil: "க", telugu: "ఖ", kannada: "ಖ", bengali: "খ" },
              { char: "ഗ", roman: "ga", hindi: "ग", tamil: "க", telugu: "గ", kannada: "ಗ", bengali: "গ" },
              { char: "ഘ", roman: "gha", hindi: "घ", tamil: "க", telugu: "ఘ", kannada: "ಘ", bengali: "ঘ" },
              { char: "ങ", roman: "nga", hindi: "ङ", tamil: "ங", telugu: "ఙ", kannada: "ಙ", bengali: "ঙ" }
            ]
          },
          {
            name: "Palatals (Ch Group) - ചവർഗ്ഗം",
            letters: [
              { char: "ച", roman: "cha", hindi: "च", tamil: "ச", telugu: "చ", kannada: "ಚ", bengali: "চ" },
              { char: "ഛ", roman: "chha", hindi: "छ", tamil: "ச", telugu: "ఛ", kannada: "ಛ", bengali: "ছ" },
              { char: "ജ", roman: "ja", hindi: "ज", tamil: "ஜ", telugu: "జ", kannada: "ಜ", bengali: "জ" },
              { char: "ഝ", roman: "jha", hindi: "झ", tamil: "ஜ", telugu: "ఝ", kannada: "ಝ", bengali: "ঝ" },
              { char: "ഞ", roman: "nya", hindi: "ञ", tamil: "ஞ", telugu: "ఞ", kannada: "ಞ", bengali: "ঞ" }
            ]
          },
          {
            name: "Retroflex (T Group) - ടവർഗ്ഗം",
            letters: [
              { char: "ട", roman: "ta", hindi: "ट", tamil: "ட", telugu: "ట", kannada: "ಟ", bengali: "ট" },
              { char: "ഠ", roman: "tha", hindi: "ठ", tamil: "ட", telugu: "ఠ", kannada: "ಠ", bengali: "ঠ" },
              { char: "ഡ", roman: "da", hindi: "ड", tamil: "ட", telugu: "డ", kannada: "ಡ", bengali: "ড" },
              { char: "ഢ", roman: "dha", hindi: "ढ", tamil: "ட", telugu: "ఢ", kannada: "ಢ", bengali: "ঢ" },
              { char: "ണ", roman: "na", hindi: "ण", tamil: "ண", telugu: "ణ", kannada: "ಣ", bengali: "ণ" }
            ]
          },
          {
            name: "Dentals (t Group) - തവർഗ്ഗം",
            letters: [
              { char: "ത", roman: "tha", hindi: "त", tamil: "த", telugu: "త", kannada: "ತ", bengali: "ত" },
              { char: "ഥ", roman: "tha", hindi: "थ", tamil: "த", telugu: "థ", kannada: "ಥ", bengali: "থ" },
              { char: "ദ", roman: "da", hindi: "द", tamil: "த", telugu: "ద", kannada: "ದ", bengali: "দ" },
              { char: "ധ", roman: "dha", hindi: "ध", tamil: "த", telugu: "ధ", kannada: "ಧ", bengali: "ধ" },
              { char: "ന", roman: "na", hindi: "न", tamil: "ந", telugu: "న", kannada: "న", bengali: "ন" }
            ]
          },
          {
            name: "Labials (P Group) - പവർഗ്ഗം",
            letters: [
              { char: "പ", roman: "pa", hindi: "प", tamil: "ப", telugu: "ప", kannada: "ಪ", bengali: "প" },
              { char: "ഫ", roman: "pha", hindi: "फ", tamil: "ப", telugu: "ఫ", kannada: "ಫ", bengali: "ফ" },
              { char: "ബ", roman: "ba", hindi: "ब", tamil: "ப", telugu: "బ", kannada: "ಬ", bengali: "ব" },
              { char: "ഭ", roman: "bha", hindi: "भ", tamil: "ப", telugu: "భ", kannada: "ಭ", bengali: "ভ" },
              { char: "മ", roman: "ma", hindi: "म", tamil: "ம", telugu: "మ", kannada: "ಮ", bengali: "ম" }
            ]
          },
          {
            name: "Others & Liquids",
            letters: [
              { char: "യ", roman: "ya", hindi: "य", tamil: "ய", telugu: "య", kannada: "ಯ", bengali: "য" },
              { char: "ര", roman: "ra", hindi: "र", tamil: "ர", telugu: "ర", kannada: "ರ", bengali: "র" },
              { char: "ല", roman: "la", hindi: "ल", tamil: "ல", telugu: "ల", kannada: "ಲ", bengali: "ল" },
              { char: "വ", roman: "va", hindi: "व", tamil: "வ", telugu: "వ", kannada: "ವ", bengali: "র" },
              { char: "ശ", roman: "sha", hindi: "श", tamil: "ஶ", telugu: "శ", kannada: "ಶ", bengali: "শ" },
              { char: "ഷ", roman: "sha", hindi: "ष", tamil: "ஷ", telugu: "ష", kannada: "ಷ", bengali: "ষ" },
              { char: "സ", roman: "sa", hindi: "स", tamil: "ஸ", telugu: "స", kannada: "ಸ", bengali: "স" },
              { char: "ഹ", roman: "ha", hindi: "ह", tamil: "ஹ", telugu: "హ", kannada: "ಹ", bengali: "হ" },
              { char: "ഴ", roman: "zha", tamil: "ழ", telugu: "ఴ", kannada: "ಳ", use: "Unique Dravidian Sound" }
            ]
          }
        ]
      },
      {
        type: "chillu",
        title: "3️⃣ Chillu Letters (ചില്ലക്ഷരങ്ങൾ)",
        letters: [
          { char: "ൻ", roman: "n", hindi: "न्", tamil: "ன்", telugu: "న్" },
          { char: "ർ", roman: "r", hindi: "र्", tamil: "ர்", telugu: "ర్" },
          { char: "ൽ", roman: "l", hindi: "ल्", tamil: "ல்", telugu: "ల్" },
          { char: "ൾ", roman: "l", hindi: "ळ", tamil: "ள்", telugu: "ళ్" },
          { char: "ൺ", roman: "n", hindi: "ण्", tamil: "ண்", telugu: "ణ్" }
        ]
      },
      {
        type: "vowel-signs",
        title: "4️⃣ Vowel Signs — shown on ക",
        letters: [
          { char: "ക", roman: "ka" },
          { char: "കാ", roman: "kaa" },
          { char: "കി", roman: "ki" },
          { char: "കീ", roman: "kee" },
          { char: "കു", roman: "ku" },
          { char: "കൂ", roman: "koo" },
          { char: "കൃ", roman: "kri" },
          { char: "കെ", roman: "ke" },
          { char: "കേ", roman: "kay" },
          { char: "കൈ", roman: "kai" },
          { char: "കൊ", roman: "ko" },
          { char: "കോ", roman: "koa" },
          { char: "കൗ", roman: "kau" }
        ]
      },
      {
        type: "numbers",
        title: "5️⃣ Numbers (സംഖ്യകൾ)",
        letters: [
          { char: "൦", roman: "0 (poojyam)", hindi: "शून्य", tamil: "பூஜ்யம்", telugu: "సున్నా", kannada: "ಸೊನ್ನೆ" },
          { char: "൧", roman: "1 (onnu)", hindi: "एक", tamil: "ஒன்று", telugu: "ఒకటి", kannada: "ಒಂದು" },
          { char: "൨", roman: "2 (randu)", hindi: "दो", tamil: "இரண்டு", telugu: "రెండు", kannada: "ಎರಡು" },
          { char: "൩", roman: "3 (moonnu)", hindi: "तीन", tamil: "மூன்று", telugu: "మూడు", kannada: "ಮೂರು" },
          { char: "൪", roman: "4 (naalu)", hindi: "चार", tamil: "நான்கு", telugu: "నాలుగు", kannada: "ನಾಲ್ಕು" },
          { char: "൫", roman: "5 (anchu)", hindi: "पाँच", tamil: "ஐந்து", telugu: "ఐదు", kannada: "ಐದು" },
          { char: "൬", roman: "6 (aaru)", hindi: "छह", tamil: "ஆறு", telugu: "ఆరు", kannada: "ಆರು" },
          { char: "൭", roman: "7 (yezhu)", hindi: "सात", tamil: "ஏழு", telugu: "ఏడు", kannada: "ಏಳು" },
          { char: "൮", roman: "8 (ettu)", hindi: "आठ", tamil: "எட்டு", telugu: "ఎనిమిది", kannada: "ಎಂಟು" },
          { char: "൯", roman: "9 (ombathu)", hindi: "नौ", tamil: "ஒன்பது", telugu: "తొమ్மிది", kannada: "ಒಂಬತ್ತು" },
          { char: "൰", roman: "10 (patthu)", hindi: "दस", tamil: "பத்து", telugu: "పది", kannada: "ಹತ್ತು" }
        ]
      }
    ]
  },
}
