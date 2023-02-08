import CommonData from "../app/constant/common";
import { IProject, IProjectList } from "../app/type/project_prop";
import PaginationComponent from "./pagination";
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import SkeletonTableComponent from "./skeleton_table";


interface ITable {
  data: IProjectList,
  isFetching: boolean,
  isLoading: boolean,
  selectedPage: string,
  setPage: React.Dispatch<React.SetStateAction<string>>
}

const getTotalPage = (totalRecord: number | undefined): number => {
  if (totalRecord !== undefined && totalRecord > 0) {
    let res = Math.floor(totalRecord / CommonData.pageLimit);
    return res > 0 ? res : 1;
  }
  return 1;
}

const dateTimeFormat = (date: string): string => {
  var res = '';
  let formatter = new Date(date);
  res = `${formatter.toLocaleDateString()} : ${formatter.toLocaleTimeString()}`;
  return res;
}

const TableComponent = ({ data, isFetching, isLoading, selectedPage, setPage }: ITable) => {
  const totalPage = getTotalPage(data?.total);
  const handlePageChange = (page: string) => {
    setPage(page);
  }

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg">

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Created
            </th>
            <th scope="col" className="px-6 py-3">
              Manage
            </th>
          </tr>
        </thead>
        {isLoading || isFetching ?
          <SkeletonTableComponent /> :
          <tbody>
            {data.projects.map((project: IProject) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={project.id}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {project.name}
                  </th>
                  <td className="px-6 py-4 capitalize">
                    {project.type}
                  </td>
                  <td className="px-6 py-4">
                    {project.status}
                  </td>
                  <td className="px-6 py-4">
                    {dateTimeFormat(project.createdOn)}
                  </td>
                  <td className="px-6 py-4">
                    <button><EllipsisVerticalIcon className="h-5 hover:text-purple-400" /></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        }
        {!isFetching &&
          <tfoot>
            <tr className="bg-white">
              <th colSpan={5}>
                <PaginationComponent totalPage={totalPage} selectedPage={parseInt(selectedPage)} onPageChanged={handlePageChange} />
              </th>
            </tr>
          </tfoot>
        }
      </table>

    </div >
  );
}

export default TableComponent