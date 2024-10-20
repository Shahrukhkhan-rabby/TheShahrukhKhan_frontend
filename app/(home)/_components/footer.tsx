import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center py-3">
      <Link
        className="flex items-center gap-1 text-current"
        href="https://nextui.org"
        title="Visit NextUI"
      >
        <span className="text-default-600">Powered by</span>
        <p className="text-primary">Rijwan</p>
      </Link>
    </footer>
  );
}
