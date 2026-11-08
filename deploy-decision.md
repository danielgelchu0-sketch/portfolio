# Deployment Decision Record: Cloud Hosting Evaluation

## 1. Executive Summary & Selected Host

**Selected Platform:** **Cloudflare Pages**  
**Official Terms & Pricing Citation:** [Cloudflare Pages Pricing & Plans](https://www.cloudflare.com/plans/) | [Cloudflare Self-Serve Subscription Agreement](https://www.cloudflare.com/terms/)

Cloudflare Pages was selected as the production hosting platform for Biruh Digital. It satisfies 100% of the operational requirements: zero-cost static edge hosting, explicit permission for commercial and client portfolio usage on the Free plan, no credit card required, unlimited static bandwidth, automated Git-triggered deployments, and free automatic SSL/TLS on custom domains.

---

## 2. Comparative Evaluation Matrix

| Criteria | Cloudflare Pages (Selected) | Netlify | Vercel | GitHub Pages |
| :--- | :--- | :--- | :--- | :--- |
| **Commercial Use on Free Tier** | **ALLOWED** (Explicitly permitted) | **ALLOWED** | **STRICTLY PROHIBITED** (Terms Section 4) | **RESTRICTED** (Prohibits running a business / commercial sales) |
| **Credit Card Required?** | **No** | **No** | **No** | **No** |
| **Bandwidth Limits** | **Unlimited** (Unmetered static traffic) | Pool of 300 credits/mo (Hard pause when depleted) | 100 GB/month (Hobby only) | 100 GB/month soft limit |
| **Monthly Builds** | **500 builds / month** | ~20 production deploys/mo (15 credits per deploy) | 6,000 build minutes/mo | 10 builds/hour |
| **Concurrent Builds** | 1 build | 1 build | 1 build | 1 build |
| **Custom Domains & HTTPS** | Included (up to 5 domains) | Included | Included | Included |
| **Global Anycast CDN** | 330+ edge locations worldwide | Global CDN | Global Edge Network | Fastly CDN |
| **Failure Behavior** | Exceeding build quota queues updates; **site never goes offline** | **Hard stop** (Site taken offline unless upgraded) | Account flagged or forced upgrade | Throttling / email warning |
| **Verdict** | **WINNER (Production Choice)** | **Fallback (Secondary)** | **REJECTED (Terms Violation)** | **REJECTED (Commercial Restriction)** |

---

## 3. Detailed Rejection Rationales

### Why Vercel Was Rejected
- **Citation:** [Vercel Terms of Service & Fair Use](https://vercel.com/legal/terms)
- **Constraint:** Section 4 of Vercel’s Terms of Service explicitly restricts the Hobby tier to **personal, non-commercial use only**. Vercel defines commercial usage as *“any deployment used for the purpose of financial gain”*, specifically citing freelance portfolios, agency websites, and promoting services for hire. Hosting this client-facing commercial portfolio on Vercel's free tier is an active violation of their terms and risks immediate account suspension.

### Why GitHub Pages Was Rejected
- **Citation:** [GitHub Pages Usage Guidelines](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#usage-limits)
- **Constraint:** GitHub Pages is explicitly intended for open-source documentation, personal projects, and software repositories. GitHub’s Terms of Service state that GitHub Pages is *“not intended for or allowed to be used as a free web-hosting service to run an online business or facilitate commercial transactions”*.

### Why Netlify Was Kept as Secondary Fallback Only
- **Citation:** [Netlify Pricing & Credit System](https://www.netlify.com/pricing/)
- **Constraint:** While Netlify permits commercial use on its Free plan, it enforces a credit-based consumption model (300 credits/month). Production deploys cost 15 credits each, limiting the account to approximately 20 deploys per month. Crucially, exceeding the credit balance results in a **hard pause**, taking the live website offline until the next monthly billing cycle unless a credit card is attached.

---

## 4. Key Cloudflare Pages Limits Relevant to This Site

1. **Static Bandwidth:** **Unlimited**. Even if a client portfolio link trends on Telegram or local social media, the site will never be throttled or taken down due to traffic spikes.
2. **Monthly Builds:** **500 builds/month**. Daniel can push updates to his portfolio 16 times per day without exceeding the limit.
3. **Build Execution Time:** Maximum 20 minutes per build. (Biruh Digital builds in under 1 second).
4. **File Count:** Up to 20,000 files per deployment. (Biruh Digital uses under 25 static files).
5. **Periodic Review:** Free-tier policies and terms should be rechecked every **six months** to ensure ongoing compliance.
