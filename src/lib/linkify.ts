const URL_RE = /(https?:\/\/[^\s<>"')]+)/g;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Turn bare http(s) URLs in body content into clickable links. Existing <a>
 * anchors are left untouched (never double-wrapped), and URLs inside HTML tags
 * / attributes are never rewritten. Accepts either an HTML string or plain
 * text (plain text is escaped and wrapped in a paragraph first).
 */
export function linkifyBody(input: string, looksLikeHtml: boolean): string {
  const html = looksLikeHtml ? input : `<p>${escapeHtml(input)}</p>`;

  // Split out existing anchors so we do not re-link them.
  const parts = html.split(/(<a\b[^>]*>[\s\S]*?<\/a>)/gi);
  return parts
    .map((part) => {
      if (/^<a\b/i.test(part)) return part;
      // Within the rest, linkify text nodes only, never the contents of a tag.
      return part.replace(/(<[^>]+>)|([^<]+)/g, (_m, tag, text) => {
        if (tag) return tag as string;
        return (text as string).replace(URL_RE, (u) => {
          // Keep trailing sentence punctuation out of the link.
          const trailing = u.match(/[.,;:!?)]+$/)?.[0] ?? "";
          const href = u.slice(0, u.length - trailing.length);
          return `<a href="${href}" target="_blank" rel="noopener noreferrer">${href}</a>${trailing}`;
        });
      });
    })
    .join("");
}
