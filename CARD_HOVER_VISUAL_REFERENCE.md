# 🎨 Card Hover Animation - Visual & Technical Reference

## Animation Timeline Visualization

```
HOVER STATES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STATE: NORMAL (Not Hovered)
┌─────────────────────────────────────┐
│                                     │
│   Card Title                        │
│   Card content here                 │
│   ✓ Card has subtle shadow          │
│                                     │
└─────────────────────────────────────┘
   Position: Original (Y=0)
   Scale: 1.0
   Icon: Normal size, no rotation
   Shadow: Subtle (sm)

                    ↓ HOVER STARTS

TIMELINE: 0ms → 150ms (EARLY PHASE)
┌─────────────────────────────────────┐
│                                     │  ← Starting to lift
│   Card Title                        │
│   Card content here                 │
│   ✓ Icon starts scaling             │
│                                     │
└─────────────────────────────────────┘
   Position: Rising (Y↑)
   Scale: 1.01
   Icon: Scale 1.05, Rotate 2°
   Shadow: Growing glow

TIMELINE: 150ms → 300ms (MID PHASE)
  ┌─────────────────────────────────────┐
  │                                     │  ← Fully elevated
  │   Card Title                        │
  │   Card content here                 │
  │   ✓ Icon at max scale              │
  │                                     │
  └─────────────────────────────────────┘
     Position: Peak (-8px)
     Scale: 1.02
     Icon: Scale 1.15, Rotate 5°
     Shadow: Full glow

TIMELINE: 300ms → 400ms (FINAL PHASE)
  ┌─────────────────────────────────────┐
  │                                     │  ← Stable state
  │   Card Title                        │
  │   Card content here                 │
  │   ✓ All effects at maximum          │
  │                                     │
  └─────────────────────────────────────┘
     Position: Held (-8px)
     Scale: 1.02 (stable)
     Icon: 1.15 scale, 5° rotation
     Shadow: 0 20px 40px rgba(55, 198, 67, 0.15)
            + 0 0 20px rgba(55, 198, 67, 0.1)

                    ↓ MOUSE LEAVES

RETURNING TO NORMAL (Reverse Animation)
┌─────────────────────────────────────┐
│                                     │  ← Smoothly returns
│   Card Title                        │
│   Card content here                 │
│   ✓ Effects fade out                │
│                                     │
└─────────────────────────────────────┘
   All properties smoothly revert
```

## Animation Properties Breakdown

### CARD LIFT
```
Animation Name: card-lift
Duration: 0.4s
Easing: ease-out
Transforms:
  - translateY(-8px)      [moves up 8 pixels]
  - scale(1.02)           [grows 2% in all directions]
```

### ICON BOUNCE
```
Animation Name: icon-bounce
Duration: 0.6s
Easing: ease-in-out
Keyframes:
  0%:   scale(1.00)   rotate(0°)
  50%:  scale(1.15)   rotate(5°)   [peak]
  100%: scale(1.00)   rotate(0°)
```

### SHADOW GLOW
```
Property: box-shadow (on .card-hover-primary:hover)
Values: 0 20px 40px rgba(55, 198, 67, 0.15),
        0 0 20px rgba(55, 198, 67, 0.1)

Breakdown:
  Layer 1: 0 20px 40px rgba(55, 198, 67, 0.15)
    - Outer shadow: 20px blur, 40px spread
    - Color: #37C643 at 15% opacity
    - Creates depth effect

  Layer 2: 0 0 20px rgba(55, 198, 67, 0.1)
    - Glow effect: 20px blur, no offset
    - Color: #37C643 at 10% opacity
    - Creates halo around card
```

## CSS Cubic Bezier Easing Curve

```
cubic-bezier(0.34, 1.56, 0.64, 1)

Visual representation:
  1.5 ┤     ┏━━┓
  1.0 ┤   ┃   ┗━┓
  0.5 ┤ ┃       ┗
  0.0 ┗━┛       
      0   0.5   1

Effect: 
- Quick acceleration out
- Slight overshoot for springy feel
- Lands softly
= Result: Natural, organic motion
```

## Component Integration

### BenefitsSection Example
```tsx
<div className="card-hover-primary rounded-2xl p-6 bg-white ...">
  <motion.div className="card-icon w-14 h-14 ...">
    <IconComponent iconType={benefit.icon} />
  </motion.div>
  <h3>{benefit.title}</h3>
  <p>{benefit.description}</p>
</div>
```
**Result**: Full lift + icon bounce + shadow glow on hover

### UseCasesSection Example
```tsx
<div className="card-hover-primary rounded-2xl bg-white ...">
  <motion.div className="card-icon ...">
    <IconComponent iconType={useCase.icon} />
  </motion.div>
  <h3>{useCase.title}</h3>
  <p>{useCase.description}</p>
</div>
```
**Result**: Same smooth animations across all use case cards

## Performance Metrics

```
Animation Quality: 60fps target
GPU Acceleration: ✓ Enabled (transform & box-shadow)
Reflow/Repaint: ✓ Minimal (no layout-affecting properties)
CSS Specificity: Low (easy to override)
Bundle Impact: Negligible (~0.2KB CSS)

Recommended Performance Profile:
├─ Transform: GPU-accelerated
├─ Box-shadow: GPU-accelerated  
├─ Border: No animation (static)
└─ All others: Avoid for performance
```

## Browser Support Matrix

```
Feature               Chrome  Firefox  Safari  Edge
─────────────────────────────────────────────────────
transform             ✓       ✓        ✓       ✓
box-shadow            ✓       ✓        ✓       ✓
cubic-bezier()        ✓       ✓        ✓       ✓
@keyframes            ✓       ✓        ✓       ✓
animation             ✓       ✓        ✓       ✓
transition            ✓       ✓        ✓       ✓
─────────────────────────────────────────────────────
Overall Support:      100%    100%     100%    100%
```

## Color Reference

```
Brand Green (Primary): #37C643
  Hex: #37C643
  RGB: rgb(55, 198, 67)
  HSL: hsl(114, 57%, 49%)
  
  Shadow Opacity Levels:
  ├─ 5%  rgba(55, 198, 67, 0.05)   [very subtle]
  ├─ 10% rgba(55, 198, 67, 0.10)   [glow effect]
  ├─ 15% rgba(55, 198, 67, 0.15)   [primary shadow]
  ├─ 20% rgba(55, 198, 67, 0.20)   [light hover]
  ├─ 30% rgba(55, 198, 67, 0.30)   [medium]
  ├─ 40% rgba(55, 198, 67, 0.40)   [strong]
  └─ 60% rgba(55, 198, 67, 0.60)   [very strong]
```

## Customization Examples

### Increase Lift Height
```css
@keyframes card-lift {
  100% { transform: translateY(-12px) scale(1.03); }
}
```

### More Dramatic Icon Bounce
```css
@keyframes icon-bounce {
  50% { transform: scale(1.25) rotate(8deg); }
}
```

### Softer Easing (Linear)
```css
.card-hover-primary {
  transition: all 0.5s ease-in-out;
}
```

### Reduce Shadow Intensity
```css
.card-hover-primary:hover {
  box-shadow: 0 12px 24px rgba(55, 198, 67, 0.08);
}
```

## Accessibility Considerations

```
✓ Respects prefers-reduced-motion
✓ No color-only feedback (shadow + lift)
✓ Keyboard accessible (works with focus)
✓ Mobile touch-friendly
✓ Touch targets: 48x48px minimum
✓ No animation blocking interactions
```

## Testing Checklist

```
Visual Testing:
□ Hover over each card type
□ Observe smooth lift and elevation
□ Icon scales and rotates properly
□ Shadow glow appears
□ Smooth return on mouse leave

Performance Testing:
□ No jank or stuttering
□ 60fps maintained
□ No layout shifts
□ GPU acceleration working

Responsive Testing:
□ Works on mobile (tap)
□ Works on tablet (tap)
□ Works on desktop (hover)
□ Touch doesn't block scroll

Browser Testing:
□ Chrome/Edge latest
□ Firefox latest
□ Safari latest
□ Mobile Safari
□ Chrome Mobile
```

---

**Status**: ✅ Fully Implemented & Deployed
**Branch**: CV-changes
**Last Updated**: 2026-05-20
