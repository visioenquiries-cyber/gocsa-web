"use client";
import { Button, Container, Heading, Paragraph } from "@gocsa/ui";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container size="narrow">
      <div className="py-24 text-center md:py-32">
        <Heading level={1} className="text-2xl">
          Something went wrong
        </Heading>
        <Paragraph className="mx-auto mt-4 text-ink-muted">
          We hit an unexpected problem. Please try again — if it keeps happening, contact us.
        </Paragraph>
        <div className="mt-8">
          <Button onClick={reset}>Try again</Button>
        </div>
      </div>
    </Container>
  );
}
