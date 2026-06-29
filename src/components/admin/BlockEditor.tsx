"use client";

import type { Block, BlockItem, BlockType, Localized } from "@/types/content";
import { BilingualField } from "./BilingualField";
import { BilingualRichText } from "./RichText";
import { ImageUploader } from "./ImageUploader";

const EMPTY: Localized = { en: "", he: "" };

const TYPES: { type: BlockType; label: string }[] = [
  { type: "text", label: "Text" },
  { type: "cards", label: "Cards" },
  { type: "stat", label: "Statistics" },
  { type: "quote", label: "Quote" },
  { type: "image", label: "Image" },
];

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `b-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function newBlock(type: BlockType): Block {
  return {
    id: uid(),
    type,
    heading: { ...EMPTY },
    body: { ...EMPTY },
    items: type === "stat" || type === "cards" ? [] : undefined,
  };
}

function ItemEditor({
  type,
  item,
  onChange,
  onRemove,
}: {
  type: BlockType;
  item: BlockItem;
  onChange: (next: BlockItem) => void;
  onRemove: () => void;
}) {
  return (
    <div className="space-y-3 rounded-lg border border-line bg-cream/60 p-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onRemove}
          className="text-xs font-medium text-red-700 hover:underline"
        >
          Remove
        </button>
      </div>
      {type === "stat" ? (
        <>
          <BilingualField
            label="Value"
            value={item.value}
            onChange={(value) => onChange({ ...item, value })}
          />
          <BilingualField
            label="Label"
            value={item.label}
            onChange={(label) => onChange({ ...item, label })}
          />
        </>
      ) : (
        <>
          <BilingualField
            label="Title"
            value={item.title}
            onChange={(title) => onChange({ ...item, title })}
          />
          <BilingualField
            label="Body"
            multiline
            value={item.body}
            onChange={(body) => onChange({ ...item, body })}
          />
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">
              Link (optional, e.g. /business)
            </label>
            <input
              value={item.href ?? ""}
              onChange={(e) => onChange({ ...item, href: e.target.value })}
              className="w-full rounded border border-line bg-white px-3 py-2 text-sm"
            />
          </div>
        </>
      )}
    </div>
  );
}

function SingleBlock({
  block,
  onChange,
  onRemove,
  onMove,
  isFirst,
  isLast,
}: {
  block: Block;
  onChange: (next: Block) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const items = block.items ?? [];
  const updateItem = (i: number, next: BlockItem) =>
    onChange({ ...block, items: items.map((it, j) => (j === i ? next : it)) });

  return (
    <div className="space-y-4 rounded-xl border border-line bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="rounded bg-ink px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {block.type}
        </span>
        <div className="flex items-center gap-2 text-sm">
          <button
            type="button"
            disabled={isFirst}
            onClick={() => onMove(-1)}
            className="rounded px-2 py-1 hover:bg-cream disabled:opacity-30"
          >
            ↑
          </button>
          <button
            type="button"
            disabled={isLast}
            onClick={() => onMove(1)}
            className="rounded px-2 py-1 hover:bg-cream disabled:opacity-30"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="font-medium text-red-700 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>

      {block.type !== "quote" && block.type !== "image" && (
        <BilingualField
          label="Heading"
          value={block.heading}
          onChange={(heading) => onChange({ ...block, heading })}
        />
      )}

      {block.type === "text" && (
        <BilingualRichText
          label="Body"
          value={block.body}
          onChange={(body) => onChange({ ...block, body })}
        />
      )}

      {block.type === "quote" && (
        <>
          <BilingualField
            label="Quote"
            multiline
            value={block.body}
            onChange={(body) => onChange({ ...block, body })}
          />
          <BilingualField
            label="Attribution"
            value={block.attribution}
            onChange={(attribution) => onChange({ ...block, attribution })}
          />
        </>
      )}

      {block.type === "image" && (
        <>
          <ImageUploader
            label="Image"
            value={block.image}
            onChange={(image) => onChange({ ...block, image })}
          />
          <BilingualField
            label="Caption"
            value={block.caption}
            onChange={(caption) => onChange({ ...block, caption })}
          />
        </>
      )}

      {(block.type === "stat" || block.type === "cards") && (
        <div className="space-y-3">
          {items.map((it, i) => (
            <ItemEditor
              key={i}
              type={block.type}
              item={it}
              onChange={(next) => updateItem(i, next)}
              onRemove={() =>
                onChange({
                  ...block,
                  items: items.filter((_, j) => j !== i),
                })
              }
            />
          ))}
          <button
            type="button"
            onClick={() =>
              onChange({ ...block, items: [...items, { title: { ...EMPTY } }] })
            }
            className="rounded border border-dashed border-line px-3 py-2 text-sm font-medium text-ink hover:bg-cream"
          >
            + Add item
          </button>
        </div>
      )}
    </div>
  );
}

export function BlockEditor({
  blocks,
  onChange,
}: {
  blocks: Block[];
  onChange: (next: Block[]) => void;
}) {
  const update = (i: number, next: Block) =>
    onChange(blocks.map((b, j) => (j === i ? next : b)));

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    const copy = [...blocks];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  };

  return (
    <div className="space-y-4">
      {blocks.map((b, i) => (
        <SingleBlock
          key={b.id}
          block={b}
          isFirst={i === 0}
          isLast={i === blocks.length - 1}
          onChange={(next) => update(i, next)}
          onRemove={() => onChange(blocks.filter((_, j) => j !== i))}
          onMove={(dir) => move(i, dir)}
        />
      ))}

      <div className="flex flex-wrap gap-2 rounded-xl border border-dashed border-line p-4">
        <span className="self-center text-sm font-medium text-muted">
          Add block:
        </span>
        {TYPES.map((t) => (
          <button
            key={t.type}
            type="button"
            onClick={() => onChange([...blocks, newBlock(t.type)])}
            className="rounded border border-line bg-white px-3 py-1.5 text-sm font-medium text-ink hover:bg-cream"
          >
            + {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
