/**
 * Feedback Component - "Was this helpful?" widget
 * Include this script on pages where you want feedback collection
 */

(function () {
    'use strict';

    // Configuration
    const config = {
        formUrl: 'https://forms.office.com/Pages/ResponsePage.aspx?id=YOUR_FORM_ID', // Replace with actual form URL
        storageKey: 'ua-a11y-feedback',
        thankYouDelay: 3000
    };

    // Create and inject the feedback widget
    function createFeedbackWidget() {
        // Check if widget already exists
        if (document.querySelector('.feedback-widget')) return;

        // Find the main element to append before footer
        const main = document.querySelector('main');
        if (!main) return;

        const widget = document.createElement('aside');
        widget.className = 'feedback-widget';
        widget.setAttribute('aria-labelledby', 'feedback-title');

        // Check if user already provided feedback for this page
        const feedbackGiven = getFeedback(window.location.pathname);

        if (feedbackGiven) {
            widget.innerHTML = `
        <div class="feedback-thanks">
          <span aria-hidden="true">✓</span> Thanks for your feedback!
        </div>
      `;
        } else {
            widget.innerHTML = `
        <div class="feedback-question">
          <h2 id="feedback-title" class="feedback-heading">Was this page helpful?</h2>
          <div class="feedback-buttons" role="group" aria-label="Rate this page">
            <button type="button" class="feedback-btn feedback-yes" data-value="yes" aria-label="Yes, this page was helpful">
              <span aria-hidden="true">👍</span> Yes
            </button>
            <button type="button" class="feedback-btn feedback-no" data-value="no" aria-label="No, this page was not helpful">
              <span aria-hidden="true">👎</span> No
            </button>
          </div>
        </div>
        <div class="feedback-followup" hidden>
          <div class="feedback-followup-yes" hidden>
            <p class="feedback-thanks-msg"><span aria-hidden="true">🎉</span> Great! Thanks for letting us know.</p>
            <p class="feedback-extra">Want to tell us more? <a href="mailto:accessibility@arizona.edu?subject=Feedback on ${encodeURIComponent(document.title)}">Send feedback</a></p>
          </div>
          <div class="feedback-followup-no" hidden>
            <p class="feedback-sorry-msg">Sorry this page wasn't helpful.</p>
            <label for="feedback-comment" class="feedback-label">How can we improve? (optional)</label>
            <textarea id="feedback-comment" class="feedback-textarea" rows="3" placeholder="Tell us what was missing or confusing..."></textarea>
            <div class="feedback-actions">
              <button type="button" class="feedback-submit">Send feedback</button>
              <button type="button" class="feedback-skip">Skip</button>
            </div>
          </div>
        </div>
      `;
        }

        main.appendChild(widget);

        // Add event listeners
        if (!feedbackGiven) {
            setupEventListeners(widget);
        }
    }

    function setupEventListeners(widget) {
        const yesBtn = widget.querySelector('.feedback-yes');
        const noBtn = widget.querySelector('.feedback-no');
        const submitBtn = widget.querySelector('.feedback-submit');
        const skipBtn = widget.querySelector('.feedback-skip');

        yesBtn.addEventListener('click', () => handleVote('yes', widget));
        noBtn.addEventListener('click', () => handleVote('no', widget));

        if (submitBtn) {
            submitBtn.addEventListener('click', () => submitFeedback(widget));
        }
        if (skipBtn) {
            skipBtn.addEventListener('click', () => skipFeedback(widget));
        }
    }

    function handleVote(value, widget) {
        // Store the vote
        saveFeedback(window.location.pathname, value);

        // Hide the question
        const question = widget.querySelector('.feedback-question');
        question.hidden = true;

        // Show follow-up
        const followup = widget.querySelector('.feedback-followup');
        followup.hidden = false;

        if (value === 'yes') {
            widget.querySelector('.feedback-followup-yes').hidden = false;
            // Auto-collapse after delay
            setTimeout(() => {
                showThankYou(widget);
            }, config.thankYouDelay);
        } else {
            widget.querySelector('.feedback-followup-no').hidden = false;
            // Focus on textarea
            widget.querySelector('.feedback-textarea').focus();
        }

        // Track analytics (if available)
        trackEvent('feedback_vote', { value, page: window.location.pathname });
    }

    function submitFeedback(widget) {
        const comment = widget.querySelector('.feedback-textarea').value.trim();

        // Save comment if provided
        if (comment) {
            const feedback = getFeedback(window.location.pathname);
            saveFeedback(window.location.pathname, feedback, comment);

            // Track analytics
            trackEvent('feedback_comment', { page: window.location.pathname, hasComment: true });
        }

        showThankYou(widget);
    }

    function skipFeedback(widget) {
        trackEvent('feedback_skip', { page: window.location.pathname });
        showThankYou(widget);
    }

    function showThankYou(widget) {
        widget.innerHTML = `
      <div class="feedback-thanks" role="status">
        <span aria-hidden="true">✓</span> Thanks for your feedback!
        <a href="mailto:accessibility@arizona.edu?subject=Feedback on ${encodeURIComponent(document.title)}" class="feedback-more-link">Have more to share?</a>
      </div>
    `;
    }

    // Local storage helpers
    function saveFeedback(page, value, comment = null) {
        try {
            const data = JSON.parse(localStorage.getItem(config.storageKey) || '{}');
            data[page] = { value, comment, timestamp: Date.now() };
            localStorage.setItem(config.storageKey, JSON.stringify(data));
        } catch (e) {
            console.warn('Could not save feedback:', e);
        }
    }

    function getFeedback(page) {
        try {
            const data = JSON.parse(localStorage.getItem(config.storageKey) || '{}');
            return data[page]?.value || null;
        } catch (e) {
            return null;
        }
    }

    // Analytics helper (integrates with existing analytics if available)
    function trackEvent(eventName, params) {
        // Google Analytics 4
        if (typeof gtag === 'function') {
            gtag('event', eventName, params);
        }
        // Adobe Analytics (if used)
        if (typeof s === 'object' && s.tl) {
            s.tl(true, 'o', eventName);
        }
        // Console for debugging
        console.log('Feedback event:', eventName, params);
    }

    // Inject styles
    function injectStyles() {
        if (document.querySelector('#feedback-widget-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'feedback-widget-styles';
        styles.textContent = `
      .feedback-widget {
        margin: 3rem 0 2rem;
        padding: 1.5rem;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border: 1px solid #dee2e6;
        border-radius: 12px;
        text-align: center;
      }

      .feedback-heading {
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0 0 1rem;
        color: #333;
      }

      .feedback-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
      }

      .feedback-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        font-weight: 600;
        border: 2px solid #dee2e6;
        border-radius: 8px;
        background: #fff;
        color: #333;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .feedback-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }

      .feedback-btn:focus {
        outline: 3px solid #1565c0;
        outline-offset: 2px;
      }

      .feedback-yes:hover {
        background: #e8f5e9;
        border-color: #4caf50;
        color: #2e7d32;
      }

      .feedback-no:hover {
        background: #ffebee;
        border-color: #f44336;
        color: #c62828;
      }

      .feedback-followup {
        margin-top: 1rem;
      }

      .feedback-thanks-msg,
      .feedback-sorry-msg {
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      .feedback-thanks-msg {
        color: #2e7d32;
      }

      .feedback-sorry-msg {
        color: #c62828;
      }

      .feedback-extra {
        font-size: 0.9rem;
        color: #666;
      }

      .feedback-label {
        display: block;
        margin: 1rem 0 0.5rem;
        font-weight: 600;
        text-align: left;
      }

      .feedback-textarea {
        width: 100%;
        padding: 0.75rem;
        font-size: 1rem;
        font-family: inherit;
        border: 2px solid #dee2e6;
        border-radius: 8px;
        resize: vertical;
        min-height: 80px;
      }

      .feedback-textarea:focus {
        border-color: #1565c0;
        outline: none;
        box-shadow: 0 0 0 3px rgba(21, 101, 192, 0.2);
      }

      .feedback-actions {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
      }

      .feedback-submit {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        font-weight: 600;
        background: #1565c0;
        color: #fff;
        border: none;
        border-radius: 8px;
        cursor: pointer;
      }

      .feedback-submit:hover {
        background: #0d47a1;
      }

      .feedback-submit:focus {
        outline: 3px solid #1565c0;
        outline-offset: 2px;
      }

      .feedback-skip {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        background: transparent;
        color: #666;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        cursor: pointer;
      }

      .feedback-skip:hover {
        background: #f5f5f5;
      }

      .feedback-thanks {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 1rem;
        background: #e8f5e9;
        border-radius: 8px;
        color: #2e7d32;
        font-weight: 600;
      }

      .feedback-more-link {
        margin-left: 1rem;
        font-weight: normal;
      }

      @media (max-width: 480px) {
        .feedback-buttons {
          flex-direction: column;
        }

        .feedback-btn {
          width: 100%;
          justify-content: center;
        }

        .feedback-actions {
          flex-direction: column;
        }

        .feedback-submit,
        .feedback-skip {
          width: 100%;
        }
      }

      @media print {
        .feedback-widget {
          display: none;
        }
      }
    `;
        document.head.appendChild(styles);
    }

    // Initialize when DOM is ready
    function init() {
        injectStyles();
        createFeedbackWidget();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
