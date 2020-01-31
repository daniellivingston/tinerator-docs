import React from 'react';
import Link from 'next/link';
import Header from 'components/Header';
import HeadMatter from 'components/HeadMatter';
import CodeBlock from 'components/CodeBlock';
import { ViewerData } from 'data/queries';

interface Props {
  viewerData?: ViewerData;
}

const HomePage: React.FC<Props> = ({ viewerData }) => {
  const title = 'Backend services for frontend developers';
  const description = 'Form backend, Stripe payments, and more.';

  return (
    <main>
      <HeadMatter title={title} description={description} />
      <Header viewerData={viewerData} />

      <div className="mx-auto container pt-16 sm:pt-32 pb-10 sm:pb-24">
        <div className="px-6 mx-auto max-w-5xl">
          <h1 className="pb-8 text-5xl sm:text-6xl font-bold leading-none sm:leading-tighter tracking-tight sm:text-center text-gray-900">
            Why build a backend if
            <br className="hidden lg:block" /> you don&rsquo;t have to?
          </h1>

          <div className="max-w-2xl mx-auto pb-24 text-xl sm:text-2xl text-gray-700 sm:text-center leading-snug sm:tracking-snug">
            <p className="pb-8">
              As a front-end developer, you hate it when you&rsquo;re forced to
              put down the tools you love and write backend code for stuff like
              forms and payments. We spare you that pain.
            </p>

            <p>
              <strong className="mt-4 text-gray-800">
                StaticKit gives you custom server-side functionality, entirely
                within your frontend codebase.
              </strong>
            </p>
          </div>
        </div>

        <div className="mx-auto container max-w-5xl pb-8 sm:pb-12">
          <div className="flex flex-wrap">
            <div className="p-6 md:w-1/2 lg:w-1/3">
              <div className="pb-4 flex items-center">
                <div className="mr-6 h-12 w-12">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<svg width="48" height="50" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="prefix__a" d="M0 .008h47.104v49.98H0z"/></defs><g fill="none" fill-rule="evenodd"><path d="M35.432 23.631a4.031 4.031 0 011.036 0c.186-.426.218-1.161.05-1.961-.248-1.19-.585-1.91-1.28-1.798-.695.112-.72.974-.472 2.164.14.669.389 1.24.666 1.595M29.464 24.573c.497.218.803.363.922.236.077-.078.054-.229-.064-.423-.246-.4-.751-.807-1.287-1.035-1.095-.472-2.402-.315-3.41.41-.333.243-.648.58-.603.786.014.066.064.116.18.133.275.031 1.234-.454 2.339-.521.78-.048 1.425.196 1.923.414M28.463 25.144c-.648.102-1.005.316-1.235.514-.195.171-.316.36-.315.494 0 .063.028.1.05.118.029.026.064.04.106.04.146 0 .474-.131.474-.131.901-.323 1.496-.284 2.086-.217.325.037.48.057.55-.055.022-.032.047-.101-.018-.207-.152-.246-.806-.662-1.698-.556M33.417 27.24c.44.216.924.131 1.082-.19.157-.32-.072-.756-.512-.972-.44-.216-.924-.131-1.081.19-.158.32.07.755.51.972M36.245 24.769c-.358-.007-.654.386-.662.876-.009.49.274.892.632.898.357.006.654-.386.662-.876.008-.49-.275-.893-.632-.898" fill="#0A0B09"/><mask id="prefix__b" fill="#fff"><use xlink:href="#prefix__a"/></mask><path d="M12.241 33.605c-.089-.111-.235-.077-.376-.044-.1.023-.21.049-.334.047-.262-.006-.485-.118-.61-.31-.163-.25-.153-.623.026-1.05.024-.057.053-.12.084-.19.287-.644.766-1.72.228-2.745-.406-.772-1.067-1.253-1.861-1.354-.764-.097-1.55.186-2.05.74-.79.871-.915 2.058-.762 2.478.056.153.144.196.208.204.134.018.333-.08.458-.415.009-.024.02-.061.035-.109.056-.177.16-.507.329-.771a1.435 1.435 0 011.99-.414c.553.362.766 1.04.53 1.688-.122.335-.32.975-.277 1.501.089 1.065.744 1.493 1.332 1.538.572.022.972-.3 1.073-.534.06-.14.01-.224-.023-.26" fill="#0A0B09" mask="url(#prefix__b)"/><path d="M17.68 14.047c1.866-2.156 4.164-4.031 6.221-5.084.072-.036.147.041.109.11-.164.297-.478.93-.578 1.411-.016.075.066.131.129.088 1.28-.872 3.507-1.808 5.46-1.928.085-.005.125.103.059.154a4.653 4.653 0 00-.86.862.083.083 0 00.066.133c1.371.01 3.305.49 4.565 1.197.086.048.025.213-.07.19-1.908-.436-5.029-.768-8.271.023-2.895.706-5.104 1.796-6.716 2.968-.082.06-.18-.048-.114-.124zm16.99 21.801a.15.15 0 00.087-.149.14.14 0 00-.154-.125s-3.982.59-7.744-.788c.41-1.332 1.499-.851 3.146-.718a23 23 0 007.595-.821c1.704-.489 3.942-1.453 5.68-2.825.586 1.288.793 2.705.793 2.705s.454-.081.833.152c.359.22.622.68.442 1.864-.366 2.215-1.307 4.012-2.889 5.666a11.907 11.907 0 01-3.47 2.593 14.65 14.65 0 01-2.265.956c-5.964 1.948-12.068-.193-14.036-4.791a7.39 7.39 0 01-.394-1.087c-.839-3.03-.127-6.665 2.098-8.954.138-.147.278-.318.278-.534 0-.18-.115-.371-.215-.506-.778-1.13-3.475-3.054-2.934-6.778.389-2.675 2.729-4.56 4.91-4.448l.553.032c.945.056 1.77.177 2.548.21 1.302.056 2.474-.133 3.86-1.289.469-.39.844-.728 1.479-.835.067-.012.232-.071.564-.056.339.018.661.111.95.304 1.113.74 1.27 2.532 1.328 3.844.033.748.124 2.559.155 3.079.07 1.188.383 1.356 1.015 1.564.356.117.686.204 1.172.34 1.472.414 2.345.833 2.895 1.372.328.336.48.694.528 1.035.173 1.267-.984 2.83-4.046 4.252-3.347 1.554-7.408 1.947-10.213 1.635a611.2 611.2 0 01-.983-.111c-2.245-.303-3.525 2.598-2.178 4.585.868 1.28 3.233 2.114 5.598 2.115 5.425 0 9.594-2.316 11.145-4.317.046-.06.05-.066.124-.177.076-.114.013-.178-.082-.113-1.267.867-6.895 4.31-12.915 3.274 0 0-.731-.12-1.4-.38-.53-.207-1.64-.718-1.775-1.857 4.858 1.502 7.917.082 7.917.082zM7.986 24.302c-1.69.329-3.18 1.287-4.09 2.61-.544-.455-1.558-1.333-1.737-1.676-1.454-2.76 1.587-8.128 3.71-11.158C11.12 6.587 19.34.918 23.147 1.946c.618.175 2.667 2.55 2.667 2.55S22.01 6.609 18.481 9.55c-4.753 3.66-8.344 8.98-10.495 14.752zm2.839 12.668a4.05 4.05 0 01-.78.054c-2.542-.068-5.288-2.356-5.56-5.07-.303-3 1.23-5.31 3.944-5.857a4.623 4.623 0 011.14-.08c1.52.082 3.761 1.25 4.273 4.563.454 2.934-.266 5.92-3.017 6.39zm34.437-5.312c-.022-.077-.164-.596-.359-1.22-.194-.626-.396-1.066-.396-1.066.782-1.17.795-2.217.692-2.81-.111-.735-.417-1.361-1.034-2.009-.617-.647-1.878-1.31-3.65-1.808-.203-.057-.872-.24-.93-.258-.005-.038-.05-2.193-.09-3.117-.03-.669-.087-1.713-.41-2.74-.386-1.392-1.059-2.61-1.898-3.389 2.316-2.4 3.762-5.045 3.759-7.314-.007-4.364-5.366-5.684-11.97-2.95l-1.4.595c-.005-.006-2.529-2.482-2.567-2.515C17.48-5.511-6.06 20.656 1.466 27.01l1.644 1.393c-.426 1.106-.594 2.372-.457 3.734.176 1.749 1.078 3.425 2.54 4.72 1.388 1.23 3.214 2.009 4.985 2.008 2.929 6.75 9.62 10.89 17.467 11.123 8.417.25 15.483-3.7 18.443-10.794.194-.498 1.016-2.742 1.016-4.722 0-1.99-1.125-2.815-1.842-2.815z" fill="currentColor" mask="url(#prefix__b)"/></g></svg>`
                    }}
                  />
                </div>
                <div className="flex items-center h-12 w-12">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<svg width="43" height="39"><path d="M20.55 30.79c7.308 0 12.957-5.515 12.957-12.316 0-6.373-5.307-10.263-8.822-10.263-4.895 0-8.819 3.43-9.378 8.522-.103.943-.851 1.734-1.801 1.727a594.317 594.317 0 00-5.326-.02c-.625.002-1.142-.504-1.111-1.129.219-4.416 1.698-8.545 4.517-11.717C14.72 2.069 19.283 0 24.685 0c9.076 0 17.644 8.236 17.644 18.474C42.329 29.81 32.923 39 20.742 39 12.055 39 3.306 33.33.252 25.405a.172.172 0 01-.008-.092c.04-.235.121-.449.2-.66.116-.306.23-.606.213-.952l-.053-1.104a1.345 1.345 0 01.78-1.283l.442-.205c.502-.232.86-.693.96-1.237.149-.81.86-1.398 1.691-1.398 1.298 0 2.426.861 2.85 2.086 2.04 5.896 5.282 10.23 13.222 10.23z" fill="#FB6970" fill-rule="nonzero"/></svg>`
                    }}
                  />
                </div>
              </div>
              <h3 className="pb-2 text-2xl font-semibold text-gray-900">
                Opt-In Forms
              </h3>
              <p className="text-lg text-gray-700">
                Add subscribers and track events in your Mailchimp or ConvertKit
                account.
              </p>
            </div>

            <div className="p-6 md:w-1/2 lg:w-1/3">
              <div className="pb-4">
                <img
                  src="/static/stripe-icon.jpg"
                  alt="stripe"
                  className="h-12 w-12 rounded-full"
                />
              </div>
              <h3 className="pb-2 text-2xl font-semibold text-gray-900">
                Payment Flows
              </h3>
              <p className="text-lg text-gray-700">
                Create customers, charges, and subscriptions in your Stripe
                account.
              </p>
            </div>

            <div className="p-6 md:w-1/2 lg:w-1/3">
              <div className="pb-4">
                <div className="flex items-center h-12 w-12">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<svg width="47" height="38"><g stroke="#FFF" stroke-width="3" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><path d="M6.3 2h34.4C43.065 2 45 3.913 45 6.25v25.5c0 2.337-1.935 4.25-4.3 4.25H6.3C3.935 36 2 34.087 2 31.75V6.25C2 3.913 3.935 2 6.3 2z" fill="#5A67D8"/><path d="M45 6L23.5 21 2 6"/></g></svg>`
                    }}
                  />
                </div>
              </div>
              <h3 className="pb-2 text-2xl font-semibold text-gray-900">
                Contact Forms
              </h3>
              <p className="text-lg text-gray-700">
                Gather form submissions and receive email notifications when
                someone writes in.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 border-b border-gray-800">
        <div className="mx-auto container py-16 sm:py-24">
          <div className="px-6 pb-16 sm:pb-24 mx-auto max-w-4xl">
            <h1 className="pb-4 text-4xl sm:text-5xl font-bold leading-tight tracking-tight sm:text-center text-gray-300">
              How It Works, In a Nutshell
            </h1>
            <p className="pb-6 text-lg sm:text-xl text-gray-500 sm:text-center mx-auto max-w-3xl">
              Configure what you need in your{' '}
              <code className="mx-1 px-3 py-1 text-base rounded-full bg-gray-800">
                statickit.json
              </code>{' '}
              file and we&rsquo;ll generate a custom npm package with
              TypeScript-enabled function definitions. This means you
              don&rsquo;t have to make any{' '}
              <code className="mx-1 px-3 py-1 text-base rounded-full bg-gray-800">
                fetch
              </code>{' '}
              calls or learn any new low-level APIs.
            </p>
            <p className="text-lg sm:text-xl text-gray-300 font-bold sm:text-center mx-auto max-w-3xl">
              All you have to do is call your functions.
            </p>
          </div>
          <div className="px-6 mx-auto max-w-5xl">
            <div className="mx-auto max-w-2xl">
              <div className="pb-16">
                <h2 className="ml-2 pb-4 text-base font-bold flex items-center">
                  <div className="text-xs text-gray-900 mr-2 py-px px-2 bg-yellow-600 rounded-full whitespace-no-wrap">
                    Step 1
                  </div>{' '}
                  <div className="text-yellow-500">Configure your backend</div>
                </h2>

                <CodeBlock className="language-json" copy={false}>
                  {`
{
  "functions": {
    "sendContactForm": {
      "type": "sendNotification",
      "to": "me@example.com"
    }
  }
}
                  `}
                </CodeBlock>

                <p className="px-4 pt-4 text-sm text-gray-500">
                  This is what a
                  <span className="text-xs rounded-full mx-1 py-px px-2 font-bold font-mono bg-gray-800 text-gray-500">
                    statickit.json
                  </span>{' '}
                  file might look like.
                </p>
              </div>

              <div className="pb-16">
                <h2 className="ml-2 pb-4 text-base font-bold flex items-center">
                  <div className="text-xs text-gray-900 mr-2 py-px px-2 bg-green-600 rounded-full whitespace-no-wrap">
                    Step 2
                  </div>{' '}
                  <div className="text-green-500">Deploy your config</div>
                </h2>

                <CodeBlock className="language-shell" copy={false}>
                  {`$ statickit deploy`}
                </CodeBlock>

                <p className="px-4 pt-4 text-sm text-gray-500">
                  We'll install a
                  <span className="text-xs rounded-full mx-1 py-px px-2 font-bold font-mono bg-gray-800 text-gray-500">
                    @statickit/functions
                  </span>
                  package for you.
                </p>
              </div>

              <div className="pb-16">
                <h2 className="ml-2 pb-4 text-base font-bold flex items-center">
                  <div className="text-xs text-gray-900 mr-2 py-px px-2 bg-pink-600 rounded-full whitespace-no-wrap">
                    Step 3
                  </div>{' '}
                  <div className="text-pink-500">
                    Tell your backend what to do
                  </div>
                </h2>

                <CodeBlock
                  className="language-jsx"
                  highlight="9,10,11,12"
                  copy={false}
                >
                  {`
import { sendContactForm } from '@statickit/functions';

let { status } = await sendContactForm(client, {
  subject: 'New contact form submission',
  fields: { email, message }
});
                  `}
                </CodeBlock>

                <p className="px-4 pt-4 text-sm text-gray-500">
                  Call your functions from your React components, or whatever
                  else you are using.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto container">
          <div className="max-w-5xl mx-auto px-6 py-20 sm:flex items-center justify-center border-t border-gray-800">
            <div className="mr-6 pb-8 sm:pb-0 text-lg tracking-snug text-gray-500">
              Go forth and build.
            </div>
            <div className="flex-shrink-0">
              <Link href="/signup">
                <a className="btn sm:block">Sign up free</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
