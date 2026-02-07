/**
 * Alt Text Training — Scoring & Feedback Engine
 *
 * Evaluates user-supplied alt text against curated image data from
 * alt-text-data.js.  No AI is used — evaluation is entirely rule-based
 * using Jaccard word-set similarity, concept-coverage ratios,
 * anti-pattern detection, and length heuristics.
 *
 * Public API
 * ──────────
 *   evaluateAltText(userInput, imageData)   → ResultObject
 *   generateFeedbackHTML(result, imageData) → HTML string
 */

/* global ALT_TEXT_IMAGES */
/* exported evaluateAltText, generateFeedbackHTML */
/* eslint-disable no-unused-vars */

// ── Stop words (removed before similarity comparisons) ─────────────
const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "shall",
  "should",
  "may",
  "might",
  "must",
  "can",
  "could",
  "i",
  "me",
  "my",
  "we",
  "our",
  "you",
  "your",
  "he",
  "she",
  "it",
  "they",
  "them",
  "its",
  "his",
  "her",
  "their",
  "this",
  "that",
  "these",
  "those",
  "in",
  "on",
  "at",
  "to",
  "for",
  "of",
  "with",
  "by",
  "from",
  "as",
  "into",
  "through",
  "during",
  "before",
  "after",
  "above",
  "below",
  "between",
  "out",
  "off",
  "over",
  "under",
  "about",
  "up",
  "down",
  "and",
  "but",
  "or",
  "nor",
  "not",
  "so",
  "yet",
  "if",
  "then",
  "else",
  "when",
  "while",
  "where",
  "how",
  "what",
  "which",
  "who",
  "whom",
  "why",
  "all",
  "each",
  "every",
  "both",
  "few",
  "more",
  "some",
  "any",
  "no",
  "other",
  "own",
  "same",
  "than",
  "too",
  "very",
  "just",
  "also",
  "only",
]);

// ── Helpers ────────────────────────────────────────────────────────

/**
 * Normalize a string: lowercase, strip non-alphanumeric except hyphens
 * and periods (so "Q1" / "$2.1" / "sign-in" survive), collapse whitespace.
 */
function normalize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9.\-$%\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Tokenize into word set, removing stop words.
 */
function tokenize(text) {
  const words = normalize(text).split(/\s+/).filter(Boolean);
  return new Set(words.filter((w) => !STOP_WORDS.has(w) && w.length > 1));
}

/**
 * Tokenize but keep stop words (used for concept matching where we
 * want to find short tokens like "q1").
 */
function tokenizeFull(text) {
  return new Set(
    normalize(text)
      .split(/\s+/)
      .filter((w) => w.length > 0),
  );
}

/**
 * Jaccard similarity between two Sets.
 */
function jaccard(setA, setB) {
  if (setA.size === 0 && setB.size === 0) return 1;
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const w of setA) {
    if (setB.has(w)) intersection++;
  }
  const union = new Set([...setA, ...setB]).size;
  return intersection / union;
}

/**
 * Check whether userTokens contain at least one synonym from a concept
 * group.  Matches substrings too so "golden retriever" appears in
 * "a golden retriever…" even after tokenization splits it.
 */
function conceptMatches(userNormalized, userTokens, conceptGroup) {
  for (const synonym of conceptGroup) {
    const synLower = synonym.toLowerCase();
    // Exact token match
    if (userTokens.has(synLower)) return true;
    // Substring / multi-word match
    if (userNormalized.includes(synLower)) return true;
  }
  return false;
}

// ── Core evaluation ────────────────────────────────────────────────

/**
 * Evaluate user alt text against an image data entry.
 *
 * @param {string} userInput  — the user's alt text
 * @param {object} imageData  — one entry from ALT_TEXT_IMAGES
 * @returns {object} result with score, rating, breakdown, messages
 */
function evaluateAltText(userInput, imageData) {
  const raw = (userInput || "").trim();
  const norm = normalize(raw);
  const userTokens = tokenize(raw);
  const userTokensFull = tokenizeFull(raw);

  const isDecorative = imageData.imageType === "decorative";
  const messages = []; // { type: 'success'|'error'|'warning'|'info', text }
  const breakdown = {}; // named sub-scores (0–1 each)

  // ── Decorative shortcut ────────────────────────────────────────
  if (isDecorative) {
    if (raw === "") {
      return {
        score: 1,
        rating: "Excellent",
        ratingClass: "excellent",
        messages: [
          {
            type: "success",
            text: 'Correct! This decorative image should have an empty <code>alt</code> attribute (<code>alt=""</code>) so screen readers skip it.',
          },
        ],
        breakdown: { decorativeCorrect: 1 },
        charCount: 0,
      };
    }
    // User typed something for a decorative image
    let penaltyMsg =
      "This is a decorative image — the best practice is to use an empty <code>alt</code> attribute " +
      '(<code>alt=""</code>) so screen readers skip it entirely.';
    if (raw.length <= 5 && /^\s*$/.test(raw)) {
      // Almost right (just whitespace) — gentle nudge
      penaltyMsg =
        'Close! Use a truly empty <code>alt=""</code> (no spaces) for decorative images.';
    }
    return {
      score: 0.1,
      rating: "Insufficient",
      ratingClass: "insufficient",
      messages: [{ type: "error", text: penaltyMsg }],
      breakdown: { decorativeCorrect: 0 },
      charCount: raw.length,
    };
  }

  // ── Empty input for non-decorative ─────────────────────────────
  if (raw === "") {
    return {
      score: 0,
      rating: "Insufficient",
      ratingClass: "insufficient",
      messages: [
        {
          type: "error",
          text: "Please enter alt text. This is not a decorative image — it needs a description.",
        },
      ],
      breakdown: {},
      charCount: 0,
    };
  }

  // ── 1. Anti-pattern scan ───────────────────────────────────────
  const foundAntiPatterns = [];
  for (const pattern of imageData.antiPatterns) {
    if (norm.includes(pattern.toLowerCase())) {
      foundAntiPatterns.push(pattern);
    }
  }
  // Also check for starting with generic phrases
  if (/^(image|photo|picture|graphic|pic)\b/i.test(raw)) {
    if (
      !foundAntiPatterns.some((p) =>
        /^(image of|photo of|picture of|pic of)$/i.test(p),
      )
    ) {
      foundAntiPatterns.push('starts with "' + raw.split(/\s/)[0] + '"');
    }
  }

  const antiPatternPenalty = Math.min(foundAntiPatterns.length * 0.15, 0.3);
  breakdown.antiPattern = 1 - antiPatternPenalty;

  if (foundAntiPatterns.length > 0) {
    const joined = foundAntiPatterns.map((p) => `"${p}"`).join(", ");
    messages.push({
      type: "error",
      text: `Avoid: ${joined}. Screen readers already announce the element as an image, and filenames or generic phrases add no value.`,
    });
  } else {
    messages.push({
      type: "success",
      text: "No common anti-patterns detected — good start!",
    });
  }

  // ── 2. Length check ────────────────────────────────────────────
  const { min, max } = imageData.idealLength;
  let lengthScore;
  if (raw.length < min) {
    lengthScore = Math.max(0, raw.length / min);
    messages.push({
      type: "warning",
      text: `At ${raw.length} characters this may be too brief. Aim for at least ${min} characters to give enough context.`,
    });
  } else if (raw.length > max) {
    const overRatio = (raw.length - max) / max;
    lengthScore = Math.max(0.3, 1 - overRatio * 0.5);
    messages.push({
      type: "warning",
      text: `At ${raw.length} characters this is quite long (target: under ${max}). Consider moving detailed descriptions to adjacent text or a <code>longdesc</code>.`,
    });
  } else {
    lengthScore = 1;
    messages.push({
      type: "success",
      text: `Length is good (${raw.length} characters).`,
    });
  }
  breakdown.length = lengthScore;

  // ── 3. Key concept coverage ────────────────────────────────────
  const totalConcepts = imageData.requiredConcepts.length;
  let coveredConcepts = 0;
  const missed = [];
  const hit = [];

  for (const group of imageData.requiredConcepts) {
    if (conceptMatches(norm, userTokensFull, group)) {
      coveredConcepts++;
      hit.push(group[0]); // canonical label
    } else {
      missed.push(group.slice(0, 2).join(" / ")); // show first 2 synonyms
    }
  }
  const conceptCoverage =
    totalConcepts > 0 ? coveredConcepts / totalConcepts : 1;
  breakdown.concepts = conceptCoverage;

  if (conceptCoverage >= 0.9) {
    messages.push({
      type: "success",
      text: "Covers the key information: " + hit.join(", ") + ".",
    });
  } else if (conceptCoverage >= 0.5) {
    messages.push({
      type: "warning",
      text:
        "Partially covers key information. Try including: " +
        missed.join(", ") +
        ".",
    });
  } else {
    messages.push({
      type: "error",
      text:
        "Missing key information. Consider mentioning: " +
        missed.join(", ") +
        ".",
    });
  }

  // ── 4. Model answer similarity (best Jaccard) ─────────────────
  let bestSimilarity = 0;
  for (const answer of imageData.modelAnswers) {
    const answerTokens = tokenize(answer);
    const sim = jaccard(userTokens, answerTokens);
    if (sim > bestSimilarity) bestSimilarity = sim;
  }
  breakdown.similarity = bestSimilarity;

  if (bestSimilarity >= 0.45) {
    messages.push({
      type: "success",
      text: `High similarity to a model answer (${(bestSimilarity * 100).toFixed(0)}% word overlap).`,
    });
  } else if (bestSimilarity >= 0.2) {
    messages.push({
      type: "info",
      text: `Moderate similarity to model answers (${(bestSimilarity * 100).toFixed(0)}%). Review the model answer for ideas.`,
    });
  } else {
    messages.push({
      type: "warning",
      text: `Low similarity to model answers (${(bestSimilarity * 100).toFixed(0)}%). Your description may be missing important details.`,
    });
  }

  // ── 5. Specificity bonus ──────────────────────────────────────
  // Reward descriptions that use verbs, adjectives, or specific nouns
  // beyond single generic words. Very rough heuristic: count non-stop
  // unique tokens — the more, the more specific.
  const specificityRatio = Math.min(userTokens.size / 8, 1); // 8+ content words → full marks
  breakdown.specificity = specificityRatio;

  // ── 6. Image-type-specific checks ─────────────────────────────
  if (imageData.imageType === "informational") {
    // Charts should include data
    const hasData =
      /\d/.test(raw) ||
      /increase|decrease|grew|growth|decline|trend|rose|fell|dropped|upward|downward/i.test(
        raw,
      );
    breakdown.typeSpecific = hasData ? 1 : 0.3;
    if (!hasData) {
      messages.push({
        type: "error",
        text: "Charts and graphs should summarise the key data or trend — include numbers or describe the overall pattern.",
      });
    } else {
      messages.push({
        type: "success",
        text: "Good — includes quantitative data or trend description.",
      });
    }
  } else if (imageData.imageType === "complex") {
    // Functional images should describe purpose/state
    const hasState =
      /error|success|warning|fail|incorrect|invalid|alert|message|notification|status/i.test(
        raw,
      );
    breakdown.typeSpecific = hasState ? 1 : 0.4;
    if (!hasState) {
      messages.push({
        type: "warning",
        text: "For screenshots and functional images, describe the <strong>state</strong> (e.g., error message, success) not just what the UI looks like.",
      });
    }
  } else {
    breakdown.typeSpecific = 1; // no type-specific penalty
  }

  // ── Composite score ────────────────────────────────────────────
  //   Concept coverage  40%
  //   Model similarity  30%
  //   Anti-pattern       15% (penalty-based, already inverted)
  //   Length              10%
  //   Specificity          5%
  //   Type-specific bonus  applied as multiplier
  const raw_score =
    breakdown.concepts * 0.4 +
    breakdown.similarity * 0.3 +
    breakdown.antiPattern * 0.15 +
    breakdown.length * 0.1 +
    breakdown.specificity * 0.05;

  // Type-specific can only pull the score down (not above 1)
  const typeMultiplier = 0.7 + 0.3 * (breakdown.typeSpecific || 1);
  const finalScore = Math.max(0, Math.min(1, raw_score * typeMultiplier));
  breakdown.composite = finalScore;

  // ── Rating ─────────────────────────────────────────────────────
  let rating, ratingClass;
  if (finalScore >= 0.8) {
    rating = "Excellent";
    ratingClass = "excellent";
  } else if (finalScore >= 0.6) {
    rating = "Good";
    ratingClass = "good";
  } else if (finalScore >= 0.4) {
    rating = "Needs Improvement";
    ratingClass = "needs-improvement";
  } else if (finalScore >= 0.2) {
    rating = "Poor";
    ratingClass = "poor";
  } else {
    rating = "Insufficient";
    ratingClass = "insufficient";
  }

  return {
    score: finalScore,
    rating,
    ratingClass,
    messages,
    breakdown,
    charCount: raw.length,
  };
}

// ── Feedback HTML generator ────────────────────────────────────────

/**
 * Build an accessible feedback panel from the result object.
 *
 * @param {object} result     — from evaluateAltText()
 * @param {object} imageData  — the image entry
 * @returns {string} HTML
 */
function generateFeedbackHTML(result, imageData) {
  const pct = Math.round(result.score * 100);

  // Rating badge colours (meet 3:1 UI contrast on white backgrounds)
  const badgeColors = {
    excellent: { bg: "#e8f5e9", fg: "#1b5e20", border: "#4caf50" },
    good: { bg: "#e8f5e9", fg: "#2e7d32", border: "#66bb6a" },
    "needs-improvement": { bg: "#fff8e1", fg: "#e65100", border: "#ffa000" },
    poor: { bg: "#fff3e0", fg: "#bf360c", border: "#ff7043" },
    insufficient: { bg: "#ffebee", fg: "#b71c1c", border: "#ef5350" },
  };
  const badge = badgeColors[result.ratingClass] || badgeColors.insufficient;

  let html = "";

  // Rating badge
  html +=
    `<div class="alt-rating-badge" style="display:inline-block;padding:0.35rem 0.9rem;border-radius:6px;` +
    `font-weight:700;font-size:1.05rem;background:${badge.bg};color:${badge.fg};border:2px solid ${badge.border};" ` +
    `role="status">` +
    `${result.rating} — ${pct}%</div>`;

  // Message list
  html +=
    '<ul class="alt-feedback-list" style="list-style:none;padding:0;margin:0.75rem 0 0;">';
  for (const m of result.messages) {
    const icon =
      m.type === "success"
        ? "✅"
        : m.type === "error"
          ? "❌"
          : m.type === "warning"
            ? "⚠️"
            : "ℹ️";
    html += `<li style="margin:0.4rem 0;line-height:1.45;"><span aria-hidden="true">${icon}</span> ${m.text}</li>`;
  }
  html += "</ul>";

  // Character count
  html += `<p style="margin-top:0.5rem;color:#555;font-size:0.9rem;">Character count: ${result.charCount}</p>`;

  // Teaching notes (always shown after evaluation)
  if (imageData.teachingNotes) {
    html +=
      '<div class="alt-teaching-note" style="margin-top:0.75rem;padding:0.75rem 1rem;' +
      'background:#e3f2fd;border-left:4px solid #1565c0;border-radius:4px;">' +
      `<strong>Why does this matter?</strong><br>${imageData.teachingNotes}</div>`;
  }

  return html;
}
