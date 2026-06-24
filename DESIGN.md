---
name: Mixue GO Design System
colors:
  surface: '#f4fafd'
  surface-dim: '#d4dbdd'
  surface-bright: '#f4fafd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef5f7'
  surface-container: '#e8eff1'
  surface-container-high: '#e2e9ec'
  surface-container-highest: '#dde4e6'
  on-surface: '#161d1f'
  on-surface-variant: '#5e3f3c'
  inverse-surface: '#2b3234'
  inverse-on-surface: '#ebf2f4'
  outline: '#936e6a'
  outline-variant: '#e8bcb7'
  surface-tint: '#c00014'
  primary: '#bb0013'
  on-primary: '#ffffff'
  primary-container: '#e71520'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb4ab'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dfe0e0'
  on-secondary-container: '#616363'
  tertiary: '#4c5f66'
  on-tertiary: '#ffffff'
  tertiary-container: '#65777f'
  on-tertiary-container: '#fafdff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ab'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000d'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#d2e6ef'
  tertiary-fixed-dim: '#b6cad2'
  on-tertiary-fixed: '#0b1e24'
  on-tertiary-fixed-variant: '#374951'
  background: '#f4fafd'
  on-background: '#161d1f'
  surface-variant: '#dde4e6'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  margin-mobile: 20px
  gutter-mobile: 12px
---

## Brand & Style

The design system is crafted to mirror the joyful, high-energy, and accessible personality of the Mixue brand. It targets a young, vibrant demographic that values quick service, affordability, and a "treat yourself" moment. The UI should feel as refreshing and approachable as a cold soft-serve cone on a summer day.

The visual style is **Corporate Modern with a Playful Twist**. It leverages clean, functional layouts to ensure high-speed task completion while injecting personality through "Snow King" illustrations, rounded geometries, and soft, tactile elevations. The interface avoids being overly clinical by using vibrant color splashes and bouncy micro-interactions that evoke a sense of celebration and reward.

## Colors

The palette is anchored by the iconic **Mixue Red**, used for primary actions, branding elements, and key highlights. **Snow White** serves as the expansive foundation for the UI, ensuring a clean and hygienic feel. 

To provide visual relief and a "cool" contrast to the heat of the red, **Ice Blue** is used for secondary backgrounds, chip elements, and subtle containers. 

The real-time traffic tokens are designed to communicate store density at a glance:
- **Status Empty:** A refreshing mint green, suggesting instant service.
- **Status Moderate:** A warm peach-gold, suggesting a brief wait.
- **Status Busy:** A deep, saturated red-crimson, signaling high demand.

## Typography

This design system utilizes **Plus Jakarta Sans** for its friendly, rounded terminals and modern geometry. It strikes a perfect balance between high readability and a playful "puffy" aesthetic that matches the brand's soft-serve products.

- **Headlines:** Use heavy weights (700-800) with slight negative letter-spacing for a bold, impactful presence.
- **Body:** Kept at medium weights (400-500) to ensure legibility during fast browsing.
- **Responsive Scaling:** Headline sizes scale down significantly for mobile screens to maintain a tight, organized information hierarchy without excessive wrapping.

## Layout & Spacing

The layout follows a **Fluid Grid** model optimized for thumb-driven mobile interaction. A 4px baseline grid ensures vertical rhythm across all components.

- **Mobile Grid:** 4-column structure with 20px side margins and 12px gutters.
- **Content Blocks:** Use "md" (16px) or "lg" (24px) spacing to separate distinct product categories or promotional banners.
- **Safe Areas:** Adhere strictly to mobile notch and home-indicator safe areas, ensuring the "Mixue Red" bottom navigation bar remains accessible and visually grounded.

## Elevation & Depth

This design system uses **Tonal Layering** combined with **Soft Ambient Shadows** to create a sense of physical presence.

- **Surface Levels:** The primary background is Snow White. Secondary containers (like product cards) sit at Level 1 with a subtle 2px blur shadow.
- **Active Elements:** Buttons and floating action elements (like the Cart) use a more pronounced 8px blur shadow with a 5% Mixue Red tint to make them "pop" against the white background.
- **Ice Blue Accents:** Used as a non-elevated "flat" layer for grouping related items (e.g., ingredient selections) to avoid excessive shadow-stacking.

## Shapes

The shape language is consistently **Rounded**. Sharp corners are avoided to maintain the friendly and safe brand persona.

- **Small Components:** Checkboxes and small buttons use a 0.5rem radius.
- **Product Cards:** Use a 1rem (rounded-lg) radius to feel substantial and "hand-held."
- **Promotional Banners:** Can utilize up to a 1.5rem radius for a softer, organic feel.
- **Pill Shapes:** Always used for "Traffic Status" badges and "Add to Cart" buttons to emphasize their interactive nature.

## Components

- **Buttons:** Primary buttons are Mixue Red with white text, using a pill shape. Secondary buttons use a white fill with a thin Ice Blue border.
- **Cards:** Product cards feature a Snow White background, Level 1 elevation, and a top-aligned image area. Price and "Add" button are positioned at the bottom-right for easy thumb access.
- **Chips:** Used for drink customizations (Ice Level, Sugar Level). Selected chips use Mixue Red with white text; unselected chips use Ice Blue backgrounds.
- **Traffic Indicator:** A small, circular dot placed next to store names, utilizing the 'status' color tokens.
- **Input Fields:** Soft-grey borders that turn Mixue Red upon focus, with generous internal padding and 0.5rem rounded corners.
- **Mascot Integration:** The "Snow King" mascot should appear in empty-state screens (e.g., empty cart) and as a loading spinner animation to maintain brand engagement.