import { Header } from './header.js';

export const BasicHeader = () => {
  return (
    <Header
      links={[
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ]}
    />
  );
};
