import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import { Card } from "./Card";
import { Icon } from "./Icon";
import { IconButton } from "./IconButton";
import { Spinner, Skeleton } from "./feedback";
import { Inline, Stack } from "./layout";

const Glyph = (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
    <path d="M4 10h12M10 4v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const meta: Meta = { title: "Primitives/Atoms", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

export const Badges: Story = {
  render: () => (
    <Inline gap={2}>
      <Badge tone="neutral">Neutral</Badge>
      <Badge tone="primary">Primary</Badge>
      <Badge tone="success">Open</Badge>
      <Badge tone="warning">Closing soon</Badge>
      <Badge tone="error">Closed</Badge>
      <Badge tone="info">Info</Badge>
    </Inline>
  ),
};

export const IconsAndButtons: Story = {
  render: () => (
    <Inline gap={3}>
      <Icon label="Add" size="lg">
        {Glyph}
      </Icon>
      <IconButton aria-label="Add" variant="primary" icon={Glyph} />
      <IconButton aria-label="Add" variant="secondary" icon={Glyph} />
      <IconButton aria-label="Add" variant="ghost" icon={Glyph} />
    </Inline>
  ),
};

export const Loading: Story = {
  render: () => (
    <Stack gap={4}>
      <Spinner label="Loading" />
      <Skeleton width={240} height={16} />
      <Skeleton width={180} height={16} />
      <Card padding="md">Card content</Card>
    </Stack>
  ),
};
