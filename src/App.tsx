import { ChangeEventHandler, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { Colors, FormInputsList, ProductList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct, IvalidtionForm } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";

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
  const [productInp, setProductInp] = useState<IProduct>(defaultProductObj);
  const [errorsmsg, setErrorsmsg] = useState<IvalidtionForm>({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [products, setProducts] = useState<IProduct[]>(ProductList);
  console.log(products);

  /* ----- Hanlders ----- */
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setProductInp({
      ...productInp,
      [name]: value,
    });
    setErrorsmsg({
      ...errorsmsg,
      [name]: "",
    });
  };

  const onCancel = () => {
    setProductInp(defaultProductObj);
    close();
  };
  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { title, description, imageURL, price } = productInp;
    const errors = productValidation({ title: title, description: description, imageURL: imageURL, price: price });
    //*check if one input has error && all inputs has error -> if theres is no error values will be "" and will return true
    const hasErrorMsg = Object.values(errors).some((value) => value === "") && Object.values(errors).every((value) => value === "");
    if (!hasErrorMsg) {
      setErrorsmsg(errors);
      return;
    }
    setProducts((prev) => [...prev, { ...productInp, id: uuid(), colors: tempColors }]);
    setProductInp(defaultProductObj);
    close();
    setTempColors([]);
  };

  /* ----- Renders ----- */
  const renderProductList = products.map((item) => <ProductCard key={item.id} product={item} />);

  const renderFormInputList = FormInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label className="mb-[2px] text-sm font-medium text-gray-700" htmlFor={input.id}>
        {input.label}
      </label>
      <Input type={input.type} name={input.name} id={input.id} value={productInp[input.name]} onChange={onChangeHandler} />
      <ErrorMessage msg={errorsmsg[input.name]} />
    </div>
  ));
  const renderProductColors = Colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));

  const renderProductColorsHex = tempColors.map((color) => (
    <span key={color} className="text-white font-semibold cursor-pointer p-1 mb-1 rounded-md" style={{ backgroundColor: color }} onClick={() => setTempColors((prev) => prev.filter((item) => item !== color))}>
      {color}
    </span>
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

          <div className="colorsHex flex items-center flex-wrap space-x-1"> {renderProductColorsHex}</div>
          <div className="colors flex items-center flex-wrap space-x-1"> {renderProductColors}</div>
          <div className="flex items-center space-x-3">
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
