import Image from "next/image";
import Link from "next/link";
import { BOOK_CALL_URL, whatsappUrl } from "@/data/site";

const collections = [
  {
    title: "Beachfront Villas",
    image: "/images/editorial/villa-daylight.webp",
  },
  {
    title: "Investment Land",
    image: "/images/editorial/investment-land-daylight.webp",
  },
  {
    title: "Hotels & Resorts",
    image: "/images/editorial/hotel-resort-daylight.webp",
  },
  {
    title: "Off-Plan Developments",
    image: "/images/editorial/off-plan-daylight.webp",
  },
];

const services = [
  ["⌂", "Property sourcing", "Access to verified opportunities."],
  ["▤", "Due diligence coordination", "Local support throughout the process."],
  ["◇", "Developer verification", "Work with trusted, reputable partners."],
  ["▣", "Site visits", "On-the-ground viewings and support."],
  ["◇", "Negotiation support", "Guidance to help you secure the right terms."],
  ["⚿", "Acquisition guidance", "From offer to ownership and beyond."],
];

const areas = [
  [
    "Paje",
    "White sands, vibrant lifestyle.",
    "/images/editorial/paje-daylight.webp",
  ],
  [
    "Jambiani",
    "Authentic charm, strong investment potential.",
    "/images/editorial/jambiani-daylight.webp",
  ],
  [
    "Nungwi",
    "World-class beaches and resorts.",
    "/images/editorial/nungwi-daylight.webp",
  ],
  [
    "Matemwe",
    "Peaceful, pristine, exclusive.",
    "/images/editorial/matemwe-daylight.webp",
  ],
  [
    "Fumba",
    "Modern development and marina.",
    "/images/editorial/fumba-daylight.webp",
  ],
  [
    "Stone Town",
    "History, culture and unique opportunities.",
    "/images/editorial/stone-town-daylight.webp",
  ],
];

export function FeaturedEditorial() {
  return (
    <section className="bg-[#fbfaf6] px-5 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="max-w-xl font-serif text-[2.15rem] font-medium leading-[.95] tracking-[-.035em] text-[#102f2c] md:text-5xl">
            Featured Opportunities
            <br />
            in Zanzibar
          </h2>
          <Link
            href="/opportunities"
            className="hidden border-b border-[#123a35] pb-1 text-xs text-[#123a35] md:block"
          >
            View all properties&nbsp; →
          </Link>
        </div>
        <Link
          href="/opportunities"
          className="mb-5 inline-block border-b border-[#123a35] pb-1 text-xs text-[#123a35] md:hidden"
        >
          View all properties&nbsp; →
        </Link>
        <div className="grid gap-5 md:grid-cols-3">
          <article className="border border-[#d8d3c8] bg-[#f7f4ed] p-3 md:col-span-2">
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-[16/9]">
              <Image
                src="/images/editorial/villa-daylight.webp"
                alt="Beachfront villa in Paje in natural daylight"
                fill
                sizes="(max-width:768px) 100vw, 66vw"
                className="object-cover"
              />
              <span className="absolute left-3 top-3 bg-[#0a5b4d] px-3 py-1 text-[10px] font-semibold uppercase tracking-[.13em] text-white">
                Featured
              </span>
              <span className="absolute right-3 top-2 text-3xl text-white">
                ♡
              </span>
            </div>
            <div className="px-1 pb-2 pt-4">
              <p className="text-[10px] uppercase tracking-[.16em] text-[#53625e]">
                Paje
              </p>
              <h3 className="mt-1 font-serif text-2xl text-[#102f2c]">
                Beachfront Villa
              </h3>
              <p className="mt-1 font-serif text-2xl text-[#0a5b4d]">
                $420,000
              </p>
              <p className="mt-2 text-xs text-[#46514e]">
                4 Bedrooms&nbsp; · &nbsp;Private Pool&nbsp; · &nbsp;Beachfront
              </p>
              <p className="mt-3 text-sm leading-6 text-[#46514e]">
                Stunning modern villa just steps from the beach in Paje.
              </p>
              <span className="mt-3 inline-block border-b border-[#123a35] text-xs text-[#123a35]">
                View Property&nbsp; →
              </span>
            </div>
          </article>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-1">
            {collections.slice(1, 3).map((item) => (
              <Link
                href="/opportunities"
                key={item.title}
                className="group relative min-h-[220px] overflow-hidden"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#082f2a]/80 to-transparent" />
                <p className="absolute bottom-5 left-5 font-serif text-2xl text-white">
                  {item.title} <span className="block text-xl">→</span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PropertyCollections() {
  return (
    <section className="bg-[#f7f4ed] px-5 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-[2.25rem] font-medium leading-none tracking-[-.035em] text-[#102f2c] md:text-5xl">
          Explore Zanzibar
          <br />
          Property
        </h2>
        <p className="mt-3 text-sm text-[#48534f]">
          Discover curated opportunities across the island.
        </p>
        <div className="mt-6 grid gap-2 md:grid-cols-2">
          {collections.map((item) => (
            <Link
              href="/opportunities"
              key={item.title}
              className="group relative min-h-[150px] overflow-hidden md:min-h-[250px]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#082f2a]/75 via-[#082f2a]/20 to-transparent" />
              <p className="absolute bottom-5 left-5 font-serif text-[1.65rem] text-white">
                {item.title}
                <span className="block text-xl">→</span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnerAndAdvisor() {
  return (
    <>
      <section id="about" className="bg-[#fbfaf6] px-5 py-12 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-serif text-[2.2rem] font-medium leading-[.98] tracking-[-.035em] text-[#102f2c] md:text-5xl">
              Your Property Partner
              <br />
              on the Ground in Zanzibar
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#48534f]">
              Local expertise. International standards.
              <br />A smoother, safer way to buy in Zanzibar.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {services.map(([icon, title, body]) => (
                <div key={title} className="grid grid-cols-[30px_1fr] gap-3">
                  <span className="font-serif text-2xl text-[#0b4b42]">
                    {icon}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-[#102f2c]">
                      {title}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-[#59635f]">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden">
            <Image
              src="/images/editorial/matemwe-daylight.webp"
              alt="Zanzibar coastline"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <section className="bg-[#f7f4ed] px-5 py-12 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-7 md:grid-cols-[.85fr_1.15fr] md:items-center">
          <div>
            <h2 className="font-serif text-[2.3rem] font-medium leading-none tracking-[-.035em] text-[#102f2c] md:hidden">
              Meet Your Advisor
              <br />
              in Zanzibar
            </h2>
            <div className="relative mt-5 aspect-[4/3] overflow-hidden md:mt-0 md:aspect-[3/4]">
              <Image
                src="/images/emmanuel-mkuwa.jpg"
                alt="Emmanuel Mkuwa, Founder and Managing Director"
                fill
                sizes="(max-width:768px) 100vw, 42vw"
                className="object-cover object-top"
              />
            </div>
          </div>
          <div>
            <h2 className="hidden font-serif text-5xl font-medium leading-none tracking-[-.035em] text-[#102f2c] md:block">
              Meet Your Advisor
              <br />
              in Zanzibar
            </h2>
            <h3 className="mt-4 font-serif text-2xl text-[#102f2c]">
              Emmanuel Mkuwa
            </h3>
            <p className="text-sm text-[#46514e]">
              Founder &amp; Managing Director
            </p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#46514e]">
              Direct, local advisory for international buyers — from property
              sourcing and site visits to due diligence coordination and
              acquisition support.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href={whatsappUrl(
                  "Hello Emmanuel, I'm interested in property in Zanzibar.",
                )}
                className="flex min-h-14 items-center justify-center bg-[#073f37] px-5 text-[11px] font-semibold uppercase tracking-[.12em] text-white"
              >
                ◉&nbsp;&nbsp; WhatsApp Emmanuel
              </a>
              <a
                href={BOOK_CALL_URL}
                className="flex min-h-14 items-center justify-center border border-[#153e38] px-5 text-[11px] font-semibold uppercase tracking-[.1em] text-[#123a35]"
              >
                ▣&nbsp;&nbsp; Book a Private Consultation
              </a>
            </div>
            <blockquote className="mt-8 font-serif text-xl italic leading-7 text-[#6a766f]">
              “A more connected, more transparent Zanzibar.”
              <span className="mt-2 block text-sm">— Emmanuel Mkuwa</span>
            </blockquote>
          </div>
        </div>
      </section>
    </>
  );
}

export function EditorialAreas() {
  return (
    <section className="bg-[#fbfaf6] px-5 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-[2.3rem] font-medium leading-none tracking-[-.035em] text-[#102f2c] md:text-5xl">
          Explore Zanzibar
        </h2>
        <p className="mt-3 text-sm text-[#59635f]">
          Unique areas. Extraordinary opportunities.
        </p>
        <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3">
          {areas.map(([name, copy, image]) => (
            <Link
              href={`/areas#${name.toLowerCase().replace(" ", "-")}`}
              key={name}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="(max-width:768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-2 font-serif text-xl text-[#102f2c]">{name}</h3>
              <p className="mt-1 text-[11px] leading-4 text-[#59635f]">
                {copy}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalEditorialCta() {
  return (
    <section className="relative min-h-[520px] overflow-hidden">
      <Image
        src="/images/editorial/paje-daylight.webp"
        alt="Zanzibar beach in natural daylight"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#082f2a]/65" />
      <div className="relative mx-auto flex min-h-[520px] max-w-7xl flex-col justify-center px-6 py-16 text-white">
        <h2 className="max-w-lg font-serif text-[3rem] font-medium italic leading-[.95] tracking-[-.04em] md:text-6xl">
          Your Zanzibar
          <br />
          property search
          <br />
          starts here.
        </h2>
        <p className="mt-5 text-sm leading-6 text-white/90">
          Real opportunities. Local expertise.
          <br />A brighter future in Zanzibar.
        </p>
        <div className="mt-7 grid max-w-md gap-3">
          <Link
            href="/opportunities"
            className="flex min-h-14 items-center justify-center border border-white bg-[#073f37]/70 text-[11px] font-semibold uppercase tracking-[.12em]"
          >
            Explore Properties&nbsp;&nbsp; →
          </Link>
          <a
            href={whatsappUrl()}
            className="flex min-h-14 items-center justify-center border border-white text-[11px] font-semibold uppercase tracking-[.12em]"
          >
            ◉&nbsp;&nbsp; WhatsApp an Advisor
          </a>
        </div>
      </div>
    </section>
  );
}
