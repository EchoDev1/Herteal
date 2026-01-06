# Editorial Section - Image Placement Reference

This document shows exactly where each image appears in the Editorial Section of your homepage.

---

## Visual Layout

```
┌─────────────────────────────────────────────────────────────┐
│                    EDITORIAL SECTION                        │
│                                                             │
│  Editorial                                                  │
│  ─────────  The Art of Elegance  ─────────                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────┐  ┌─────────────────────────┐    │
│  │  FEATURED STORY      │  │   editorial-1.jpg       │    │
│  │                      │  │                         │    │
│  │  Redefining Modern   │  │   [Large editorial     │    │
│  │  African Luxury      │  │    fashion image]      │    │
│  │                      │  │                         │    │
│  │  - Artisanal Craft   │  │   600px height         │    │
│  │  - Premium Fabrics   │  │                         │    │
│  │  - Bespoke Tailoring │  │   ┌─────────────────┐  │    │
│  │                      │  │   │  2025 Spring    │  │    │
│  │  [Discover More]     │  │   │  Collection     │  │    │
│  │                      │  │   └─────────────────┘  │    │
│  └──────────────────────┘  └─────────────────────────┘    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │             editorial-2.jpg                           │ │
│  │                                                       │ │
│  │   [Full-width fashion detail image - 500-600px]      │ │
│  │                                                       │ │
│  │   "Where Every Detail Tells a Story"                 │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│              Crafted for the Sophisticated Woman           │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ editorial-3 │  │ editorial-4  │  │ editorial-5  │     │
│  │   .jpg      │  │    .jpg      │  │    .jpg      │     │
│  │             │  │              │  │              │     │
│  │  [Image     │  │  [Image      │  │  [Image      │     │
│  │   320px     │  │   320px      │  │   320px      │     │
│  │   height]   │  │   height]    │  │   height]    │     │
│  │             │  │              │  │              │     │
│  │  Timeless   │  │  Bold        │  │  Refined     │     │
│  │  Classics   │  │  Statements  │  │  Details     │     │
│  └─────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Detailed Image Usage

### 1. editorial-1.jpg
**Location:** Featured Story Section (Right side)
**Component:** Lines 120-140 in EditorialSection.tsx
**Display Size:** 600px height, responsive width
**CSS Effects:**
- Gradient overlay from bottom (charcoal to transparent)
- Overlay text showing "2025 Spring Collection"
- Rounded corners (rounded-3xl)
- Shadow effect

**What to look for in the image:**
- Full-body or 3/4 shot of woman in elegant African fashion
- Good for landscape or slight portrait orientation
- Should have room at bottom for text overlay
- Vibrant colors and professional quality

---

### 2. editorial-2.jpg
**Location:** Between Featured Story and Philosophy sections
**Component:** Lines 199-230 in EditorialSection.tsx
**Display Size:** 500-600px height, full container width
**CSS Effects:**
- Gradient overlay from left (charcoal) to right (green)
- Text on left side: "Where Every Detail Tells a Story"
- Full-width display
- Rounded corners

**What to look for in the image:**
- Wide landscape orientation
- Good composition with space on left for text
- Portrait or mid-shot showcasing clothing details
- Professional fashion photography

---

### 3. editorial-3.jpg (Timeless Classics)
**Location:** First card in 3-card grid under Philosophy section
**Component:** Lines 220-243 in EditorialSection.tsx
**Display Size:** 320px height (h-80 = 20rem)
**CSS Effects:**
- Portrait orientation
- Dark gradient overlay from bottom
- Icon and text overlay at bottom
- Hover zoom effect (scale-105)
- Green color theme

**What to look for in the image:**
- Portrait orientation (vertical)
- Classic, elegant African fashion
- Traditional meets modern style
- Rich, sophisticated colors

---

### 4. editorial-4.jpg (Bold Statements)
**Location:** Second card in 3-card grid
**Component:** Lines 245-268 in EditorialSection.tsx
**Display Size:** 320px height (h-80 = 20rem)
**CSS Effects:**
- Portrait orientation
- Dark gradient overlay from bottom
- Icon and text overlay at bottom
- Hover zoom effect
- Amber/gold color theme

**What to look for in the image:**
- Portrait orientation (vertical)
- Bold, vibrant African fashion
- Eye-catching colors or patterns
- Confident, striking composition

---

### 5. editorial-5.jpg (Refined Details)
**Location:** Third card in 3-card grid
**Component:** Lines 270-293 in EditorialSection.tsx
**Display Size:** 320px height (h-80 = 20rem)
**CSS Effects:**
- Portrait orientation
- Dark gradient overlay from bottom
- Icon and text overlay at bottom
- Hover zoom effect
- Stone/charcoal color theme

**What to look for in the image:**
- Portrait orientation (vertical)
- Close-up or detailed shot
- Shows craftsmanship: beadwork, embroidery, fine tailoring
- Focus on intricate details and artistry

---

## Quick Checklist

Before downloading each image, verify:

- [ ] Image resolution is high enough (at least 1920px for editorial-1 & 2)
- [ ] Image is free for commercial use
- [ ] Image fits the description above
- [ ] Image has good composition for text overlays
- [ ] Colors are vibrant and professional quality
- [ ] Lighting is good
- [ ] Subject is appropriate for luxury fashion brand

---

## File Placement

All images should be saved to:
```
C:\Users\USER\Desktop\herteal\public\images\
```

With exact filenames:
- editorial-1.jpg
- editorial-2.jpg
- editorial-3.jpg
- editorial-4.jpg
- editorial-5.jpg

**Note:** Filenames are case-sensitive! Use lowercase.

---

## Testing

After placing images:

1. Run: `npm run dev`
2. Open: http://localhost:3000
3. Scroll to Editorial Section
4. Verify all 5 images load correctly
5. Check mobile responsiveness
6. Verify hover effects work on the 3 cards

---

## Troubleshooting

**Images not showing?**
- Check filename spelling (must be exact)
- Check file location (must be in public/images/)
- Clear browser cache and reload
- Check browser console for errors
- Restart dev server

**Images look pixelated?**
- Download larger resolution
- Use "Original" size from stock photo sites
- Minimum 1920px width recommended

**Images load slowly?**
- Compress images (use TinyPNG.com)
- Target 200-500KB per image
- Next.js Image component will handle optimization
