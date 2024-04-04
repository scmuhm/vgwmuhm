import React, { FunctionComponent } from 'react';
import { Logo } from './logo/Logo';
import styles from './menu.module.css';
import Button from "@/components/button";

const Menu: FunctionComponent<{}> = ({}) => (
      <header className={styles.mainContainer}>
        <Logo className={styles.logo} />
      </header>
);

export default Menu;
