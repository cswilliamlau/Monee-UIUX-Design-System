import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button, ButtonGroup, LoginButton } from './Button';
import '../../tokens/tokens.css';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Button> = {
  title: 'Action/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Button

Mobile button component. Supports 3 variants × 6 colors × 4 sizes × normal/disabled/pressed states.

### Quick usage
\`\`\`tsx
import { Button, ButtonGroup, LoginButton } from '@monee/design-system';

// Basic
<Button variant="filled" color="shopee" size="l">Confirm</Button>

// Full-width CTA
<Button variant="filled" color="shopee" size="l" fullWidth>Pay Now</Button>

// Rounded promo
<Button rounded gradient>Free Active Now</Button>

// Two-button group
<ButtonGroup layout="vertical">
  <Button variant="filled" color="shopee" size="l" fullWidth>Primary</Button>
  <Button variant="outline" color="shopee" size="l" fullWidth>Secondary</Button>
</ButtonGroup>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant:   { control: 'radio',  options: ['filled', 'outline', 'text'] },
    color:     { control: 'select', options: ['shopee', 'bank', 'white-shopee', 'white-bank', 'black', 'white'] },
    size:      { control: 'radio',  options: ['s', 'm', 'l', 'xl'] },
    fullWidth: { control: 'boolean' },
    rounded:   { control: 'boolean' },
    floating:  { control: 'boolean' },
    gradient:  { control: 'boolean' },
    disabled:  { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ─── Single button playground ─────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    variant:   'filled',
    color:     'shopee',
    size:      'l',
    fullWidth: false,
    rounded:   false,
    floating:  false,
    gradient:  false,
    disabled:  false,
    children:  'Button',
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes (S / M / L / XL)',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Button variant="filled" color="shopee" size="s">Small 28px</Button>
      <Button variant="filled" color="shopee" size="m">Medium 36px</Button>
      <Button variant="filled" color="shopee" size="l">Large 44px</Button>
      <Button variant="filled" color="shopee" size="xl">XLarge 52px</Button>
    </div>
  ),
};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Variants: Story = {
  name: 'Variants — Filled / Outline / Text',
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button variant="filled"  color="shopee" size="l">Filled</Button>
      <Button variant="outline" color="shopee" size="l">Outline</Button>
      <Button variant="text"    color="shopee" size="l">Text</Button>
    </div>
  ),
};

// ─── Colors ───────────────────────────────────────────────────────────────────

export const ColorsShopee: Story = {
  name: 'Colors — Shopee Orange',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <Button variant="filled"  color="shopee" size="l">Filled</Button>
        <Button variant="outline" color="shopee" size="l">Outline</Button>
        <Button variant="text"    color="shopee" size="l">Text</Button>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Button variant="filled"  color="shopee" size="l" disabled>Filled Disabled</Button>
        <Button variant="outline" color="shopee" size="l" disabled>Outline Disabled</Button>
        <Button variant="text"    color="shopee" size="l" disabled>Text Disabled</Button>
      </div>
    </div>
  ),
};

export const ColorsBank: Story = {
  name: 'Colors — Bank Orange',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <Button variant="filled"  color="bank" size="l">Filled</Button>
        <Button variant="outline" color="bank" size="l">Outline</Button>
        <Button variant="text"    color="bank" size="l">Text</Button>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Button variant="filled"  color="bank" size="l" disabled>Filled Disabled</Button>
        <Button variant="outline" color="bank" size="l" disabled>Outline Disabled</Button>
      </div>
    </div>
  ),
};

export const ColorsOnSolid: Story = {
  name: 'Colors — White on Solid Background',
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ background: '#ee4d2d', padding: 16, borderRadius: 12, display: 'flex', gap: 8 }}>
        <Button variant="filled"  color="white-shopee" size="l">White Shopee</Button>
        <Button variant="outline" color="white"        size="l">Outline White</Button>
      </div>
      <div style={{ background: '#fa5e00', padding: 16, borderRadius: 12, display: 'flex', gap: 8 }}>
        <Button variant="filled"  color="white-bank" size="l">White Bank</Button>
        <Button variant="outline" color="white"      size="l">Outline White</Button>
      </div>
    </div>
  ),
};

// ─── Rounded ──────────────────────────────────────────────────────────────────

export const Rounded: Story = {
  name: 'Rounded — Pill shape',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <Button rounded color="shopee" variant="filled">Shopee Orange</Button>
        <Button rounded color="bank"   variant="filled">Bank Orange</Button>
        <Button rounded gradient>Gradient</Button>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Button rounded color="white-shopee" variant="filled">White Shopee</Button>
        <Button rounded color="white-bank"   variant="filled">White Bank</Button>
      </div>
      <div style={{ background: '#f0f0f0', padding: 16, borderRadius: 12, display: 'flex', gap: 12 }}>
        <Button rounded color="shopee" variant="filled" floating>Floating</Button>
        <Button rounded gradient floating>Floating Gradient</Button>
      </div>
    </div>
  ),
};

// ─── ButtonGroup ──────────────────────────────────────────────────────────────

export const Groups: Story = {
  name: 'Button Group',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      <div style={{ width: 335 }}>
        <p style={{ fontSize: 11, color: '#8c8c8c', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Horizontal — Shopee</p>
        <ButtonGroup layout="horizontal">
          <Button variant="outline" color="shopee" size="l">Secondary</Button>
          <Button variant="filled"  color="shopee" size="l">Primary</Button>
        </ButtonGroup>
      </div>
      <div style={{ width: 335 }}>
        <p style={{ fontSize: 11, color: '#8c8c8c', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Horizontal — Bank</p>
        <ButtonGroup layout="horizontal">
          <Button variant="outline" color="bank" size="l">Secondary</Button>
          <Button variant="filled"  color="bank" size="l">Primary</Button>
        </ButtonGroup>
      </div>
      <div style={{ width: 335 }}>
        <p style={{ fontSize: 11, color: '#8c8c8c', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Vertical — Shopee</p>
        <ButtonGroup layout="vertical">
          <Button variant="filled"  color="shopee" size="l" fullWidth>Primary</Button>
          <Button variant="outline" color="shopee" size="l" fullWidth>Secondary</Button>
        </ButtonGroup>
      </div>
      <div style={{ width: 335 }}>
        <p style={{ fontSize: 11, color: '#8c8c8c', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Vertical — Bank</p>
        <ButtonGroup layout="vertical">
          <Button variant="filled"  color="bank" size="l" fullWidth>Primary</Button>
          <Button variant="outline" color="bank" size="l" fullWidth>Secondary</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

// ─── Login Button ─────────────────────────────────────────────────────────────

const ShopeeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="rgba(255,255,255,0.25)"/>
    <text x="7" y="17" fontSize="12" fill="white" fontWeight="bold">S</text>
  </svg>
);
const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ee4d2d" strokeWidth="2">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <circle cx="12" cy="18" r="1" fill="#ee4d2d" stroke="none"/>
  </svg>
);
const WAIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.306A9.956 9.956 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
  </svg>
);
const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M21.805 10.023H12v3.955h5.65c-.244 1.308-1.007 2.415-2.145 3.158v2.627h3.473c2.033-1.875 3.205-4.637 3.205-7.9 0-.588-.052-1.164-.152-1.84z" fill="#4285F4"/>
    <path d="M12 22c2.837 0 5.217-.94 6.957-2.537l-3.473-2.627c-.965.647-2.2 1.03-3.484 1.03-2.677 0-4.944-1.807-5.752-4.237H2.668v2.714C4.393 19.82 7.977 22 12 22z" fill="#34A853"/>
    <path d="M6.248 13.63A5.963 5.963 0 0 1 5.912 12c0-.565.097-1.112.272-1.63V7.656H2.668A9.983 9.983 0 0 0 2 12c0 1.614.387 3.14 1.071 4.487l3.177-2.857z" fill="#FBBC05"/>
    <path d="M12 6.173c1.508 0 2.862.518 3.927 1.535l2.947-2.947C16.952 3.12 14.63 2 12 2 7.977 2 4.393 4.18 2.668 7.513l3.58 2.857C7.056 7.98 9.323 6.173 12 6.173z" fill="#EA4335"/>
  </svg>
);
const FBIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.793-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);

export const LoginButtons: Story = {
  name: 'Login Button',
  render: () => (
    <div style={{ width: 335, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <LoginButton loginVariant="shopee"  icon={<ShopeeIcon />}>Continue with Shopee</LoginButton>
      <LoginButton loginVariant="mobile"  icon={<PhoneIcon />}>Sign Up with Mobile Number</LoginButton>
      <LoginButton loginVariant="social"  icon={<WAIcon />}>Login with WhatsApp</LoginButton>
      <LoginButton loginVariant="social"  icon={<GoogleIcon />}>Login with Google</LoginButton>
      <LoginButton loginVariant="social"  icon={<FBIcon />}>Login with Facebook</LoginButton>
    </div>
  ),
};

export const LoginButtonsDisabled: Story = {
  name: 'Login Button — Disabled',
  render: () => (
    <div style={{ width: 335, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <LoginButton loginVariant="shopee" icon={<ShopeeIcon />} disabled>Continue with Shopee</LoginButton>
      <LoginButton loginVariant="mobile" icon={<PhoneIcon />} disabled>Sign Up with Mobile Number</LoginButton>
      <LoginButton loginVariant="social" icon={<WAIcon />}    disabled>Login with WhatsApp</LoginButton>
    </div>
  ),
};
