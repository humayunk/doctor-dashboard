function splitPop(path) {
  return path.split("/").pop();
}

function Tab({ href, label }) {
  const isCurrent = splitPop(href) === splitPop(window.location.pathname);
  const classes = isCurrent
    ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
    : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";

  return (
    <a aria-current={isCurrent ? "page" : null} className={classes} href={href}>
      {label}
    </a>
  );
}

function Tabbar({ tabs }) {
  return (
    <ul className="flex flex-wrap border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
      {tabs.map(({ href, label }) => (
        <li className="me-2" key={label}>
          <Tab href={href} label={label} />
        </li>
      ))}
    </ul>
  );
}

export { Tabbar };
