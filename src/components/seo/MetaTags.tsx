import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title: string;
  description?: string;
  image?: string;
}

const SITE_NAME = 'LearnCraft';
const DEFAULT_DESCRIPTION =
  'Aprende como se hace en producción. Los patrones, decisiones y flujos de trabajo que usan los ingenieros senior en Stripe, Vercel y Shopify.';

export function MetaTags({ title, description, image }: MetaTagsProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const desc = description ?? DEFAULT_DESCRIPTION;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
}
