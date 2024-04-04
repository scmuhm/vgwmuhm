import { Image, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ArticleItem } from 'graphql/ArticleListResponse';
import Link from 'next/link';
import { Thumbnail } from './Thumbnail';

const ArticleInfo = ({
  title,
  summary,
  category,
  className,
}: Partial<ArticleItem & { className: string }>) => {
  return (
    <div className={className}>
      <h4>
        <Text field={title?.jsonValue} />
      </h4>
      <p>
        <Text field={summary?.jsonValue} />
        <Text field={category?.jsonValue?.fields?.Title} />
      </p>
    </div>
  );
};

const Article = ({
  id,
  url,
  title,
  image,
  summary,
  category,
  className,
}: ArticleItem & { className?: string }) => (
  <article key={id} className={className}>
    <Link href={url?.path ?? '#'}>
      <Thumbnail
        text={category?.jsonValue?.fields?.ShortTitle?.value}
        color={category?.jsonValue?.fields?.Color?.value}
      >
        <Image field={image?.jsonValue} />
      </Thumbnail>
      <ArticleInfo title={title} summary={summary} category={category} className="cardItem-info" />
    </Link>
  </article>
);

export default Article;
