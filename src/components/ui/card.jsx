function Card({ info: { label, value } }) {
  return (
    <div className="w-full max-w-sm p-4 m-2 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        {label}
      </h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-bold tracking-tight">{value}</span>
      </div>
    </div>
  );
}

export { Card };
