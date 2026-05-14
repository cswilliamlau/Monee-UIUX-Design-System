import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { SearchBox } from './SearchBox';
import '../../tokens/tokens.css';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof SearchBox> = {
  title: 'Input/SearchBox',
  component: SearchBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Search Box

Pill-shaped search input in two colours and two sizes.

| Color   | Usage |
|---|---|
| \`grey\`  | Default — on white/light page backgrounds |
| \`white\` | On coloured (orange/dark) backgrounds, e.g. inside TopBar |

| Size     | Height |
|---|---|
| \`normal\` | 44 px |
| \`topbar\` | 40 px (compact, for top bar placement) |

The clear (×) button appears only when the field is **focused and has a value**.

The **location variant** adds a \`Location 📍\` badge on the right with a divider.

### Quick usage
\`\`\`tsx
import { SearchBox } from '@monee/design-system';

const [q, setQ] = useState('');

<SearchBox
  placeholder="Search products"
  value={q}
  onChange={setQ}
  onCamera={() => openScanner()}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    color:      { control: 'radio', options: ['grey', 'white'] },
    size:       { control: 'radio', options: ['normal', 'topbar'] },
    showCamera: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBox>;

// ─── Wrappers ─────────────────────────────────────────────────────────────────

const Controlled: React.FC<React.ComponentProps<typeof SearchBox>> = (props) => {
  const [val, setVal] = useState(props.value ?? '');
  return <SearchBox {...props} value={val} onChange={setVal} />;
};

const Bg: React.FC<{ color?: string; label: string; children: React.ReactNode }> = ({
  color = 'transparent',
  label,
  children,
}) => (
  <div>
    <div style={{ fontSize: 10, color: '#999', padding: '6px 0', marginBottom: 4 }}>{label}</div>
    <div style={{ background: color, borderRadius: 12, padding: '12px 16px' }}>{children}</div>
  </div>
);

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    color:       'grey',
    size:        'normal',
    placeholder: 'Placeholder Text',
    showCamera:  true,
  },
  decorators: [(Story) => <div style={{ width: 375, padding: 16 }}><Story /></div>],
};

// ─── All states — grey ────────────────────────────────────────────────────────

export const GreyAllStates: Story = {
  name: 'Grey — All States',
  render: () => (
    <div style={{ width: 375, display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
      <Bg label="Unfilled">
        <Controlled color="grey" placeholder="Placeholder Text" />
      </Bg>
      <Bg label="Focus (click the field)">
        <Controlled color="grey" placeholder="Placeholder Text" />
      </Bg>
      <Bg label="Filled">
        <Controlled color="grey" value="Input Text" />
      </Bg>
    </div>
  ),
};

// ─── All states — white ───────────────────────────────────────────────────────

export const WhiteAllStates: Story = {
  name: 'White — All States (on orange bg)',
  render: () => (
    <div style={{ width: 375, display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
      <Bg color="var(--mnd-color-fg-shopee, #ee4d2d)" label="Unfilled">
        <Controlled color="white" placeholder="Placeholder Text" />
      </Bg>
      <Bg color="var(--mnd-color-fg-shopee, #ee4d2d)" label="Filled">
        <Controlled color="white" value="Input Text" />
      </Bg>
    </div>
  ),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div style={{ width: 375, display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
      <Bg label="Normal (44px)">
        <Controlled color="grey" size="normal" placeholder="Placeholder Text" />
      </Bg>
      <Bg label="Topbar (40px)">
        <Controlled color="grey" size="topbar" placeholder="Placeholder Text" />
      </Bg>
      <Bg color="var(--mnd-color-fg-shopee, #ee4d2d)" label="Topbar white (40px) — in TopBar">
        <Controlled color="white" size="topbar" placeholder="Placeholder Text" />
      </Bg>
    </div>
  ),
};

// ─── Location variant ─────────────────────────────────────────────────────────

export const LocationVariant: Story = {
  name: 'Location Variant',
  render: () => (
    <div style={{ width: 375, display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
      <Bg label="Unfilled + location">
        <Controlled color="grey" placeholder="Placeholder Text" location="Location" showCamera={false} />
      </Bg>
      <Bg label="Filled + location">
        <Controlled color="grey" value="Input Text" location="Location" showCamera={false} />
      </Bg>
    </div>
  ),
};

// ─── All variants overview ────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Grey */}
      <div style={{ background: '#f0f0f0', padding: '6px 12px', fontSize: 10, color: '#999' }}>Grey — normal</div>
      <div style={{ background: '#fff', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10, width: 375 }}>
        <Controlled color="grey" size="normal" placeholder="Placeholder Text" />
        <Controlled color="grey" size="normal" value="Input Text" />
      </div>

      {/* Grey topbar */}
      <div style={{ background: '#f0f0f0', padding: '6px 12px', fontSize: 10, color: '#999' }}>Grey — topbar</div>
      <div style={{ background: '#fff', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10, width: 375 }}>
        <Controlled color="grey" size="topbar" placeholder="Placeholder Text" />
        <Controlled color="grey" size="topbar" value="Input Text" />
      </div>

      {/* White on orange */}
      <div style={{ background: '#f0f0f0', padding: '6px 12px', fontSize: 10, color: '#999' }}>White — on orange bg</div>
      <div style={{ background: 'var(--mnd-color-fg-shopee, #ee4d2d)', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10, width: 375 }}>
        <Controlled color="white" size="normal" placeholder="Placeholder Text" />
        <Controlled color="white" size="normal" value="Input Text" />
      </div>

      {/* Location */}
      <div style={{ background: '#f0f0f0', padding: '6px 12px', fontSize: 10, color: '#999' }}>Location variant</div>
      <div style={{ background: '#fff', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10, width: 375 }}>
        <Controlled color="grey" placeholder="Placeholder Text" location="Location" showCamera={false} />
        <Controlled color="grey" value="Input Text" location="Location" showCamera={false} />
      </div>
    </div>
  ),
};
