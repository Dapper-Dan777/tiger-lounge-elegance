export const CONTACT = {
  phone: "0176 22228134",
  phoneTel: "tel:+4917622228134",
  website: "https://tiger-lounge.eatbu.com/",
  instagram: "https://www.instagram.com/tiger_lounge_",
  instagramDm: "https://ig.me/m/tiger_lounge_",
  instagramHandle: "tiger_lounge_",
  owner: "Tiger Lounge",
  address: {
    street: "Mittelriedstraße 27",
    zip: "68642",
    city: "Bürstadt",
    label: "Mittelriedstraße 27, 68642 Bürstadt",
    country: "DE",
  },
  maps: {
    search:
      "https://www.google.com/maps/search/?api=1&query=Mittelriedstra%C3%9Fe+27%2C+68642+B%C3%BCrstadt",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Mittelriedstra%C3%9Fe+27%2C+68642+B%C3%BCrstadt&travelmode=driving",
    embed:
      "https://maps.google.com/maps?q=Mittelriedstra%C3%9Fe+27%2C+68642+B%C3%BCrstadt&hl=de&z=16&output=embed",
  },
} as const;

export const OPENING_HOURS = [
  { days: "Montag – Donnerstag", hours: "18:00 – 02:00" },
  { days: "Freitag – Samstag", hours: "18:00 – 04:00", highlight: true },
  { days: "Sonntag", hours: "15:00 – 01:00" },
] as const;

export function getLocalBusinessSchema(siteOrigin = "") {
  const url = siteOrigin || CONTACT.website;
  return {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: CONTACT.owner,
    image: siteOrigin ? `${siteOrigin}/og-image.jpg` : `${CONTACT.website}`,
    url,
    telephone: "+4917622228134",
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.city,
      postalCode: CONTACT.address.zip,
      addressCountry: CONTACT.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.6514,
      longitude: 8.4587,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "18:00",
        closes: "02:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday"],
        opens: "18:00",
        closes: "04:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "15:00",
        closes: "01:00",
      },
    ],
    sameAs: [CONTACT.instagram, CONTACT.website],
  };
}