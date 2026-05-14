import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { TabGroup } from './TabGroup';
import type { TabItem, TabGroupVariant, TabGroupSize } from './TabGroup';
import '../../tokens/tokens.css';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof TabGroup> = {
  title: 'Navigation/TabGroup',
  component: TabGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Tab Group

Horizontal tab bar in three layout variants and two sizes.

| Variant | Behaviour |
|---|---|
| \`default\` | Tabs share width equally (2–5 tabs) |
| \`scrollable-hug\` | Each tab hugs its label; bar scrolls horizontally |
| \`scrollable-fix\` | Each tab has a fixed pixel width (\`tabWidth\`); bar scrolls |

### Quick usage
\`\`\`tsx
import { TabGroup } from '@monee/design-system';

const [active, setActive] = useState('tab1');

<TabGroup
  items={[
    { key: 'tab1', label: 'Overview' },
    { key: 'tab2', label: 'Details' },
    { key: 'tab3', label: 'History' },
  ]}
  activeKey={active}
  onChange={setActive}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant:  { control: 'radio',   options: ['default', 'scrollable-hug', 'scrollable-fix'] },
    size:     { control: 'radio',   options: ['normal', 'small'] },
    tabWidth: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof TabGroup>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const makeTabs = (n: number): TabItem[] =>
  Array.from({ length: n }, (_, i) => ({ key: `tab${i + 1}`, label: 'Tab' }));

const Interactive: React.FC<{
  items: TabItem[];
  variant?: TabGroupVariant;
  size?: TabGroupSize;
  tabWidth?: number;
}> = ({ items, variant, size, tabWidth }) => {
  const [active, setActive] = useState(items[0]?.key ?? '');
  return (
    <div style={{ width: 375 }}>
      <TabGroup
        items={items}
        activeKey={active}
        onChange={setActive}
        variant={variant}
        size={size}
        tabWidth={tabWidth}
      />
    </div>
  );
};

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <div style={{ fontSize: 10, color: '#999', padding: '6px 12px', background: '#f0f0f0' }}>{label}</div>
    {children}
  </div>
);

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    items:     makeTabs(3),
    activeKey: 'tab1',
    variant:   'default',
    size:      'normal',
    tabWidth:  120,
  },
  decorators: [(Story) => <div style={{ width: 375 }}><Story /></div>],
};

// ─── Default — normal size ────────────────────────────────────────────────────

export const DefaultNormal: Story = {
  name: 'Default — Normal (2 / 3 / 4 / 5 tabs)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: '#f0f0f0' }}>
      {[2, 3, 4, 5].map((n) => (
        <Row key={n} label={`${n} tabs`}>
          <Interactive items={makeTabs(n)} />
        </Row>
      ))}
    </div>
  ),
};

// ─── Default — small size ─────────────────────────────────────────────────────

export const DefaultSmall: Story = {
  name: 'Default — Small / In-module (2 / 3 / 4 / 5 tabs)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: '#f0f0f0' }}>
      {[2, 3, 4, 5].map((n) => (
        <Row key={n} label={`${n} tabs · small`}>
          <Interactive items={makeTabs(n)} size="small" />
        </Row>
      ))}
    </div>
  ),
};

// ─── Scrollable hug ───────────────────────────────────────────────────────────

export const ScrollableHug: Story = {
  name: 'Scrollable — Hug Width',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: '#f0f0f0' }}>
      <Row label="normal · hug width (scroll →)">
        <Interactive
          variant="scrollable-hug"
          items={[
            { key: 'a', label: 'Overview' },
            { key: 'b', label: 'Transactions' },
            { key: 'c', label: 'Investments' },
            { key: 'd', label: 'Rewards' },
            { key: 'e', label: 'Settings' },
            { key: 'f', label: 'More' },
          ]}
        />
      </Row>
      <Row label="small · hug width (scroll →)">
        <Interactive
          variant="scrollable-hug"
          size="small"
          items={[
            { key: 'a', label: 'Overview' },
            { key: 'b', label: 'Transactions' },
            { key: 'c', label: 'Investments' },
            { key: 'd', label: 'Rewards' },
            { key: 'e', label: 'Settings' },
            { key: 'f', label: 'More' },
          ]}
        />
      </Row>
    </div>
  ),
};

// ─── Scrollable fix ───────────────────────────────────────────────────────────

export const ScrollableFix: Story = {
  name: 'Scrollable — Fixed Width (2.5 / 3.5 / 4.5 visible)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: '#f0f0f0' }}>
      <Row label="2.5 tabs visible · tabWidth=150px">
        <Interactive variant="scrollable-fix" tabWidth={150} items={makeTabs(6)} />
      </Row>
      <Row label="3.5 tabs visible · tabWidth=107px">
        <Interactive variant="scrollable-fix" tabWidth={107} items={makeTabs(6)} />
      </Row>
      <Row label="4.5 tabs visible · tabWidth=83px">
        <Interactive variant="scrollable-fix" tabWidth={83} items={makeTabs(7)} />
      </Row>
      <Row label="small · 2.5 visible · tabWidth=140px">
        <Interactive variant="scrollable-fix" size="small" tabWidth={140} items={makeTabs(6)} />
      </Row>
    </div>
  ),
};

// ─── Real labels ──────────────────────────────────────────────────────────────

export const RealLabels: Story = {
  name: 'Real Labels',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: '#f0f0f0' }}>
      <Row label="default · 3 tabs">
        <Interactive
          items={[
            { key: 'all',      label: 'All' },
            { key: 'pending',  label: 'Pending' },
            { key: 'done',     label: 'Done' },
          ]}
        />
      </Row>
      <Row label="default · 4 tabs">
        <Interactive
          items={[
            { key: 'overview', label: 'Overview' },
            { key: 'details',  label: 'Details' },
            { key: 'history',  label: 'History' },
            { key: 'info',     label: 'Info' },
          ]}
        />
      </Row>
      <Row label="scrollable hug · many tabs">
        <Interactive
          variant="scrollable-hug"
          items={[
            { key: 'all',     label: 'All' },
            { key: 'food',    label: 'Food & Drink' },
            { key: 'travel',  label: 'Travel' },
            { key: 'shop',    label: 'Shopping' },
            { key: 'health',  label: 'Health' },
            { key: 'finance', label: 'Finance' },
          ]}
        />
      </Row>
    </div>
  ),
};
