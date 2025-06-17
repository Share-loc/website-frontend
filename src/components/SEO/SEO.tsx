import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalUrl?: string;
}

const SEO = ({
  title,
  description,
  keywords,
  ogImage = 'https://shareloc.com/og-image.png',
  ogType = 'website',
  canonicalUrl,
}: SEOProps) => {
  const siteUrl = 'https://shareloc.com';
  const fullTitle = `${title} | ShareLoc - Location de biens entre particuliers`;

  return (
    <Helmet>
      {/* Balises meta de base */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={`${siteUrl}${canonicalUrl}`} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {canonicalUrl && <meta property="og:url" content={`${siteUrl}${canonicalUrl}`} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Balises supplémentaires */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="French" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="ShareLoc" />
    </Helmet>
  );
};

export default SEO; 