# 23 — CMS Editor Guide (for GOCSA staff)

_A plain-language guide for the people who keep the website up to date. No technical
knowledge needed. (The CMS admin itself arrives with the `apps/web` bring-up — see the
status note at the end; the workflow below is what you'll do.)_

## Logging in

1. Go to the admin address your administrator gives you (it ends in `/admin`).
2. Enter your email and password. If you have two-factor set up, enter the code from
   your authenticator app.
3. If you forget your password, use **Forgot password** — you'll get a secure link by
   email that expires shortly.

## Your role and what you can do

The site knows who you are and only lets you do what your role allows. For example an
**Editor** can write and change drafts; **publishing** care information (services,
funding, prices, policies) is done by a **Community Care Manager**. If a button isn't
available to you, that's by design.

## Creating a draft

1. Pick the type of content on the left (e.g. **Services**, **News**).
2. Click **Create new**.
3. Fill in the fields. Each field has a short note explaining what it's for.
4. Your work saves automatically as a **draft** — nothing is public yet.

## Editing English content

Type into the fields as normal. English is the main language.

## Editing Greek content

Use the **language switch** at the top to change to **Ελληνικά (Greek)**. The same
fields appear for Greek. A clear indicator shows which fields still need a Greek
translation — please don't leave those blank, and don't rely on the site to "fill in"
Greek from English (it will show English as a temporary fallback, but that's not a real
translation).

## Uploading accessible media

1. Open **Media** and click **Upload**.
2. **Alt text is required** — write a short description of the image for people using a
   screen reader (or tick **Decorative** if the image is purely decorative).
3. If the photo shows a recognisable person, tick **Consent on file** only once consent
   has actually been recorded.
4. Use real GOCSA photos — not generic stock images.

## Submitting content for review

When your draft is ready, change its status to **In review**. A reviewer will look at it.

## The approval flow

- **In review** → a **Reviewer** can **Request changes** (it comes back to you) or **Approve**.
- **Approved** → an authorised manager can **Publish**.
- You can't skip steps — e.g. a draft can't jump straight to published.

## Approving content

If you're a Reviewer/Approver: open the item, check it's accurate (especially care and
funding details), then **Approve** — or **Request changes** with a note.

## Publishing

A Community Care Manager (care content) or Marketing Manager (news/events) publishes
approved content. You can also **schedule** a publish time — but only for content that's
already approved.

## Previewing before publishing

Use **Preview** to see exactly how the page will look — on desktop and mobile, in English
and Greek — before it goes live.

## Restoring a previous version

Every change is saved. Open the **Versions** history, find the one you want, and
**Restore** it. Nothing is lost.

## Archiving content

To take something off the site without deleting it, set its status to **Archived**. It
stays in the system (and its address redirects), and can be restored later.

## A note on safety

- Destructive actions ask you to confirm first.
- You won't see technical settings, passwords, or system configuration — those are hidden
  from normal editors.
- If something looks wrong, ask your administrator; nothing you do in a draft affects the
  live site until it's published.

---

_Status: the workflow, roles, and rules above are implemented and tested in `@gocsa/cms`.
The visual admin they run inside is delivered with the `apps/web` bring-up (docs/06
DEC-026), which requires a running database._
