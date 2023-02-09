import { useState } from 'react';
import { useQuery } from 'react-query';
import DropdownComponent from './components/dropdown';
import TableComponent from './components/table';
import ProjectApi from './app/api/project_api';
import SearchFilterComponent from './components/search_filter';
import CommonData from './app/constant/common';

import { IProjectList } from './app/type/project_prop';
import { IStatic } from './app/type/static';
import { DefaultParams } from './app/type/default_params';
import { ILabelProps } from './app/type/label_props';

import './App.css';

const dataSort: IStatic[] = [
  { text: 'Date Created (Newest First)', value: 'createdOn:asc' },
  { text: 'Date Created (Oldest First)', value: 'createdOn:desc' },
];

const listLabel: ILabelProps[] = [
  { text: 'archieved', value: 'is:archieved', column: 'archieved', active: false },
  { text: 'editing', value: 'is:editing', column: 'status', active: false },
  { text: 'incomplete', value: 'is:incomplete', column: 'status', active: false },
  { text: 'shooting', value: 'is:shooting', column: 'status', active: false },
  { text: 'feedback', value: 'is:feedback', column: 'status', active: false },
  { text: 'completed', value: 'is:completed', column: 'status', active: false },
  { text: 'educational', value: 'is:educational', column: 'type', active: false },
  { text: 'testimonial', value: 'is:testimonial', column: 'type', active: false },
  { text: 'training', value: 'is:training', column: 'type', active: false },
  { text: 'recreational', value: 'is:recreational', column: 'type', active: false },
];



function App() {
  const [page, setPage] = useState('1');
  const [selectedSort, setSelectedSort] = useState<IStatic>(dataSort[0]);
  const [order, setOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('createdOn');
  const [archieved, setArchieved] = useState(false);
  const [qName, setQName] = useState('');
  const [qStatus, setQstatus] = useState('');
  const [qType, setQType] = useState('');

  const [searchValue, setSearchValue] = useState('');
  const [labels, setLabels] = useState(listLabel);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const handleSelected = (data: IStatic) => {
    const str = data.value;
    var arr = str.split(':')
    setSortBy(arr[0]);
    setOrder(arr[1]);
    setSelectedSort(data);
  }

  const onSubmit = (e: any) => {
    let text = e.target.value;
    if (e.key === 'Enter') {
      handleSearch(text)
      return;
    };
  }

  const handleSearch = (text: string) => {
    let labels = text.match(/\b(is:[a-z]+)\b/g);
    if (labels != null && labels.length) {
      const pattern = /\b(\s\w+)\b$/;
      const result = text.match(pattern);
      let word = result !== null ? result[0] : null;
      labels.forEach(item => {
        let label = listLabel.find(obj => obj.value === item);
        (label?.column === 'status') && setQstatus(label?.text);
        (label?.column === 'type') && setQType(label?.text);
        (label?.column === 'archieved') && setArchieved(true);
      })
      setQName(word ?? '')
      setShowAdvancedSearch(false)
    } else {
      (text !== '') ?
        setQName(text) : resetSearch();
      setQstatus('');
      setQType('');
      setArchieved(false);
    }
  }

  const resetSearch = () => {
    setSearchValue('')
    let tempLabels = labels.map(item => {
      return { ...item, active: false }
    });
    setArchieved(false);
    setQName('');
    setQstatus('');
    setQType('')
    setLabels(tempLabels)
    setShowAdvancedSearch(false)
  }

  const toggleLabel = (index: number) => {
    let tempLabels = [...labels];
    tempLabels[index].active = !tempLabels[index].active
    tempLabels[index].active ?
      setSearchValue(`${searchValue} ${tempLabels[index].value}`) : setSearchValue(searchValue.replace(` ${tempLabels[index].value}`, ''));

    setLabels(tempLabels)
  }


  const filters: DefaultParams = {
    page: page,
    limit: CommonData.pageLimit,
    order: order,
    sort: sortBy,
    archived: archieved,
    qName: qName,
    status: qStatus,
    type: qType,
  }

  const { isLoading, data, isFetching, isError, error } = useQuery<IProjectList, Error>(
    ['project', page, order, sortBy, archieved, qName, qStatus, qType],
    () => ProjectApi.getProject(filters),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );


  return (
    <div className='flex flex-col h-screen max-xl:h-full bg-gradient-to-tl from-green-400 to-blue-500 '>
      {isError &&
        <div className='fixed right-10 top-10 z-auto max-xl:right-0 max-xl:px-5 max-xl:w-full'>
          <div className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
            <strong className="font-bold">{error?.message}</strong>
            <span className="block sm:inline"> Reload and try again</span>

          </div>
        </div>
      }
      <div className='md:container md:mx-auto mt-10 max-xl:text-center max-xl:mx-4 '>
        <h1 className='md:max-xl:text-xl text-3xl text-neutral-white font-bold text-white'>Hello VIMI</h1>
        <h5 className='text-neutral-white text-opacity-70 md:max-xl:text-xl text-lg font-medium text-white'> Here are the list of projects you submitted</h5>
        <div className='p-6 bg-white border border-gray-200 bg-opacity-70 rounded-lg shadow-md mt-10 mb-10'>
          <h3 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Recents Project</h3>
          <div className='flex max-xl:flex-col space-x-3 justify-between items-center my-3'>
            <div className='grow w-full'>
              <SearchFilterComponent
                onSubmit={onSubmit}
                listLabel={labels}
                resetSearch={resetSearch}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                showAdvancedSearch={showAdvancedSearch}
                setShowAdvancedSearch={setShowAdvancedSearch}
                toggleLabel={toggleLabel}
                handleSearch={handleSearch}
              />
            </div>
            <div className='self-end z-40'>
              <DropdownComponent title={'Sort by'} menus={dataSort} selected={selectedSort} onChange={handleSelected} />

            </div>
          </div>
          <TableComponent data={data as IProjectList} isFetching={isFetching} isLoading={isLoading} selectedPage={page} setPage={setPage} />
        </div>
      </div >
    </div>
  );
}

export default App;
