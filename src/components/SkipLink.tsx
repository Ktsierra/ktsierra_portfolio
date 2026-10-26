import { site } from '../content/site';

const SkipLink = () => (
  <a
    href="#main"
    className="btn btn-primary fixed top-2 left-2 z-50 min-h-11 -translate-y-[200%] px-4 text-[15px] focus:translate-y-0"
  >
    {site.header.skipLink}
  </a>
);

export default SkipLink;
