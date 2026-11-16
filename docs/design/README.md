# Design files

The approved screens, exported from the design canvas. Reference only: use them for layout,
spacing, sizes, copy and animation behaviour. Do not copy their markup. They use inline styles,
hex values and design-tool template syntax (`{{ }}`, `<sc-for>`, `<sc-if>`, `<dc-import>`,
`class Component extends DCLogic`).

| File                       | Screen                         | Route      |
| -------------------------- | ------------------------------ | ---------- |
| `Main.dc.html`             | Landing page, desktop          | `/`        |
| `MobileLanding.dc.html`    | Landing page, mobile (390px)   | `/`        |
| `SignIn.dc.html`           | Sign in, desktop               | `/sign-in` |
| `MobileSignIn.dc.html`     | Sign in, mobile                | `/sign-in` |
| `SignUp.dc.html`           | Sign up, desktop               | `/sign-up` |
| `MobileSignUp.dc.html`     | Sign up, mobile                | `/sign-up` |

Desktop and mobile are the same route. Build one responsive page per route, not two pages.

## Images

The design files point at images by canvas ids (`/_blob/<id>`). These are the matching files in
the repo. Always import them from `src/assets/images/`, never by URL.

| Canvas id (`/_blob/…`)              | Repo file                                              | Used for                                  |
| ----------------------------------- | ------------------------------------------------------ | ----------------------------------------- |
| `227d6a0f47db87710aa3fe41aa232c4e`  | `src/assets/images/brand/fastship-logo.png`            | Logo on light backgrounds                 |
| `97cd45c0cecc836a4115fcdc09d8206c`  | `src/assets/images/brand/fastship-logo-light.png`      | Logo on dark backgrounds (footer, sign in)|
| `353677539664e9f401bccd75a5227a82`  | `src/assets/images/features/multi-carrier.webp`        | Feature 01                                |
| `61ded574c37240b518e896ec238f75a3`  | `src/assets/images/features/dashboard.webp`            | Feature 02                                |
| `ecaf49884b6cb736b60eeb46a6cb0f54`  | `src/assets/images/features/doorstep.webp`             | Feature 03                                |
| `e638ed3aac385027f0b240f8696787a5`  | `src/assets/images/features/international.webp`        | Feature 04                                |
| `804fbc43c806540660ff4a1112e088b6`  | `src/assets/images/features/automated-workflows.webp`  | Feature 05                                |
| `a5b3fbbb7abc11016c8045cd3052f657`  | `src/assets/images/photos/courier-with-van.webp`       | About section (desktop only)              |
| `d5e32810b13c223b65a708b865ca8770`  | `src/assets/images/photos/support-agent.webp`          | 24/7 support banner (desktop only)        |
| `47126aad4e834062cf64c19a4a0fffe8`  | `src/assets/images/food/palm-oil.jpeg`                 | Send food home card                       |
| `7fc5b3d74dd385d72e5bba9c4e37900a`  | `src/assets/images/food/garri.jpeg`                    | Send food home card                       |
| `6cd390dfe8e2d898ce09a18868016dca`  | `src/assets/images/food/yam-flour.jpeg`                | Send food home card                       |
| `28912f09480fc087738b6a18322c64e1`  | `src/assets/images/food/egusi.jpeg`                    | Send food home card                       |
| `591fcbb62e601f3d879fe930574c887b`  | `src/assets/images/food/spices.jpeg`                   | Send food home card                       |
| `d14e705f5c5b5d7ff90c5b94d8d7b01d`  | `src/assets/images/food/snacks.jpeg`                   | Send food home card                       |

The air cargo, vehicle import and customs help cards use inline SVG illustrations that are in the
design files themselves. Turn each into its own component under
`src/components/content/landing/illustrations/`.
