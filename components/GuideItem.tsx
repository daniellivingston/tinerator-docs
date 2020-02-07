import Link from 'next/link';

const GuideItem = ({ title, href, children }) => {
  return (
    <div className="py-8 pr-8">
      <h2 className="pb-2 font-semibold text-xl text-gray-800 leading-normal tracking-snug">
        <Link href={href}>
          <a>{title}</a>
        </Link>
      </h2>
      <p className="pb-3 text-gray-600 leading-normal">{children}</p>
      <p>
        <a href={href} className="text-indigo-600 font-semibold">
          Read the guide &rarr;
        </a>
      </p>
    </div>
  );
};

export default GuideItem;
