import { PlusIcon, CheckIcon } from '@heroicons/react/20/solid'

interface ILabelProps {
  title: string,
  active: boolean,
  toggleValue(): void
}

const LabelFilterComponent = ({ active, toggleValue, title }: ILabelProps) => {


  return (
    <div className={`relative pl-2 mr-2 mb-2 cursor-pointer ${active ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-neutral-100 hover:bg-neutral-200 '}`}
      onClick={toggleValue}>
      <span className='capitalize pr-6 py-1'>{title}</span>
      <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
        {active ? <CheckIcon className='h-4 self-center' /> :
          <PlusIcon className='h-4 self-center' />
        }
      </div>
    </div>
  )
}
export default LabelFilterComponent