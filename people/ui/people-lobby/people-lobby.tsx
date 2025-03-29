import type { ReactNode } from 'react';
import { UserCard } from '@prism/people.ui.user-card';
import { useUserList } from '@prism/people.hooks.use-user-list';
import { Flex } from '@bitdesign/sparks.layout.flex';
import styles from './people-lobby.module.scss';

export type PeopleLobbyProps = {
  /**
   * sets the component children.
   */
  children?: ReactNode;
};

export function PeopleLobby({ children }: PeopleLobbyProps) {
  const users = useUserList();
  if (!users) return null;

  return (
    <Flex className={styles.peopleLobby}>
      {users.map((user) => {
        return <UserCard key={user.username} user={user} />
      })}
      {children}
    </Flex>
  );
}
