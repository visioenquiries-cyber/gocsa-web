import { getPayload } from "payload";
import config from "@payload-config";
import { Button, Container, Heading, Paragraph, Stack, Text } from "@gocsa/ui";
import { isLocale } from "@gocsa/cms";

// Rendered per request so the CMS query is never evaluated at build time (no DB needed to build).
export const dynamic = "force-dynamic";

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "en";

  let siteName = "GOCSA Community Care";
  let dbConnected = true;
  try {
    const payload = await getPayload({ config });
    const settings = await payload.findGlobal({ slug: "settings", locale: loc });
    if (settings && typeof settings.siteName === "string") siteName = settings.siteName;
  } catch {
    // Safe degradation: prove the query path + error handling without a database (docs/12 §13).
    dbConnected = false;
  }

  return (
    <Container size="narrow">
      <Stack gap={4}>
        <Heading level={1}>{siteName}</Heading>
        <Paragraph>
          Development shell · locale <strong>{loc}</strong>. Tokens, UI primitives and the CMS query
          layer are wired. The public website is built in Sprint 4.
        </Paragraph>
        {!dbConnected ? (
          <Text tone="muted">
            CMS database not connected — start it (docs/24) to load content from the CMS.
          </Text>
        ) : null}
        <Button>Get started</Button>
      </Stack>
    </Container>
  );
}
