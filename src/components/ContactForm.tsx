import { useId, useState, type FormEvent } from 'react';
import { site } from '../content/site';
import { sendEmail } from '../lib/emailjs';
import { ArrowRight } from './icons';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const field =
  'w-full border-[1.5px] border-ink bg-paper px-4 font-sans text-base text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink';
const label = 'label mb-2 block';

const ContactForm = () => {
  const { form } = site.contact;
  const id = useId();
  const [status, setStatus] = useState<Status>('idle');
  // When EmailJS fails, the visitor's message moves to a prefilled mailto so it isn't lost
  const [fallback, setFallback] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const el = e.currentTarget;
    const data = new FormData(el);
    const get = (k: string) => {
      const v = data.get(k);
      return typeof v === 'string' ? v.trim() : '';
    };
    // Honeypot: people never see this field, bots fill it in
    if (get('company')) {
      setStatus('sent');
      return;
    }
    setStatus('sending');
    const subject = `${form.mailSubject} ${get('name')}`;
    const body = `${get('message')}\n\n${get('name')} · ${get('email')}`;
    setFallback(`${site.links.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    sendEmail({
      from_name: get('name'),
      from_email: get('email'),
      message: get('message'),
      to_name: site.owner,
      to_email: site.links.email,
    })
      .then(() => {
        setStatus('sent');
        el.reset();
      })
      .catch(() => { setStatus('error'); });
  };

  return (
    <form onSubmit={onSubmit} aria-labelledby={`${id}-title`} className="flex w-full max-w-[560px] flex-col gap-5 border-[1.5px] border-ink bg-panel p-[clamp(20px,3vw,32px)]">
      <h3 id={`${id}-title`} className="label m-0">{form.title}</h3>

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
              <a href={fallback} className="link link-on-signal underline-offset-4">{form.errorLink}</a>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
