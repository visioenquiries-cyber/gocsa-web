import { Container, Skeleton, Stack } from "@gocsa/ui";

export default function Loading() {
  return (
    <Container size="wide">
      <Stack gap={6} className="py-24">
        <Skeleton height={48} width="60%" />
        <Skeleton height={24} width="80%" />
        <Skeleton height={24} width="70%" />
        <div className="grid gap-6 pt-6 md:grid-cols-3">
          <Skeleton height={220} radius="lg" />
          <Skeleton height={220} radius="lg" />
          <Skeleton height={220} radius="lg" />
        </div>
      </Stack>
    </Container>
  );
}
