"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          locale,
        }),
      });
      if (!res.ok) throw new Error();
      formEl.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded border border-line bg-white px-3 py-2.5 text-base text-ink focus:border-brand";

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          {t("name")}
        </label>
        <input id="name" name="name" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-soft disabled:opacity-60"
      >
        {status === "sending" ? t("sending") : t("send")}
      </button>
      {status === "success" && (
        <p className="text-sm font-medium text-green-700">{t("success")}</p>
      )}
      {status === "error" && (
        <p className="text-sm font-medium text-red-700">{t("error")}</p>
      )}
    </form>
  );
}
