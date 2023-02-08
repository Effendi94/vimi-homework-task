import React, { useState } from 'react';
// import logo from './logo.svg';
import { useQuery } from 'react-query';
import DropdownComponent from './components/dropdown';
import TableComponent from './components/table';

import './App.css';
import { IProjectList } from './app/type/project_prop';
import ProjectApi from './app/api/project_api';
import LabelFilterComponent from './components/label_filter';
import SearchFilterComponent from './components/search_filter';
import CommonData from './app/constant/common';
import { IStatic } from './app/type/static';
import { DefaultParams } from './app/type/default_params';
import DropdownFilterComponent from './components/dropdown_filter';

const dataSort: IStatic[] = [
  { text: 'Date Created (Newest First)', value: 'createdOn:asc' },
  { text: 'Date Created (Oldest First)', value: 'createdOn:desc' },
];


function App() {
  const [page, setPage] = useState('1');
  const [selectedSort, setSelectedSort] = useState<IStatic>(dataSort[0]);
  const [order, setOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('createdOn');
  const [qArchived, setQArchived] = useState('');
  const [qName, setQName] = useState('');

  const handleSelected = (data: IStatic) => {
    const str = data.value;
    var arr = str.split(':')
    setSortBy(arr[0]);
    setOrder(arr[1]);
    setSelectedSort(data);
  }

  const handleSearch = (e: any) => {
    if (e.key === 'Enter') {
      setQName(e.target.value);
    };
  }

  const filters: DefaultParams = {
    page: page,
    limit: CommonData.pageLimit,
    order: order,
    sort: sortBy,
    archived: qArchived,
    qName: qName,
  }

  const { isLoading, data, isFetching } = useQuery<IProjectList, Error>(
    ['project', page, order, sortBy, qArchived, qName],
    () => ProjectApi.getProject(filters),
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

  return (
    <div className='flex flex-col h-screen max-xl:h-full bg-gradient-to-tl from-green-400 to-blue-500  '>
      <div className='md:container md:mx-auto mt-10 max-xl:text-center max-xl:mx-4 basis-1/2'>
        <h1 className='md:max-xl:text-xl text-3xl text-neutral-white font-bold text-white'>Hello VIMI</h1>
        <h5 className='text-neutral-white text-opacity-70 md:max-xl:text-xl text-lg font-medium text-white'> Here are the list of projects you submitted</h5>
        <div className='p-6 bg-white border border-gray-200 bg-opacity-70 rounded-lg shadow-md mt-10 mb-10'>
          <h3 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Recents Project</h3>
          <SearchFilterComponent onSubmit={handleSearch} />
          {/* {!isLoading &&
            <LabelFilterComponent isArchieved={archieved} setArchieved={setArchieved} />
          } */}
          {/* <DropdownFilterComponent title={'Sort by'} menus={dataSort} selected={selectedSort} onChange={handleSelected} /> */}
          <div className='flex justify-end my-3'>
            <DropdownComponent title={'Sort by'} menus={dataSort} selected={selectedSort} onChange={handleSelected} />
          </div>
          <TableComponent data={data as IProjectList} isFetching={isFetching} isLoading={isLoading} selectedPage={page} setPage={setPage} />
        </div>
      </div >
    </div>
  );
}

export default App;
