'use client';

import Link from 'next/link';

import { menuLinks } from '../lib/menuLinks';

import SidebarLink from './SidebarLink';

import { Logo } from '@/components/icons';

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen  px-5 ">
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
  );
}
