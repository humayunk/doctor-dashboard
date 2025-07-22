function Link({ content, href, onClick }) {
  const classes =
    "font-medium text-blue-600 dark:text-blue-500 hover:underline";
  if (onClick) {
    return (
      <a className={classes} href="#" onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <a className={classes} href={href}>
      {content}
    </a>
  );
}

export { Link };
