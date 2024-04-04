import { File, FileField, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';
import styles from './styles.module.scss';
import { useEffect } from 'react';

type PDFRedirectProps = {
  fields: {
    PDFItem: FileField;
  };
};

const PDFRedirect = ({ fields }: PDFRedirectProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  useEffect(() => {
    if (sitecoreContext.pageState !== 'edit' && fields.PDFItem.value.src) {
      window.location.href = fields.PDFItem.value.src;
    }
  }, [fields, sitecoreContext]);

  return sitecoreContext.pageState === 'edit' ? (
    <div className={CN('component', styles.container)}>
      Add PDF redirect item
      <File field={fields.PDFItem} />
    </div>
  ) : (
    <></>
  );
};

export default PDFRedirect;
