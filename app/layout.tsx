import '@/styles/globals.css';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import BgColor from './(home)/_components/ui/bgColor';
import Container from './(home)/_components/ui/container';
import clsx from 'clsx';
import { fontSans } from '@/config/fonts';
import Footer from './(home)/_components/footer';
import { Navbar } from './(home)/_components/ui/navbar';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 800,
        height: 600,
        alt: siteConfig.name,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Meta tags for SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased px-2 py-4',
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          {/* Blur effect background */}
          <BgColor />
          {/* Main content layout */}
          <Container>
            {/* Navbar component */}
            <Navbar />

            {children}

            {/* Footer component */}
            <Footer />
          </Container>
        </Providers>
      </body>
    </html>
  );
}
