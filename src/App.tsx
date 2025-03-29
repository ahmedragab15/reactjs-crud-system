import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";

function App() {
  /* ----- State ----- */
  const [isOpen, setIsOpen] = useState(false);

  /* ----- Hanlders ----- */
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  /* ----- Renders ----- */
  const renderProductList = productList.map((item) => <ProductCard key={item.id} product={item} />);
  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col">
      <label className="mb-[2px] text-sm font-medium text-gray-700" htmlFor={input.id}>
        {input.label}
      </label>
      <Input type={input.type} name={input.name} id={input.id} />
    </div>
  ));

  return (
    <main className="container mx-auto ">
      <Button className="bg-indigo-600 hover:bg-indigo-700 block mx-auto" onClick={open} width="w-fit">
        Open Modal
      </Button>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-5 ">{renderProductList}</div>
      <Modal isOpen={isOpen} close={close} title="Add a New Product">
        <form className="space-y-3">
          {renderFormInputList}
        <div className="flex space-x-3">
          <Button className="bg-indigo-600 hover:bg-indigo-700">Submit </Button>
          <Button className="bg-gray-400 hover:bg-gray-500" onClick={close}>Cancel</Button>
        </div>
          </form>
      </Modal>
    </main>
  );
}

export default App;
