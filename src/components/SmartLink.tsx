import type { AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/**
 * One link component for every href in the content files:
 * "/path" and "#section" go through the router (so "#work" works from any page),
 * everything else is a plain anchor.
 */
const SmartLink = ({ href, children, ...rest }: Props) => {
  if (href.startsWith('#')) {
    return <Link to={{ pathname: '/', hash: href }} {...rest}>{children}</Link>;
  }
  if (href.startsWith('/')) {
    return <Link to={href} {...rest}>{children}</Link>;
  }
  return <a href={href} {...rest}>{children}</a>;
};

export default SmartLink;
