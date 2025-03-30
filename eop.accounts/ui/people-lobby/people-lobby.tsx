import { Flex } from '@bitdesign/sparks.layout.flex';
import { useUserList } from '@eop/accounts.hooks.use-user-list';
import { UserCard } from '@eop/accounts.ui.user-card';
import type { ReactNode } from 'react';
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
        return <UserCard key={user.username} user={user} />;
      })}
      {children}
    </Flex>
  );
}
