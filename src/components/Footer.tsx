import { Link } from 'react-router-dom';
import { site } from '../content/site';

interface Props {
  /** Right-hand label; the home footer shows the colophon and a back-to-top link instead */
  label?: string;
}

const Footer = ({ label }: Props) => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-muted-dark">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-6 font-mono text-xs">
        <span>© {year} {site.owner}{label ? '' : ` · ${site.footer.place}`}</span>
        {label ? <span>{label}</span> : (
          <>
            <span>{site.footer.colophon}</span>
            <Link to={{ pathname: '/', hash: '#top' }} className="link-on-dark inline-flex min-h-11 items-center text-on-dark no-underline hover:text-signal">
              {site.footer.backToTop}
            </Link>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
