# Design System Specification: The Nocturnal Architect

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Atmospheric Workspace."** 

Standard dashboards often feel like rigid spreadsheets—cold, flat, and cognitively taxing. This system rejects the "box-in-a-box" mentality in favor of an editorial, immersive environment. We treat the interface as a physical workspace viewed under soft, diffused moonlight. By utilizing a "Soft Dark Mode" built on deep navy foundations rather than harsh blacks, we reduce pupillary fatigue and create a sense of calm authority.

The system breaks the "template" look through **intentional asymmetry** and **tonal depth**. Rather than relying on lines to organize data, we use the weight of typography and the shifting "temperature" of blue surfaces to guide the eye.

---

## 2. Colors & Surface Philosophy

### The Palette
The core of the system is the interplay between the deep `#0b1326` (Surface) and the vibrant `#7bd0ff` (Primary). This contrast ensures that while the environment is dark, the "points of intent" are luminous.

- **Primary (`#7bd0ff`):** Used for "Active" states and primary calls to action.
- **Surface Tiers:** 
  - `surface_container_lowest` (`#060e20`): For deep background recesses.
  - `surface_container` (`#171f33`): The standard "sheet" color.
  - `surface_bright` (`#31394d`): For elements that need to pop forward.

### The "No-Line" Rule
**Borders are prohibited for sectioning.** To separate a sidebar from a main content area, do not draw a line. Instead, place a `surface_container_low` (`#131b2e`) sidebar against a `surface` (`#0b1326`) main stage. The boundary should be felt through the shift in tonal value, not seen as a stroke.

### Surface Hierarchy & Nesting
Treat the UI as a series of nested, translucent layers. 
- **Level 1 (Base):** `surface`
- **Level 2 (Section):** `surface_container`
- **Level 3 (Card/Element):** `surface_container_high`

### The "Glass & Gradient" Rule
To inject "soul" into the dashboard, use subtle linear gradients for primary actions. A button should not be a flat `#7bd0ff`; it should transition from `primary` to `on_primary_container` at a 135-degree angle. For floating overlays (modals/tooltips), use `surface_bright` with a 60% opacity and a `20px` backdrop-blur to create a "frosted sapphire" effect.

---

## 3. Typography: The Editorial Voice

We utilize a dual-typeface system to balance character with utility.

*   **Display & Headlines (Manrope):** Chosen for its geometric precision and modern "tech-editorial" feel. Use `display-lg` and `headline-md` with tight letter-spacing (-0.02em) to create a bold, authoritative presence.
*   **Body & Labels (Inter):** The workhorse. Inter provides maximum legibility at small sizes. 
*   **The Hierarchy Goal:** Use high-contrast scale. A `display-md` title should sit near a `body-sm` metadata tag. This creates an "Editorial" layout where the importance of data is immediately obvious through size, not just weight.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved through **Tonal Layering**. If a card needs to feel "active," do not give it a thicker border; move its background token from `surface_container` to `surface_container_highest`.

### Ambient Shadows
Traditional black shadows are forbidden. Shadows must be "Ambient Blues."
- **Token:** Use a 12% opacity version of `surface_container_lowest`.
- **Properties:** `0px 12px 32px`. The blur must be large and soft, mimicking a light source that is diffused through a softbox.

### The "Ghost Border" Fallback
In high-density data visualizations where tonal shifts aren't enough, use a **Ghost Border**: `outline_variant` (`#45464d`) at 15% opacity. It should be barely perceptible—a "hint" of an edge rather than a structural constraint.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (Azure to Cyan), `0.75rem` (md) rounded corners. Text is `on_primary`.
- **Secondary:** `surface_container_highest` fill with no border. Text is `primary`.
- **Tertiary:** No fill. Text is `primary`. Hover state triggers a `10%` opacity `primary` background ghosting.

### Cards & Data Lists
- **Rule:** Absolute prohibition of `divider lines`. 
- **Execution:** Use vertical white space (`1.5rem` from the spacing scale) and `title-sm` headers to group information. For list items, use alternating subtle background shifts (`surface_container` vs `surface_container_low`) only if necessary for scanning.

### Input Fields
- **Default State:** `surface_container_highest` background, `0.5rem` radius.
- **Focus State:** `1px` Ghost Border using `primary` at 40% opacity. No "glow" shadows—only the color shift.
- **Typography:** Labels use `label-md` in `on_surface_variant` to keep the focus on the user's input.

### Chips
- Use `full` (pill) roundedness. 
- **Inactive:** `surface_container_high` with `on_surface_variant` text.
- **Active:** `primary_container` with `primary` text.

---

## 6. Do's and Don'ts

### Do
*   **Do** use `surface_container_lowest` for the deepest parts of the UI (e.g., the "trough" of a scroll area).
*   **Do** lean into `xl` (1.5rem) corner radii for large containers to emphasize the "soft" aesthetic.
*   **Do** use `azure/cyan` accents sparingly—only for interactive elements or critical status indicators.

### Don't
*   **Don't** use pure white (`#FFFFFF`) for text. Use `on_surface` (`#dae2fd`) to maintain the soft, low-strain aesthetic.
*   **Don't** use 1px solid borders to separate the header from the body. Use a subtle shadow or a background color step-down.
*   **Don't** use "Drop Shadows" on flat surfaces. Only use shadows for elements that physically "float" (modals, dropdowns).