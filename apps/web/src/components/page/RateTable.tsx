import { Heading, Paragraph } from "@gocsa/ui";
import type { DataTable, RateGroup } from "../../content/pages/types";

/**
 * Fee-schedule tables (Support at Home price list). Wide rate grids can't collapse
 * gracefully on a phone, so each table scrolls horizontally inside its own focusable
 * region — the page body never scrolls sideways. Tables stay semantic (`th`/`scope`)
 * so screen readers announce the service and rate column for every price.
 */

function ScrollRegion({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      role="region"
      aria-label={label}
      // A scrollable region must be reachable by keyboard so it can be scrolled without a
      // mouse (WCAG 2.1.1). The lint rule only allows tabindex on `tabpanel` by default.
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      className="overflow-x-auto focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus"
    >
      {children}
    </div>
  );
}

/** Shared cell rhythm across both table flavours. */
const TH_COL =
  "border-b-hair border-divider px-4 py-3 text-left align-bottom font-body text-xs font-semibold uppercase tracking-wide text-accent-ink";
const TD = "border-b-hair border-divider px-4 py-4 align-top font-body text-base";

/** e.g. "0%", "25%", "17.5%", "0–25%" — a rate on its own, with no explanation after it. */
const BARE_RATE = /^\d+(\.\d+)?(–\d+(\.\d+)?)?%$/;

export function RateGroupTable({ group }: { group: RateGroup }) {
  return (
    <section className="overflow-hidden rounded-xl border-hair border-divider bg-surface-raised shadow-1">
      <div className="px-6 pb-5 pt-6 md:px-8 md:pt-8">
        <span aria-hidden className="mb-4 inline-block h-1 w-10 rounded-pill bg-accent" />
        <Heading level={3} size={4} className="text-primary">
          {group.title}
        </Heading>
        {group.intro ? (
          <Paragraph measure={false} className="mt-2 max-w-prose text-base text-ink-muted">
            {group.intro}
          </Paragraph>
        ) : null}
      </div>

      <ScrollRegion label={`${group.title} rates`}>
        <table className="w-full min-w-[52rem] border-collapse">
          <caption className="sr-only">{group.title} — services and rates</caption>
          <thead>
            <tr>
              <th scope="col" className={`${TH_COL} w-[38%]`}>
                Service
              </th>
              <th scope="col" className={TH_COL}>
                Charged
              </th>
              {group.columns.map((c) => (
                <th key={c} scope="col" className={`${TH_COL} whitespace-pre-line`}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {group.rows.map((row) => (
              <tr key={row.label} className="last:[&>*]:border-b-0">
                <th scope="row" className={`${TD} font-semibold text-ink`}>
                  {row.label}
                  {row.bullets?.length ? (
                    <ul className="mt-1.5 space-y-1 font-body text-sm font-regular text-ink-muted">
                      {row.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span aria-hidden className="text-accent">
                            ·
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </th>
                <td className={`${TD} whitespace-nowrap text-ink-muted`}>{row.unit ?? "—"}</td>
                {row.note ? (
                  <td className={`${TD} text-ink-muted`} colSpan={group.columns.length}>
                    {row.note}
                  </td>
                ) : (
                  (row.values ?? []).map((v, i) => (
                    <td
                      key={group.columns[i] ?? i}
                      className={`${TD} whitespace-nowrap ${
                        v === "—" ? "text-ink-muted" : "font-semibold text-ink"
                      }`}
                    >
                      {v}
                    </td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollRegion>

      {group.footnotes?.length ? (
        <ul className="space-y-2 border-t-hair border-divider px-6 py-5 md:px-8">
          {group.footnotes.map((f) => (
            <li key={f} className="font-body text-sm text-ink-muted">
              {f}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function SimpleTable({ table }: { table: DataTable }) {
  return (
    <section className="overflow-hidden rounded-xl border-hair border-divider bg-surface-raised shadow-1">
      {table.caption ? (
        <div className="px-6 pb-4 pt-6 md:px-8">
          <Heading level={3} size={5} className="text-primary">
            {table.caption}
          </Heading>
        </div>
      ) : null}
      <ScrollRegion label={table.caption ?? "Contribution rates"}>
        <table className="w-full min-w-[44rem] border-collapse">
          {table.caption ? <caption className="sr-only">{table.caption}</caption> : null}
          <thead>
            <tr>
              <th scope="col" className={`${TH_COL} w-[34%]`}>
                Your situation
              </th>
              {table.columns.map((c) => (
                <th key={c} scope="col" className={TH_COL}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.header} className="last:[&>*]:border-b-0">
                <th scope="row" className={`${TD} font-semibold text-ink`}>
                  {row.header}
                </th>
                {row.cells.map((cell, i) => (
                  <td
                    key={table.columns[i] ?? i}
                    className={`${TD} ${
                      // A bare rate ("0%", "17.5%", "0–25%") stays on one line and reads as
                      // the answer; anything longer is explanatory prose and must wrap, or
                      // the table blows out far wider than the page.
                      BARE_RATE.test(cell)
                        ? "whitespace-nowrap font-semibold text-ink"
                        : "min-w-[16rem] text-ink-muted"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollRegion>
    </section>
  );
}
