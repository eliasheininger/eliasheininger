import Image from "next/image";
import ProjectSection from "../components/ProjectSection";
import { codingProjects } from "../data/projects";
import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";

const links = [
  {
    name: "instagram",
    href: "https://instagram.com/eliasheininger",
  },
  {
    name: "github",
    href: "https://github.com/eliasheininger",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-2xl w-full px-6 py-[2rem] flex flex-col gap-12">
        <nav className="w-full flex justify-start mb-1rem">
          <ul className="flex gap-8 text-white/80 text-[1rem] font-light">
            <li>
              <a href="#current" className="hover:underline transition">
                currently
              </a>
            </li>
            <li>
              <a href="#ideas" className="hover:underline transition">
                ideas
              </a>
            </li>
            <li>
              <a href="#past" className="hover:underline transition">
                past
              </a>
            </li>
          </ul>
        </nav>
        <AnimatedSection delay={0}>
          <section>
            <h1 className="text-[3rem] mb-2">Elias Heininger</h1>
            <p className="text-[1.2rem] font-light text-amber-300 antialiased">
              a founder, designer, coder, creator and{" "}
              <span className="text-amber-100">builder at heart</span>
            </p>
          </section>
        </AnimatedSection>
        <AnimatedSection delay={0.5}>
          <div className="flex justify-center my-8">
            <Image
              src="/elias2.jpg"
              alt="Portrait of Elias"
              width={256}
              height={192}
              className="rounded-lg object-cover w-full h-76 md:h-96"
              priority
            />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={1.0}>
          <section id="current">
            <h2 className="text-[1.5rem] mb-[1rem] mt-8">What I'm up to</h2>
            <p className="text-white/80 font-light text-[1rem] antialiased">
              I recently joined acta, a venture studio in Berlin, where I'm
              building, creating content and growing as a founder alongside
              amazing people.
              <br />
              <br />
              Currently I'm building{" "}
              <a
                href="https://findpapersfast.com"
                className="text-white/80 font-light text-[1rem] underline antialiased"
                target="_blank"
                rel="noopener noreferrer"
              >
                FindPapersFast
              </a>{" "}
              an AI tool to help students and researchers, quickly find relevant
              papers for their research.
            </p>
          </section>
        </AnimatedSection>
        <AnimatedSection delay={0}>
          <section id="ideas">
            <h2 className="text-[1.5rem]  mb-[1rem] mt-8">Ideas</h2>
            <ul className="list-disc font-light list-inside space-y-[1rem] text-white/80 antialiased">
              <li>AI sims game</li>
              <li>Audio snippets for biography AI</li>
              <li>Intimate chat relationship messenger with AI assist</li>
              <li>
                'Alt' text for blind people using to navigate in surroundings
              </li>
              <li>Phone AI IDE to vibe-code on the go</li>
            </ul>
          </section>
        </AnimatedSection>
        <AnimatedSection delay={0}>
          <section id="past">
            <h2 className="text-[1.5rem] mb-[1rem] mt-8">Past</h2>
            <ul className="list-disc font-light list-inside space-y-[1rem] text-white/80 antialiased">
              <li>
                Started a Design and Software development Agency in Bangkok,
                Thailand, along with Akshat. Quit all commitments prior moving
                to Berlin.
              </li>
              <li>
                Tried building a tool to connect grocery delivery services to
                online recipes, making mealkits deliverable within 30 minutes
              </li>

              <li>
                Tried building an event SaaS platform empowering event hosts to
                sell tickets, manage attendees, and streamline event operations
                from their own website
              </li>
            </ul>
          </section>
        </AnimatedSection>
        <AnimatedSection delay={0}>
          <section
            id="links"
            className="w-full  justify-start bg-black flex flex-col gap-4"
          >
            <h2 className="text-[1.5rem]  mt-8">Links</h2>
            <div className="flex gap-8">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white text-[1rem] font-light hover:text-white/80 transition"
                >
                  {link.name}
                  <ArrowUpRight size={16} strokeWidth={2.2} />
                </a>
              ))}
            </div>
          </section>
        </AnimatedSection>
      </div>
    </main>
  );
}
