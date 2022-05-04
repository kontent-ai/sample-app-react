import React from 'react';
import { Helmet } from 'react-helmet';
import { Elements } from '@kentico/kontent-delivery';

interface MetaDataProps {
  title?: Elements.TextElement;
  description?: Elements.TextElement;
  ogTitle?: Elements.TextElement;
  ogDescription?: Elements.TextElement;
  ogImage?: Elements.AssetsElement;
  twitterTitle?: Elements.TextElement;
  twitterSite?: Elements.TextElement;
  twitterImage?: Elements.AssetsElement;
  twitterCreator?: Elements.TextElement;
  twitterDescription?: Elements.TextElement;
}

const Metadata: React.FC<MetaDataProps> = (props) => {
  return (
    <Helmet>
      {props.title?.value.trim().length === 0 ? (
        <title>Dancing Goat</title>
      ) : (
        <title>{props.title?.value.trim()}</title>
      )}

      {props.description?.value.trim().length === 0 ? null : (
        <meta name="description" content={props.description?.value.trim()} />
      )}

      {props.ogTitle?.value.trim().length === 0
        ? null
        : [
            <meta
              key="og:title"
              property="og:title"
              content={props.ogTitle?.value.trim()}
            />,
            <meta key="og:type" property="og:type" content="website" />,
            <meta
              key="og:url"
              property="og:url"
              content={window.location.href}
            />,
          ]}

      {props.ogImage?.value[0].url ? (
        <meta property="og:image" content={props.ogImage?.value[0].url} />
      ) : null}

      {props.ogDescription?.value.trim().length === 0 ? null : (
        <meta property="og:description" content={props.ogDescription?.value} />
      )}

      {props.twitterTitle?.value.trim().length === 0
        ? null
        : [
            <meta
              key="twitter:title"
              name="twitter:title"
              content={props.twitterTitle?.value.trim()}
            />,
            <meta
              key="twitter:card"
              name="twitter:card"
              content="summary_large_image"
            />,
          ]}

      {props.twitterSite?.value.trim().length === 0 ? null : (
        <meta name="twitter:site" content={props.twitterSite?.value.trim()} />
      )}

      {props.twitterCreator?.value.trim().length === 0 ? null : (
        <meta
          name="twitter:creator"
          content={props.twitterCreator?.value.trim()}
        />
      )}

      {props.twitterDescription?.value.trim().length === 0 ? null : (
        <meta
          name="twitter:description.value"
          content={props.twitterDescription?.value.trim()}
        />
      )}

      {props.twitterImage?.value[0].url ? (
        <meta name="twitter:image" content={props.twitterImage?.value[0].url} />
      ) : null}
    </Helmet>
  );
};

export default Metadata;
