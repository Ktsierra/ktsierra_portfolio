const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/** The contact form only renders when the EmailJS keys were present at build time */
export const emailjsEnabled = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

/** EmailJS REST endpoint: the same call @emailjs/browser makes, without shipping the library */
export const sendEmail = async (params: Record<string, string>) => {
  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ service_id: SERVICE_ID, template_id: TEMPLATE_ID, user_id: PUBLIC_KEY, template_params: params }),
  });
  if (!res.ok) throw new Error(`EmailJS ${String(res.status)}`);
};
