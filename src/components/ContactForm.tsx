import { useId, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import { site } from '../content/site';
import { sendEmail } from '../lib/emailjs';
import { ArrowRight } from './icons';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const field =
  'w-full border-[1.5px] border-ink bg-paper px-4 font-sans text-base text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-70';
const label = 'label mb-2 block';

const read = (formEl: HTMLFormElement) => {
  const data = new FormData(formEl);
  const get = (k: string) => {
    const v = data.get(k);
    return typeof v === 'string' ? v.trim() : '';
  };
  return { name: get('name'), email: get('email'), message: get('message'), honeypot: get('company') };
};

const ContactForm = () => {
  const { form } = site.contact;
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  // When EmailJS fails, the message moves to a prefilled mailto so it isn't lost
  const mailto = () => {
    if (!formRef.current) return site.links.mailto;
    const { name, email, message } = read(formRef.current);
    const subject = `${form.mailSubject} ${name}`;
    const body = `${message}\n\n${name} · ${email}`;
    return `${site.links.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Rebuild the link from the fields as they are now, in case the visitor edited them after the error
  const openFallback = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.href = mailto();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const el = e.currentTarget;
    const { name, email, message, honeypot } = read(el);
    // Honeypot: people never see this field, bots fill it in
    if (honeypot) {
      setStatus('sent');
      return;
    }
    setStatus('sending');
    sendEmail({
      from_name: name,
      from_email: email,
      message,
      to_name: site.owner,
      to_email: site.links.email,
    })
      .then(() => {
        setStatus('sent');
        // Fields are locked while sending, so this can't erase anything typed after submit
        el.reset();
      })
      .catch(() => { setStatus('error'); });
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      aria-labelledby={`${id}-title`}
      className="flex w-full max-w-[560px] flex-col gap-5 border-[1.5px] border-ink bg-panel p-[clamp(20px,3vw,32px)]"
    >
      <h3 id={`${id}-title`} className="label m-0">{form.title}</h3>

      <fieldset disabled={status === 'sending'} className="m-0 flex min-w-0 flex-col gap-5 border-0 p-0">
        <div>
          <label htmlFor={`${id}-name`} className={label}>{form.name}</label>
          <input id={`${id}-name`} name="name" type="text" autoComplete="name" required maxLength={120} className={`${field} min-h-12`} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={label}>{form.email}</label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={200} className={`${field} min-h-12`} />
        </div>
        <div>
          <label htmlFor={`${id}-message`} className={label}>{form.message}</label>
          <textarea id={`${id}-message`} name="message" required rows={4} maxLength={5000} className={`${field} resize-y py-3 leading-[1.5]`} />
        </div>
        <div aria-hidden="true" className="sr-only">
          <label htmlFor={`${id}-company`}>Company</label>
          <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn min-h-12 cursor-pointer gap-2.5 border-[1.5px] border-ink bg-ink px-6 text-base text-paper hover:bg-paper hover:text-ink disabled:cursor-wait disabled:opacity-70"
        >
          {status === 'sending' ? form.sending : form.submit}
          <ArrowRight />
        </button>
        <p role="status" aria-live="polite" className="m-0 text-[15px] font-medium">
          {status === 'sent' && form.sent}
          {status === 'error' && (
            <>
              {form.error}{' '}
              <a href={mailto()} onClick={openFallback} className="link link-on-signal underline-offset-4">{form.errorLink}</a>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
