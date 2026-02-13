"use client";

import Link from "next/link";
import { siteData } from "@/data/siteData";
import { Mail, Github, Instagram, Twitter } from "lucide-react";

export default function MobileLayout() {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">{siteData.name}</h1>
        <p className="text-lg text-gray-500 mt-1">{siteData.tagline}</p>
      </header>

      {/* Location Info */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <p className="text-sm text-gray-500">{siteData.location}</p>
        <p className="text-2xl font-light text-gray-900">
          {siteData.temperature}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Currently: {siteData.currentFocus}
        </p>
      </div>

      {/* Story */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">My Story</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {siteData.windows.story?.content}
        </p>
      </section>

      {/* Quick Links */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Connect</h2>
        <div className="flex gap-4">
          {siteData.dockItems
            .filter((item) => item.type === "link")
            .map((item) => {
              const Icon =
                item.icon === "mail"
                  ? Mail
                  : item.icon === "github"
                    ? Github
                    : item.icon === "instagram"
                      ? Instagram
                      : item.icon === "twitter"
                        ? Twitter
                        : Mail;

              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center"
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              );
            })}
        </div>
      </section>

      {/* Nav to sections */}
      <nav className="flex gap-4">
        {siteData.navItems.map((item) => (
          <span
            key={item}
            className="text-sm text-gray-500 capitalize cursor-pointer hover:text-gray-900"
          >
            {item}
          </span>
        ))}
        <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900">
          blog
        </Link>
      </nav>

      <p className="text-xs text-gray-400 mt-12 text-center">
        Full experience available on desktop
      </p>
    </div>
  );
}
