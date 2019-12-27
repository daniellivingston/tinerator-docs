import Header from 'components/header';
import OpenGraph from 'components/open_graph';
import CodeBlock from 'components/code_block';
import ContactFormDemo from 'components/demos/contact-form';
import Link from 'next/link';

const stepOne = `
{
  "forms": {
    "contact": {
      "name": "Contact Form",
      "fields": {
        "email": { "type": "email", "required": true },
        "message": { "type": "text", "required": true }
      },
      "actions": [
        { "type": "email", "to": "jane@example.com" }
      ]
    }
  }
}
`;

const stepTwo = `
statickit deploy
`;

const reactIcon = `
<svg width="40px" height="36px" viewBox="0 0 40 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="React-icon" fill="#61DAFB" fill-rule="nonzero">
            <path d="M40,17.651098 C40,15.0256486 36.6816143,12.5375305 31.5939666,10.9945741 C32.7680391,5.85677164 32.2462291,1.76914895 29.9470037,0.460463425 C29.4170404,0.153487808 28.7973909,0.00807830571 28.1206686,0.00807830571 L28.1206686,1.80954048 C28.4957195,1.80954048 28.7973909,1.88224523 29.0501427,2.01957643 C30.158989,2.64968427 30.6400326,5.04894107 30.2649817,8.13485385 C30.1752956,8.89421459 30.0285365,9.69396685 29.8491643,10.5098757 C28.2511211,10.1221171 26.5063188,9.82321974 24.6718304,9.62934041 C23.5711374,8.13485385 22.4296779,6.77769849 21.2800652,5.59018755 C23.9380351,3.14246092 26.4329393,1.80146217 28.1288219,1.80146217 L28.1288219,0 C28.1288219,0 28.1288219,0 28.1288219,0 C25.8866694,0 22.951488,1.58334792 19.9836934,4.32997186 C17.0158989,1.59950453 14.0807175,0.0323132228 11.838565,0.0323132228 L11.838565,1.8337754 C13.5262943,1.8337754 16.0293518,3.16669584 18.6873216,5.59826586 C17.5458622,6.7857768 16.4044028,8.13485385 15.3200163,9.62934041 C13.4773746,9.82321974 11.7325724,10.1221171 10.1345291,10.517954 C9.94700367,9.71012346 9.80839788,8.92652781 9.7105585,8.17524538 C9.32735426,5.0893326 9.8002446,2.6900758 10.9009376,2.05188965 C11.1455361,1.90648015 11.4635141,1.8418537 11.838565,1.8418537 L11.838565,0.0403915286 C11.838565,0.0403915286 11.838565,0.0403915286 11.838565,0.0403915286 C11.1536894,0.0403915286 10.53404,0.185801031 9.99592336,0.492776648 C7.7048512,1.80146217 7.19119446,5.88100656 8.3734203,11.0026524 C3.30207909,12.5536871 0,15.0337269 0,17.651098 C0,20.2765473 3.31838565,22.7646655 8.40603343,24.3076219 C7.23196086,29.4454243 7.75377089,33.533047 10.0529963,34.8417325 C10.5829596,35.1487081 11.2026091,35.2941176 11.8874847,35.2941176 C14.1296372,35.2941176 17.0648186,33.7107697 20.0326131,30.9641458 C23.0004077,33.6946131 25.9355891,35.2618044 28.1777415,35.2618044 C28.8626172,35.2618044 29.4822666,35.1163949 30.0203832,34.8094193 C32.3114554,33.5007338 32.8251121,29.4211894 31.6428863,24.2995436 C36.6979209,22.7565872 40,20.268469 40,17.651098 Z M29.3844272,12.2628681 C29.0827558,13.3049695 28.7077049,14.3793842 28.2837342,15.4537988 C27.9494497,14.8075344 27.5988585,14.1612699 27.2156543,13.5150055 C26.8406033,12.868741 26.4410925,12.2386332 26.0415817,11.6246819 C27.1993477,11.7943263 28.3163473,12.0043623 29.3844272,12.2628681 Z M25.6502242,20.8662636 C25.0142682,21.9568349 24.3620057,22.9908581 23.6852833,23.9521764 C22.4704444,24.0571944 21.2392988,24.1137425 20,24.1137425 C18.7688545,24.1137425 17.5377089,24.0571944 16.3310232,23.9602547 C15.6543009,22.9989364 14.993885,21.9729915 14.3579291,20.8904986 C13.7382797,19.8322405 13.1757032,18.7578259 12.6620465,17.6753329 C13.1675499,16.5928399 13.7382797,15.510347 14.3497758,14.4520889 C14.9857318,13.3615176 15.6379943,12.3274945 16.3147167,11.3661761 C17.5295556,11.2611582 18.7607012,11.20461 20,11.20461 C21.2311455,11.20461 22.4622911,11.2611582 23.6689768,11.3580978 C24.3456991,12.3194162 25.006115,13.345361 25.6420709,14.427854 C26.2617203,15.486112 26.8242968,16.5605267 27.3379535,17.6430197 C26.8242968,18.7255126 26.2617203,19.8080056 25.6502242,20.8662636 Z M28.2837342,19.8160839 C28.7240114,20.8985769 29.0990624,21.9810698 29.4088871,23.0312496 C28.3408072,23.2897554 27.2156543,23.5078696 26.049735,23.677514 C26.4492458,23.0554845 26.8487566,22.4172983 27.2238076,21.7629556 C27.5988585,21.1166911 27.9494497,20.4623484 28.2837342,19.8160839 Z M20.0163066,28.4356361 C19.2580514,27.6601188 18.4997962,26.79574 17.7496943,25.8505783 C18.4834896,25.8828915 19.2335915,25.9071264 19.9918467,25.9071264 C20.7582552,25.9071264 21.5165104,25.8909698 22.258459,25.8505783 C21.5246637,26.79574 20.7664085,27.6601188 20.0163066,28.4356361 Z M13.950265,23.677514 C12.792499,23.5078696 11.6754994,23.2978337 10.6074195,23.0393279 C10.9090909,21.9972264 11.2841419,20.9228118 11.7081125,19.8483971 C12.0423971,20.4946616 12.3929882,21.140926 12.7761924,21.7871905 C13.1593967,22.433455 13.5507542,23.0635628 13.950265,23.677514 Z M19.9755402,6.86655985 C20.7337954,7.6420772 21.4920506,8.50645591 22.2421525,9.45161768 C21.5083571,9.41930446 20.7582552,9.39506954 20,9.39506954 C19.2335915,9.39506954 18.4753363,9.41122615 17.7333877,9.45161768 C18.467183,8.50645591 19.2254382,7.6420772 19.9755402,6.86655985 Z M13.9421117,11.6246819 C13.5426009,12.2467115 13.1430901,12.8848976 12.7680391,13.5392404 C12.3929882,14.1855048 12.0423971,14.8317693 11.7081125,15.4780337 C11.2678353,14.3955408 10.8927843,13.3130478 10.5829596,12.2628681 C11.6510395,12.0124406 12.7761924,11.7943263 13.9421117,11.6246819 Z M6.56339177,21.7387207 C3.67713004,20.5188965 1.81002854,18.919392 1.81002854,17.651098 C1.81002854,16.382804 3.67713004,14.7752211 6.56339177,13.5634753 C7.26457399,13.264578 8.03098247,12.9979939 8.82185079,12.7475664 C9.28658785,14.3309143 9.89808398,15.9788887 10.6563392,17.6672546 C9.90623726,19.3475422 9.30289442,20.9874382 8.84631064,22.5627078 C8.03913575,22.3122804 7.27272727,22.037618 6.56339177,21.7387207 Z M10.9498573,33.2826195 C9.84101101,32.6525117 9.35996739,30.2532549 9.73501834,27.1673421 C9.82470444,26.4079814 9.97146351,25.6082291 10.1508357,24.7923202 C11.7488789,25.1800789 13.4936812,25.4789762 15.3281696,25.6728555 C16.4288626,27.1673421 17.5703221,28.5244975 18.7199348,29.7120084 C16.0619649,32.159735 13.5670607,33.5007338 11.8711781,33.5007338 C11.5042805,33.4926555 11.1944558,33.4199507 10.9498573,33.2826195 Z M30.2894415,27.1269506 C30.6726457,30.2128634 30.1997554,32.6121202 29.0990624,33.2503063 C28.8544639,33.3957158 28.5364859,33.4603423 28.161435,33.4603423 C26.4737057,33.4603423 23.9706482,32.1274218 21.3126784,29.6958518 C22.4541378,28.5083409 23.5955972,27.1592638 24.6799837,25.6647772 C26.5226254,25.4708979 28.2674276,25.1720006 29.8654709,24.7761636 C30.0529963,25.5920725 30.1997554,26.3756681 30.2894415,27.1269506 Z M33.428455,21.7387207 C32.7272727,22.037618 31.9608642,22.3042021 31.1699959,22.5546295 C30.7052589,20.9712816 30.0937627,19.3233073 29.3355075,17.6349414 C30.0856095,15.9546538 30.6889523,14.3147577 31.1455361,12.7394881 C31.952711,12.9899156 32.7191194,13.264578 33.4366082,13.5634753 C36.32287,14.7832994 38.1899715,16.382804 38.1899715,17.651098 C38.1818182,18.919392 36.3147167,20.5269748 33.428455,21.7387207 Z" id="Shape"></path>
            <circle id="Oval" cx="20" cy="17.6470588" r="3.52941176"></circle>
        </g>
    </g>
</svg>
`;

const shieldIcon = `
<svg width="30px" height="37px" viewBox="0 0 30 37" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="shield" transform="translate(1.000000, 1.000000)" stroke="#E53E3E" stroke-width="2">
            <path d="M14,35 C14,35 28,28 28,17.5 L28,5.25 L14,0 L0,5.25 L0,17.5 C0,28 14,35 14,35 Z" id="Path"></path>
        </g>
    </g>
</svg>
`;

const validationIcon = `
<svg width="37px" height="37px" viewBox="0 0 37 37" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="check-circle-inside-copy-2" transform="translate(1.000000, 1.000000)" stroke="#48BB78" stroke-width="2">
            <circle id="Oval" cx="17.5" cy="17.5" r="17.5"></circle>
            <g id="Group" transform="translate(10.000000, 12.000000)">
                <line x1="15.0833328" y1="0.916666667" x2="5" y2="10.9999995" id="Path"></line>
                <line x1="0.833333333" y1="6.83333333" x2="5" y2="11" id="Path"></line>
            </g>
        </g>
    </g>
</svg>
`;

const databaseIcon = `
<svg width="34px" height="37px" viewBox="0 0 34 37" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="database" transform="translate(1.000000, 1.000000)" stroke="#5A67D8" stroke-width="2">
            <ellipse id="Oval" cx="16" cy="5.5" rx="16" ry="5.5"></ellipse>
            <path d="M32,18 C32,20.7666667 24.8888889,23 16,23 C7.11111111,23 0,20.7666667 0,18" id="Path"></path>
            <path d="M0,5 L0,29.7058824 C0,32.6352941 7.11111111,35 16,35 C24.8888889,35 32,32.6352941 32,29.7058824 L32,5" id="Path"></path>
        </g>
    </g>
</svg>
`;

function ContactFormsPage() {
  const title = 'Contact Forms';
  const description =
    'Gather contact form submissions and send a notification email to the right people.';

  return (
    <div>
      <main>
        <OpenGraph title={title} description={description} path="/" />
        <div className="bg-gray-900">
          <Header inverted={true} />

          <div className="mx-auto container pt-16 sm:pt-24 pb-10 sm:pb-24">
            <div className="px-6 mx-auto max-w-4xl">
              <div className="mb-12 pb-6 border-b-4 border-gray-800 mx-auto max-w-sm uppercase text-indigo-400 text-sm tracking-widest font-bold text-center">
                Contact Forms
              </div>
              <h1 className="pb-6 text-5xl sm:text-6xl font-bold leading-none sm:leading-tighter tracking-tight sm:text-center text-white">
                Protect your email address from spammers
              </h1>

              <div className="max-w-xl mx-auto pb-24 text-xl sm:text-2xl text-gray-500 sm:text-center leading-snug sm:tracking-snug">
                <p className="pb-8">
                  You have to provide a way for people to contact you on your
                  website, but putting your email address in plain-text is a
                  huge mistake.
                </p>

                <p className="pb-8">
                  <strong className="font-bold text-gray-300">
                    StaticKit has got you covered.
                  </strong>
                </p>
              </div>

              <div className="mx-auto max-w-2xl">
                <div className="pb-16">
                  <h2 className="ml-2 pb-4 text-base font-bold flex items-center">
                    <div className="text-xs text-gray-900 mr-2 py-px px-2 bg-yellow-600 rounded-full whitespace-no-wrap">
                      Step 1
                    </div>{' '}
                    <div className="text-yellow-500">
                      Add a form with an email notification
                    </div>
                  </h2>

                  <CodeBlock className="language-json">
                    {stepOne.trim()}
                  </CodeBlock>

                  <p className="px-4 pt-4 text-sm text-gray-500">
                    An example of a{' '}
                    <Link href="/docs/config">
                      <a className="text-xs rounded-full mx-1 py-px px-2 font-bold font-mono bg-gray-800 text-gray-500">
                        statickit.json
                      </a>
                    </Link>{' '}
                    file.
                  </p>
                </div>

                <div className="pb-16">
                  <h2 className="ml-2 pb-4 text-base font-bold flex items-center">
                    <div className="text-xs text-gray-900 mr-2 py-px px-2 bg-green-600 rounded-full whitespace-no-wrap">
                      Step 2
                    </div>{' '}
                    <div className="text-green-500">Deploy to StaticKit</div>
                  </h2>

                  <CodeBlock className="language-shell">
                    {stepTwo.trim()}
                  </CodeBlock>
                </div>

                <div className="pb-16">
                  <h2 className="ml-2 pb-4 text-base font-bold flex items-center">
                    <div className="text-xs text-gray-900 mr-2 py-px px-2 bg-pink-600 rounded-full whitespace-no-wrap">
                      Step 3
                    </div>{' '}
                    <div className="text-pink-500">Design your interface</div>
                  </h2>

                  <ContactFormDemo />

                  <p className="px-4 pt-4 text-sm text-gray-500">
                    We have{' '}
                    <Link href="/docs/react">
                      <a className="text-indigo-400">React</a>
                    </Link>{' '}
                    and{' '}
                    <Link href="/docs/html">
                      <a className="text-indigo-400">HTML</a>
                    </Link>{' '}
                    client libraries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto container pb-8">
          <div className="flex flex-wrap py-20">
            <div className="px-6 py-4 sm:py-8 sm:w-1/2 lg:w-1/4">
              <div className="pb-4 h-16 flex items-center">
                <div dangerouslySetInnerHTML={{ __html: reactIcon }}></div>
              </div>
              <h2 className="pb-1 text-xl font-semibold">
                Native React Support
              </h2>

              <p className="text-gray-700">
                Our <code className="inline-code">useForm</code> hook works
                great with Next.js, Gatsby, and other React environments.
              </p>
            </div>

            <div className="px-6 py-4 sm:py-8 sm:w-1/2 lg:w-1/4">
              <div className="pb-4 h-16 flex items-center">
                <div dangerouslySetInnerHTML={{ __html: shieldIcon }}></div>
              </div>
              <h3 className="pb-1 text-xl font-semibold">Spam Protection</h3>

              <p className="text-gray-700">
                Our proprietary spam algorithm keeps bots away, without
                subjecting users to reCAPTCHA.
              </p>
            </div>

            <div className="px-6 py-4 sm:py-8 sm:w-1/2 lg:w-1/4">
              <div className="pb-4 h-16 flex items-center">
                <div dangerouslySetInnerHTML={{ __html: validationIcon }}></div>
              </div>
              <h3 className="pb-1 text-xl font-semibold">Validation Rules</h3>

              <p className="text-gray-700">
                Ensure invalid submissions don't slip through by setting rules
                on the server-side.
              </p>
            </div>

            <div className="px-6 py-4 sm:py-8 sm:w-1/2 lg:w-1/4">
              <div className="pb-4 h-16 flex items-center">
                <div dangerouslySetInnerHTML={{ __html: databaseIcon }}></div>
              </div>
              <h3 className="pb-1 text-xl font-semibold">
                Storage &amp; Exports
              </h3>

              <p className="text-gray-700">
                We store your form submissions for you so you can always
                reference them in the future.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto container">
          <div className="max-w-5xl mx-auto px-6 py-20 sm:flex items-center justify-center border-t">
            <div className="mr-6 pb-8 sm:pb-0 text-lg tracking-snug text-gray-700">
              Create your contact form.
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://app.statickit.com/signup"
                className="btn sm:block whitespace-no-break"
              >
                Get started free
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ContactFormsPage;
