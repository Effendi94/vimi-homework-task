import { PlusIcon, CheckIcon } from '@heroicons/react/20/solid'

interface ILabelProps {
  isArchieved: boolean,
  setArchieved: React.Dispatch<React.SetStateAction<boolean>>
}

const LabelFilterComponent = ({ isArchieved, setArchieved }: ILabelProps) => {
  const toogleArchieved = () => {
    setArchieved(!isArchieved);
  }

  return (
    <div className='mt-5 max-xl:text-left'>
      <div className='flex my-4'>
        <div className={`flex flex-row justify-between pl-2 pr-1 py-1 rounded-md cursor-pointer select-none ${isArchieved ? 'bg-blue-500 text-white' : 'bg-neutral-100 '}`}
          onClick={toogleArchieved}>
          <span className='capitalize'>Archieved</span>
          {isArchieved ?
            <CheckIcon className='h-4 self-center px-1' /> :
            <PlusIcon className='h-4 self-center px-1' />
          }
        </div>
      </div>
    </div>
  )
}
export default LabelFilterComponent