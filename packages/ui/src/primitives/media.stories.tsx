import type { Meta, StoryObj } from "@storybook/react";
import { Image, Video } from "./media";
import { Container } from "./layout";

const meta: Meta = { title: "Primitives/Media", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

// Inline SVG data URI so stories are self-contained (no external assets).
const placeholder =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'><rect width='100%' height='100%' fill='%23D3E2F1'/><text x='50%' y='50%' fill='%230D5EAF' font-family='sans-serif' font-size='24' text-anchor='middle'>Authentic GOCSA photo</text></svg>`,
  );

export const ResponsiveImage: Story = {
  render: () => (
    <Container size="narrow">
      <Image src={placeholder} alt="Two carers supporting a client at home" ratio="16-9" />
    </Container>
  ),
};

export const CaptionedVideo: Story = {
  render: () => (
    <Container size="narrow">
      <Video
        src=""
        poster={placeholder}
        captionsSrc=""
        title="Meet our care team"
        transcript={<p>A full transcript of the video appears here for accessibility.</p>}
      />
    </Container>
  ),
};
