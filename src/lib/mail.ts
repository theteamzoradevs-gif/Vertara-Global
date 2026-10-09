import nodemailer from "nodemailer";

export type OutboundMail = {
  to: string;
  subject: string;
  text: string;
};

export type MailResult =
  | { ok: true }
  | { ok: false; error: string };

function smtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASSWORD?.trim();
  const from = process.env.SMTP_FROM?.trim() || user;
  const founder = process.env.FOUNDER_EMAIL?.trim() || process.env.ADMIN_EMAIL?.trim();
  return { host, port, user, pass, from, founder };
}

export function founderInbox() {
  return smtpConfig().founder || "";
}

export function smtpConfigured() {
  const { host, port, user, pass, from } = smtpConfig();
  return Boolean(host && from && user && pass && Number.isFinite(port));
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

export async function sendFounderEmail(mail: { subject: string; text: string }): Promise<MailResult> {
  const to = founderInbox();
  if (!to) {
    const error = "SMTP is not configured. Set SMTP_HOST, SMTP_FROM, SMTP_USER, SMTP_PASSWORD, and FOUNDER_EMAIL or ADMIN_EMAIL.";
    console.error("[mail]", error);
    return { ok: false, error };
  }
  return sendEmail({ to, subject: mail.subject, text: mail.text });
}
