import { Dispatch, SetStateAction, Component } from 'react';
import ReactDOM from 'react-dom';

import GridOverlay from 'vgw/_shared/components/GridOverlay';

import styles from './styles.module.scss';

export type PlaygroundProps = {
  setFrameWidth: Dispatch<SetStateAction<number>>;
  siteStyles?: StyleSheetList;
  gridOverlayVisible?: boolean;
  breakpoint?: number;
  animatingFrame?: boolean;
};

type FrameProps = { children?: React.ReactNode } & PlaygroundProps;

const injectStyles = (siteStyles: StyleSheetList | undefined, frameDoc: Document) => {
  if (siteStyles) {
    const styleTags = frameDoc.head.getElementsByTagName('style');

    while (styleTags.length > 0) {
      frameDoc.head.removeChild(styleTags[0]);
    }

    const styleSheet = frameDoc.createElement('style');

    styleSheet.innerText = [...siteStyles]
      .map((styleSheet) => [...styleSheet.cssRules].map((rule) => rule.cssText).join(''))
      .filter(Boolean)
      .join('\n');

    frameDoc.head.appendChild(styleSheet);
  }
};

export class Frame extends Component<FrameProps> {
  private frameNode: HTMLIFrameElement | null = null;
  private frameDoc: Document | undefined | null = null;
  private resizeObserver: ResizeObserver | null = null;

  componentDidMount() {
    this.renderFrameContents();

    if (this.frameNode) {
      this.resizeObserver = new ResizeObserver(() => this.renderFrameContents());
      this.resizeObserver.observe(this.frameNode);
    }
  }

  componentDidUpdate() {
    this.renderFrameContents();
  }

  componentWillUnmount() {
    if (this.resizeObserver && this.frameNode) {
      this.resizeObserver.unobserve(this.frameNode);
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    if (this.frameDoc) {
      ReactDOM.unmountComponentAtNode(this.frameDoc.body);
    }
  }

  renderFrameContents = () => {
    if (this.frameDoc?.readyState === 'complete') {
      this.props.setFrameWidth(Number(this.frameNode?.offsetWidth) - 2);

      injectStyles(this.props.siteStyles, this.frameDoc);

      ReactDOM.render(
        <>
          <GridOverlay visible={this.props.gridOverlayVisible} />
          {this.props.children}
        </>,
        this.frameDoc.body
      );
    } else {
      setTimeout(this.renderFrameContents, 0);
    }
  };

  render() {
    return (
      <iframe
        ref={(node) => {
          this.frameNode = node;
          this.frameDoc = node?.contentDocument;
        }}
        className={this.props.animatingFrame ? styles.animating : ''}
        style={{
          backgroundColor: 'white',
          height: 'calc(100vh - 10.6rem)',
          minHeight: 300,
          width: this.props.breakpoint || '95%',
          minWidth: 390,
          maxWidth: '99.5%',
          resize: 'horizontal',
          overflow: 'auto',
          border: '1px solid rgba(0,0,0,0.1)',
          boxShadow: '0px 0px 12px rgba(0,0,0,0.12)',
        }}
      />
    );
  }
}
