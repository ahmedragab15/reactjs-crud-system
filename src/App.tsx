import { ChangeEventHandler, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct, IvalidtionForm } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const defaultProductObj: IProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  /* ----- State ----- */
  const [isOpen, setIsOpen] = useState(false);
  const [errorsmsg, setErrorsmsg] = useState<IvalidtionForm>({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [product, setProduct] = useState<IProduct>(defaultProductObj);

  /* ----- Hanlders ----- */
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrorsmsg(
      {
        ...errorsmsg,
        [name]: "",
      }
    )
  };
  console.log(errorsmsg);

  const onCancel = () => {
    console.log("cancel");
    setProduct(defaultProductObj);
    close();
  };
  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { title, description, imageURL, price } = product;
    const errors = productValidation({ title: title, description: description, imageURL: imageURL, price: price });
    //*check if one input has error && all inputs has error -> if theres is no error values will be "" and will return true
    const hasErrorMsg = Object.values(errors).some((value) => value === "") && Object.values(errors).every((value) => value === "");
    if (!hasErrorMsg) {
      setErrorsmsg(errors);
    }
    console.log("Send This Product to Server");
  };

  /* ----- Renders ----- */
  const renderProductList = productList.map((item) => <ProductCard key={item.id} product={item} />);
  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label className="mb-[2px] text-sm font-medium text-gray-700" htmlFor={input.id}>
        {input.label}
      </label>
      <Input type={input.type} name={input.name} id={input.id} value={product[input.name]} onChange={onChangeHandler} />
      <ErrorMessage msg={errorsmsg[input.name]} />
    </div>
  ));

  return (
    <main className="container mx-auto ">
      <Button className="bg-indigo-600 hover:bg-indigo-700 block mx-auto" onClick={open} width="w-fit">
        Open Modal
      </Button>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-5 ">{renderProductList}</div>
      <Modal isOpen={isOpen} close={close} title="Add a New Product">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <div className="flex space-x-3">
            <Button className="bg-indigo-600 hover:bg-indigo-700">Submit </Button>
            <Button className="bg-gray-400 hover:bg-gray-500" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App;
