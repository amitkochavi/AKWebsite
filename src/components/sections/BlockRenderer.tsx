import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n";
import type { Block, Locale } from "@/types/content";
import { Container } from "../ui/Container";

/** Renders the HTML body produced by the dashboard rich-text editor, or plain
 * text as a paragraph when no markup is present. */
function Body({ html }: { html: string }) {
  if (!html) return null;
  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(html);
  return (
    <div
      className="prose-content max-w-2xl text-base leading-relaxed text-muted"
      {...(looksLikeHtml
        ? { dangerouslySetInnerHTML: { __html: html } }
        : { children: <p>{html}</p> })}
    />
  );
}

function BlockView({ block, locale }: { block: Block; locale: Locale }) {
  const heading = pick(block.heading, locale);

  switch (block.type) {
    case "quote":
      return (
        <section className="py-12">
          <Container>
            <blockquote className="border-s-4 border-gold ps-6">
              <p className="font-serif text-2xl leading-snug text-navy sm:text-3xl">
                “{pick(block.body, locale)}”
              </p>
              {block.attribution && (
                <footer className="mt-4 text-sm font-semibold uppercase tracking-wider text-muted">
                  — {pick(block.attribution, locale)}
                </footer>
              )}
            </blockquote>
          </Container>
        </section>
      );

    case "stat":
      return (
        <section className="py-12">
          <Container>
            <div className="grid gap-8 sm:grid-cols-3">
              {(block.items ?? []).map((item, i) => (
                <div key={i} className="border-t-2 border-gold pt-4">
                  <p className="font-serif text-4xl font-bold text-navy">
                    {pick(item.value, locale)}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {pick(item.label, locale)}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      );

    case "cards":
      return (
        <section className="bg-sand py-16">
          <Container>
            {heading && (
              <h2 className="mb-8 text-2xl font-bold sm:text-3xl">{heading}</h2>
            )}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(block.items ?? []).map((item, i) => {
                const inner = (
                  <>
                    <h3 className="text-lg font-bold text-navy">
                      {pick(item.title, locale)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {pick(item.body, locale)}
                    </p>
                  </>
                );
                return item.href ? (
                  <Link
                    key={i}
                    href={item.href}
                    className="group block rounded-lg border border-line bg-white p-6 transition-shadow hover:shadow-md"
                  >
                    {inner}
                    <span className="mt-4 inline-block text-sm font-semibold text-gold-dark group-hover:underline">
                      →
                    </span>
                  </Link>
                ) : (
                  <div
                    key={i}
                    className="rounded-lg border border-line bg-white p-6"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      );

    case "image":
      return block.image ? (
        <section className="py-12">
          <Container>
            <figure>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                <Image
                  src={block.image}
                  alt={pick(block.caption, locale) || heading}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
              {block.caption && (
                <figcaption className="mt-2 text-sm text-muted">
                  {pick(block.caption, locale)}
                </figcaption>
              )}
            </figure>
          </Container>
        </section>
      ) : null;

    case "text":
    default:
      return (
        <section className="py-12">
          <Container>
            {heading && (
              <h2 className="mb-4 text-2xl font-bold sm:text-3xl">{heading}</h2>
            )}
            <Body html={pick(block.body, locale)} />
          </Container>
        </section>
      );
  }
}

export function BlockRenderer({
  blocks,
  locale,
}: {
  blocks: Block[];
  locale: Locale;
}) {
  return (
    <>
      {blocks.map((b) => (
        <BlockView key={b.id} block={b} locale={locale} />
      ))}
    </>
  );
}
