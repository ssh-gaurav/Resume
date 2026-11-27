# Gaurav Singh Rajawat — Portfolio

Personal portfolio for an AI & ML student at Madhav Institute of Science and Technology, Gwalior. Includes project work, education, coding activity, and a downloadable resume.

## Features

- Interactive rocket entrance with a skip option and reduced-motion entry.
- Three.js hero scene, responsive sections, and smooth scrolling.
- About, technical skills, project gallery, education, and contact sections.
- GitHub repository sync and project import. Gallery selections are saved in the visitor's browser using local storage.
- LeetCode activity calendars with year selection, solved counts, and recent accepted submissions.
- GitHub contribution calendars with historical year selection, a rolling current view, daily counts, and refresh controls.
- One-page PDF resume available at `/resume.pdf`.
- Scroll isolation for menus and dialogs.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS, Three.js, React Three Fiber, Drei, Framer Motion, GSAP, Lenis, and Lucide icons. Use pnpm for dependency management.

## Run locally

Install a Node.js version supported by the installed Next.js release and pnpm, then run:

```bash
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000). The development and build scripts use webpack.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run Oxlint |
| `pnpm exec tsc --noEmit` | Check TypeScript types |

Run `pnpm build` before `pnpm start`.

## Project structure

```text
src/
  app/
    api/leetcode/route.ts          LeetCode activity proxy
    api/github-activity/route.ts   GitHub contribution proxy
    globals.css                   Global styles
    layout.tsx                    App layout and metadata
    page.tsx                      Client portfolio entry
  App.tsx                         Main sections, navigation, smooth scrolling
  components/
    intro/                        Rocket and cinematic entrance
    3d/                           Three.js scene components
    sections/                     Portfolio sections
    ui/                           Navigation, dialogs, activity calendars
  data/resumeData.ts              Profile and portfolio data
  hooks/useScrollLock.ts          Shared overlay scroll lock
  utils/                         GitHub helpers and cinematic audio
public/resume.pdf                 Downloadable resume
scripts/build_resume.py           PDF generation script
```

## Customize

- Update profile details, social links, education, and fallback projects in `src/data/resumeData.ts`.
- Section copy and skill lists also live directly in `src/components/sections/`; update those when changing profile content.
- Configure activity usernames in `src/app/api/leetcode/route.ts`, `src/app/api/github-activity/route.ts`, and the profile links in `src/components/ui/ContributionCalendar.tsx`.
- Replace `public/resume.pdf` to change the download. To regenerate the current layout, edit `scripts/build_resume.py` and run:

```bash
python -m pip install reportlab pypdf
python scripts/build_resume.py
```

The generator currently loads Arial from `C:/Windows/Fonts`. Update the font paths for other operating systems. It checks that the generated document is one page and contains extractable text.

## Activity data

No API keys are required for the current integrations.

- LeetCode data is fetched server-side from its GraphQL endpoint and cached for 15 minutes. Calendar history and the latest accepted submissions are different datasets; the recent list is not a complete submission archive.
- GitHub daily counts and intensity levels come from the public contribution calendar. Current-year selection shows GitHub's rolling last-year range; older selections show calendar years.
- GitHub private contribution counts appear only when enabled on the account's public profile. Repository names and private code are not exposed by this calendar.
- External services can be unavailable or rate limited. Activity cards include profile links and retry controls.
- The GitHub calendar parser depends on GitHub's HTML structure and may need updating if that structure changes.

## Contact forms

The contact and opportunity forms currently show a local success state only. They do not send email or persist submissions. Connect a server-side delivery service before using them to collect inquiries.

## Development notes

Read `AGENTS.md` and the relevant documentation in `node_modules/next/dist/docs/` before changing Next.js code. The installed version may differ from familiar Next.js conventions.
