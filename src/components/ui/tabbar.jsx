function Tabbar({ tabs }) {
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {tabs.map((tab) => (
        <li key={tab.label} className="me-2">
          <a href={tab.href} className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">{tab.label}</a>
          {/*
             <a href="/forms/data" aria-current="page" className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">Data</a>
           */}
        </li>
      ))}
    </ul>
  )
}

export {
  Tabbar,
}
