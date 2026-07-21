import type { Meta, StoryObj } from "@storybook/react";
import { Container, Divider, Grid, Inline, Stack, Surface } from "./layout";
import { Card } from "./Card";

const meta: Meta = {
  title: "Primitives/Layout",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

export const Surfaces: Story = {
  render: () => (
    <Grid cols={3} gap={4}>
      <Surface bg="page" border="hair" padding="md">
        page
      </Surface>
      <Surface bg="surface" padding="md">
        surface
      </Surface>
      <Surface bg="raised" elevation={2} padding="md">
        raised
      </Surface>
    </Grid>
  ),
};

export const StackAndInline: Story = {
  render: () => (
    <Stack gap={4}>
      <Inline gap={2}>
        <Surface bg="surface" padding="sm">
          a
        </Surface>
        <Surface bg="surface" padding="sm">
          b
        </Surface>
        <Surface bg="surface" padding="sm">
          c
        </Surface>
      </Inline>
      <Divider />
      <Card padding="md">A Card surface</Card>
    </Stack>
  ),
};

export const Containers: Story = {
  render: () => (
    <Stack gap={4}>
      <Container size="narrow">
        <Surface bg="surface" padding="md">
          narrow
        </Surface>
      </Container>
      <Container size="base">
        <Surface bg="surface" padding="md">
          base
        </Surface>
      </Container>
    </Stack>
  ),
};
