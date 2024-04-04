import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';
import styles from './styles.module.scss';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

type DropdownSectionProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
};

type SectionType = {
  [name: string]: {
    id: string;
    name: string;
    element: HTMLElement;
  };
};

const DropdownSection = (props: DropdownSectionProps): JSX.Element => {
  const phKey = `dropdown-section-${props.params.DynamicPlaceholderId}`;
  const selectRef = useRef<HTMLSelectElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [sections, setSections] = useState<SectionType>({});
  const { sitecoreContext } = useSitecoreContext();

  useEffect(() => {
    if (contentRef.current) {
      const data = Array.from(contentRef.current.children).reduce((acc, element, index) => {
        if (index && sitecoreContext.pageState !== 'edit') {
          (element as HTMLElement).style.display = 'none';
        }

        const [id, name] = [element.id, element.getAttribute('data-component-id') as string];

        Object.assign(acc, { [name]: { id, name, element } });

        return acc;
      }, {} as SectionType);

      setSections(data);
    }
  }, [sitecoreContext.pageState]);

  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    Object.values(sections).forEach(({ element }) => (element.style.display = 'none'));
    sections[event.target.value].element.style.display = 'block';
  };

  return (
    <div className={CN('component', styles.container, props.params?.Styles?.trimEnd())}>
      <select ref={selectRef} onChange={handleOnChange} className={styles.select}>
        <option value="" selected hidden>
          {props.params.DropdownTitle}
        </option>
        {Object.keys(sections).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>

      <div ref={contentRef} className={styles.content}>
        <Placeholder name={phKey} rendering={props.rendering} />
      </div>
    </div>
  );
};

export default DropdownSection;
