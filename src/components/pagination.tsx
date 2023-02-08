import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react';

interface IPagination {
  totalPage: number,
  selectedPage: number,
  onPageChanged(_page: string): void,
}



const PaginationComponent = ({ totalPage, selectedPage, onPageChanged }: IPagination) => {
  // const listPage: string[] = generatePage(selectedPage, totalPage);
  const [listPage, setListPage] = useState<string[]>([]);

  const handlePrev = (page: number) => {
    if (page > 1) {
      onPageChanged(`${page - 1}`)
    }
  }

  const handleNext = (page: number) => {
    if (page < totalPage) {
      onPageChanged(`${page + 1}`)
    }
  }

  useEffect(() => {
    const generatePage = (selectedPage: number, totalPage: number) => {
      const res: string[] = [];
      if (totalPage <= 10) {
        for (let i = 0; i < totalPage; i++) {
          res.push(`${i + 1}`);
        }
      } else {
        if (selectedPage <= 4) {
          for (let i = 0; i < 6; i++) {
            res.push(`${i + 1}`);
            // children.add(_buildBox(vm, i));
          }
          res.push('...');
          // children.add(_buildSeparator());
          for (let i = 1; i >= 0; i--) {
            res.push(`${totalPage - 1 - i}`);
            // children.add(_buildBox(vm, vm.totalPages - 1 - i));
          }
        } else if (selectedPage > 4 && selectedPage < totalPage - 4) {
          for (let i = 0; i < 2; i++) {
            res.push(`${i + 1}`);
          }
          res.push('...');
          for (let i = selectedPage - 2;
            i <= selectedPage + 2;
            i++) {
            res.push(`${i + 1}`);
          }
          if (selectedPage < totalPage - 4) {
            res.push('...');
          }
          for (let i = 1; i >= 0; i--) {
            res.push(`${totalPage - i}`);
          }
        } else {
          for (let i = 0; i < 2; i++) {
            res.push(`${i + 1}`);
            // children.add(_buildBox(vm, i));
          }
          res.push('...');
          // children.add(_buildSeparator());
          for (let i = totalPage - 5; i <= totalPage - 1; i++) {
            res.push(`${i + 1}`);
            // children.add(_buildBox(vm, i));
          }
        }
      }
      // return res;
      setListPage(res);
    }
    generatePage(selectedPage, totalPage);

  }, [selectedPage, totalPage])
  return (
    <div className=' py-2 select-none'>
      <hr className='h-1 mx-auto my-2 bg-gray-100 border-0 rounded md:my-4 dark:bg-gray-700'></hr>
      <ul className="flex justify-center -space-x-px items-center my-3">
        <li>
          <div className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 
          dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => handlePrev(selectedPage)}>
            <ChevronLeftIcon className='h-5' />
          </div>
        </li>
        {listPage.map((value, i) => {
          return (
            <li key={i}>
              <div className={`px-3 py-2 leading-tight 
              ${selectedPage === parseInt(value) ?
                  'text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                  : 'text-gray-500 border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                onClick={() => onPageChanged(value)}>
                {value}
              </div>
            </li>
          )
        })}

        <li>
          <div className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 
          dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => handleNext(selectedPage)}>
            <ChevronRightIcon className='h-5' />
          </div>
        </li>
      </ul>
    </div >

  )
}

export default PaginationComponent