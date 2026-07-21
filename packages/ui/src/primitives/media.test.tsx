import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Image, Video } from "./media";

describe("Image", () => {
  it("applies alt text", () => {
    render(<Image src="/a.jpg" alt="Two carers with a client" ratio="16-9" />);
    expect(screen.getByRole("img", { name: "Two carers with a client" })).toBeInTheDocument();
  });

  it("empties alt and hides decorative images", () => {
    const { container } = render(<Image src="/bg.jpg" alt="ignored" decorative />);
    const img = container.querySelector("img")!;
    expect(img).toHaveAttribute("alt", "");
    expect(img).toHaveAttribute("aria-hidden", "true");
  });

  it("lazy-loads by default", () => {
    const { container } = render(<Image src="/a.jpg" alt="A" />);
    expect(container.querySelector("img")).toHaveAttribute("loading", "lazy");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Image src="/a.jpg" alt="A carer" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Video", () => {
  it("renders a captions track and a transcript", () => {
    const { container } = render(
      <Video
        src="/v.mp4"
        poster="/p.jpg"
        captionsSrc="/c.vtt"
        title="Meet our team"
        transcript={<p>Full transcript…</p>}
      />,
    );
    const video = container.querySelector("video")!;
    expect(video).toHaveAttribute("title", "Meet our team");
    const track = container.querySelector("track")!;
    expect(track).toHaveAttribute("kind", "captions");
    expect(screen.getByText("Transcript")).toBeInTheDocument();
    expect(screen.getByText("Full transcript…")).toBeInTheDocument();
  });
});
