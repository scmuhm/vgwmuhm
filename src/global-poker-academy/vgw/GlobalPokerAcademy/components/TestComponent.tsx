import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';

type ComponentProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
};

export const Default = (props: ComponentProps): JSX.Element => {
  const { params } = props;
  const styles = `${params.GridParameters ?? ''} ${params.Styles ?? ''}`.trimEnd();

  return <div className={`${styles}`}>Test</div>;
};
