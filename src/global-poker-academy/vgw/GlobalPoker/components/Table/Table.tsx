import { ComponentParams, RichText, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';

import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';

type TableProps = {
  fields: {
    RTEContent: RichTextField;
  };
  params: ComponentParams;
};

const toCamelCase = (str: string) =>
  str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());

export const Default = (props: TableProps): JSX.Element => {
  const { fields } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [numberOfColumns, setNumberOfColumns] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setNumberOfColumns(containerRef.current.querySelector('tr')?.children.length || 0);
    }
  }, []);

  if (!fields) return <></>;

  return (
    <div
      className={CN(
        'component',
        'rich-text',
        styles.container,
        props.params?.FixedColumns && styles.fixed,
        props.params?.Styles?.trimEnd(),
        numberOfColumns > 2 && styles.multiColumn
      )}
      ref={containerRef}
      id={toCamelCase(props.params?.TableName || '')}
      data-component-id={props.params?.TableName}
    >
      <RichText field={fields.RTEContent} />
    </div>
  );
};
