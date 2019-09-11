import Link from 'next/link';

const sections = [
  {
    path: '/docs',
    label: 'Introduction'
  },
  {
    path: '/docs/html',
    label: 'HTML'
  },
  {
    path: '/docs/react',
    label: 'React'
  }
];

const Section = ({ path, label, currentPath }) => {
  const color = path == currentPath ? 'text-gray-900' : 'text-gray-600';

  return (
    <li>
      <h3 className={`pb-1 text-lg text-xs font-semibold ${color}`}>
        <Link href={path}>
          <a className="hover:text-gray-900">{label}</a>
        </Link>
      </h3>
    </li>
  );
};

export default ({ currentPath }) => {
  return (
    <ul>
      {sections.map(section => (
        <Section
          key={section.path}
          path={section.path}
          label={section.label}
          currentPath={currentPath}
        />
      ))}
    </ul>
  );
};
