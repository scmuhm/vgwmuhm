import { Text } from '@sitecore-jss/sitecore-jss-nextjs';

type Title =
  | {
      value: string;
    }
  | undefined;

interface ThumbnailProps {
  text: string | Title;
  color?: string;
  children?: React.ReactElement;
  classNames?: string;
}

export const Thumbnail = ({ text, color, children, classNames }: ThumbnailProps) => {
  return (
    <div className="thumbnail-container">
      <div className={`thumbnail  ${color || 'purpure'} ${classNames}`}>
        {typeof text === 'string' ? text : <Text field={text} />}
      </div>
      {children}
    </div>
  );
};
