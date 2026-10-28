import nodemailer from "nodemailer";

export type OutboundMail = {
  to: string;
  subject: string;
  text: string;
};

export type MailResult =
  | { ok: true }
  | { ok: false; error: string };

function siteOrigin() {
  return (process.env.AUTH_URL || "https://vertaraglobal.com").replace(/\/$/, "");
}

function smtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASSWORD?.trim();
  const from = process.env.SMTP_FROM?.trim() || user;
  const founder =
    process.env.LEAD_NOTIFICATION_EMAIL?.trim() ||
    process.env.FOUNDER_EMAIL?.trim() ||
    process.env.ADMIN_EMAIL?.trim() ||
    "Namitg@vertaraglobal.com";
  return { host, port, user, pass, from, founder };
}

export function founderInbox() {
  return smtpConfig().founder || "Namitg@vertaraglobal.com";
}

export function smtpConfigured() {
  const { host, port, user, pass, from } = smtpConfig();
  return Boolean(host && from && user && pass && Number.isFinite(port));
}

export async function sendViaFormSubmit(options: {
  to: string;
  subject: string;
  text?: string;
  replyTo?: string;
  fields?: Record<string, unknown>;
}): Promise<MailResult> {
  const to = options.to.trim();
  if (!to) {
    return { ok: false, error: "Recipient email is missing." };
  }

  try {
    const origin = siteOrigin();
    const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(to)}`;

    const payload: Record<string, unknown> = {
      _subject: options.subject,
      _template: "table",
      _captcha: "false",
      ...(options.replyTo ? { _replyto: options.replyTo } : {}),
      ...(options.fields || {}),
    };

    if (options.text && (!options.fields || Object.keys(options.fields).length === 0)) {
      payload.Message = options.text;
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: origin,
        Origin: origin,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    // Handle normal success
    if (response.ok && (data.success === "true" || data.success === true || data.ok)) {
      return { ok: true };
    }

    // Handle initial one-time activation response
    if (
      data.message &&
      typeof data.message === "string" &&
      (data.message.toLowerCase().includes("activation") ||
        data.message.toLowerCase().includes("activate"))
    ) {
      return { ok: true };
    }

    if (!response.ok) {
      const errorMsg =
        typeof data.message === "string"
          ? data.message
          : `FormSubmit returned HTTP status ${response.status}`;
      console.warn("[mail/formsubmit] notice:", errorMsg);
      return { ok: false, error: errorMsg };
    }

    return { ok: true };
  } catch (err) {
    const error = err instanceof Error ? err.message : "FormSubmit dispatch error";
    console.error("[mail/formsubmit] exception:", error);
    return { ok: false, error };
  }
}

export async function sendEmail(mail: OutboundMail): Promise<MailResult> {
  const { host, port, user, pass, from } = smtpConfig();
  if (!host || !from) {
    const error = "SMTP is not configured. Set SMTP_HOST, SMTP_FROM, SMTP_USER, SMTP_PASSWORD, and FOUNDER_EMAIL or ADMIN_EMAIL.";
    console.error("[mail]", error);
    return { ok: false, error };
  }
  if (!user || !pass) {
    const error = "SMTP_USER and SMTP_PASSWORD are required.";
    console.error("[mail]", error);
    return { ok: false, error };
  }
  if (!mail.to.trim()) {
    const error = "Email recipient is missing.";
    console.error("[mail]", error);
    return { ok: false, error };
  }

  try {
    const transport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
    await transport.sendMail({
      from,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
    });
    return { ok: true };
  } catch (err) {
    const error = err instanceof Error ? err.message : "Email send failed.";
    console.error("[mail] send failed:", error);
    return { ok: false, error };
  }
}

export async function sendFounderEmail(mail: {
  subject: string;
  text: string;
  replyTo?: string;
  fields?: Record<string, unknown>;
}): Promise<MailResult> {
  const to = founderInbox();
  if (!to) {
    const error = "Notification email recipient is not configured.";
    console.error("[mail]", error);
    return { ok: false, error };
  }

  // 1. If SMTP is fully configured, try SMTP first
  if (smtpConfigured()) {
    const smtpRes = await sendEmail({ to, subject: mail.subject, text: mail.text });
    if (smtpRes.ok) return smtpRes;
    console.warn("[mail] Direct SMTP failed, falling back to FormSubmit:", smtpRes.error);
  }

  // 2. Primary / Fallback delivery via FormSubmit
  return sendViaFormSubmit({
    to,
    subject: mail.subject,
    text: mail.text,
    replyTo: mail.replyTo,
    fields: mail.fields,
  });
}
