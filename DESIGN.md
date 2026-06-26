# Official Design Specification & Rules

This specification establishes the explicit visual parameters required for video generation.

## 1. Typography & Subtitles
*   **Boundaries**: Captions MUST strictly be broken into 2-word chunks per line.
*   **Case**: All text overlays and captions MUST be rendered in UPPERCASE.
*   **Alignment**: Utilize custom token alignments optimized for central viewing. Subtitles MUST hold a substantial bottom margin to stay clear of native platform UI.

## 2. Layout & Color Constraints
*   **Contrast**: High-contrast layouts are mandatory. Always enforce stark dark backgrounds (e.g., `#000000` or `rgba(0,0,0,0.8)`) with hyper-luminous accent colors (e.g., `#FFFFFF` or neon).
*   **Backgrounds**: When compositing graphic overlays via Open Design, the background container MUST remain completely `transparent !important` to allow the underlying video track to pass through cleanly.

## 3. Rendering Constraints
*   Keep graphics minimally styled with Tailwind/CSS primitives (clean borders, large letter-spacing) instead of heavy image textures.
*   Animations should use deterministic easing (e.g., `power2.out`).
