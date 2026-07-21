import type { Meta, StoryObj } from "@storybook/react";
import { Heading, Link, Paragraph, Text } from "./typography";
import { Stack } from "./layout";

const meta: Meta = {
  title: "Primitives/Typography",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

export const Headings: Story = {
  render: () => (
    <Stack gap={3}>
      <Heading level={1}>The heart of Hellenic life</Heading>
      <Heading level={2}>Community, faith, culture</Heading>
      <Heading level={3}>Serving South Australia since 1930</Heading>
    </Stack>
  ),
};

export const BodyText: Story = {
  render: () => (
    <Stack gap={3}>
      <Paragraph>
        For more than ninety years we have kept our language, faith and culture alive. Read our{" "}
        <Link href="/services">services</Link> or{" "}
        <Link href="https://gocsa.org.au" external>
          visit the community site
        </Link>
        .
      </Paragraph>
      <Text tone="muted" size="sm">
        Muted caption text.
      </Text>
    </Stack>
  ),
};

export const Tones: Story = {
  render: () => (
    <Stack gap={1}>
      <Text tone="default">Default ink</Text>
      <Text tone="muted">Muted</Text>
      <Text tone="primary">Primary</Text>
      <Text tone="success">Success</Text>
      <Text tone="warning">Warning</Text>
      <Text tone="error">Error</Text>
    </Stack>
  ),
};
