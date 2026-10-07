# KINND website brief

For Claude Design. The screens to copy inspiration from is attached. Follow the layouts, colors and style very strict and adapt the colors to the Design in the project.
**Rule: keep it simple.** Use short sentences and one idea per section. No jargon on the page.

## 1. What KINND is

KINND is one calm, shared place for each child of separated parents. It holds the calendar and custody plan, moments and photos, lists, notes and messages. Each adult sees and does only what their relationship to the child allows.

- **Who it's for:** separated or co-parenting parents first. Grandparents, step-parents, guardians and caregivers come in through an invite.
- **Where it runs:** app.kinnd.eu. It's a web app you install on your phone, with push notifications. No app store needed.
- **Languages:** English, Danish and Swedish.
- **Tone:** warm, calm and child-first. Not legal and not cold.

**One-liner:** *Safe collaboration and sharing in the trusted family*

## 2. Features and what each one gives families

| Feature | What it does | What families get |
|---|---|---|
| **Today** | Today's custody, appointments, tasks and new activity for all your children | You know where your child is and what's happening, at a glance |
| **Calendar and custody plan** | Recurring plans (7/7, 10/4 and more) with handovers. Swap requests the other parent approves. Appointments with checklists. | No more "whose week is it?" Changes are agreed in the app, not argued about in texts. |
| **Moments (journal)** | Posts with photos and videos, tagged to a child. Family can comment and react. | Grandparents and family follow along without a group chat. |
| **Media library** | Every photo and video in one place. Download originals or a zip. | The child's memories stay together, whichever home they were taken in. |
| **Child profile** | Basic info, growth chart, emergency contacts, school timetable, handover packing lists | Both homes have the same, current facts |
| **Medical info** | Allergies, conditions, medication schedules, emergency guidance | The right adult knows what to do. Family sees it only when a parent allows it. |
| **Lists** | Necessities and wishlists per child. Family can claim items. | No double gifts, nothing forgotten at handover |
| **Messages and notes** | Threads between the adults around a child, plus private notes | Child matters stay in one focused place, apart from private life |
| **Family and invites** | Invite the other parent, family or caregivers by email or SMS. The role follows the relationship. | Everyone gets the right access. Nobody gets more than they should. |
| **Notifications and search** | Push, email and in-app alerts. Search across everything you can see. | You hear about what matters and find things fast |

**Roles in one line:** parents and guardians manage the child. Family can post, add to lists and request appointments. Caregivers can view, comment and claim list items.

### Plans (from the app code; check before publishing)

| | Free | Parents | Family |
|---|---|---|---|
| Price/month | 0 DKK | 29 DKK | 69 DKK |
| Price/year | 0 DKK | 278.40 DKK (−20%) | 579.60 DKK (−30%) |
| Children | 2 | 3 | 6 |
| Storage per person | 200 MB | 2 GB | 100 GB |
| Invite | nobody | other parent, guardians | everyone: parents, guardians, family, caregivers |
| Custody planning and media library | — | ✓ | ✓ |

- Everyone gets **30 days free with all Family features**, once.
- **Invited people never pay.** One person pays and the whole circle is covered.
- Prices include Danish VAT. Pay by card. Cancel any time. Moving to a smaller plan never deletes anything.

## 3. Security and privacy (main trust message)

Lead line: **Built for children's data, so it's built to protect it.**

Write each point as a plain promise with a short "how" underneath.

| Promise | How (short, for the page) |
|---|---|
| **Your family stays private** | The database itself blocks every family from every other family's data, not just the app on top of it |
| **Photos are locked** | Every photo and video is encrypted with its own key (AES-256) |
| **Locations are stripped** | GPS data is removed before anyone but the uploader sees a photo |
| **Medical info is extra protected** | It's encrypted separately and shown to family only with a parent's permission |
| **Only the right people get in** | Two-step sign-in, a verified phone number and verified email. Sign in with Google or Microsoft is also available. |
| **You see your devices** | See where you're signed in and sign out other devices |
| **Removing someone works at once** | Access is checked on every request |
| **Your data is yours** | Download all your data any time. Delete your account any time. |
| **We keep as little as we can** | No gender, no adult birth dates, short retention times |
| **Safe deletions** | Deleting a child needs every parent to agree, and you have 30 days to change your mind |
| **Hosted in the EU** | GDPR from the start (confirm hosting and wording with counsel) |

Don't promise end-to-end encryption. The server has to process photos to make thumbnails.

### KINND management: how we protect you behind the scenes (secondary)

Keep this short: one block on the Safety page, a link from the footer. The goal is trust, not detail.

- **Separate, locked-down system.** Our staff tools (manage.kinnd.eu) run apart from the app and connect only through a signed, encrypted channel.
- **Staff sign in with company accounts and strong multi-factor authentication.** There is no public login page.
- **Least access.** Each staff role sees only what its job needs. Personal details are masked by default.
- **No browsing.** Staff can only open a family's data inside a support or safety case, with a stated reason and for a limited time.
- **Every action is logged.** The log can't be changed, not even by us, and it's reviewed regularly.
- **Medical info never leaves the app.** Staff tools never receive it.
- **Humans decide.** Automatic checks flag fraud and abuse. Serious actions always need a named person, and the most serious need two.
- **Never a weapon.** Support never removes a parent because the other parent asked.

## 4. Sitemap and page contents

The marketing site sits at kinnd.eu. "Log in" and "Get started" go to app.kinnd.eu. Keep it to **6 main pages plus legal**.

```
kinnd.eu
├── /              Home
├── /features      Features
├── /pricing       Pricing
├── /safety        Safety & privacy
├── /faq           FAQ
├── /contact       About & contact
└── /legal         Privacy · Terms · Cookies
```

Header: logo · Features · Pricing · Safety · FAQ · **Try for free** (button)
Footer: page links · legal links · language switcher (EN/DA/SV) · contact email

### Home `/`
1. **Hero:** one-liner, a short sub-line, the "Start free for 30 days" button and a phone mockup of Today.
2. **The problem:** three short pains: scattered texts, "whose week is it?", and photos split between two homes.
3. **How it works:** 3 steps: add your child → invite the other parent and family → share calendar, moments and lists.
4. **Feature highlights:** 4 cards (Calendar and custody, Moments, Lists, Medical info), each linking to Features.
5. **Trust strip:** 4 icons (encrypted photos, locations stripped, two-step sign-in, EU/GDPR) linking to Safety.
6. **Pricing teaser:** "Free to start. Invited family never pay." linking to Pricing.
7. **Final call to action**

### Features `/features`
- A short intro, then one section per feature from §2 in this order: Today, Calendar and custody, Moments and media, Child profile and medical, Lists, Messages, Family and roles.
- Each section has a screenshot, a headline, 2 lines of copy and the benefit in **bold**.
- End with a simple roles table (Parent / Guardian / Family / Caregiver: what each can do) and a call to action.

### Pricing `/pricing`
- 3 plan cards with a monthly/yearly toggle. Family is marked "most popular".
- Notes: the 30-day trial, "invited people never pay", cancel any time, prices include VAT.
- A comparison table (from §2) and 4–5 pricing FAQs.

### Safety & privacy `/safety`
- Lead line, then a promise grid (from §3).
- "What happens to photos": 3 steps: upload → encrypted and location removed → only the right people see it.
- "Your data, your choice": export, delete, 30-day child restore.
- "Behind the scenes": the KINND management block (§3, secondary).
- Links to the privacy notice and a contact address for security reports.

### FAQ `/faq`
Group the questions. Short answers.
- **Getting started:** Is it an app? Which phones? Languages?
- **Family:** What if the other parent won't join? What can grandparents see? Can a caregiver see medical info?
- **Plans:** Who pays? What happens after the trial? What if I downgrade?
- **Safety:** Who can see my child's photos? Can KINND staff see my data? How do I delete everything?

### About & contact `/contact`
- Why KINND exists (2–3 sentences, child-first).
- Contact form or email, plus a security contact.
- Company details (CVR, address).

### Legal `/legal/*`
Privacy notice, Terms, Cookie policy. These are plain text pages. Use a cookie banner only if you add non-essential cookies (prefer none).

## 5. Open before publishing

- Final prices (the docs say 39 DKK for Parents on v3.1, the code says 29 DKK). Confirm before publishing.
- The hosting location and GDPR/legal wording, checked with counsel.
- The marketing domain (kinnd.eu root, or another).
