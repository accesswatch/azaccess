/**
 * Alt Text Training — Image Data
 *
 * Each entry defines one image scenario with curated model answers,
 * required concept groups, anti-patterns, length constraints, teaching
 * notes and hints.  The scoring engine in alt-text-engine.js consumes
 * this structure.
 *
 * Concept groups use arrays of synonyms so that "dog" and "golden
 * retriever" both satisfy the same concept.
 */

/* exported ALT_TEXT_IMAGES */
/* eslint-disable no-unused-vars */
const ALT_TEXT_IMAGES = [
  // ── 1. Simple photo ──────────────────────────────────────────────
  {
    id: "simple-photo",
    imageType: "simple",
    title: "Simple Photo",
    src: "images/alt-text-practice/dog-frisbee.jpg",
    credit: "Photo by Marek Kupiec on Pexels (free to use)",
    context:
      "This image appears on a university news article about a student recreation event.",
    /* placeholder SVG label for the practice image */
    placeholderLabel: "Golden retriever catching a frisbee on a sunny lawn",
    modelAnswers: [
      "A golden retriever leaps to catch a red frisbee on a sunny grass lawn.",
      "Golden retriever mid-jump catching a frisbee on the campus lawn.",
      "Dog catching a frisbee in an open grassy field on a sunny day.",
      "A large golden dog jumps to grab a flying disc on green grass.",
    ],
    requiredConcepts: [
      ["golden retriever", "retriever", "dog", "puppy", "canine"],
      ["frisbee", "flying disc", "disc", "disk"],
      [
        "catching",
        "catch",
        "leaping",
        "leaps",
        "jumping",
        "jumps",
        "grabs",
        "mid-air",
        "mid-jump",
      ],
      ["grass", "lawn", "field", "green", "outdoor", "outdoors"],
    ],
    antiPatterns: [
      "image of",
      "photo of",
      "picture of",
      "pic of",
      ".jpg",
      ".png",
      ".gif",
      ".webp",
      ".svg",
      "click here",
      "untitled",
      "img_",
      "dsc_",
      "screenshot",
    ],
    idealLength: { min: 15, max: 150 },
    teachingNotes:
      "For simple photos, describe <strong>who or what</strong> is in the image and <strong>what is happening</strong>. " +
      'Avoid starting with "Image of…" — assistive technology already announces the element as an image. ' +
      "Include enough detail for a reader to picture the scene but stay concise (under ~125 characters is ideal).",
    hints: [
      "What animal is in the image?",
      "What action is it performing?",
      "Where is it happening?",
    ],
  },

  // ── 2. Person in context ─────────────────────────────────────────
  {
    id: "person-context",
    imageType: "contextual",
    title: "Person in Context",
    src: "images/alt-text-practice/speaker-podium.jpg",
    credit: "Photo by Mikhail Nilov on Pexels (free to use)",
    context:
      "This photo accompanies an article about a keynote speech at a university accessibility conference.",
    placeholderLabel:
      "Speaker at a podium with a conference banner behind them",
    modelAnswers: [
      "Dr. Rivera speaks at a podium during the 2025 Accessibility Summit, with a conference banner visible behind her.",
      'A woman presents at a podium with a large banner reading "Accessibility Summit 2025" in the background.',
      "Keynote speaker addresses the audience from behind a podium at the university accessibility conference.",
      "Speaker at a podium gestures while presenting, with a conference banner and audience in the background.",
    ],
    requiredConcepts: [
      [
        "speaker",
        "presenter",
        "woman",
        "person",
        "keynote",
        "dr. rivera",
        "dr rivera",
        "rivera",
      ],
      ["podium", "lectern", "stage"],
      ["conference", "summit", "event", "accessibility summit"],
      ["banner", "sign", "backdrop"],
    ],
    antiPatterns: [
      "image of",
      "photo of",
      "picture of",
      "pic of",
      ".jpg",
      ".png",
      ".gif",
      ".webp",
      "click here",
      "untitled",
      "img_",
    ],
    idealLength: { min: 20, max: 200 },
    teachingNotes:
      "When a person is the focus, identify them by name if known and relevant.  Describe their action and the setting. " +
      "If the person's identity is important to the article's meaning, include it. " +
      "Avoid describing physical appearance unless it is directly relevant to the content.",
    hints: [
      "Who is the main subject?",
      "What are they doing?",
      "What visual context (banner, location) helps the reader understand the setting?",
    ],
  },

  // ── 3. Informational chart ───────────────────────────────────────
  {
    id: "info-chart",
    imageType: "informational",
    title: "Informational Chart",
    src: "images/alt-text-practice/revenue-chart.svg",
    credit: "Created for this exercise",
    context:
      "This chart is embedded in a quarterly revenue report for the Board of Trustees. A data table with the same numbers follows the image.",
    placeholderLabel: "Bar chart — Q1 $2.1 M, Q2 $2.4 M, Q3 $3.0 M, Q4 $3.8 M",
    modelAnswers: [
      "Bar chart showing quarterly revenue: Q1 $2.1 million, Q2 $2.4 million, Q3 $3.0 million, Q4 $3.8 million. Revenue grew 81% over the year.",
      "Quarterly revenue bar chart with steady growth from $2.1 M in Q1 to $3.8 M in Q4.",
      "Bar chart comparing quarterly revenue. Q1: $2.1 M, Q2: $2.4 M, Q3: $3.0 M, Q4: $3.8 M, showing an upward trend.",
    ],
    requiredConcepts: [
      ["bar chart", "chart", "graph", "bar graph"],
      ["revenue", "sales", "income", "earnings"],
      ["q1", "q2", "q3", "q4", "quarter", "quarterly"],
      [
        "2.1",
        "2.4",
        "3.0",
        "3.8",
        "million",
        "growth",
        "increase",
        "grew",
        "upward",
        "trend",
        "rose",
      ],
    ],
    antiPatterns: [
      "image of",
      "photo of",
      "picture of",
      ".jpg",
      ".png",
      "click here",
      "bar chart image",
      "chart image",
    ],
    idealLength: { min: 30, max: 250 },
    teachingNotes:
      "For informational images such as charts and graphs, the alt text must convey the <strong>data or trend</strong>, " +
      'not merely say "bar chart". Summarise the key message and reference where the full data table can be found. ' +
      "If the image is complex (many data points), provide a brief summary in alt text and a longer description nearby " +
      "(e.g., in a <code>&lt;figcaption&gt;</code> or linked description).",
    hints: [
      "What type of chart is this?",
      "What data does it show?",
      "What is the overall trend or key takeaway?",
    ],
  },

  // ── 4. Decorative image ──────────────────────────────────────────
  {
    id: "decorative",
    imageType: "decorative",
    title: "Decorative Image",
    src: "images/alt-text-practice/decorative-divider.svg",
    credit: "Created for this exercise",
    context:
      "This gradient divider appears between sections on a webpage. It carries no informational content.",
    placeholderLabel: "(abstract gradient divider — purely decorative)",
    modelAnswers: [
      "", // empty string is the correct answer
    ],
    requiredConcepts: [], // no concepts needed — answer should be empty
    antiPatterns: [
      "divider",
      "line",
      "decoration",
      "decorative",
      "spacer",
      "border",
      "gradient",
      "abstract",
      "image of",
      "photo of",
      "picture of",
      ".jpg",
      ".png",
    ],
    idealLength: { min: 0, max: 0 }, // 0 max signals "should be empty"
    teachingNotes:
      "Decorative images add visual interest but carry no information. The correct alt text is an <strong>empty</strong> " +
      '<code>alt</code> attribute (<code>alt=""</code>). This tells screen readers to skip the image entirely. ' +
      'Writing something like "decorative divider" forces screen-reader users to listen to irrelevant content. ' +
      'Use the <a href="https://www.w3.org/WAI/tutorials/images/decision-tree/" target="_blank" rel="noopener">W3C alt decision tree</a> when unsure.',
    hints: [
      "Does this image convey information or is it purely visual?",
      "Would a screen-reader user miss anything if this image were absent?",
      "What should you write when alt text is not needed?",
    ],
  },

  // ── 5. Complex / functional ──────────────────────────────────────
  {
    id: "complex-functional",
    imageType: "complex",
    title: "Complex / Functional",
    src: "images/alt-text-practice/login-error.svg",
    credit: "Created for this exercise",
    context:
      "This screenshot appears in a help article that explains how to fix login errors.",
    placeholderLabel:
      'Screenshot of a login form showing an error: "Incorrect password"',
    modelAnswers: [
      'Screenshot of a login form with username and password fields. A red error message below the password field reads "Incorrect password. Please try again."',
      'Login page showing an error state: the password field is highlighted in red with the message "Incorrect password. Please try again."',
      "A web login form displaying an error notification stating the entered password is incorrect, with a link to reset the password.",
    ],
    requiredConcepts: [
      ["login", "sign in", "sign-in", "log in", "log-in"],
      ["form", "page", "screen", "dialog"],
      ["error", "incorrect", "wrong", "invalid", "failed"],
      ["password"],
    ],
    antiPatterns: [
      "image of",
      "photo of",
      "picture of",
      ".jpg",
      ".png",
      "click here",
      "screenshot image",
    ],
    idealLength: { min: 30, max: 250 },
    teachingNotes:
      "For functional or complex images (such as screenshots of UI), describe the <strong>purpose and state</strong> " +
      "rather than every pixel. Focus on what the user needs to understand: what is shown, what state it is in " +
      "(e.g., error state), and what action to take. If the image is too complex for a short alt text, provide a longer " +
      'description nearby using <code>&lt;figcaption&gt;</code> or a "long description" link.',
    hints: [
      "What UI element is being shown?",
      "What state is it in (success, error, default)?",
      "What message does it display?",
    ],
  },
];
