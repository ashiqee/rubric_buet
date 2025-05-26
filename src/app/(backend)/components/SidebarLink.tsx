'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SidebarLink({ href, name }: { href: string; name: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <motion.div
        className={`p-2 rounded-lg cursor-pointer transition-all ${
          isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 hover:text-black'
        }`}
        whileHover={{ scale: 1.02 }}
      >
        {name}
      </motion.div>
    </Link>
  );
}
