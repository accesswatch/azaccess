---
title: Site Alert Banner
summary: Content patterns for global alerts (e.g., Title II countdown, service disruptions).
owner: Accessibility Communications
last_reviewed: 2025-11-20
next_review: 2026-02-20
tags:
  - topic:alerts
---

```
<div role="status" class="site-alert site-alert--warning">
  <p><strong>Title II compliance countdown:</strong> 520 days until April 24, 2026. Review the <a href="/policies/title-ii-brief">Title II readiness brief</a> to stay on track.</p>
</div>
```

Guidelines:
- Use `role="status"` for informational alerts, `role="alert"` for urgent issues.
- Keep copy under 200 characters when possible.
- Provide a clear CTA link for more details.
- Ensure alert is dismissible if persistent beyond one page.
