export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Md-Rijwan-Jannat's Portfolio",
  ogImage: 'https://demo.jpg',
  url: 'www.rijwanjanant.dev',
  description:
    'Junior Full Stack Developer specializing in modern web technologies.',
  navItems: [
    {
      label: 'About',
      href: '#about',
    },
    {
      label: 'Education',
      href: '#education',
    },
    {
      label: 'Experience',
      href: '#experience',
    },
    {
      label: 'Skills',
      href: '#skills',
    },
    {
      label: 'Projects',
      href: '#projects',
    },
    {
      label: 'Blogs',
      href: '#blogs',
    },
    {
      label: 'Contact',
      href: '#contact',
    },
  ],

  navMenuItems: [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
    },
    {
      label: 'Manage Projects',
      href: '/admin/projects',
    },
    {
      label: 'Manage Blog',
      href: '/admin/blog',
    },
    {
      label: 'Manage Skills',
      href: '/admin/skills',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  links: {
    github: 'https://github.com/Md-Rijwan-Jannat',
    linkedin: 'https://www.linkedin.com/in/md-rijwan-jannat-3a479532b',
    facebook: 'https://www.facebook.com/mdrijwanjannat',
    twitter: 'https://x.com/JannatRijw51454',
    discord: 'https://discord.com/channels/r.j.rijwan',
    resume:
      'https://drive.google.com/file/d/1YIFQMCuGD8NCdpW4XuSH_01Ft9bPh_2V/view?usp=drive_link',
  },
};
