export interface IGtmProps {
  gtmId: string;
}

const GTMScript = ({ gtmId }: IGtmProps) => {
  if (!gtmId) return null;
  {/* GTM Script */ }
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');`,
      }}
    />
  );
};

const GTMNoscript = ({ gtmId }: IGtmProps) => {
  if (!gtmId) return null;
  {/* GTM NoScript */ }
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      ></iframe>
    </noscript>
  )
}

const GTM = {
  GTMScript,
  GTMNoscript
}

export default GTM;