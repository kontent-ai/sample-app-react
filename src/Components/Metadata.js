import React from 'react';
import { Helmet } from 'react-helmet';

const Metadata = props => {
  return (
    <Helmet>
      {!props.title ? (
        <title>Dancing Goat</title>
      ) : (
        <title>{props.title.value.trim()}</title>
      )}
      {!props.description ? null : (
        <meta name="description" content={props.description.value.trim()} />
      )}

      {!props.ogTitle ? null : (
        <meta property="og:title" content={props.ogTitle.value.trim()} />
      )}
      {!props.ogTitle ? null : <meta property="og:type" content="website" />}
      {!props.ogTitle ? null : (
        <meta property="og:url" content={window.location.href} />
      )}
      {!props.ogImage ? null : (
        <meta property="og:image" content={props.ogImage.value[0].url} />
      )}
      {!props.ogDescription ? null : (
        <meta property="og:description" content={props.ogDescription.value} />
      )}

      {!props.twitterTitle ? null : (
        <meta name="twitter:title" content={props.twitterTitle.value.trim()} />
      )}
      {!props.twitterTitle ? null : (
        <meta name="twitter:card" content="summary_large_image" />
      )}
      {!props.twitterSite ? null : (
        <meta name="twitter:site" content={props.twitterSite.value.trim()} />
      )}
      {!props.twitterCreator ? null : (
        <meta
          name="twitter:creator"
          content={props.twitterCreator.value.trim()}
        />
      )}
      {!props.twitterDescription ? null : (
        <meta
          name="twitter:description"
          content={props.twitterDescription.value.trim()}
        />
      )}
      {!props.twitterImage ? null : (
        <meta name="twitter:image" content={props.twitterImage.value[0].url} />
      )}
    </Helmet>
  );
};

export default Metadata;
