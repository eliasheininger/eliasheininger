import Image from "next/image";

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
        {/* <nav className="w-full flex justify-start mb-1rem">
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
            <li>
              <a href="/blog" className="hover:underline transition">
                blog
              </a>
            </li>
          </ul>
        </nav> */}
        <AnimatedSection delay={0}>
          <section>
            <h1 className="text-[3rem] mb-2">Elias Heininger</h1>
            <p className="text-[1.2rem] font-light antialiased">
              a founder, designer, coder, creator and{" "}
              <span className="text-amber-100">builder at heart</span>
            </p>
          </section>
        </AnimatedSection>
        <AnimatedSection delay={0.8}>
          <div className="flex justify-center my-8">
            <Image
              src="/Elias2.JPG"
              alt="Portrait of Elias"
              width={256}
              height={192}
              className=" object-cover w-full h-76 md:h-96"
              priority
            />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={1.0}>
          <section id="current">
            <h2 className="text-[1.5rem] mt-6">
              {" "}
              I recently joined{" "}
              <span className="text-amber-100 font-normal text-[1.5rem] antialiased">
                Acta
              </span>
              , a venture studio in Berlin, <span className="text-amber-100 font-normal text-[1.5rem] antialiased"> where I&apos;m building, creating</span>
              <span className="text-amber font-normal text-[1.5rem] antialiased"> content and growing as a founder alongside amazing people.</span>
            </h2>
            <p className="text-[1rem] font-light mt-4 "></p>
            <p className="text-white font-normal text-[1rem] antialiased">
              <br />
              <span className="line-through text-white/80 font-light text-[1rem] antialiased">
                Currently I&apos;m building{" "}
                <a
                  href="https://findpapersfast.com"
                  className="text-white/80 font-light text-[1rem] underline antialiased"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FindPapersFast
                </a>{" "}
                an AI tool to help students and researchers, quickly find
                relevant papers for their research.
              </span>
              <br />
              <br />
              <span className="line-through text-white/80 font-light text-[1rem] antialiased">
                Currently I&apos;m building{" "}
                <a
                  href="https://readpapersfast.com"
                  className="text-white/80 font-light text-[1rem] underline antialiased"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ReadPapersFast
                </a>{" "}
                an AI tool to make scientific research more accessible and
                easier to read.
              </span>
              <br />
              <br />
              <span className="line-through text-white/80 font-light text-[1rem] antialiased">
                Currently I&apos;m building{" "}
                <a
                  href="https://shitcheck.com"
                  className="text-white/80 font-light text-[1rem] underline antialiased"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ShitCheck
                </a>{" "}
                an AI fact checker to help fight false information online by
                checking claims against scientific research.
              </span>
              <br />
              <br />
              <h2 className="text-white font-normal pt-6 text-[1.5rem] antialiased">
                Currently I&apos;m building an{" "}
                <span className="text-amber-100 font-normal text-[1.5rem] antialiased">
                  AI Agent
                </span>{" "}
                to help infrastructure developers{" "}
                <span className="text-amber-100 font-normal text-[1.5rem] antialiased">
                  find and analyze the best plots
                </span>{" "}
                for their projects based on{" "}
                <span className="text-amber-100 font-normal text-[1.5rem] antialiased">
                  GIS Data
                </span>
                .
              </h2>
            </p>
          </section>
        </AnimatedSection>
        <AnimatedSection delay={0}>
          <section id="ideas">
            <h2 className="text-[1.5rem]  mb-[1rem] mt-8">Ideas</h2>
            <ul className="list-disc font-light list-inside space-y-[1rem] text-white/80 antialiased">
              <li>
                AI sims game: An interactive game featuring AI sims that make
                decisions and interact with each other
              </li>

              <li>
                Intimate chat relationship messenger with AI assistant acting as
                a mediator between two romantic partners
              </li>
              <li>
                &apos;Alt&apos; text for blind people using to navigate in
                surroundings. An AI device that can help blind people navigate
                in their surroundings.
              </li>
              <li>Phone AI IDE to vibe-code on the go</li>
              <li>
                AI companion for the elderly to help them with their daily tasks
                and keep them engaged and connected with their family and
                friends
              </li>
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
                Built shitcheck.com, an AI fact checker to help fight false
                information online by checking claims against scientific
                research. Used by over a thousand people and counting.
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
