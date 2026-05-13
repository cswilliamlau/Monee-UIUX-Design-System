import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Dialog } from './Dialog';
import '../../tokens/tokens.css';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ErrorIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="24" fill="#fff6f7"/>
    <circle cx="24" cy="24" r="16" fill="#f64356"/>
    <text x="24" y="29" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">!</text>
  </svg>
);
const WarningIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="24" fill="#fcf9e6"/>
    <circle cx="24" cy="24" r="16" fill="#f1a500"/>
    <text x="24" y="29" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">!</text>
  </svg>
);
const SuccessIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="24" fill="#edfef1"/>
    <circle cx="24" cy="24" r="16" fill="#1fbd6a"/>
    <polyline points="17,24 22,29 31,19" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const BankIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="24" fill="#fff5ec"/>
    <circle cx="24" cy="24" r="16" fill="#fa5e00"/>
    <text x="24" y="29" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">!</text>
  </svg>
);

const ImagePlaceholder = ({ color, label }: { color: string; label: string }) => (
  <div style={{ width: '100%', height: '100%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 600 }}>
    {label}
  </div>
);

/** Phone-frame wrapper used in mask stories */
const PhoneFrame = ({ children, height = 520 }: { children: React.ReactNode; height?: number }) => (
  <div style={{ width: 320, height, background: '#e0e0e0', borderRadius: 24, position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, background: '#f8f8f8' }}>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ height: 120, background: '#c8c8c8', borderRadius: 8 }} />
        <div style={{ height: 12, background: '#d7d7d7', borderRadius: 4 }} />
        <div style={{ height: 12, background: '#d7d7d7', borderRadius: 4, width: '60%' }} />
        <div style={{ height: 12, background: '#d7d7d7', borderRadius: 4 }} />
        <div style={{ height: 12, background: '#d7d7d7', borderRadius: 4, width: '40%' }} />
      </div>
    </div>
    {children}
  </div>
);

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Dialog

Modal dialog card for messaging and confirmation.

Supports: text-only · text+icon · text+image (3 ratios) · 1 or 2 buttons · mask overlay · Shopee & Bank brands.

### Quick usage
\`\`\`tsx
import { Dialog } from '@monee/design-system';

// Text only
<Dialog
  title="Policy Renewal Available"
  content="You have a policy eligible for renewal."
  brand="shopee"
  primaryLabel="Buy Now"
  secondaryLabel="Dismiss"
  buttonLayout="horizontal"
  withMask
/>

// With image
<Dialog
  title="You got a credit limit increase!"
  content="Enjoy additional borrowing power."
  image={<img src="promo.jpg" alt="" />}
  imageRatio="1x1"
  brand="bank"
  primaryLabel="Activate"
  secondaryLabel="No Thanks"
  buttonLayout="horizontal"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    brand:        { control: 'radio',  options: ['shopee', 'bank'] },
    imageRatio:   { control: 'radio',  options: ['1x1', '2x3', '3x4'] },
    buttonLayout: { control: 'radio',  options: ['vertical', 'horizontal'] },
    withMask:     { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    title:         'Title of this pop-up (max 2 lines)',
    content:       'Content sed gravida massa feuis purus id. massa feuis purus id.',
    brand:         'shopee',
    primaryLabel:  'Primary',
    secondaryLabel: 'Secondary',
    buttonLayout:  'vertical',
    withMask:      false,
  },
};

// ─── Text Only ────────────────────────────────────────────────────────────────

export const TextOnly: Story = {
  name: 'Text Only — Variants',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Single Button</span>
        <Dialog title="Title of this pop-up (max 2 lines)" content="Content sed gravida massa feuis purus id. massa feuis purus id." brand="shopee" primaryLabel="Primary" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>2 Buttons — Vertical</span>
        <Dialog title="Title of this pop-up (max 2 lines)" content="Content sed gravida massa feuis purus id. massa feuis purus id." brand="shopee" primaryLabel="Primary" secondaryLabel="Secondary" buttonLayout="vertical" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>2 Buttons — Horizontal</span>
        <Dialog title="Title of this pop-up (max 2 lines)" content="Content sed gravida massa feuis purus id. massa feuis purus id." brand="shopee" primaryLabel="Primary" secondaryLabel="Secondary" buttonLayout="horizontal" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Bank — Single Button</span>
        <Dialog title="Title of this pop-up (max 2 lines)" content="Content sed gravida massa feuis purus id. massa feuis purus id." brand="bank" primaryLabel="Primary" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Bank — 2 Buttons Vertical</span>
        <Dialog title="Title of this pop-up (max 2 lines)" content="Content sed gravida massa feuis purus id. massa feuis purus id." brand="bank" primaryLabel="Primary" secondaryLabel="Secondary" buttonLayout="vertical" />
      </div>
    </div>
  ),
};

// ─── Text + Icon ──────────────────────────────────────────────────────────────

export const TextIcon: Story = {
  name: 'Text + Icon — Error / Warning / Success',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Error — 2 Buttons Vertical</span>
        <Dialog icon={<ErrorIcon />} title="Card Number is Not Supported" content="The issuing country of this card is not supported. Please choose a card from a supported country." brand="shopee" primaryLabel="Try Another Card" secondaryLabel="Other Payment Method" buttonLayout="vertical" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Warning — Single Button</span>
        <Dialog icon={<WarningIcon />} title="Are You Sure?" content="This action cannot be undone. Please review before proceeding." brand="shopee" primaryLabel="Confirm" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Success — 2 Buttons Horizontal</span>
        <Dialog icon={<SuccessIcon />} title="Payment Successful" content="Your transaction has been completed. Check details in history." brand="shopee" primaryLabel="Done" secondaryLabel="View History" buttonLayout="horizontal" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Bank — Icon + 2 Buttons Vertical</span>
        <Dialog icon={<BankIcon />} title="Title of this pop-up (max 2 lines)" content="Content sed gravida massa feuis purus id. massa feuis purus id." brand="bank" primaryLabel="Primary" secondaryLabel="Secondary" buttonLayout="vertical" />
      </div>
    </div>
  ),
};

// ─── Text + Image ─────────────────────────────────────────────────────────────

export const TextImage: Story = {
  name: 'Text + Image — 3 Ratios',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>1:1 — Single Button (recommended)</span>
        <Dialog image={<ImagePlaceholder color="#ffe8e3" label="Image 1:1" />} imageRatio="1x1" title="Title of this pop-up (max 2 lines)" content="Content sed gravida massa feuis purus id." brand="shopee" primaryLabel="Primary" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>2:3 — 2 Buttons Horizontal</span>
        <Dialog image={<ImagePlaceholder color="#ffead8" label="Image 2:3" />} imageRatio="2x3" title="Title of this pop-up (max 2 lines)" content="Content sed gravida massa feuis purus id." brand="bank" primaryLabel="Primary" secondaryLabel="Secondary" buttonLayout="horizontal" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>3:4 — 2 Buttons Vertical</span>
        <Dialog image={<ImagePlaceholder color="#fcf9e6" label="Image 3:4" />} imageRatio="3x4" title="Title of this pop-up (max 2 lines)" content="Content sed gravida massa feuis purus id." brand="shopee" primaryLabel="Primary" secondaryLabel="Secondary" buttonLayout="vertical" />
      </div>
    </div>
  ),
};

// ─── With Mask ────────────────────────────────────────────────────────────────

export const WithMask: Story = {
  name: 'Dialog With Mask — Overlay',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Text Only — With Mask</span>
        <PhoneFrame>
          <Dialog title="Title of this pop-up (max 2 lines)" content="Content sed gravida massa feuis purus id. massa feuis purus id." brand="shopee" primaryLabel="Primary" secondaryLabel="Secondary" buttonLayout="horizontal" withMask />
        </PhoneFrame>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Text + Icon — With Mask</span>
        <PhoneFrame>
          <Dialog icon={<WarningIcon />} title="Title of this pop-up (max 2 lines)" content="Content sed gravida massa feuis purus id." brand="shopee" primaryLabel="Primary" secondaryLabel="Secondary" buttonLayout="horizontal" withMask />
        </PhoneFrame>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Text + Image — With Mask</span>
        <PhoneFrame height={580}>
          <Dialog image={<ImagePlaceholder color="#ffe8e3" label="Image 1:1" />} imageRatio="1x1" title="Title of this pop-up (max 2 lines)" content="Content sed gravida massa feuis purus id." brand="shopee" primaryLabel="Primary" secondaryLabel="Secondary" buttonLayout="horizontal" withMask />
        </PhoneFrame>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Bank — Text Only — With Mask</span>
        <PhoneFrame>
          <Dialog title="Title of this pop-up (max 2 lines)" content="Content sed gravida massa feuis purus id. massa feuis purus id." brand="bank" primaryLabel="Primary" secondaryLabel="Secondary" buttonLayout="vertical" withMask />
        </PhoneFrame>
      </div>
    </div>
  ),
};

// ─── Real-world examples ──────────────────────────────────────────────────────

export const RealWorld: Story = {
  name: 'Real-World Examples',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Policy Renewal</span>
        <PhoneFrame>
          <Dialog title="Policy Renewal Available" content="You have a previously purchased policy that is still eligible for renewal. Renew now to ensure continuous coverage without any disruption." brand="shopee" primaryLabel="Buy Now" secondaryLabel="Dismiss" buttonLayout="horizontal" withMask />
        </PhoneFrame>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Single CTA — Confirmation</span>
        <PhoneFrame>
          <Dialog title="Unable To Remove Dependent" content="There must be at least one member. The last dependent is not allowed to be removed. Please update your plan to continue." brand="shopee" primaryLabel="Confirm" withMask />
        </PhoneFrame>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Bank — Image + 2 Buttons</span>
        <PhoneFrame height={580}>
          <Dialog image={<ImagePlaceholder color="#ffead8" label="🎉" />} imageRatio="1x1" title="You got temporary credit limit increase!" content="Enjoy additional borrowing power for a limited time. It will expire on 30 Jan." brand="bank" primaryLabel="Activate" secondaryLabel="No Thanks" buttonLayout="horizontal" withMask />
        </PhoneFrame>
      </div>
    </div>
  ),
};
