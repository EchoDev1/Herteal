# Herteal → House of CB Style Redesign Plan
**Target:** Transform Herteal into a luxury fashion e-commerce site matching House of CB's aesthetic with green accents

---

## 🎨 Design System Overview

### Color Palette Transformation

**Current (Herteal):**
- Primary: Amber/Gold (#d4af37)
- Secondary: Green (#2c5530)
- Background: White/Cream tones

**New (House of CB + Green):**
- Primary: Soft Pink (#F6DADF) → **Replace with Forest Green (#2c5530)**
- Secondary: Wine/Burgundy (#8B0000) → **Keep as accent**
- Tertiary: Sage Green (#87A96B) → **New green accent**
- Neutral: Cream/Beige (#F5F5DC)
- Text: Charcoal (#2D2D2D)
- Background: Pure White (#FFFFFF)

---

## 📐 Layout & Structure Changes

### 1. Navigation Header
**House of CB Style:**
- Sticky header with mega menu
- Hamburger menu on mobile
- Promotional banner at top ("Our elevated knitwear collection...")
- Categories: Clothing, Weddings, Swimwear, Shapewear, Accessories, Sale
- Shopping bag indicator with item count
- Currency/Location selector

**Implementation for Herteal:**
```
┌──────────────────────────────────────────────────────────┐
│  "Explore our Spring 2025 Collection - Now Available"   │  ← Green background banner
├──────────────────────────────────────────────────────────┤
│  ☰  HERTEAL    [Search]    Wishlist  Bag(0)  Account   │
├──────────────────────────────────────────────────────────┤
│  Shop All | New In | Dresses | Traditional | Modern |   │
│  Accessories | Sale                                      │
└──────────────────────────────────────────────────────────┘
```

### 2. Hero Section
**House of CB Style:**
- Full-width image backgrounds
- Minimal text overlay
- SVG logo placement
- Clear "Shop The Collection" CTA
- Separate mobile/desktop images

**Herteal Implementation:**
- Large hero image with African fashion model
- "HERTEAL" logo (custom font)
- Subtitle: "Luxury African Fashion Redefined"
- Green CTA button: "Discover The Collection"

### 3. Product Grid
**House of CB Style:**
- Horizontal scrolling carousels (4-6 items visible)
- Dual image states (main + hover)
- Quick-add functionality
- Wishlist heart icon
- Product name, color, price

**Herteal Implementation:**
```
[← Featured Collection →]
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│      │ │      │ │      │ │      │ │      │
│ IMG  │ │ IMG  │ │ IMG  │ │ IMG  │ │ IMG  │
│  ♡   │ │  ♡   │ │  ♡   │ │  ♡   │ │  ♡   │
│      │ │      │ │      │ │      │ │      │
│Name  │ │Name  │ │Name  │ │Name  │ │Name  │
│₦XXX  │ │₦XXX  │ │₦XXX  │ │₦XXX  │ │₦XXX  │
│[Add] │ │[Add] │ │[Add] │ │[Add] │ │[Add] │
└──────┘ └──────┘ └──────┘ └──────┘ └──────┘
```

---

## 🔤 Typography System

### Current Fonts:
- Inter (body)
- Cormorant Garamond (headings)

### House of CB Fonts:
- "aston-bold" (custom, luxury branding)
- "gotham-bold" (UI elements)

### Herteal New Typography:
**Option 1 (Luxury Serif):**
- Headings: Playfair Display / Bodoni Moda
- Body: Montserrat / Inter
- Accent: Italiana (for logo)

**Option 2 (Modern Minimalist):**
- Headings: Tenor Sans
- Body: Work Sans
- Accent: Cinzel (for logo)

**Recommended:** Option 1 for luxury feel

---

## 🎯 Component-by-Component Redesign

### Homepage Sections:

#### 1. Hero Banner
**Before:** Large hero with overlay text and multiple CTAs
**After:** Full-width image, minimal text, single green CTA
- Remove: Complex overlay, multiple buttons
- Add: Cleaner composition, focus on the product image

#### 2. Featured Products
**Before:** Static grid layout with cards
**After:** Horizontal scrolling carousel
- Implement: Touch/swipe gestures
- Add: Navigation arrows
- Style: Minimal borders, white backgrounds

#### 3. Editorial Section
**Before:** Complex magazine-style layout with multiple images
**After:** Simpler 2-column layout
- Left: Large editorial image
- Right: Curated product selection in mini-grid
- Style: Clean, minimal text

#### 4. Collection Preview
**Before:** Category cards with images
**After:** Full-width category banners
- Layout: Alternating left/right image-text blocks
- CTA: Underlined text links (House of CB style)

#### 5. Trust Badges
**Before:** Icon grid with descriptions
**After:** Minimal text-only list
- Style: Simple checkmarks or minimal icons
- Text: "Free Worldwide Shipping" etc.

#### 6. Newsletter
**Before:** Centered form with background
**After:** Full-width section with split layout
- Left: Marketing copy
- Right: Email signup form
- Background: Light sage green tint

---

## 🔘 UI Elements

### Buttons

**Primary (Green CTA):**
```css
background: #2c5530
color: white
text-transform: uppercase
letter-spacing: 0.4px
padding: 14px 40px
border: none
font-weight: bold
hover: #1e3d22
```

**Secondary (Outline):**
```css
background: transparent
border: 1px solid #2c5530
color: #2c5530
text-transform: uppercase
letter-spacing: 0.4px
```

**Text Link:**
```css
text-decoration: underline
text-underline-offset: 4px
color: #2D2D2D
hover: color: #2c5530
```

### Product Cards

```css
background: white
border: 1px solid #f0f0f0
hover: border-color: #2c5530
transition: all 0.3s ease
image: aspect-ratio 2/3
padding: 0 (images full-bleed)
```

### Input Fields

```css
border: 1px solid #ddd
padding: 12px 16px
font-size: 14px
focus: border-color: #2c5530
background: white
```

---

## 📱 Mobile Responsive Approach

### Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile-First Changes:
1. Hamburger menu (always)
2. Single column product grids
3. Stacked hero content
4. Touch-optimized carousels
5. Simplified navigation

---

## 🎨 Specific Color Applications

| Element | Color | Usage |
|---------|-------|-------|
| Primary CTA | Forest Green (#2c5530) | Buttons, key actions |
| Header Background | White | Navigation bar |
| Promo Banner | Sage Green (#87A96B) | Top announcement |
| Text Primary | Charcoal (#2D2D2D) | Body copy |
| Text Secondary | Grey (#6B6B6B) | Supporting text |
| Links Hover | Forest Green (#2c5530) | Interactive states |
| Borders | Light Grey (#f0f0f0) | Dividers, cards |
| Accent | Wine (#8B0000) | Sale prices, badges |
| Background Alt | Cream (#F5F5DC) | Sections, cards |

---

## 🚀 Implementation Priority

### Phase 1: Foundation (Week 1)
- [ ] Update color system in globals.css
- [ ] Install new fonts (Playfair Display, Montserrat)
- [ ] Create new button components
- [ ] Update Tailwind config with new colors

### Phase 2: Navigation (Week 1-2)
- [ ] Redesign header component
- [ ] Implement mega menu
- [ ] Add promotional banner
- [ ] Shopping bag indicator
- [ ] Mobile hamburger menu

### Phase 3: Homepage (Week 2-3)
- [ ] Redesign Hero section
- [ ] Convert product grids to carousels
- [ ] Simplify Editorial section
- [ ] Update Collection Preview
- [ ] Redesign Newsletter section

### Phase 4: Product Pages (Week 3-4)
- [ ] Product detail layout
- [ ] Image gallery (House of CB style)
- [ ] Size selector
- [ ] Add to bag functionality
- [ ] Product recommendations carousel

### Phase 5: Polish & Optimize (Week 4)
- [ ] Animations & transitions
- [ ] Image optimization
- [ ] Performance testing
- [ ] Mobile responsiveness check
- [ ] Cross-browser testing

---

## 📦 New Dependencies Needed

```json
{
  "dependencies": {
    "embla-carousel-react": "^8.0.0",  // For product carousels
    "framer-motion": "^11.0.0",         // For smooth animations
    "@radix-ui/react-dropdown-menu": "^2.0.0",  // For mega menu
    "@radix-ui/react-dialog": "^1.0.0"  // For modals
  }
}
```

---

## 🎯 Key Differences Summary

| Aspect | Current Herteal | New (House of CB Style) |
|--------|----------------|------------------------|
| Color Scheme | Amber + Green | Green + Wine + Cream |
| Layout | Magazine editorial | E-commerce minimal |
| Navigation | Simple links | Mega menu |
| Products | Static grids | Scrolling carousels |
| Typography | Mixed serif/sans | Luxury serif focus |
| Imagery | Editorial style | Product-focused |
| CTAs | Gradient buttons | Solid color buttons |
| Spacing | Generous | Tight, efficient |

---

## ⚠️ Considerations

### Content Changes Required:
1. **Photography Style:** Need cleaner product shots (white/neutral backgrounds)
2. **Image Dimensions:** Standardize all product images (recommend 2:3 ratio)
3. **Copy Tone:** More concise, less descriptive
4. **Product Data:** Need color variants, sizes, quick-add functionality

### Technical Challenges:
1. Implementing horizontal scroll carousels (touch-friendly)
2. Mega menu with images and categories
3. Dual image states on product hover
4. Shopping bag state management
5. Currency/location selector

### SEO Impact:
- Simpler structure may reduce content density
- Need to maintain semantic HTML
- Keep proper heading hierarchy
- Add schema markup for products

---

## 📝 Next Steps

**Before proceeding, please confirm:**

1. ✅ Do you want a COMPLETE redesign matching House of CB?
   - Or selective updates to specific sections?

2. ✅ Color preference:
   - Forest green (#2c5530) as primary?
   - Or different shade of green?

3. ✅ Typography:
   - Playfair Display + Montserrat?
   - Or different luxury font pairing?

4. ✅ Priority sections:
   - Start with homepage only?
   - Or include product pages too?

5. ✅ Timeline:
   - Aggressive (1-2 weeks)?
   - Or phased approach (4-6 weeks)?

---

**Ready to proceed?** Reply with your preferences and I'll start implementing!
