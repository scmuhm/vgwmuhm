import { useRouter } from 'next/router';
import { ComponentParams } from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';

type CardProps = {
  params: ComponentParams;
};

const Breadcrumbs = ({ params }: CardProps): JSX.Element => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<{ name: string; href: string }[]>([]);

  useEffect(() => {
    const pathSegments = router.asPath.split('/').filter(Boolean);

    const breadcrumbs = pathSegments.map((segment, index, arr) => {
      const href = '/' + arr.slice(0, index + 1).join('/');
      const name = segment.replace(/-/g, ' ').replace(/\b(\w)/g, (char) => char.toUpperCase());
      return { name, href };
    });

    setBreadcrumbs(breadcrumbs);
  }, [router.asPath]);

  return (
    <nav
      className={CN('component', params?.Styles?.trimEnd(), styles.container)}
      aria-label="Breadcrumb"
    >
      <ol>
        <li>
          <a href="/">Home</a>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index}>
            {index + 1 === breadcrumbs.length ? (
              <strong>{breadcrumb.name}</strong>
            ) : (
              <a href={breadcrumb.href}>{decodeURIComponent(breadcrumb.name)}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
