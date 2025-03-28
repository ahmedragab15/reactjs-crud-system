import { useState } from "react";
import ProductCard from "./components/ProductCard"
import Modal from "./components/ui/Modal";
import { productList } from "./data"
import Button from "./components/ui/Button";


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
  return (
    <main className="container mx-auto ">
      <Button className="bg-indigo-600 hover:bg-indigo-700 block mx-auto" onClick={open} width="w-fit">
        Open Modal
      </Button>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-5 ">{renderProductList}</div>
      <Modal isOpen={isOpen} close={close} title="Add a New Product">
<div className="flex gap-2">
          <Button className="bg-indigo-600 hover:bg-indigo-700">Submit </Button>
        <Button className="bg-gray-300 hover:bg-gray-500" onClick={close}>Cancel</Button>
</div>
          

      </Modal>
    </main>
  );
}

export default App
