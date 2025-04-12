import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronsUpDown, Check } from "lucide-react";
import { categories } from "../../data";
import { ICategory } from "../../interfaces";

interface Iprops {
  selected: {name:string,imageURL:string},
  setSelected: (category: ICategory) => void
}

const Select = ({ selected, setSelected }: Iprops) => {

  return (
    <Listbox value={selected} onChange={setSelected}>
      <Label className="text-sm/6 font-medium text-gray-700">Category</Label>
      <div className="relative">
        <ListboxButton className="grid w-full cursor-default grid-cols-1  bg-white py-3 pr-2 pl-3 text-left text-gray-900 sm:text-sm/6 border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-lg">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <img alt={selected.name} src={selected.imageURL} className="size-5 shrink-0 rounded-full" />
            <span className="block truncate">{selected.name}</span>
          </span>
          <ChevronsUpDown aria-hidden="true" className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
        </ListboxButton>
        <ListboxOptions transition className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm">
          {categories.map((category) => (
            <ListboxOption key={category.id} value={category} className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden">
              <div className="flex items-center">
                <img alt={category.name} src={category.imageURL} className="size-5 shrink-0 rounded-full" />
                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{category.name}</span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                <Check aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default Select