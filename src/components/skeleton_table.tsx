const SkeletonTableComponent = () => {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(<TRComponent key={i} />)
  }
  return (
    <tbody className="h-full">
      {arr}
    </tbody>
  )
}

const TRComponent = () => {
  return (
    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 " >
      <th scope="row" className="px-6 py-4 dark:bg-gray-700 w-48 mb-4">
        <div className="w-full h-2.5 border bg-gray-200"></div>
      </th>
      <td className="px-6 py-4 dark:bg-gray-700 w-48 mb-4">
        <div className="w-3/4 h-2.5 border bg-gray-200"></div>
      </td>
      <td className="px-6 py-4 dark:bg-gray-700 w-48 mb-4">
        <div className="w-1/2 h-2.5 border bg-gray-200"></div>
      </td>
      <td className="px-6 py-4 dark:bg-gray-700 w-48 mb-4">
        <div className="w-1/3 h-2.5 border bg-gray-200"></div>
      </td>
      <td className="px-6 py-4 dark:bg-gray-700 w-48 mb-4">
        <div className="w-1/4 h-2.5 border bg-gray-200"></div>
      </td>
    </tr>
  )
}

export default SkeletonTableComponent