import { site } from '../content/site';
import Button from '../components/Button';
import { ArrowLeft } from '../components/icons';

const NotFound = () => {
  const { notFound } = site;
  return (
    <>
      <title>{notFound.pageTitle}</title>
      <meta name="robots" content="noindex" />
      <section aria-labelledby="nf-title" className="dot-grid border-b-[1.5px] border-ink">
        <div className="wrap flex flex-col items-start gap-7 py-[clamp(72px,12vw,160px)]">
          <span className="label text-signal-ink">{notFound.label}</span>
          <h1 id="nf-title" className="h2 max-w-[14em]">{notFound.title}</h1>
          <p className="m-0 text-lg text-ink-2">{notFound.body}</p>
          <Button href="/">
            <ArrowLeft />
            {notFound.cta}
          </Button>
        </div>
      </section>
    </>
  );
};

export default NotFound;
