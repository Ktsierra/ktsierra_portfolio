import { useEffect, useId, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { site } from '../content/site';
import SmartLink from './SmartLink';
import { ArrowLeft, CloseIcon, Download, MenuIcon } from './icons';

const navLinkClass =
  'inline-flex min-h-11 items-center px-3 text-[15px] font-medium no-underline transition-colors duration-150 hover:text-signal-ink';

const Mark = () => (
  <span className="inline-flex size-9 shrink-0 items-center justify-center bg-ink font-mono text-[13px] font-semibold tracking-[0.02em] text-paper">
    {site.header.mark}
  </span>
);

interface Props {
  /** Case-study header: "← All work" on the left and a page label on the right, no nav */
  backLabel?: string;
  pageLabel?: string;
}

const Header = ({ backLabel, pageLabel }: Props) => {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const location = useLocation();

  // Close the menu on navigation
  useEffect(() => { setOpen(false); }, [location.key]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    // The panel is hidden above the nav breakpoint, so don't leave it "open" there
    const mq = window.matchMedia('(min-width: 45rem)');
    const onMq = () => { if (mq.matches) setOpen(false); };
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  const { header, links } = site;

  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-paper">
      <div className="wrap flex min-h-[72px] items-center justify-between gap-x-4 gap-y-3 nav:gap-x-8">
        {backLabel ? (
          <Link to="/" className="inline-flex min-h-11 items-center gap-3 no-underline">
            <Mark />
            <span className="inline-flex items-center gap-2 text-[15px] font-semibold">
              <ArrowLeft />
              {backLabel}
            </span>
          </Link>
        ) : (
          <Link to={{ pathname: '/', hash: '#top' }} className="flex min-h-11 items-center gap-3 no-underline">
            <Mark />
            <span className="flex flex-col leading-[1.15]">
              <span className="text-base font-bold [font-stretch:112%]">{site.owner}</span>
              <span className="font-mono text-[11px] tracking-[0.08em] whitespace-nowrap text-muted uppercase">{header.tagline}</span>
            </span>
          </Link>
        )}

        {pageLabel ? (
          <span className="label text-muted">{pageLabel}</span>
        ) : (
          <>
            <nav aria-label="Primary" className="hidden flex-wrap items-center gap-1 nav:flex">
              {header.nav.map((l) => (
                <SmartLink key={l.href} href={l.href} className={navLinkClass}>{l.label}</SmartLink>
              ))}
              <a href={links.resume} className="btn btn-secondary ml-2 min-h-11 gap-2 px-4 text-[15px]">
                <Download />
                {header.resumeLabel}
              </a>
            </nav>

            <button
              type="button"
              className="btn btn-secondary min-h-11 gap-1.5 px-3 text-[15px] nav:hidden"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => { setOpen((v) => !v); }}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
              {open ? header.closeLabel : header.menuLabel}
            </button>
          </>
        )}
      </div>

      {!pageLabel && (
        <div
          id={panelId}
          hidden={!open}
          className="absolute inset-x-0 top-full border-b-[1.5px] border-ink bg-paper nav:hidden"
        >
          <nav aria-label="Primary mobile" className="wrap flex flex-col pb-4">
            {header.nav.map((l) => (
              <SmartLink
                key={l.href}
                href={l.href}
                className="flex min-h-14 items-center border-b border-rule text-[17px] font-medium no-underline hover:text-signal-ink"
                onClick={() => { setOpen(false); }}
              >
                {l.label}
              </SmartLink>
            ))}
            <a
              href={links.resume}
              className="btn btn-secondary mt-4 min-h-14 w-full justify-center gap-2 text-[16px]"
              onClick={() => { setOpen(false); }}
            >
              <Download />
              {header.resumeLabel}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
