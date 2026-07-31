import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n";
import type { Block, Locale } from "@/types/content";

/** Renders dashboard rich-text HTML, or plain text as a paragraph. */
function Body({ html }: { html: string }) {
  if (!html) return null;
  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(html);
  return (
    <div
      className="prose-content leading-relaxed text-ink"
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
        <section>
          <p className="text-lg leading-relaxed text-ink">
            {pick(block.body, locale)}
          </p>
          {block.attribution && (
            <p className="mt-2 text-sm text-muted">
              {pick(block.attribution, locale)}
            </p>
          )}
        </section>
      );

    case "stat":
      return (
        <section className="space-y-2">
          {heading && <h2 className="section-heading">{heading}</h2>}
          {(block.items ?? []).map((item, i) => (
            <p key={i} className="text-ink">
              <span className="font-semibold">{pick(item.value, locale)}</span>{" "}
              <span className="text-muted">{pick(item.label, locale)}</span>
            </p>
          ))}
        </section>
      );

    case "cards":
      return (
        <section className="space-y-6">
          {heading && <h2 className="section-heading">{heading}</h2>}
          <div className="space-y-5">
            {(block.items ?? []).map((item, i) => {
              const title = pick(item.title, locale);
              const body = pick(item.body, locale);
              return (
                <div key={i}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="font-semibold text-accent hover:text-accent-dark"
                    >
                      {title}
                    </Link>
                  ) : (
                    <p className="font-semibold text-ink">{title}</p>
                  )}
                  {body && (
                    <p className="mt-1 leading-relaxed text-muted">{body}</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      );

    case "image":
      return block.image ? (
        <figure>
          <div className="relative aspect-[3/2] w-full overflow-hidden">
            <Image
              src={block.image}
              alt={pick(block.caption, locale) || heading}
              fill
              className="object-cover"
              sizes="(max-width: 700px) 100vw, 672px"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-2 text-sm text-muted">
              {pick(block.caption, locale)}
            </figcaption>
          )}
        </figure>
      ) : null;

    case "text":
    default:
      return (
        <section className="space-y-3">
          {heading && <h2 className="section-heading">{heading}</h2>}
          <Body html={pick(block.body, locale)} />
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
    <div className="mt-10 space-y-10">
      {blocks.map((b) => (
        <BlockView key={b.id} block={b} locale={locale} />
      ))}
    </div>
  );
}
