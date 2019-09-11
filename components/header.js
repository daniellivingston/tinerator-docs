import Link from 'next/link';
import Head from 'next/head';

const logo = `
<svg width="105px" height="26px" viewBox="0 0 105 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g>
          <g stroke="#000000" stroke-width="3">
              <path d="M1.5,1.5 L1.5,24.5 L24.5,24.5 L24.5,1.5 L1.5,1.5 Z"></path>
              <path d="M8.5,13 L17.5,13" stroke-linecap="square" transform="translate(13.000000, 13.000000) rotate(-45.000000) translate(-13.000000, -13.000000) "></path>
          </g>
          <path d="M40.046,10.068 C39.7819987,9.73199832 39.4370021,9.46500099 39.011,9.267 C38.5849979,9.06899901 38.174002,8.97 37.778,8.97 C37.573999,8.97 37.367001,8.98799982 37.157,9.024 C36.946999,9.06000018 36.7580008,9.12899949 36.59,9.231 C36.4219992,9.33300051 36.2810006,9.46499919 36.167,9.627 C36.0529994,9.78900081 35.996,9.99599874 35.996,10.248 C35.996,10.4640011 36.0409996,10.6439993 36.131,10.788 C36.2210004,10.932 36.3529991,11.0579995 36.527,11.166 C36.7010009,11.2740005 36.9079988,11.3729995 37.148,11.463 C37.3880012,11.5530004 37.6579985,11.6459995 37.958,11.742 C38.3900022,11.8860007 38.8399977,12.0449991 39.308,12.219 C39.7760023,12.3930009 40.2019981,12.6239986 40.586,12.912 C40.9700019,13.2000014 41.2879987,13.5569979 41.54,13.983 C41.7920013,14.4090021 41.918,14.9399968 41.918,15.576 C41.918,16.3080037 41.7830013,16.9409973 41.513,17.475 C41.2429987,18.0090027 40.8800023,18.4499983 40.424,18.798 C39.9679977,19.1460017 39.4460029,19.4039992 38.858,19.572 C38.27,19.7400008 37.6640031,19.824 37.04,19.824 C36.1279954,19.824 35.2460043,19.6650016 34.394,19.347 C33.5419957,19.0289984 32.8340028,18.5760029 32.27,17.988 L34.286,15.936 C34.5980016,16.3200019 35.0089975,16.6409987 35.519,16.899 C36.0290026,17.1570013 36.5359975,17.286 37.04,17.286 C37.2680011,17.286 37.4899989,17.2620002 37.706,17.214 C37.9220011,17.1659998 38.1109992,17.0880005 38.273,16.98 C38.4350008,16.8719995 38.5639995,16.7280009 38.66,16.548 C38.7560005,16.3679991 38.804,16.1520013 38.804,15.9 C38.804,15.6599988 38.7440006,15.4560008 38.624,15.288 C38.5039994,15.1199992 38.3330011,14.9670007 38.111,14.829 C37.8889989,14.6909993 37.6130017,14.5650006 37.283,14.451 C36.9529984,14.3369994 36.5780021,14.2140007 36.158,14.082 C35.749998,13.9499993 35.3510019,13.7940009 34.961,13.614 C34.5709981,13.4339991 34.2230015,13.2030014 33.917,12.921 C33.6109985,12.6389986 33.3650009,12.297002 33.179,11.895 C32.9929991,11.492998 32.9,11.0040029 32.9,10.428 C32.9,9.71999646 33.0439986,9.11400252 33.332,8.61 C33.6200014,8.10599748 33.9979977,7.69200162 34.466,7.368 C34.9340023,7.04399838 35.4619971,6.80700075 36.05,6.657 C36.6380029,6.50699925 37.231997,6.432 37.832,6.432 C38.5520036,6.432 39.2869963,6.56399868 40.037,6.828 C40.7870037,7.09200132 41.4439972,7.48199742 42.008,7.998 L40.046,10.068 Z M46.994,12.75 L46.994,16.17 C46.994,16.5900021 47.0749992,16.9049989 47.237,17.115 C47.3990008,17.325001 47.6899979,17.43 48.11,17.43 C48.2540007,17.43 48.4069992,17.4180001 48.569,17.394 C48.7310008,17.3699999 48.8659995,17.3340002 48.974,17.286 L49.01,19.446 C48.805999,19.5180004 48.5480016,19.5809997 48.236,19.635 C47.9239984,19.6890003 47.6120016,19.716 47.3,19.716 C46.699997,19.716 46.196002,19.6410007 45.788,19.491 C45.379998,19.3409992 45.0530012,19.1250014 44.807,18.843 C44.5609988,18.5609986 44.3840005,18.2250019 44.276,17.835 C44.1679995,17.444998 44.114,17.0100024 44.114,16.53 L44.114,12.75 L42.674,12.75 L42.674,10.536 L44.096,10.536 L44.096,8.178 L46.994,8.178 L46.994,10.536 L49.1,10.536 L49.1,12.75 L46.994,12.75 Z M55.778,15.594 L55.4,15.594 C55.0759984,15.594 54.7490017,15.6089998 54.419,15.639 C54.0889984,15.6690001 53.7950013,15.7259996 53.537,15.81 C53.2789987,15.8940004 53.0660008,16.0169992 52.898,16.179 C52.7299992,16.3410008 52.646,16.5539987 52.646,16.818 C52.646,16.9860008 52.6849996,17.1299994 52.763,17.25 C52.8410004,17.3700006 52.9399994,17.4659996 53.06,17.538 C53.1800006,17.6100004 53.3179992,17.6609998 53.474,17.691 C53.6300008,17.7210002 53.7799993,17.736 53.924,17.736 C54.524003,17.736 54.9829984,17.5710016 55.301,17.241 C55.6190016,16.9109983 55.778,16.4640028 55.778,15.9 L55.778,15.594 Z M50.36,11.76 C50.8880026,11.2559975 51.5029965,10.8780013 52.205,10.626 C52.9070035,10.3739987 53.6239963,10.248 54.356,10.248 C55.1120038,10.248 55.7509974,10.3409991 56.273,10.527 C56.7950026,10.7130009 57.2179984,11.000998 57.542,11.391 C57.8660016,11.7810019 58.1029993,12.272997 58.253,12.867 C58.4030008,13.461003 58.478,14.1659959 58.478,14.982 L58.478,19.5 L55.778,19.5 L55.778,18.546 L55.724,18.546 C55.4959989,18.9180019 55.1510023,19.205999 54.689,19.41 C54.2269977,19.614001 53.7260027,19.716 53.186,19.716 C52.8259982,19.716 52.4540019,19.6680005 52.07,19.572 C51.6859981,19.4759995 51.3350016,19.3200011 51.017,19.104 C50.6989984,18.8879989 50.438001,18.6000018 50.234,18.24 C50.029999,17.8799982 49.928,17.4360026 49.928,16.908 C49.928,16.2599968 50.1049982,15.738002 50.459,15.342 C50.8130018,14.945998 51.2689972,14.6400011 51.827,14.424 C52.3850028,14.2079989 53.0059966,14.0640004 53.69,13.992 C54.3740034,13.9199996 55.0399968,13.884 55.688,13.884 L55.688,13.74 C55.688,13.2959978 55.5320016,12.969001 55.22,12.759 C54.9079984,12.5489989 54.5240023,12.444 54.068,12.444 C53.6479979,12.444 53.243002,12.5339991 52.853,12.714 C52.4629981,12.8940009 52.1300014,13.1099987 51.854,13.362 L50.36,11.76 Z M63.778,12.75 L63.778,16.17 C63.778,16.5900021 63.8589992,16.9049989 64.021,17.115 C64.1830008,17.325001 64.4739979,17.43 64.894,17.43 C65.0380007,17.43 65.1909992,17.4180001 65.353,17.394 C65.5150008,17.3699999 65.6499995,17.3340002 65.758,17.286 L65.794,19.446 C65.589999,19.5180004 65.3320016,19.5809997 65.02,19.635 C64.7079984,19.6890003 64.3960016,19.716 64.084,19.716 C63.483997,19.716 62.980002,19.6410007 62.572,19.491 C62.163998,19.3409992 61.8370012,19.1250014 61.591,18.843 C61.3449988,18.5609986 61.1680005,18.2250019 61.06,17.835 C60.9519995,17.444998 60.898,17.0100024 60.898,16.53 L60.898,12.75 L59.458,12.75 L59.458,10.536 L60.88,10.536 L60.88,8.178 L63.778,8.178 L63.778,10.536 L65.884,10.536 L65.884,12.75 L63.778,12.75 Z M70.474,7.674 C70.474,7.90200114 70.4290005,8.11499901 70.339,8.313 C70.2489996,8.51100099 70.1290008,8.68199928 69.979,8.826 C69.8289993,8.97000072 69.6490011,9.08399958 69.439,9.168 C69.228999,9.25200042 69.0100011,9.294 68.782,9.294 C68.3019976,9.294 67.9000016,9.13500159 67.576,8.817 C67.2519984,8.49899841 67.09,8.11800222 67.09,7.674 C67.09,7.45799892 67.1319996,7.25100099 67.216,7.053 C67.3000004,6.85499901 67.4199992,6.68400072 67.576,6.54 C67.7320008,6.39599928 67.911999,6.27900045 68.116,6.189 C68.320001,6.09899955 68.5419988,6.054 68.782,6.054 C69.0100011,6.054 69.228999,6.09599958 69.439,6.18 C69.6490011,6.26400042 69.8289993,6.37799928 69.979,6.522 C70.1290008,6.66600072 70.2489996,6.83699901 70.339,7.035 C70.4290005,7.23300099 70.474,7.44599886 70.474,7.674 Z M67.306,19.5 L67.306,10.536 L70.258,10.536 L70.258,19.5 L67.306,19.5 Z M78.272,13.434 C78.1039992,13.2179989 77.8760014,13.0440007 77.588,12.912 C77.2999986,12.7799993 77.0060015,12.714 76.706,12.714 C76.3939984,12.714 76.1120013,12.7769994 75.86,12.903 C75.6079987,13.0290006 75.3920009,13.1969989 75.212,13.407 C75.0319991,13.617001 74.8910005,13.8599986 74.789,14.136 C74.6869995,14.4120014 74.636,14.7059984 74.636,15.018 C74.636,15.3300016 74.6839995,15.6239986 74.78,15.9 C74.8760005,16.1760014 75.0169991,16.4189989 75.203,16.629 C75.3890009,16.8390011 75.6109987,17.0039994 75.869,17.124 C76.1270013,17.2440006 76.4179984,17.304 76.742,17.304 C77.0420015,17.304 77.3389985,17.2470006 77.633,17.133 C77.9270015,17.0189994 78.1639991,16.8540011 78.344,16.638 L79.982,18.636 C79.6099981,18.9960018 79.1300029,19.277999 78.542,19.482 C77.9539971,19.686001 77.3300033,19.788 76.67,19.788 C75.9619965,19.788 75.3020031,19.6800011 74.69,19.464 C74.0779969,19.248 73.5470023,18.9330021 73.097,18.519 C72.6469977,18.1049979 72.2930013,17.6040029 72.035,17.016 C71.7769987,16.4279971 71.648,15.7620037 71.648,15.018 C71.648,14.2859963 71.7769987,13.6260029 72.035,13.038 C72.2930013,12.4499971 72.6469977,11.9490021 73.097,11.535 C73.5470023,11.1209979 74.0779969,10.8030011 74.69,10.581 C75.3020031,10.3589989 75.9559965,10.248 76.652,10.248 C76.9760016,10.248 77.2969984,10.2779997 77.615,10.338 C77.9330016,10.3980003 78.2389985,10.4789995 78.533,10.581 C78.8270015,10.6830005 79.0969988,10.8089992 79.343,10.959 C79.5890012,11.1090007 79.8019991,11.2739991 79.982,11.454 L78.272,13.434 Z M89.108,19.5 L84.374,13.632 L84.338,13.632 L84.338,19.5 L81.314,19.5 L81.314,6.756 L84.338,6.756 L84.338,11.94 L84.392,11.94 L88.946,6.756 L92.798,6.756 L87.308,12.624 L93.122,19.5 L89.108,19.5 Z M97.154,7.674 C97.154,7.90200114 97.1090005,8.11499901 97.019,8.313 C96.9289996,8.51100099 96.8090008,8.68199928 96.659,8.826 C96.5089993,8.97000072 96.3290011,9.08399958 96.119,9.168 C95.908999,9.25200042 95.6900011,9.294 95.462,9.294 C94.9819976,9.294 94.5800016,9.13500159 94.256,8.817 C93.9319984,8.49899841 93.77,8.11800222 93.77,7.674 C93.77,7.45799892 93.8119996,7.25100099 93.896,7.053 C93.9800004,6.85499901 94.0999992,6.68400072 94.256,6.54 C94.4120008,6.39599928 94.591999,6.27900045 94.796,6.189 C95.000001,6.09899955 95.2219988,6.054 95.462,6.054 C95.6900011,6.054 95.908999,6.09599958 96.119,6.18 C96.3290011,6.26400042 96.5089993,6.37799928 96.659,6.522 C96.8090008,6.66600072 96.9289996,6.83699901 97.019,7.035 C97.1090005,7.23300099 97.154,7.44599886 97.154,7.674 Z M93.986,19.5 L93.986,10.536 L96.938,10.536 L96.938,19.5 L93.986,19.5 Z M102.482,12.75 L102.482,16.17 C102.482,16.5900021 102.562999,16.9049989 102.725,17.115 C102.887001,17.325001 103.177998,17.43 103.598,17.43 C103.742001,17.43 103.894999,17.4180001 104.057,17.394 C104.219001,17.3699999 104.353999,17.3340002 104.462,17.286 L104.498,19.446 C104.293999,19.5180004 104.036002,19.5809997 103.724,19.635 C103.411998,19.6890003 103.100002,19.716 102.788,19.716 C102.187997,19.716 101.684002,19.6410007 101.276,19.491 C100.867998,19.3409992 100.541001,19.1250014 100.295,18.843 C100.048999,18.5609986 99.8720005,18.2250019 99.764,17.835 C99.6559995,17.444998 99.602,17.0100024 99.602,16.53 L99.602,12.75 L98.162,12.75 L98.162,10.536 L99.584,10.536 L99.584,8.178 L102.482,8.178 L102.482,10.536 L104.588,10.536 L104.588,12.75 L102.482,12.75 Z" id="StaticKit" fill="#000000" fill-rule="nonzero"></path>
      </g>
  </g>
</svg>
`;

export default props => (
  <header className="mx-auto container px-6 py-4">
    <Head>
      <title>{props.pageTitle} · StaticKit</title>
      <link rel="shortcut icon" href="/static/favicon.ico"></link>
    </Head>
    <div className="flex items-center h-10">
      <div className="flex-grow">
        <Link href="/">
          <a className="flex items-center">
            <span dangerouslySetInnerHTML={{ __html: logo }} />
          </a>
        </Link>
      </div>
      <div className="hidden sm:block text-sm text-gray-700">
        <Link href="/docs">
          <a className="px-3">Docs</a>
        </Link>

        <Link href="/guides">
          <a className="px-3">Guides</a>
        </Link>

        <a
          href="https://jsfiddle.net/user/StaticKit/fiddles/"
          className="px-3"
          target="_blank"
        >
          Examples
        </a>

        <Link href="/pricing">
          <a className="px-3">Pricing</a>
        </Link>

        <a
          href="https://app.statickit.com/signup"
          className="ml-6 btn btn-sm btn-outline"
        >
          Sign up
        </a>
      </div>
    </div>
  </header>
);
