/**
 * Site-wide keyboard shortcuts for power users
 * Press ? to show shortcuts help
 */
(function () {
  "use strict";

  // Don't activate shortcuts when typing in inputs
  function isTyping() {
    const active = document.activeElement;
    const tag = active.tagName.toLowerCase();
    return (
      tag === "input" ||
      tag === "textarea" ||
      tag === "select" ||
      active.isContentEditable
    );
  }

  // Keyboard shortcuts map
  const shortcuts = {
    "?": { action: showHelp, description: "Show keyboard shortcuts" },
    "/": { action: focusSearch, description: "Focus search" },
    h: { action: () => goTo("home.html"), description: "Go to Home" },
    g: { action: () => goTo("glossary.html"), description: "Go to Glossary" },
    f: { action: () => goTo("faq.html"), description: "Go to FAQ" },
    s: { action: () => goTo("support.html"), description: "Go to Support" },
    q: {
      action: () => goTo("quick-start.html"),
      description: "Go to Quick Start",
    },
    t: { action: scrollToTop, description: "Scroll to top" },
    n: { action: nextSection, description: "Next section (h2)" },
    p: { action: prevSection, description: "Previous section (h2)" },
  };

  // Navigate to page
  function goTo(page) {
    // Handle relative paths
    const currentPath = window.location.pathname;
    if (currentPath.includes("/docs/")) {
      window.location.href = page;
    } else {
      window.location.href = "docs/" + page;
    }
  }

  // Focus search input if it exists
  function focusSearch() {
    const searchInput = document.querySelector(
      'input[type="search"], #site-search, #glossary-filter, #faq-filter',
    );
    if (searchInput) {
      searchInput.focus();
      return true;
    }
    // If no search on page, go to search page
    goTo("search.html");
    return true;
  }

  // Scroll to top
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const main = document.getElementById("maincontent");
    if (main) main.focus();
  }

  // Navigate between h2 sections
  function nextSection() {
    navigateSection(1);
  }

  function prevSection() {
    navigateSection(-1);
  }

  function navigateSection(direction) {
    const headings = Array.from(document.querySelectorAll("h2"));
    if (headings.length === 0) return;

    const scrollY = window.scrollY;
    let current = -1;

    // Find current section
    for (let i = 0; i < headings.length; i++) {
      if (headings[i].offsetTop <= scrollY + 100) {
        current = i;
      }
    }

    // Calculate target
    let target = current + direction;
    if (target < 0) target = headings.length - 1;
    if (target >= headings.length) target = 0;

    // Scroll to target
    headings[target].scrollIntoView({ behavior: "smooth", block: "start" });
    headings[target].focus();
  }

  // Track the element that opened the modal for focus restoration
  let previousFocusElement = null;

  // Show help modal
  function showHelp() {
    // Remove existing modal
    const existing = document.getElementById("keyboard-help-modal");
    if (existing) {
      closeHelpModal(existing);
      return;
    }

    // Store the element that triggered the modal
    previousFocusElement = document.activeElement;

    const modal = document.createElement("div");
    modal.id = "keyboard-help-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "keyboard-help-title");
    modal.innerHTML = `
      <div class="keyboard-help-backdrop"></div>
      <div class="keyboard-help-content">
        <h2 id="keyboard-help-title">Keyboard Shortcuts</h2>
        <button class="keyboard-help-close" aria-label="Close keyboard shortcuts dialog">&times;</button>
        <div class="keyboard-help-grid">
          <div class="shortcut-group">
            <h3>Navigation</h3>
            <dl>
              <dt><kbd>h</kbd></dt><dd>Home</dd>
              <dt><kbd>g</kbd></dt><dd>Glossary</dd>
              <dt><kbd>f</kbd></dt><dd>FAQ</dd>
              <dt><kbd>s</kbd></dt><dd>Support</dd>
              <dt><kbd>q</kbd></dt><dd>Quick Start</dd>
            </dl>
          </div>
          <div class="shortcut-group">
            <h3>On Page</h3>
            <dl>
              <dt><kbd>/</kbd></dt><dd>Focus search</dd>
              <dt><kbd>t</kbd></dt><dd>Scroll to top</dd>
              <dt><kbd>n</kbd></dt><dd>Next section</dd>
              <dt><kbd>p</kbd></dt><dd>Previous section</dd>
            </dl>
          </div>
          <div class="shortcut-group">
            <h3>Standard</h3>
            <dl>
              <dt><kbd>Tab</kbd></dt><dd>Next element</dd>
              <dt><kbd>Shift+Tab</kbd></dt><dd>Previous element</dd>
              <dt><kbd>Enter</kbd></dt><dd>Activate link/button</dd>
              <dt><kbd>Esc</kbd></dt><dd>Close modal</dd>
            </dl>
          </div>
        </div>
        <p class="keyboard-help-note">Press <kbd>?</kbd> to toggle this help.</p>
      </div>
    `;

    // Add styles
    const style = document.createElement("style");
    style.textContent = `
      #keyboard-help-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .keyboard-help-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
      }
      .keyboard-help-content {
        position: relative;
        background: white;
        padding: 2rem;
        border-radius: 12px;
        max-width: 600px;
        max-height: 80vh;
        overflow: auto;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      }
      .keyboard-help-content h2 {
        margin: 0 0 1.5rem 0;
        padding-right: 2rem;
      }
      .keyboard-help-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        line-height: 1;
      }
      .keyboard-help-close:hover {
        color: #AB0520;
      }
      .keyboard-help-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1.5rem;
      }
      .shortcut-group h3 {
        margin: 0 0 0.5rem 0;
        font-size: 0.9rem;
        color: #595959;
        text-transform: uppercase;
      }
      .shortcut-group dl {
        margin: 0;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.25rem 0.75rem;
      }
      .shortcut-group dt {
        text-align: right;
      }
      .shortcut-group dd {
        margin: 0;
      }
      kbd {
        display: inline-block;
        padding: 0.125rem 0.5rem;
        background: #f4f4f4;
        border: 1px solid #999;
        border-radius: 4px;
        font-family: monospace;
        font-size: 0.85rem;
        box-shadow: 0 1px 1px rgba(0,0,0,0.1);
      }
      .keyboard-help-note {
        margin: 1.5rem 0 0 0;
        padding-top: 1rem;
        border-top: 1px solid #d5d5d5;
        font-size: 0.9rem;
        color: #595959;
        text-align: center;
      }
      @media (prefers-color-scheme: dark) {
        .keyboard-help-content {
          background: #2d2d44;
          color: #e8e8e8;
        }
        kbd {
          background: #1a1a2e;
          border-color: #444;
        }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(modal);

    // Focus close button
    const closeBtn = modal.querySelector(".keyboard-help-close");
    closeBtn.focus();

    // Get all focusable elements in the modal
    function getFocusableElements() {
      return modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
    }

    // Focus trap handler
    function handleModalKeydown(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeHelpModal(modal);
        return;
      }
      if (e.key === "Tab") {
        const focusables = getFocusableElements();
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    modal.addEventListener("keydown", handleModalKeydown);

    // Close handlers
    closeBtn.addEventListener("click", () => closeHelpModal(modal));
    modal
      .querySelector(".keyboard-help-backdrop")
      .addEventListener("click", () => closeHelpModal(modal));
  }

  // Close modal and restore focus
  function closeHelpModal(modal) {
    modal.remove();
    if (
      previousFocusElement &&
      typeof previousFocusElement.focus === "function"
    ) {
      previousFocusElement.focus();
    }
    previousFocusElement = null;
  }

  // Main keyboard handler
  document.addEventListener("keydown", function (e) {
    // Don't capture when typing
    if (isTyping()) return;

    // Don't capture when modifier keys are pressed (except ?)
    if ((e.ctrlKey || e.metaKey || e.altKey) && e.key !== "?") return;

    const key = e.key.toLowerCase();

    // Handle Escape for modal (handled by modal's own keydown handler)
    if (e.key === "Escape") {
      const modal = document.getElementById("keyboard-help-modal");
      if (modal) {
        closeHelpModal(modal);
        return;
      }
    }

    // Handle ? (shift+/)
    if (e.key === "?" || (e.shiftKey && e.key === "/")) {
      e.preventDefault();
      showHelp();
      return;
    }

    // Check shortcuts
    if (shortcuts[key]) {
      e.preventDefault();
      shortcuts[key].action();
    }
  });

  // Log that shortcuts are available
  console.log("⌨️ Keyboard shortcuts enabled. Press ? for help.");
})();
