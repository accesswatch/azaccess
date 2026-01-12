// Small header toggle: injects IDs if missing and toggles nav visibility
document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var toggle = header.querySelector('.nav-toggle');
    var primary = header.querySelector('.site-header-nav');
    var utilities = header.querySelector('.site-header-utilities');
    var roleSelector = header.querySelector('.role-selector');

    if (primary && !primary.id) primary.id = 'primary-nav';
    if (!toggle) return;

    // Set initial aria-hidden state for nav sections (hidden on mobile until opened)
    function setNavHidden(hidden) {
        if (primary) primary.setAttribute('aria-hidden', hidden ? 'true' : 'false');
        if (utilities) utilities.setAttribute('aria-hidden', hidden ? 'true' : 'false');
        if (roleSelector) roleSelector.setAttribute('aria-hidden', hidden ? 'true' : 'false');
    }

    // Check if we're in mobile view
    function isMobileView() {
        return window.getComputedStyle(toggle).display !== 'none';
    }

    // Initialize hidden state based on viewport
    function initHiddenState() {
        if (isMobileView()) {
            setNavHidden(true);
        } else {
            setNavHidden(false);
        }
    }
    initHiddenState();
    window.addEventListener('resize', initHiddenState);

    // helper: get all focusable elements within nav when opened
    function getNavFocusables() {
        var nodes = [];
        var selector = 'a, button, select, input, [tabindex]:not([tabindex="-1"])';
        if (primary) nodes = nodes.concat(Array.from(primary.querySelectorAll(selector)));
        if (utilities) nodes = nodes.concat(Array.from(utilities.querySelectorAll(selector)));
        if (roleSelector) nodes = nodes.concat(Array.from(roleSelector.querySelectorAll(selector)));
        return nodes.filter(Boolean);
    }

    function openNav() {
        header.classList.add('nav-open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close navigation menu');
        setNavHidden(false);
        var focusables = getNavFocusables();
        if (focusables.length) focusables[0].focus();
        document.addEventListener('keydown', onKeyDown);
    }

    function closeNav() {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
        setNavHidden(true);
        toggle.focus();
        document.removeEventListener('keydown', onKeyDown);
    }

    function onKeyDown(e) {
        if (e.key === 'Escape') {
            closeNav();
            return;
        }
        if (e.key === 'Tab') {
            // focus trap inside nav when open
            var focusables = getNavFocusables();
            if (!focusables.length) return;
            var first = focusables[0];
            var last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }

    toggle.addEventListener('click', function () {
        var expanded = toggle.getAttribute('aria-expanded') === 'true';
        if (expanded) closeNav(); else openNav();
    });
});

// Role selector: navigate to selected role guide
function goToRole(form) {
    var select = form.querySelector('select');
    var value = select.value;
    if (value && value !== '') {
        window.location.href = value;
        return false; // prevent form submission
    }
    // If no selection, go to roles.html
    window.location.href = 'roles.html';
    return false;
}
