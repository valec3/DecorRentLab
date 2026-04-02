# Design System Document: The Curated Atelier

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Curator"**
This design system moves away from the rigid, boxy layouts of traditional e-commerce. It treats the digital screen as a high-end editorial spread. We are not just selling furniture; we are curating a lifestyle. The goal is to create an "Airy, Harmonious, and Premium" experience that feels as intentional as a physical gallery.

By utilizing **intentional asymmetry**, **over-scaled typography**, and **tonal layering**, we break the "template" look. We favor breathing room over density, allowing the product photography to act as the primary structural element. The interface should feel like it was "laid out" by an editor, not "rendered" by a machine.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule
The color strategy relies on the subtle interplay of warm neutrals and luminous gold.

*   **The Palette:**
    *   **Background (`#faf9f6`):** The canvas. It is never pure white, providing a softer, more sophisticated foundation.
    *   **Primary / Gold (`#735c00` / `#d4af37`):** Use for "signature" moments—CTAs, price points, or active states.
    *   **On-Surface / Charcoal (`#1a1c1a`):** Deep contrast for maximum readability against the cream backgrounds.

*   **The "No-Line" Rule:**
    **Strict Prohibition:** Designers are prohibited from using 1px solid borders to section off content. Traditional dividers are considered "visual noise."
    *   **Alternative:** Define boundaries solely through background color shifts. A `surface-container-low` section sitting on a `surface` background provides all the separation the eye needs.

*   **Surface Hierarchy & Nesting:**
    Treat the UI as a series of physical layers. Use `surface-container` tiers (Lowest to Highest) to create "nested" depth. 
    *   *Example:* A `surface-container-lowest` card placed on a `surface-container-low` section creates a soft, natural lift that feels like fine paper layered on a desk.

*   **Signature Textures:**
    Main CTAs should use a subtle linear gradient transitioning from `primary` to `primary_container`. This adds a "metallic luster" that flat color cannot achieve, mimicking the way light hits real gold leaf.

---

## 3. Typography: The Editorial Voice
We use a high-contrast typographic scale to establish authority and elegance.

*   **Display & Headlines (Noto Serif):**
    Our "Sophisticated Serif." Use large sizes (`display-lg` at 3.5rem) with tighter letter-spacing for a high-fashion feel. Headlines should often be center-aligned or intentionally offset to break the grid.
*   **Body & Titles (Manrope):**
    Our "Legible Sans-Serif." Manrope offers a modern, geometric clarity that balances the traditional weight of the serif. 
*   **The Hierarchy:**
    The contrast between a `display-lg` serif title and a `label-md` sans-serif subhead creates the "Editorial" look. Don't be afraid of whitespace—let the type breathe.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are often too "heavy" for a luxury brand. We use light and tone to imply physics.

*   **The Layering Principle:** Depth is achieved by stacking surface tokens. `surface-container-highest` is for the most prominent foreground elements, while `surface` is the base.
*   **Ambient Shadows:** If a "floating" element (like a navigation bar or modal) is required, use extra-diffused shadows.
    *   *Spec:* `0px 20px 40px rgba(26, 28, 26, 0.05)`. The shadow color is a 5% opacity tint of `on-surface`, never pure black.
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use the `outline-variant` token at **15% opacity**. It should be felt, not seen.
*   **Glassmorphism:** Use `surface-container-lowest` with an 80% opacity and a `20px` backdrop blur for floating navigation. This allows furniture photography to "bleed" through the UI, maintaining a sense of space.

---

## 5. Components: Minimalist Implementation

*   **Buttons:**
    *   **Primary:** `primary_container` background with `on_primary_container` text. Roundedness: `sm` (0.125rem) for a sharp, architectural look.
    *   **Tertiary:** No background. Underlined with a 1px `primary` line that expands on hover.
*   **Cards:**
    **Forbid the use of divider lines.** Separate image, title, and price using the Spacing Scale (e.g., `spacing-4` between image and text). Use `surface-container-low` for the card background to subtly lift it from the `surface`.
*   **Input Fields:**
    Only a bottom border using `outline-variant`. On focus, the border transitions to `primary` (Gold). Labels use `label-md` in `on-surface-variant`.
*   **Chips:**
    Used for furniture categories. Background: `secondary_container`. Roundedness: `full`. No border.
*   **The "Lookbook" Carousel:**
    A custom component where images are of varying aspect ratios (asymmetric) to mimic a physical scrapbook or high-end magazine layout.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical margins. If the left margin is `spacing-16`, the right can be `spacing-24` for hero sections.
*   **Do** use large amounts of `spacing-20` and `spacing-24` between major sections to emphasize the "Airy" feel.
*   **Do** ensure text contrast ratios exceed 7:1 for all body copy to maintain premium readability.

### Don't:
*   **Don't** use standard "drop shadows" with high opacity.
*   **Don't** use 100% opaque borders or dividers.
*   **Don't** use fully rounded (`full`) corners for anything other than chips or buttons. Furniture and structural elements should remain architectural (`sm` or `none`).
*   **Don't** crowd the interface. If you feel like you need a divider line, you probably need more whitespace instead.

---

## 7. Spacing Scale Reference
*   **Fine Detail:** `0.5` (0.175rem) to `1.5` (0.5rem)
*   **Standard Padding:** `3` (1rem) to `6` (2rem)
*   **Sectional Breathing Room:** `12` (4rem) to `24` (8.5rem)