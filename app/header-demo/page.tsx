import Header from '@/components/Header';

export default function HeaderDemo() {
  const navItems = [
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

  return (
    <div className="min-h-screen">
      <Header brandName="Blue Origin" navItems={navItems} />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Header Component Demo</h1>
        <p className="text-lg mb-4">
          This page demonstrates the Header component with dropdown navigation.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Hover over "VEHICLES" or "SYSTEMS" to see the dropdown menus</li>
          <li>The dropdowns have a smooth fade-in animation</li>
          <li>Dropdowns use royal blue background with white text</li>
          <li>On mobile (&lt; 768px), the hamburger menu appears instead</li>
        </ul>
      </main>
    </div>
  );
}
