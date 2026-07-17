# Akieboye Godgift | Premium E-Commerce Design & Development Portfolio

A high-performance, agency-grade digital portfolio built specifically for the **high-ticket E-Commerce & DTC storefront niche**. Replicating modern interactive layouts, the site features buttery-smooth scroll physics, magnetic custom cursors, dynamic project showcase selectors, and deep technical SEO integrations.

🌐 **Live URL**: [ecomm-landing-five.vercel.app](https://ecomm-landing-five.vercel.app/index.html)

---

## 📂 Project Structure

```text
portfolio2/
├── index.html            # Main e-commerce landing page (conversion-optimized)
├── about.html            # DTC metrics, studio philosophy, and specialties
├── services.html         # Services breakdown (Shopify, CRO audits, mobile commerce)
├── projects.html         # Portfolio showcasing custom case studies
├── faq.html              # Merchant Q&A (Shopify migration, checkout tweaks, support)
├── contact.html          # Interactive contact form (deployment-ready brief tags)
├── sitemap.xml           # Static sitemap for Google crawler indexing
├── robots.txt            # Search bot directions and sitemap linkage
└── assets/
    ├── css/
    │   └── custom.css    # Ambient mesh blob keyframes, custom cursor, & scrollbars
    ├── js/
    │   └── main.js       # Lenis smooth-scroll, magnetic cursor, GSAP triggers, transitions
    └── images/           # High-fidelity custom e-commerce product mockup visual assets
```

---

## 🚀 Key Features & Interactive Animations

- **Lenis Smooth Scroll**: Added inertia momentum mouse scrolling to simulate fluid physics.
- **GSAP ScrollTrigger Reveals**: Headers split into words and slide up on viewport entry; elements fade and transition dynamically.
- **Custom Magnetic Cursor**: Follower circle that highlights clickable elements. It uses ScrollTrigger to change theme contrast (light vs. dark) based on the section backdrop.
- **Drifting Mesh Gradients**: Multi-colored keyframed blobs floating behind hero elements to establish premium ambient lighting.
- **Project Accordion Selector**: Updates project indices (`01/08` to `08/08`) and dynamically scales and swaps project mockups on hover.
- **Navigation Curtain Transitions**: Intercepts same-origin links and slides a black curtain transition to prevent white page-loading flashes.
- **Netlify Form Setup**: The contact form features `data-netlify="true"` so customer project briefs route straight to your inbox upon live deployment.

---

## 📈 Technical SEO Optimizations

- **JSON-LD Schema Markup**: Integrated `ProfessionalService` and `WebSite` JSON-LD tags, declaring business hours, location details (Lekki, Lagos), and linking social profiles for search authority.
- **Meta Description**: Truncated all page meta descriptions below **160 characters** to ensure clean snippet previews on Google.
- **Clean Heading Extraction**: Inserted trailing spaces before all `<br>` tags to prevent crawlers from indexing concatenated phrases (e.g. indexing `through commerce` instead of `throughcommerce`).
- **Canonical Tags**: Injected canonical paths to prevent index duplication penalties.
- **Robots & Sitemap**: Configured `robots.txt` referencing `sitemap.xml` for structural index crawling.
- **Outbound Authority Links**: Linked to high-quality external targets like [Shopify Plus](https://www.shopify.com/plus), [Shopify Hydrogen](https://hydrogen.shopify.dev/), [GSAP](https://gsap.com), and [Lenis](https://github.com/studio-freight/lenis).

---

## 🛠️ How to Run & Deploy

### Run Locally
Since this project uses modern CDNs for Tailwind CSS and GSAP, there are no npm installation steps required:
1. Double-click `index.html` to open it directly in any browser.
2. Alternatively, run a simple local server inside the folder (e.g., using VS Code's Live Server or Python's `http.server`).

### Production Deployment
Link your repository to **Vercel**, **Netlify**, or **Cloudflare Pages** for automatic deployments:
- **Netlify (Form Support)**: Link your Git repo to Netlify. Form submissions will automatically compile in your Netlify admin dashboard under "Forms".
- **Vercel**: Link your Git repo to Vercel and it compiles instantly.
