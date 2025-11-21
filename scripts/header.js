// Small header toggle: injects IDs if missing and toggles nav visibility
document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var toggle = header.querySelector('.nav-toggle');
    var primary = header.querySelector('.site-header-nav');
    var utilities = header.querySelector('.site-header-utilities');
    if (primary && !primary.id) primary.id = 'primary-nav';
    if (!toggle) return;

    // helper: get all focusable elements within nav when opened
    function getNavFocusables() {
        var nodes = [];
        if (primary) nodes = nodes.concat(Array.from(primary.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')));
        if (utilities) nodes = nodes.concat(Array.from(utilities.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')));
        return nodes.filter(Boolean);
    }

    function openNav() {
        header.classList.add('nav-open');
        toggle.setAttribute('aria-expanded', 'true');
        var focusables = getNavFocusables();
        if (focusables.length) focusables[0].focus();
        document.addEventListener('keydown', onKeyDown);
    }

    function closeNav() {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
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
