# Design Document: Blue Origin-Inspired Website Layout

## Overview

This design document outlines the implementation of a Blue Origin-inspired website layout using Next.js 16, TypeScript, and Tailwind CSS 4. The system consists of three primary reusable components (Header, Hero, Footer) that follow a modern aerospace design aesthetic with a royal blue color scheme.

The architecture emphasizes component reusability, responsive design, and accessibility. Each component is designed to be self-contained with clear props interfaces, making them easy to compose and maintain across multiple pages.

## Architecture

### Component Hierarchy

```
App Layout (layout.tsx)
├── Header Component
│   ├── Logo/Brand
│   ├── Desktop Navigation Menu
│   │   └── Dropdown Menus
│   └── Mobile Hamburger Menu
│       └── Mobile Menu Overlay
├── Page Content (children)
│   └── Hero Component
│       ├── Background Image
│       ├── Overlay
│       ├── Heading Text
│       └── CTA Buttons
└── Footer Component
    ├── Navigation Links
    └── Additional Information
```

### Technology Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Icons**: lucide-react 0.575.0
- **Fonts**: Google Fonts (via next/font)

### Design Patterns

1. **Component Composition**: Each major UI section is a separate component
2. **Props-based Configuration**: Components accept props for customization
3. **Mobile-First Responsive**: Tailwind breakpoints (sm, md, lg, xl)
4. **Client-Side Interactivity**: "use client" directive for interactive components
5. **Type Safety**: TypeScript interfaces for all component props

## Components and Interfaces

### Header Component

**File**: `components/Header.tsx`

**Purpose**: Provides consistent navigation across all pages with responsive behavior.

**Props Interface**:
```typescript
interface NavItem {
  label: string;
  href: string;
  dropdownItems?: Array<{
    label: string;
    href: string;
  }>;
}

interface HeaderProps {
  brandName: string;
  brandHref?: string;
  navItems: NavItem[];
  bgColor?: string;
  textColor?: string;
}
```

**State Management**:
- `isMobileMenuOpen`: boolean - Controls mobile menu visibility
- `activeDropdown`: string | null - Tracks which dropdown is currently open

**Key Features**:
- Desktop navigation with hover-based dropdowns
- Mobile hamburger menu with slide-in overlay
- Sticky positioning (optional via className)
- Keyboard navigation support

**Responsive Breakpoints**:
- Mobile (< 768px): Hamburger menu, hidden desktop nav
- Desktop (≥ 768px): Full navigation menu, hidden hamburger

### Hero Component

**File**: `components/Hero.tsx`

**Purpose**: Full-width hero section with background image and call-to-action.

**Props Interface**:
```typescript
interface CTAButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

interface HeroProps {
  backgroundImage: string;
  heading: string;
  subheading?: string;
  ctaButtons?: CTAButton[];
  overlayOpacity?: number;
  minHeight?: string;
}
```

**Key Features**:
- Full-width background image with Next.js Image optimization
- Dark overlay for text readability (configurable opacity)
- Centered content with responsive typography
- Multiple CTA buttons with different variants
- Configurable minimum height

**Responsive Typography**:
- Mobile: text-4xl (36px)
- Tablet: text-5xl (48px)
- Desktop: text-6xl or text-7xl (60px-72px)

### Footer Component

**File**: `components/Footer.tsx`

**Purpose**: Consistent footer with links and information.

**Props Interface**:
```typescript
interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  links: FooterLink[];
  copyrightText?: string;
  bgColor?: string;
  textColor?: string;
}
```

**Key Features**:
- Horizontal link layout (wraps on mobile)
- Optional copyright/additional text
- Consistent styling with header
- Full-width layout

## Data Models

### Navigation Data Structure

```typescript
// Example navigation configuration
const navigationConfig: NavItem[] = [
  {
    label: 'VEHICLES',
    href: '/vehicles',
    dropdownItems: [
      { label: 'New Shepard', href: '/vehicles/new-shepard' },
      { label: 'New Glenn', href: '/vehicles/new-glenn' },
      { label: 'Blue Moon', href: '/vehicles/blue-moon' }
    ]
  },
  {
    label: 'SYSTEMS',
    href: '/systems',
    dropdownItems: [
      { label: 'BE-4 Engine', href: '/systems/be4' },
      { label: 'BE-7 Engine', href: '/systems/be7' }
    ]
  },
  {
    label: 'ABOUT',
    href: '/about'
  },
  {
    label: 'CAREERS',
    href: '/careers'
  },
  {
    label: 'SHOP',
    href: '/shop'
  }
];
```

### Hero Configuration

```typescript
// Example hero configuration
const heroConfig: HeroProps = {
  backgroundImage: '/images/hero-rocket.jpg',
  heading: 'BUILDING A ROAD TO SPACE',
  subheading: 'For the benefit of Earth',
  ctaButtons: [
    {
      label: 'LEARN MORE',
      href: '/about',
      variant: 'primary'
    },
    {
      label: 'WATCH VIDEO',
      href: '/video',
      variant: 'secondary'
    }
  ],
  overlayOpacity: 0.5,
  minHeight: '100vh'
};
```

### Color Palette

```typescript
// Tailwind CSS custom colors (to be added to globals.css or tailwind config)
const colorPalette = {
  'royal-blue': '#0033A0',
  'royal-blue-dark': '#002266',
  'royal-blue-light': '#0044CC',
  'white': '#FFFFFF',
  'gray-light': '#F5F5F5',
  'gray-dark': '#333333'
};
```

## Implementation Details

### Header Implementation Strategy

1. **Desktop Navigation**:
   - Use flexbox for horizontal layout
   - Implement hover states with Tailwind's `group` utilities
   - Dropdown menus positioned absolutely below nav items
   - Smooth transitions for dropdown appearance

2. **Mobile Navigation**:
   - Hamburger icon using lucide-react (Menu and X icons)
   - Full-screen overlay menu with slide-in animation
   - Close menu on link click or outside click
   - Prevent body scroll when menu is open

3. **Dropdown Behavior**:
   - Desktop: Show on hover, hide on mouse leave
   - Mobile: Show on click, accordion-style expansion
   - Keyboard: Open with Enter/Space, navigate with Arrow keys

### Hero Implementation Strategy

1. **Background Image**:
   - Use CSS background-image for simplicity (or Next.js Image with fill)
   - Apply `bg-cover` and `bg-center` for proper scaling
   - Use `bg-fixed` for parallax effect (optional)

2. **Overlay**:
   - Absolute positioned div with black background
   - Configurable opacity (default 0.4-0.5)
   - Z-index layering: image (0) → overlay (1) → content (2)

3. **Content Layout**:
   - Flexbox with `items-center` and `justify-center`
   - Max-width container for text content
   - Responsive padding and spacing

### Footer Implementation Strategy

1. **Layout**:
   - Flexbox for horizontal link arrangement
   - `flex-wrap` for mobile responsiveness
   - Center alignment for all content

2. **Styling**:
   - Match header background color
   - Consistent spacing with header
   - Hover effects on links

### Responsive Design Strategy

**Breakpoint System** (Tailwind defaults):
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Mobile-First Approach**:
1. Base styles target mobile (< 640px)
2. Add `md:` prefix for tablet and up
3. Add `lg:` prefix for desktop and up

**Key Responsive Adjustments**:
- Header: Hamburger menu → Full navigation
- Hero: Smaller text → Larger text, vertical buttons → horizontal buttons
- Footer: Stacked links → Horizontal links

### Accessibility Implementation

1. **Semantic HTML**:
   - Use `<nav>` for navigation
   - Use `<header>` and `<footer>` elements
   - Use `<button>` for interactive elements

2. **ARIA Attributes**:
   - `aria-label` on hamburger menu button
   - `aria-expanded` for dropdown state
   - `aria-current="page"` for active links
   - `role="navigation"` for nav elements

3. **Keyboard Navigation**:
   - Tab order follows visual order
   - Enter/Space to activate buttons
   - Escape to close mobile menu/dropdowns
   - Arrow keys for dropdown navigation

4. **Focus Management**:
   - Visible focus indicators (Tailwind's `focus:` utilities)
   - Focus trap in mobile menu when open
   - Return focus to trigger after closing dropdown

### Performance Optimization

1. **Image Optimization**:
   - Use Next.js Image component with `priority` for hero images
   - Lazy load images below the fold
   - Serve WebP format with fallbacks
   - Responsive image sizes

2. **Code Splitting**:
   - Dynamic imports for mobile menu (if heavy)
   - Separate client components from server components
   - Tree-shake unused Tailwind classes

3. **CSS Optimization**:
   - Use Tailwind's JIT mode (default in v4)
   - Minimize custom CSS
   - Use CSS variables for theme colors

4. **Bundle Size**:
   - Import only needed lucide-react icons
   - Avoid large dependencies
   - Use Next.js built-in optimizations



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I've identified the following testable properties and eliminated redundancy:

**Redundancy Analysis**:
- Requirements 2.1, 2.2, 2.4, 2.5 all test responsive navigation visibility at different breakpoints. These can be combined into comprehensive responsive navigation properties.
- Requirements 5.1, 5.2, 5.5 all test responsive behavior of the Hero component. These can be combined into comprehensive responsive hero properties.
- Multiple requirements test component structure (1.1-1.4, 4.1-4.5, 6.1-6.5). These are better tested as examples rather than properties since they test specific rendering outputs.

### Properties

**Property 1: Navigation items render correctly**
*For any* array of navigation items passed to the Header component, all items should be rendered in the navigation menu with their labels and hrefs intact.
**Validates: Requirements 1.2**

**Property 2: Mobile menu toggle behavior**
*For any* initial menu state (open or closed), clicking the hamburger menu button should toggle the mobile menu to the opposite state.
**Validates: Requirements 2.3**

**Property 3: Responsive navigation visibility**
*For any* viewport width, the Header component should display either the hamburger menu (width < 768px) or the desktop navigation menu (width ≥ 768px), but never both simultaneously.
**Validates: Requirements 2.1, 2.2, 2.4, 2.5**

**Property 4: Dropdown display on hover**
*For any* navigation item with sub-items, hovering over the item should display its dropdown menu with all sub-items visible.
**Validates: Requirements 3.1**

**Property 5: Dropdown navigation**
*For any* dropdown menu item with an href, clicking the item should trigger navigation to the corresponding URL.
**Validates: Requirements 3.5**

**Property 6: Hero component prop rendering**
*For any* valid HeroProps (backgroundImage, heading, ctaButtons), the Hero component should render with the provided values visible in the DOM.
**Validates: Requirements 8.2, 8.4**

**Property 7: Responsive hero typography**
*For any* viewport width, the Hero component heading should use smaller font sizes on mobile (< 768px) and larger font sizes on desktop (≥ 768px).
**Validates: Requirements 5.1**

**Property 8: Responsive hero button layout**
*For any* set of CTA buttons, the Hero component should stack buttons vertically on mobile (< 768px) and horizontally on desktop (≥ 768px).
**Validates: Requirements 5.5**

**Property 9: Footer links rendering**
*For any* array of footer links passed to the Footer component, all links should be rendered with their labels and hrefs intact.
**Validates: Requirements 6.1**

### Example-Based Tests

The following criteria are better tested with specific examples rather than property-based tests:

- **Header structure** (Req 1.1, 1.3, 1.4): Test that header renders with logo on left, royal blue background, white text, full width
- **Dropdown structure** (Req 3.2, 3.3): Test that dropdown closes on mouse leave, displays items vertically
- **Hero structure** (Req 4.1-4.5): Test that hero renders with background image, heading, overlay, centered content
- **Hero responsive image** (Req 5.3): Test that background image uses bg-cover
- **Footer structure** (Req 6.2-6.5): Test that footer has royal blue background, white text, full width, copyright text
- **Color scheme** (Req 7.1-7.3): Test that royal blue and white colors are used correctly
- **Component files** (Req 8.1, 8.3, 8.5): Test that component files exist and use TypeScript
- **Accessibility** (Req 9.1-9.5): Test ARIA labels, keyboard navigation, contrast ratios
- **Performance** (Req 10.1, 10.2): Test that Next.js Image is used, lazy loading is implemented

### Edge Cases

- **Empty navigation items** (Req 1.2): Test that header handles empty navItems array gracefully
- **Missing hero props** (Req 8.4): Test that hero handles missing optional props (subheading, ctaButtons)
- **Background image alt text** (Req 9.3): CSS background images don't support alt text; consider using Next.js Image with fill instead

## Error Handling

### Component Error Boundaries

**Strategy**: Wrap each major component in an error boundary to prevent cascading failures.

**Implementation**:
```typescript
// components/ErrorBoundary.tsx
'use client';

export class ComponentErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Component error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please refresh.</div>;
    }
    return this.props.children;
  }
}
```

### Prop Validation

**Strategy**: Use TypeScript interfaces and runtime validation for component props.

**Common Error Cases**:
1. **Missing required props**: TypeScript will catch at compile time
2. **Invalid prop types**: TypeScript will catch at compile time
3. **Empty arrays**: Components should handle gracefully (render nothing or default state)
4. **Invalid URLs**: Use Next.js Link component which handles invalid hrefs
5. **Missing images**: Use Next.js Image with fallback or error handling

**Example Validation**:
```typescript
// In Hero component
if (!backgroundImage) {
  console.warn('Hero: backgroundImage prop is required');
  return null;
}

if (!heading) {
  console.warn('Hero: heading prop is required');
  return null;
}
```

### Navigation Errors

**Strategy**: Handle navigation failures gracefully.

**Error Cases**:
1. **Invalid href**: Next.js Link will handle, but log warning
2. **External links**: Use proper target and rel attributes
3. **Broken links**: Consider implementing link checking in development

### Image Loading Errors

**Strategy**: Provide fallbacks for failed image loads.

**Implementation**:
```typescript
// In Hero component
<Image
  src={backgroundImage}
  alt={heading}
  fill
  priority
  onError={(e) => {
    console.error('Failed to load hero image:', backgroundImage);
    // Fallback to solid color background
    e.currentTarget.style.display = 'none';
  }}
/>
```

### Responsive Behavior Errors

**Strategy**: Test responsive behavior across breakpoints.

**Error Cases**:
1. **Viewport detection failures**: Use CSS media queries as primary method
2. **JavaScript disabled**: Ensure mobile menu works with CSS fallback
3. **Touch device detection**: Use pointer media queries instead of user agent

## Testing Strategy

### Dual Testing Approach

This project will use both unit tests and property-based tests for comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, component structure, and accessibility
- **Property tests**: Verify universal properties across all inputs (navigation items, props, viewport sizes)

### Unit Testing

**Framework**: Jest + React Testing Library

**Focus Areas**:
1. **Component Structure**: Verify components render with correct DOM structure
2. **Styling**: Verify correct CSS classes are applied
3. **Accessibility**: Verify ARIA attributes, keyboard navigation, focus management
4. **Edge Cases**: Empty props, missing optional props, error states
5. **Integration**: Components work together correctly

**Example Unit Tests**:
```typescript
// Header.test.tsx
describe('Header Component', () => {
  it('renders logo on the left side', () => {
    render(<Header brandName="Blue Origin" navItems={[]} />);
    const logo = screen.getByText('Blue Origin');
    expect(logo).toBeInTheDocument();
    expect(logo.parentElement).toHaveClass('justify-start');
  });

  it('uses royal blue background and white text', () => {
    render(<Header brandName="Test" navItems={[]} />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-royal-blue', 'text-white');
  });

  it('includes aria-label on hamburger menu', () => {
    render(<Header brandName="Test" navItems={[]} />);
    const hamburger = screen.getByLabelText(/menu/i);
    expect(hamburger).toBeInTheDocument();
  });
});
```

**Balance**: Focus unit tests on specific examples and accessibility. Avoid writing too many unit tests for behavior that property tests will cover (like testing every possible navigation configuration).

### Property-Based Testing

**Framework**: fast-check (JavaScript/TypeScript property-based testing library)

**Configuration**:
- Minimum 100 iterations per property test
- Each test references its design document property
- Tag format: `// Feature: blue-origin-layout, Property {number}: {property_text}`

**Property Test Examples**:

```typescript
// Header.property.test.tsx
import fc from 'fast-check';

describe('Header Component Properties', () => {
  // Feature: blue-origin-layout, Property 1: Navigation items render correctly
  it('renders all navigation items with correct labels and hrefs', () => {
    fc.assert(
      fc.property(
        fc.array(fc.record({
          label: fc.string({ minLength: 1 }),
          href: fc.webUrl()
        })),
        (navItems) => {
          const { container } = render(
            <Header brandName="Test" navItems={navItems} />
          );
          
          navItems.forEach(item => {
            const link = container.querySelector(`a[href="${item.href}"]`);
            expect(link).toBeInTheDocument();
            expect(link).toHaveTextContent(item.label);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: blue-origin-layout, Property 2: Mobile menu toggle behavior
  it('toggles mobile menu state on hamburger click', () => {
    fc.assert(
      fc.property(
        fc.boolean(), // initial menu state
        (initialState) => {
          const { getByLabelText } = render(
            <Header brandName="Test" navItems={[]} />
          );
          
          // Set initial state
          const hamburger = getByLabelText(/menu/i);
          if (initialState) {
            fireEvent.click(hamburger); // open if starting closed
          }
          
          // Get current state
          const menuBefore = screen.queryByRole('navigation', { name: /mobile/i });
          const isOpenBefore = menuBefore !== null;
          
          // Click toggle
          fireEvent.click(hamburger);
          
          // Verify state changed
          const menuAfter = screen.queryByRole('navigation', { name: /mobile/i });
          const isOpenAfter = menuAfter !== null;
          
          expect(isOpenAfter).toBe(!isOpenBefore);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: blue-origin-layout, Property 3: Responsive navigation visibility
  it('shows only hamburger or desktop nav, never both', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 1920 }), // viewport width
        (viewportWidth) => {
          // Mock window.innerWidth
          global.innerWidth = viewportWidth;
          
          const { container } = render(
            <Header brandName="Test" navItems={[{ label: 'Test', href: '/' }]} />
          );
          
          const hamburger = container.querySelector('[aria-label*="menu"]');
          const desktopNav = container.querySelector('nav.desktop-nav');
          
          const hamburgerVisible = hamburger && window.getComputedStyle(hamburger).display !== 'none';
          const desktopVisible = desktopNav && window.getComputedStyle(desktopNav).display !== 'none';
          
          // XOR: exactly one should be visible
          expect(hamburgerVisible !== desktopVisible).toBe(true);
          
          // Verify correct one is visible based on viewport
          if (viewportWidth < 768) {
            expect(hamburgerVisible).toBe(true);
          } else {
            expect(desktopVisible).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Hero.property.test.tsx
describe('Hero Component Properties', () => {
  // Feature: blue-origin-layout, Property 6: Hero component prop rendering
  it('renders with all provided prop values visible', () => {
    fc.assert(
      fc.property(
        fc.record({
          backgroundImage: fc.webUrl(),
          heading: fc.string({ minLength: 1 }),
          subheading: fc.option(fc.string({ minLength: 1 })),
          ctaButtons: fc.array(fc.record({
            label: fc.string({ minLength: 1 }),
            href: fc.webUrl(),
            variant: fc.constantFrom('primary', 'secondary')
          }))
        }),
        (props) => {
          const { container } = render(<Hero {...props} />);
          
          // Verify heading
          expect(screen.getByText(props.heading)).toBeInTheDocument();
          
          // Verify subheading if provided
          if (props.subheading) {
            expect(screen.getByText(props.subheading)).toBeInTheDocument();
          }
          
          // Verify all CTA buttons
          props.ctaButtons.forEach(button => {
            const btn = screen.getByText(button.label);
            expect(btn).toBeInTheDocument();
            expect(btn.closest('a')).toHaveAttribute('href', button.href);
          });
          
          // Verify background image is set
          const bgElement = container.querySelector('[style*="background-image"]');
          expect(bgElement).toBeInTheDocument();
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: blue-origin-layout, Property 8: Responsive hero button layout
  it('stacks buttons vertically on mobile, horizontally on desktop', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 1920 }), // viewport width
        fc.array(fc.record({
          label: fc.string({ minLength: 1 }),
          href: fc.webUrl(),
          variant: fc.constantFrom('primary', 'secondary')
        }), { minLength: 2, maxLength: 3 }),
        (viewportWidth, buttons) => {
          global.innerWidth = viewportWidth;
          
          const { container } = render(
            <Hero
              backgroundImage="/test.jpg"
              heading="Test"
              ctaButtons={buttons}
            />
          );
          
          const buttonContainer = container.querySelector('.cta-buttons');
          const flexDirection = window.getComputedStyle(buttonContainer).flexDirection;
          
          if (viewportWidth < 768) {
            expect(flexDirection).toBe('column');
          } else {
            expect(flexDirection).toBe('row');
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Test Coverage Goals

- **Unit Tests**: 80%+ code coverage
- **Property Tests**: All universal properties validated
- **Integration Tests**: Key user flows (navigation, mobile menu, hero interaction)
- **Accessibility Tests**: WCAG 2.1 AA compliance

### Testing Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run only property tests
npm test -- --testNamePattern="Property"

# Run only unit tests
npm test -- --testNamePattern="Unit"
```

### Continuous Integration

- Run all tests on every pull request
- Enforce minimum coverage thresholds
- Run accessibility audits with axe-core
- Visual regression testing with Percy or Chromatic (optional)
