"use client";

import Image from "next/image";

const dockItems = [
  { icon: "/nova.png", label: "Nova" },
  { icon: "/terminal.png", label: "Terminal" },
  { icon: "/gmail.png", label: "Gmail" },
  { icon: "/cal.png", label: "Cal" },
  { icon: "/instagram.png", label: "Instagram" },
  { icon: "/x.png", label: "X" },
  { icon: "/github.png", label: "GitHub" },
];

// Apple-inspired: Glass morphism with rounded corners
function DockAppleGlass() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-white/20 backdrop-blur-2xl rounded-2xl border border-white/30 shadow-lg">
      {dockItems.map((item) => (
        <div key={item.label} className="w-14 h-14 rounded-xl overflow-hidden hover:scale-110 transition-transform">
          <Image src={item.icon} alt={item.label} width={56} height={56} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}

// Apple-inspired: Solid white with subtle shadow
function DockAppleSolid() {
  return (
    <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-[20px] shadow-xl">
      {dockItems.map((item) => (
        <div key={item.label} className="w-12 h-12 rounded-xl overflow-hidden hover:scale-110 transition-transform shadow-md">
          <Image src={item.icon} alt={item.label} width={48} height={48} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}

// Apple-inspired: Dark mode glass
function DockAppleDark() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl">
      {dockItems.map((item) => (
        <div key={item.label} className="w-14 h-14 rounded-xl overflow-hidden hover:scale-110 transition-transform">
          <Image src={item.icon} alt={item.label} width={56} height={56} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}

// Retro: Hard edges, no border radius, thick border
function DockRetroHard() {
  return (
    <div className="flex items-center gap-1 px-2 py-2 bg-white border-4 border-black">
      {dockItems.map((item) => (
        <div key={item.label} className="w-14 h-14 border-2 border-black bg-white flex items-center justify-center">
          <Image src={item.icon} alt={item.label} width={40} height={40} className="w-10 h-10 object-contain" />
        </div>
      ))}
    </div>
  );
}

// Retro: Pixel-style with shadow offset
function DockRetroPixel() {
  return (
    <div className="flex items-center gap-2 px-3 py-3 bg-[#c0c0c0] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      {dockItems.map((item) => (
        <div key={item.label} className="w-12 h-12 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
          <Image src={item.icon} alt={item.label} width={36} height={36} className="w-9 h-9 object-contain" />
        </div>
      ))}
    </div>
  );
}

// Stroke style: Outline only icons in circles
function DockStrokeCircle() {
  return (
    <div className="flex items-center gap-4 px-6 py-4 bg-transparent">
      {dockItems.map((item) => (
        <div key={item.label} className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:border-black group transition-colors">
          <Image src={item.icon} alt={item.label} width={32} height={32} className="w-8 h-8 object-contain group-hover:invert transition-all" />
        </div>
      ))}
    </div>
  );
}

// Stroke style: Minimal line with labels
function DockStrokeMinimal() {
  return (
    <div className="flex items-center gap-6 px-6 py-3 border-t-2 border-b-2 border-black">
      {dockItems.map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 flex items-center justify-center">
            <Image src={item.icon} alt={item.label} width={32} height={32} className="w-8 h-8 object-contain grayscale" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

// Retro Mac: Classic Mac OS style
function DockRetroMac() {
  return (
    <div className="flex items-center gap-0 bg-gradient-to-b from-[#dfdfdf] to-[#b8b8b8] border border-black shadow-[inset_1px_1px_0px_#fff,inset_-1px_-1px_0px_#888]">
      {dockItems.map((item, i) => (
        <div key={item.label} className={`w-16 h-14 flex items-center justify-center ${i < dockItems.length - 1 ? 'border-r border-black/30' : ''} hover:bg-black/10`}>
          <Image src={item.icon} alt={item.label} width={36} height={36} className="w-9 h-9 object-contain" />
        </div>
      ))}
    </div>
  );
}

// Modern stroke: Rounded with stroke only
function DockModernStroke() {
  return (
    <div className="flex items-center gap-3 px-5 py-4 border-2 border-black rounded-full">
      {dockItems.map((item) => (
        <div key={item.label} className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:border-black transition-colors">
          <Image src={item.icon} alt={item.label} width={28} height={28} className="w-7 h-7 object-contain" />
        </div>
      ))}
    </div>
  );
}

// Brutalist: Raw, bold, unapologetic
function DockBrutalist() {
  return (
    <div className="flex items-center gap-0 bg-black p-1">
      {dockItems.map((item) => (
        <div key={item.label} className="w-16 h-16 bg-white m-0.5 flex items-center justify-center hover:bg-yellow-300 transition-colors">
          <Image src={item.icon} alt={item.label} width={40} height={40} className="w-10 h-10 object-contain" />
        </div>
      ))}
    </div>
  );
}

// Site Style 1: Clean boxes with thin border (matches current site)
function DockSiteStyle1() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-sm rounded border">
      {dockItems.map((item) => (
        <div key={item.label} className="w-14 h-14 rounded border bg-white flex items-center justify-center hover:scale-105 transition-transform">
          <Image src={item.icon} alt={item.label} width={36} height={36} className="w-9 h-9 object-contain" />
        </div>
      ))}
    </div>
  );
}

// Site Style 2: No container, just bordered icons
function DockSiteStyle2() {
  return (
    <div className="flex items-center gap-3">
      {dockItems.map((item) => (
        <div key={item.label} className="w-16 h-16 rounded border bg-white flex items-center justify-center hover:border-black transition-colors">
          <Image src={item.icon} alt={item.label} width={40} height={40} className="w-10 h-10 object-contain" />
        </div>
      ))}
    </div>
  );
}

// Site Style 3: Vertical dividers between icons
function DockSiteStyle3() {
  return (
    <div className="flex items-center bg-white rounded border">
      {dockItems.map((item, i) => (
        <div key={item.label} className={`w-16 h-14 flex items-center justify-center ${i < dockItems.length - 1 ? 'border-r' : ''} hover:bg-gray-50 transition-colors`}>
          <Image src={item.icon} alt={item.label} width={32} height={32} className="w-8 h-8 object-contain" />
        </div>
      ))}
    </div>
  );
}

// Site Style 4: Ultra minimal - just icons with subtle hover
function DockSiteStyle4() {
  return (
    <div className="flex items-center gap-6 px-4 py-2">
      {dockItems.map((item) => (
        <div key={item.label} className="w-12 h-12 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
          <Image src={item.icon} alt={item.label} width={40} height={40} className="w-10 h-10 object-contain" />
        </div>
      ))}
    </div>
  );
}

// Site Style 5: Thin top border only, labels below
function DockSiteStyle5() {
  return (
    <div className="flex items-center gap-4 px-6 pt-4 pb-2 border-t">
      {dockItems.map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-1.5">
          <div className="w-12 h-12 rounded border bg-white flex items-center justify-center">
            <Image src={item.icon} alt={item.label} width={32} height={32} className="w-8 h-8 object-contain" />
          </div>
          <span className="text-[10px] text-gray-500 font-garamond">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function DockVariationsPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-8">
      <h1 className="text-3xl font-bold text-center mb-4">Dock Variations</h1>
      <p className="text-center text-gray-600 mb-12">10 different dock styles - Apple-inspired & Retro/Stroke styles</p>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* Apple Inspired */}
        <section>
          <h2 className="text-sm font-mono uppercase tracking-wider text-gray-500 mb-6">Apple Inspired</h2>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-400 to-blue-500 p-12 rounded-2xl flex items-center justify-center">
              <div>
                <DockAppleGlass />
                <p className="text-white/80 text-sm text-center mt-4">Glass Morphism</p>
              </div>
            </div>

            <div className="bg-gray-200 p-12 rounded-2xl flex items-center justify-center">
              <div>
                <DockAppleSolid />
                <p className="text-gray-500 text-sm text-center mt-4">Solid White</p>
              </div>
            </div>

            <div className="bg-gray-900 p-12 rounded-2xl flex items-center justify-center">
              <div>
                <DockAppleDark />
                <p className="text-gray-400 text-sm text-center mt-4">Dark Mode Glass</p>
              </div>
            </div>
          </div>
        </section>

        {/* Retro Styles */}
        <section>
          <h2 className="text-sm font-mono uppercase tracking-wider text-gray-500 mb-6">Retro / Hard Edge</h2>

          <div className="space-y-8">
            <div className="bg-[#f5f5f5] p-12 flex items-center justify-center">
              <div>
                <DockRetroHard />
                <p className="text-gray-500 text-sm text-center mt-4">Hard Edge</p>
              </div>
            </div>

            <div className="bg-[#008080] p-12 flex items-center justify-center">
              <div>
                <DockRetroPixel />
                <p className="text-white/80 text-sm text-center mt-4">Pixel / Windows 95</p>
              </div>
            </div>

            <div className="bg-[#f0f0f0] p-12 flex items-center justify-center border">
              <div>
                <DockRetroMac />
                <p className="text-gray-500 text-sm text-center mt-4">Classic Mac OS</p>
              </div>
            </div>

            <div className="bg-white p-12 flex items-center justify-center">
              <div>
                <DockBrutalist />
                <p className="text-gray-500 text-sm text-center mt-4">Brutalist</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stroke Styles */}
        <section>
          <h2 className="text-sm font-mono uppercase tracking-wider text-gray-500 mb-6">Stroke / Minimal</h2>

          <div className="space-y-8">
            <div className="bg-white p-12 flex items-center justify-center border">
              <div>
                <DockStrokeCircle />
                <p className="text-gray-500 text-sm text-center mt-4">Circle Stroke</p>
              </div>
            </div>

            <div className="bg-white p-12 flex items-center justify-center">
              <div>
                <DockStrokeMinimal />
                <p className="text-gray-500 text-sm text-center mt-4">Minimal Line</p>
              </div>
            </div>

            <div className="bg-gray-50 p-12 flex items-center justify-center">
              <div>
                <DockModernStroke />
                <p className="text-gray-500 text-sm text-center mt-4">Modern Pill</p>
              </div>
            </div>
          </div>
        </section>

        {/* Site-Matching Minimal Styles */}
        <section>
          <h2 className="text-sm font-mono uppercase tracking-wider text-gray-500 mb-6">Minimal / Site Style</h2>

          <div className="space-y-8">
            <div className="bg-[#f5f5f5] p-12 flex items-center justify-center">
              <div>
                <DockSiteStyle1 />
                <p className="text-gray-500 text-sm text-center mt-4">Clean Boxes (Current Site)</p>
              </div>
            </div>

            <div className="bg-[#f5f5f5] p-12 flex items-center justify-center">
              <div>
                <DockSiteStyle2 />
                <p className="text-gray-500 text-sm text-center mt-4">Floating Boxes</p>
              </div>
            </div>

            <div className="bg-[#f5f5f5] p-12 flex items-center justify-center">
              <div>
                <DockSiteStyle3 />
                <p className="text-gray-500 text-sm text-center mt-4">Divided Bar</p>
              </div>
            </div>

            <div className="bg-[#f5f5f5] p-12 flex items-center justify-center">
              <div>
                <DockSiteStyle4 />
                <p className="text-gray-500 text-sm text-center mt-4">Ultra Minimal</p>
              </div>
            </div>

            <div className="bg-white p-12 flex items-center justify-center border">
              <div>
                <DockSiteStyle5 />
                <p className="text-gray-500 text-sm text-center mt-4">Top Border with Labels</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
