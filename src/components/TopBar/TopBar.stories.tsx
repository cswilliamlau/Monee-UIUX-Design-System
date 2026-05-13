import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TopBar } from './TopBar';
import '../../tokens/tokens.css';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof TopBar> = {
  title: 'Navigation/TopBar',
  component: TopBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Top Bar

Mobile page header. Five types: **default**, **search**, **subtitle**, **image** (transparent, over a hero), and **homepage** (user identity + notifications).

Use \`rightSlot\` to pass any combination of icon/text actions. The slot inherits \`color: currentColor\` so icons automatically match white/orange/black themes.

### Quick usage
\`\`\`tsx
import { TopBar } from '@monee/design-system';

// Default with back arrow and action icons
<TopBar title="Page Title" showBack onBack={() => {}} rightSlot={<MyIcons />} />

// Orange search bar
<TopBar type="search" bgColor="orange" searchPlaceholder="Search here…" />

// Subtitle style (large heading)
<TopBar type="subtitle" title="My Account" subtitle="Manage your profile and settings." />

// Homepage
<TopBar type="homepage" userName="John Doe" accountNumber="2000 2088 4000" notificationCount={1} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    type:     { control: 'radio',   options: ['default', 'search', 'subtitle', 'image', 'homepage'] },
    bgColor:  { control: 'radio',   options: ['white', 'orange', 'transparent'] },
    showShadow:   { control: 'boolean' },
    showBack:     { control: 'boolean' },
    showStatusBar:{ control: 'boolean' },
    multiAccount: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof TopBar>;

// ─── Helpers: right-slot icon buttons ─────────────────────────────────────────

const Btn: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <button aria-label={label} style={{ display:'flex', alignItems:'center', justifyContent:'center', width:24, height:24, background:'none', border:'none', padding:0, cursor:'pointer', color:'inherit' }}>
    {children}
  </button>
);

const QuestionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-1.5 2-2 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="12" cy="17" r="1" fill="currentColor"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const PersonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const MoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="5"  cy="12" r="1.5" fill="currentColor"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="19" cy="12" r="1.5" fill="currentColor"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    type:         'default',
    bgColor:      'white',
    showShadow:   true,
    showBack:     true,
    title:        'Page Title',
    showStatusBar: true,
    time:         '12:30',
  },
  decorators: [(Story) => (
    <div style={{ width: 375 }}>
      <Story />
    </div>
  )],
};

// ─── Default variants ─────────────────────────────────────────────────────────

export const DefaultVariants: Story = {
  name: 'Default — White / Orange',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <TopBar
        bgColor="white" showShadow title="Page Title" showBack
        rightSlot={<><Btn label="help"><QuestionIcon /></Btn><Btn label="settings"><SettingsIcon /></Btn></>}
      />
      <div style={{ height: 2, background: '#f0f0f0' }} />
      <TopBar
        bgColor="orange" title="Page Title" showBack
        rightSlot={<><Btn label="help"><QuestionIcon /></Btn><Btn label="settings"><SettingsIcon /></Btn></>}
      />
    </div>
  ),
};

// ─── Right-slot variations ────────────────────────────────────────────────────

export const RightSlotVariants: Story = {
  name: 'Right Slot — 1 / 2 / 3 icons / Close / Text',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: '#f0f0f0' }}>
      <TopBar bgColor="white" title="1 icon"    showBack rightSlot={<Btn label="help"><QuestionIcon /></Btn>} />
      <TopBar bgColor="white" title="2 icons"   showBack rightSlot={<><Btn label="help"><QuestionIcon /></Btn><Btn label="settings"><SettingsIcon /></Btn></>} />
      <TopBar bgColor="white" title="3 icons"   showBack rightSlot={<><Btn label="help"><QuestionIcon /></Btn><Btn label="settings"><SettingsIcon /></Btn><Btn label="person"><PersonIcon /></Btn></>} />
      <TopBar bgColor="white" title="overflow"  showBack rightSlot={<><Btn label="help"><QuestionIcon /></Btn><Btn label="settings"><SettingsIcon /></Btn><Btn label="more"><MoreIcon /></Btn></>} />
      <TopBar bgColor="white" title="Close btn" showBack rightSlot={<Btn label="close"><CloseIcon /></Btn>} />
      <TopBar bgColor="white" title="Text btn"  showBack rightSlot={<button style={{ background:'none', border:'none', color:'inherit', font:'600 14px/1 Roboto,sans-serif', cursor:'pointer', padding:0 }}>Share</button>} />
    </div>
  ),
};

// ─── Search variant ───────────────────────────────────────────────────────────

export const SearchVariants: Story = {
  name: 'Search — White / Orange',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: '#f0f0f0' }}>
      <TopBar type="search" bgColor="white"  showShadow searchPlaceholder="Placeholder Text" showBack />
      <TopBar type="search" bgColor="orange"            searchPlaceholder="Placeholder Text" showBack />
    </div>
  ),
};

// ─── Subtitle variant ─────────────────────────────────────────────────────────

export const SubtitleVariant: Story = {
  name: 'Subtitle',
  render: () => (
    <div style={{ width: 375 }}>
      <TopBar
        type="subtitle"
        title="Page Title"
        subtitle="An introduction that invites users to explore what this page has to offer."
        showBack
      />
    </div>
  ),
};

// ─── Image / transparent variant ──────────────────────────────────────────────

export const ImageVariant: Story = {
  name: 'Image (transparent)',
  render: () => (
    <div style={{ width: 375, background: 'linear-gradient(160deg,#b3bfcc 0%,#d6dde8 100%)', borderRadius: 12, overflow: 'hidden' }}>
      <TopBar
        type="image"
        bgColor="transparent"
        showBack
        title=""
        rightSlot={<><Btn label="help"><QuestionIcon /></Btn><Btn label="settings"><SettingsIcon /></Btn><Btn label="more"><MoreIcon /></Btn></>}
      />
    </div>
  ),
};

// ─── Homepage variant ─────────────────────────────────────────────────────────

export const HomepageVariants: Story = {
  name: 'Homepage — Default / Multi-account',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: '#f0f0f0' }}>
      <TopBar
        type="homepage"
        bgColor="white"
        showShadow
        userName="A User Name Here"
        accountNumber="2000 2088 4000"
        multiAccount={false}
        notificationCount={1}
      />
      <TopBar
        type="homepage"
        bgColor="white"
        userName="A User Name Here"
        accountNumber="2000 2088 4000"
        multiAccount={true}
        notificationCount={3}
      />
    </div>
  ),
};

// ─── All types ────────────────────────────────────────────────────────────────

export const AllTypes: Story = {
  name: 'All Types',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: '#f0f0f0' }}>
      <TopBar bgColor="white"  showShadow title="Default — white"  showBack rightSlot={<><Btn label="?"><QuestionIcon /></Btn><Btn label="⚙"><SettingsIcon /></Btn></>} />
      <TopBar bgColor="orange"            title="Default — orange" showBack rightSlot={<><Btn label="?"><QuestionIcon /></Btn><Btn label="⚙"><SettingsIcon /></Btn></>} />
      <TopBar type="search" bgColor="white"  showBack searchPlaceholder="Search…" />
      <TopBar type="search" bgColor="orange" showBack searchPlaceholder="Search…" />
      <TopBar type="subtitle" title="Subtitle style" subtitle="Longer description text below the title." showBack />
      <div style={{ background: 'linear-gradient(160deg,#b3bfcc,#d6dde8)' }}>
        <TopBar type="image" bgColor="transparent" showBack title="" rightSlot={<><Btn label="?"><QuestionIcon /></Btn><Btn label="⚙"><SettingsIcon /></Btn><Btn label="…"><MoreIcon /></Btn></>} />
      </div>
      <TopBar type="homepage" bgColor="white" userName="A User Name Here" accountNumber="2000 2088 4000" notificationCount={1} />
    </div>
  ),
};
