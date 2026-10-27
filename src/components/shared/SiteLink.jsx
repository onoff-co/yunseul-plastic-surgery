import { toSiteUrl } from '../../app/paths.mjs';

export default function SiteLink({ href, ...props }) {
  return <a {...props} href={toSiteUrl(href)} />;
}
