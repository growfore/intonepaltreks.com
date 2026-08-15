export const developerProfileUrl = "https://kshetritej.com.np";

const LINKEDIN_URL = "https://www.linkedin.com/in/kshetritej/";
const GITHUB_URL = "https://github.com/kshetritej";

export const developerPerson = {
  "@type": "Person",
  "@id": `${developerProfileUrl}/#person`,
  name: "Tej Kshetri",
  jobTitle: "Full Stack Engineer",
  url: developerProfileUrl,
  sameAs: [LINKEDIN_URL, GITHUB_URL],
} as const;

export const growforeOrganization = {
  "@type": "Organization",
  "@id": "https://growfore.com/#organization",
  name: "Growfore Solution",
  url: "https://growfore.com",
} as const;

export function developerAttributionGraph(siteName: string, siteUrl: string) {
  const websiteId = `${siteUrl}/#website`;
  const webpageId = `${siteUrl}/#webpage`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      growforeOrganization,
      developerPerson,
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteName,
        url: siteUrl,
        creator: [
          { "@id": growforeOrganization["@id"] },
          { "@id": developerPerson["@id"] },
        ],
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: siteUrl,
        isPartOf: { "@id": websiteId },
        creator: { "@id": developerPerson["@id"] },
      },
    ],
  };
}

export const developer = {
  name: developerPerson.name,
  url: developerProfileUrl,
};
