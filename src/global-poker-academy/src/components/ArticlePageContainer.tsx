import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ComponentProps): JSX.Element => {
  const styles = `${props.params.GridParameters ?? ''} ${props.params.Styles ?? ''}`.trimEnd();
  return (
    <div className={`component article-page-container ${styles}`}>
      <div className="component-content main-content">
        <div className="article-page-header">
          <Placeholder name="article-page-header" rendering={props.rendering} />
        </div>
        <div className="article-page-body">
          <Placeholder name="article-page-body" rendering={props.rendering} />
        </div>
        <div className="fixed-content-wrapper">
          {/* article-page-side could be fixed with scrollable content see _article-grid.scss? */}
          <div className="article-page-side">
            <Placeholder name="article-page-side" rendering={props.rendering} />
          </div>
        </div>
        <div className="article-page-bottom">
          <Placeholder name="article-page-bottom" rendering={props.rendering} />
        </div>
      </div>
    </div>
  );
};
