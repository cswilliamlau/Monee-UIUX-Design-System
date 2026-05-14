import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { BottomNav } from './BottomNav';
import type { BottomNavItem } from './BottomNav';
import '../../tokens/tokens.css';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof BottomNav> = {
  title: 'Navigation/BottomNav',
  component: BottomNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Bottom Navigation

Fixed bottom tab bar. Supports 2–5 items, with an optional centre QR scan button (5+scan layout).

Pass your own icon nodes via \`items[].icon\` / \`items[].activeIcon\`. Icons shown here are placeholders.

### Quick usage
\`\`\`tsx
import { BottomNav } from '@monee/design-system';

<BottomNav
  items={[
    { key: 'home',  label: 'Home',  icon: <HomeIcon />, activeIcon: <HomeFilledIcon /> },
    { key: 'me',    label: 'Me',    icon: <UserIcon />, activeIcon: <UserFilledIcon /> },
  ]}
  activeKey="home"
  onSelect={(key) => setActive(key)}
/>

// With scan button
<BottomNav
  items={fourItems}
  activeKey={active}
  onSelect={setActive}
  showScan
  onScan={() => openScanner()}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    showScan:  { control: 'boolean' },
    scanLabel: { control: 'text' },
    activeKey: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof BottomNav>;

// ─── Placeholder SVG icons ────────────────────────────────────────────────────

// Outline (unselected) icons
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
  </svg>
);

const HistoryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const NotifIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const MeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

// Filled (active) icons
const HomeFilledIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
    <rect x="9" y="12" width="6" height="9" fill="white"/>
  </svg>
);

const HistoryFilledIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <rect x="4" y="3" width="16" height="18" rx="2"/>
    <path d="M8 8h8M8 12h8M8 16h5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const NotifFilledIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
  </svg>
);

const MeFilledIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" strokeLinecap="round"/>
  </svg>
);

const SettingsFilledIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22a1.5 1.5 0 01-1.3-.75l-.9-1.56a9.06 9.06 0 01-1.54-.63l-1.76.37a1.5 1.5 0 01-1.54-.75l-1-1.73a1.5 1.5 0 01.26-1.82l1.3-1.17A9 9 0 015.5 12a9 9 0 01.02-.97l-1.3-1.17a1.5 1.5 0 01-.26-1.82l1-1.73a1.5 1.5 0 011.54-.75l1.76.37a9 9 0 011.54-.63l.9-1.56A1.5 1.5 0 0112 2a1.5 1.5 0 011.3.75l.9 1.56a9 9 0 011.54.63l1.76-.37a1.5 1.5 0 011.54.75l1 1.73a1.5 1.5 0 01-.26 1.82l-1.3 1.17c.01.32.02.64.02.96s-.01.65-.02.97l1.3 1.17a1.5 1.5 0 01.26 1.82l-1 1.73a1.5 1.5 0 01-1.54.75l-1.76-.37a9 9 0 01-1.54.63l-.9 1.56A1.5 1.5 0 0112 22z"/>
    <circle cx="12" cy="12" r="3" fill="white"/>
  </svg>
);

// ─── Item presets ─────────────────────────────────────────────────────────────

const ALL_ITEMS: BottomNavItem[] = [
  { key: 'home',     label: 'Home',          icon: <HomeIcon />,     activeIcon: <HomeFilledIcon /> },
  { key: 'history',  label: 'History',       icon: <HistoryIcon />,  activeIcon: <HistoryFilledIcon /> },
  { key: 'notif',    label: 'Notifications', icon: <NotifIcon />,    activeIcon: <NotifFilledIcon /> },
  { key: 'me',       label: 'Me',            icon: <MeIcon />,       activeIcon: <MeFilledIcon /> },
  { key: 'settings', label: 'Settings',      icon: <SettingsIcon />, activeIcon: <SettingsFilledIcon /> },
];

// ─── Interactive wrapper ──────────────────────────────────────────────────────

const Interactive: React.FC<{ items: BottomNavItem[]; defaultKey?: string; showScan?: boolean }> = ({
  items,
  defaultKey,
  showScan = false,
}) => {
  const [active, setActive] = useState(defaultKey ?? items[0]?.key);
  return (
    <div style={{ width: 375 }}>
      <BottomNav items={items} activeKey={active} onSelect={setActive} showScan={showScan} />
    </div>
  );
};

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    items:    ALL_ITEMS.slice(0, 4),
    activeKey: 'home',
    showScan:  false,
    scanLabel: 'QRIS',
  },
  decorators: [(Story) => <div style={{ width: 375 }}><Story /></div>],
};

export const TwoIcons: Story = {
  name: '2 Icons',
  render: () => <Interactive items={ALL_ITEMS.slice(0, 2)} />,
};

export const ThreeIcons: Story = {
  name: '3 Icons',
  render: () => <Interactive items={ALL_ITEMS.slice(0, 3)} />,
};

export const FourIcons: Story = {
  name: '4 Icons',
  render: () => <Interactive items={ALL_ITEMS.slice(0, 4)} />,
};

export const FiveIcons: Story = {
  name: '5 Icons',
  render: () => <Interactive items={ALL_ITEMS} />,
};

export const FiveWithScan: Story = {
  name: '5 Icons + Scan (QRIS)',
  render: () => (
    // Pass 4 items; scan fills the centre slot
    <Interactive items={[ALL_ITEMS[0], ALL_ITEMS[1], ALL_ITEMS[2], ALL_ITEMS[3]]} showScan />
  ),
};

export const WithBadges: Story = {
  name: 'With Badges',
  render: () => {
    const items: BottomNavItem[] = [
      { ...ALL_ITEMS[0] },
      { ...ALL_ITEMS[1], badge: true },
      { ...ALL_ITEMS[2], badge: 3 },
      { ...ALL_ITEMS[3], badge: 99 },
      { ...ALL_ITEMS[4] },
    ];
    return <Interactive items={items} defaultKey="home" />;
  },
};

export const AllLayouts: Story = {
  name: 'All Layouts',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: '#f0f0f0' }}>
      {[2, 3, 4, 5].map((n) => (
        <div key={n}>
          <div style={{ fontSize: 10, color: '#999', padding: '6px 12px', background: '#f0f0f0' }}>{n} icons</div>
          <Interactive items={ALL_ITEMS.slice(0, n)} />
        </div>
      ))}
      <div>
        <div style={{ fontSize: 10, color: '#999', padding: '6px 12px', background: '#f0f0f0' }}>5 icons + scan</div>
        <Interactive items={[ALL_ITEMS[0], ALL_ITEMS[1], ALL_ITEMS[2], ALL_ITEMS[3]]} showScan />
      </div>
    </div>
  ),
};
