import React from 'react';
import Header from 'components/Header';
import HeadMatter from 'components/HeadMatter';
import useViewerData from 'components/useViewerData';

type Props = React.PropsWithChildren<{}>;

const BillingPage: React.FC<Props> = props => {
  const { data: viewerData } = useViewerData();

  return (
    <main>
      <HeadMatter title="Billing" />
      <div className="bg-gray-900">
        <Header inverted={true} viewerData={viewerData} />
        <div className="container py-16 sm:py-20 mx-auto">
          <div className="mx-auto max-w-3xl">
            <div className="px-6 pb-6">
              <h1 className="pb-2 text-gray-200 text-4xl tracking-snug">
                Billing
              </h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BillingPage;
