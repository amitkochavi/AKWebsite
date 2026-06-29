"use client";

export type SaveState = "idle" | "saving" | "saved" | "error";

export function SaveBar({
  state,
  error,
  onSave,
  extra,
}: {
  state: SaveState;
  error?: string | null;
  onSave: () => void;
  extra?: React.ReactNode;
}) {
  return (
    <div className="sticky bottom-0 z-10 mt-8 flex items-center gap-4 border-t border-line bg-cream/95 py-4 backdrop-blur">
      <button
        type="button"
        onClick={onSave}
        disabled={state === "saving"}
        className="rounded bg-ink px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-soft disabled:opacity-60"
      >
        {state === "saving" ? "Saving…" : "Save changes"}
      </button>
      {state === "saved" && (
        <span className="text-sm font-medium text-green-700">Saved ✓</span>
      )}
      {state === "error" && (
        <span className="text-sm font-medium text-red-700">
          {error || "Save failed"}
        </span>
      )}
      <div className="ms-auto">{extra}</div>
    </div>
  );
}
