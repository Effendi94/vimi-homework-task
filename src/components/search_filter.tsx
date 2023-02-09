import { MagnifyingGlassIcon, XMarkIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/20/solid'

import { ILabelProps } from '../app/type/label_props';
import LabelFilterComponent from './label_filter';

interface ISearchComponent {
  listLabel: ILabelProps[],
  searchValue: string,
  showAdvancedSearch: boolean,
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  setShowAdvancedSearch: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: React.KeyboardEventHandler<HTMLInputElement>,
  resetSearch(): void,
  handleSearch(_e: string): void,
  toggleLabel(_e: number): void,
}


const SearchFilterComponent = ({
  listLabel,
  searchValue,
  showAdvancedSearch,
  onSubmit,
  resetSearch,
  handleSearch,
  setShowAdvancedSearch,
  setSearchValue,
  toggleLabel
}: ISearchComponent) => {

  const handleFocusSearch = () => {
    // let tes = new RegExp(/\s$/).test(searchValue);
    // if (searchValue !== '')
    //   setSearchValue(`${searchValue}`)
    // return;
  }


  return (
    <div className='flex flex-col w-full mt-5 '>
      <div className="relative">
        <div className="flex space-x-2 absolute top-1/2 transform -translate-y-1/2 right-3">
          <XMarkIcon className={`transition-opacity ${searchValue ? 'opacity-100' : 'opacity-0'}  cursor-pointer w-4 h-4`}
            onClick={resetSearch} />
          <AdjustmentsHorizontalIcon className='cursor-pointer h-4' onClick={() => setShowAdvancedSearch(!showAdvancedSearch)} />
        </div>
        <div className='flex absolute top-1/2 transform -translate-y-1/2 left-3'>
          <MagnifyingGlassIcon className="self-center pointer-events-none h-4" />
        </div>
        <input type="text" placeholder="Search Project..." className="block w-full py-2 px-10 text-sm text-gray-900 border
      border-gray-300 rounded-lg bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          onKeyDown={onSubmit}
          onChange={(e) => { setSearchValue(e.target.value) }}
          value={searchValue}
          onFocus={handleFocusSearch}
        />
        <div className={`absolute w-full transition-opacity ${showAdvancedSearch ? 'opacity-100 z-50' : '-z-50 opacity-0'}  bg-white rounded-md 
        border border-gray-300`}>
          <div className='flex flex-col px-4 py-2'>
            <h5 className='text-sm font-semibold my-2'>Advanced Search</h5>
            <div className='flex flex-wrap mb-6 rounded-md select-none my-2'>
              {listLabel.map((label, i) =>
                <LabelFilterComponent key={i} title={label.text} active={label.active} toggleValue={() => toggleLabel(i)} />
              )}
            </div>
            <div className='grow items-center text-end'>
              <button className='py-1 px-4 bg-blue-400 hover:bg-blue-500 text-white rounded-md font-bold text-base capitalize'
                onClick={() => handleSearch(searchValue)}>
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchFilterComponent