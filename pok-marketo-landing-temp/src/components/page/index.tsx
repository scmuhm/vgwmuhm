import React, { FunctionComponent } from 'react';
import Menu from '@/components/menu';
import styles from './page.module.css'
import Container from "@/components/container";
import Footer from "@/components/footer";

const Page: FunctionComponent<{ children: React.ReactNode }> = ({ children }) => (
    <div className={styles.global}>
        <Menu />
        {children}
        <Footer />
    </div>
);

export default Page;
