import NotFound from 'src/NotFound';
import Shareholders404Page from 'vgw/Shareholders/components/Page404';
import SitecorePage from './[[...path]]';

import { SitecorePageProps } from 'lib/page-props';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';

import Error from 'next/error';
import { GetStaticProps } from 'next';

export default function Custom404(props: SitecorePageProps) {
  switch (props.site.name) {
    case 'Shareholders':
      return <Shareholders404Page />;
    case 'GlobalPokerAcademy':
      return <NotFound />;
    case 'GlobalPoker':
      return (
        <SitecorePage {...props}>
          <NotFound />
        </SitecorePage>
      );
    default:
      return <Error statusCode={404} />;
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const props = await sitecorePagePropsFactory.create(context);

  return { props };
};
