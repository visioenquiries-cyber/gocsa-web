import Link from "next/link";
import { buttonVariants, cn, Container, Heading, Paragraph } from "@gocsa/ui";

export default function NotFound() {
  return (
    <Container size="narrow">
      <div className="py-24 text-center md:py-32">
        <Heading level={1} className="text-2xl">
          We couldn’t find that page
        </Heading>
        <Paragraph className="mx-auto mt-4 text-ink-muted">
          The page you’re looking for may have moved. Let’s get you back on track.
        </Paragraph>
        <Link href="/en" className={cn(buttonVariants({ variant: "primary" }), "mt-8")}>
          Back to home
        </Link>
      </div>
    </Container>
  );
}
