import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/20/solid"
import { Fragment } from "react"
import { IStatic } from "../app/type/static"

interface IDropdown {
  title: string,
  menus: IStatic[],
  selected: IStatic,
  onChange(_e: IStatic): void,
}

const DropdownFilterComponent = ({ title, menus, selected, onChange }: IDropdown) => {
  return (
    <Menu as="div" className="relative inline-block text-left my-3">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-blue-500 bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {title}
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            {menus.map((data, i) => (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {data.value === selected.value && (
                      <CheckIcon
                        className="mr-2 h-5 w-5 text-amber-600"
                        aria-hidden="true"
                      />
                    )}
                    Edit
                  </button>
                )}
              </Menu.Item>
            ))}

          </div>
        </Menu.Items>

      </Transition>
    </Menu>
  )
}

export default DropdownFilterComponent