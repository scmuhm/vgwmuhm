import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';
import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'vgw/_shared/components/Button';

type ComponentProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
};

const CardGrid = (props: ComponentProps): JSX.Element => {
  const phKey = `card-grid-${props.params.DynamicPlaceholderId}`;
  const pageSize = 9;

  const { sitecoreContext } = useSitecoreContext();
  const [pages, setPages] = useState<Element[][]>([]);
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      const allTiles = wrapperRef.current.children;

      const paginatedArray = Array.from({ length: Math.ceil(allTiles.length / pageSize) }, (_, i) =>
        [...allTiles].slice(i * pageSize, i * pageSize + pageSize)
      );

      setPages(paginatedArray);
    }
  }, []);

  const tilesToShow = pages.slice(0, pagesLoaded).flat(1);
  const tilesHTMLString = tilesToShow.map((tile) => tile.outerHTML).join('');

  return (
    <div className={CN('component', styles.container, props.params?.Styles?.trimEnd())}>
      {sitecoreContext.pageState === 'edit' ? (
        <div className={styles.wrapper} ref={wrapperRef}>
          <Placeholder name={phKey} rendering={props.rendering} />
        </div>
      ) : (
        <>
          <div className={styles.wrapper} dangerouslySetInnerHTML={{ __html: tilesHTMLString }} />
          <div ref={wrapperRef} style={{ display: 'none' }}>
            <Placeholder name={phKey} rendering={props.rendering} />
          </div>
        </>
      )}

      {pagesLoaded < pages.length && (
        <div className={styles.cta}>
          <Button size={2} ghost color="black" onClick={() => setPagesLoaded((prev) => prev + 1)}>
            LOAD MORE
          </Button>
        </div>
      )}
    </div>
  );
};

export default CardGrid;
