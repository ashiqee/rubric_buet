'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

import { Logo } from '@/components/icons';
import { menuLinks } from '../lib/menuLinks';
import SidebarLink from './SidebarLink';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Toggle button (visible on small screens) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded"
        onClick={toggleSidebar}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative top-0 left-0 h-full w-64 bg-white px-5 py-4 transform transition-transform duration-300 z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <Link className="flex justify-start items-center py-1 gap-1" href="/">
          <Logo />
          <p className="font-bold text-inherit">BUET RUBRICS</p>
        </Link>
        <h2 className="text-xl font-bold my-6">Teacher Panel</h2>
        <nav className="space-y-2">
          {menuLinks.map((link) => (
            <SidebarLink key={link.href} href={link.href} name={link.name} />
          ))}
        </nav>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleSidebar()}
        />
      )}
    </>
  );
}
