import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

interface ISearchComponent {
  onSubmit: React.KeyboardEventHandler<HTMLInputElement>,
}

const SearchFilterComponent = ({ onSubmit }: ISearchComponent) => {

  return (
    <div className="relative mt-5 max-w-xl">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <MagnifyingGlassIcon className='self-center h-4' />
      </div>
      <input type="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border
      border-gray-300 rounded-lg bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search Project..."
        onKeyDown={onSubmit} onChange={(e) => { console.log(e.target.value) }}
      />
    </div>
  )
}

export default SearchFilterComponent