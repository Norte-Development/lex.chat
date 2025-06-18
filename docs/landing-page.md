# Landing Page Documentation

## Overview

The landing page for lex-ai.chat is a comprehensive marketing page designed to showcase the product's features and convert visitors into users. The page is built using Next.js, Tailwind CSS, and shadcn/ui components.

## Route

- **URL**: `/landing`
- **File**: `app/landing/page.tsx`

## Product Information

### Product Details
- **Name**: lex-ai.chat
- **Description**: ChatGPT for legal queries (Spanish: "ChatGPT para Consultas Jurídicas")
- **Target Market**: Legal professionals in Argentina
- **Pricing**: $8 USD/month

### Data Sources
The application provides access to official Argentine legal databases:
1. **Infoleg** - Official database of Argentine national legislation
2. **Digestos Provinciales** - Provincial regulatory frameworks
3. **SAIJ** - Argentine System of Legal Information (Sistema Argentino de Información Jurídica)

### Available Jurisdictions
- CABA (Ciudad Autónoma de Buenos Aires)
- Córdoba
- Chaco
- Misiones
- Formosa
- Corrientes

## Page Structure

### 1. Header
- Brand logo and name
- Login button linking to `/login`

### 2. Hero Section
- Main value proposition
- Call-to-action buttons:
  - "Comenzar Gratis" (Start Free) → `/register`
  - "Ver Demo" (View Demo) → `/chat`
- Pricing information

### 3. Features Section
- Three main feature cards:
  - **Official Sources**: Access to Infoleg, Provincial Digests, and SAIJ
  - **Specialized AI**: Trained specifically for Argentine law
  - **Secure & Reliable**: Private and secure queries

### 4. Jurisdictions Section
- Grid display of all available jurisdictions
- Each jurisdiction shown with icon and full name

### 5. Sources Section
- Detailed information about each data source:
  - Infoleg
  - Digestos Provinciales
  - SAIJ

### 6. Pricing Section
- Single plan display ($8/month)
- Feature list with checkmarks
- Call-to-action button

### 7. Call-to-Action Section
- Secondary conversion section
- Two action buttons for registration and demo

### 8. Footer
- Brand information
- Navigation links (About, Privacy, Terms, Contact)
- Copyright information

## Design System

### Components Used
- `Button` from `@/components/ui/button`
- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle` from `@/components/ui/card`
- Various icons from `@/components/icons`

### Color Scheme
- Uses OKLCH color space for modern color handling
- CSS custom properties for theming with light/dark mode support
- Primary colors: oklch(0.205 0 0) light, oklch(0.922 0 0) dark
- Muted backgrounds for section separation
- Gradient text effects for headlines
- Custom radius system: --radius-sm through --radius-xl

### Typography
- Poppins font family (defined in layout with variable --font-poppins)
- Multiple font weights: 300, 400, 500, 600, 700
- Responsive text sizes
- Text balance utility for better readability

## Responsive Design

The landing page is fully responsive with:
- Mobile-first approach
- Grid layouts that adapt to screen size
- Flexible button arrangements
- Responsive typography scaling

## Language

The entire landing page is in Spanish, targeting the Argentine legal market.

## Technical Notes

### Styling
- Uses Tailwind CSS with traditional @tailwind directives
- OKLCH color space implementation for better color accuracy
- Standard CSS custom properties for theming
- Poppins font family with multiple weights (300, 400, 500, 600, 700)
- Custom radius system with calculated values
- Follows the existing design system with CSS custom properties
- Consistent with app's theme provider (light/dark mode support)

### Performance
- Static generation compatible
- Optimized images and icons
- Minimal JavaScript footprint

### SEO Considerations
- Semantic HTML structure
- Proper heading hierarchy
- Descriptive meta content (can be added to layout)

## Future Enhancements

Potential improvements could include:
1. Customer testimonials section
2. Feature comparison table
3. FAQ section
4. Integration demos/screenshots
5. Contact form
6. Newsletter signup
7. Social proof indicators
8. A/B testing capabilities

## Maintenance

When updating the landing page:
1. Ensure all links are functional
2. Keep pricing information current
3. Update jurisdiction list if expanded
4. Maintain consistency with brand guidelines
5. Test responsive design across devices
6. Verify accessibility standards 