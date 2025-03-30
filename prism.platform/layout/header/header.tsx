import { Logo } from '@bitdesign/sparks.content.logo';
import { Header as SparksHeader } from '@bitdesign/sparks.layout.header';
import { Link } from '@bitdesign/sparks.navigation.link';
import cn from 'clsx';
import type { ComponentType, ReactNode } from 'react';
import { HeaderLink } from './header-link.js';
import styles from './header.module.scss';

export type HeaderProps = {
  /**
   * name of the brand
   */
  name?: string;

  /**
   * slogan of the brand.
   */
  slogan?: string;

  /**
   * sets the component children.
   */
  children?: ReactNode;

  /**
   * list of header links.
   */
  links?: HeaderLink[];

  /**
   * list of actions.
   */
  actions?: ComponentType[];

  /**
   * override class names.
   */
  className?: string;

  /**
   * image of the logo
   */
  logoImage?: string;
};

export function Header({
  children,
  logoImage = 'https://www.aps.org/_ipx/w_640/https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fi2z87pbo%2Fproduction%2Fb461fd045ddb6246e387fd4c0601120798023272-241x70.svg',
  name = 'Prism',
  slogan = 'Cloud',
  className,
  actions,
  links = [],
}: HeaderProps) {
  const logo = <Logo href="/" name={name} slogan={slogan} src={logoImage} />;

  return (
    <SparksHeader
      logo={logo}
      actions={actions}
      className={cn(className, styles.header)}
      actionsClassName={styles.actions}
    >
      {children}
      {links.map((link, key) => {
        return (
          <Link key={key} href={link.href} external={link.external}>
            {link.label}
          </Link>
        );
      })}
    </SparksHeader>
  );
}
