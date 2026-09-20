import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";

const left = [["Properties","/opportunities"],["Areas","/areas"],["Buy in Zanzibar","/foreign-ownership-guide"],["Insights","/insights"]];
const right = [["About","/#about"],["Contact","/contact"],["Privacy","/contact"],["Terms","/contact"]];

export function Footer() {
  return <footer className="bg-[#fbfaf6] px-6 py-12 text-[#173a35] md:px-8 md:py-16"><div className="mx-auto max-w-7xl">
    <div className="flex flex-col items-center text-center"><BrandLogo variant="primary" height={52} className="h-12 w-auto" /><p className="mt-5 font-serif text-lg leading-6 text-[#59635f]">Exceptional property.<br />Extraordinary Zanzibar.</p><div className="mt-6 flex gap-8 text-lg"><a href="https://www.instagram.com/zanzibaragroup" aria-label="Instagram">◎</a><a href="https://www.linkedin.com/company/zanzibaba-company-limited" aria-label="LinkedIn" className="font-sans font-bold">in</a><a href="https://www.youtube.com" aria-label="YouTube">▶</a></div></div>
    <div className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-12 text-sm">{[left,right].map((column,i) => <ul key={i} className="space-y-4">{column.map(([label,href]) => <li key={label}><Link href={href} className="hover:text-[#a47c3c]">{label}</Link></li>)}</ul>)}</div>
    <p className="mt-14 border-t border-[#ddd8ce] pt-6 text-center text-[11px] text-[#7b827f]">© {new Date().getFullYear()} Zanzibaba Real Estate. All rights reserved.</p>
  </div></footer>;
}
