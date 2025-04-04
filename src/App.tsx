import { ChangeEventHandler, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { categories, Colors, FormInputsList, ProductList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct, IvalidtionForm } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";
import { TProductNames } from "./types";

const App = () => {
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
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProductObj);
  const [productToEditIndex, setProductToEditIndex] = useState<number>(0);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  console.log(productToEditIndex);
  /* ----- Hanlders ----- */
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openEditModal = () => {
    setIsOpenEditModal(true);
  };

  const closeEditModal = () => {
    setIsOpenEditModal(false);
  };

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
  const onChangeEditHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
    setErrorsmsg({
      ...errorsmsg,
      [name]: "",
    });
  };

  const onCancel = () => {
    setProductInp(defaultProductObj);
    closeModal();
  };
  const onCancelEditProduct = () => {
    setProductToEdit(defaultProductObj);
    closeEditModal();
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
    setProducts((prev) => [{ ...productInp, id: uuid(), colors: tempColors, category: selectedCategory }, ...prev]);
    setProductInp(defaultProductObj);
    setTempColors([]);
    setSelectedCategory(categories[0]);
    closeModal();
  };
  const submitEditHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { title, description, imageURL, price } = productToEdit;
    const errors = productValidation({ title: title, description: description, imageURL: imageURL, price: price });
    //*check if one input has error && all inputs has error -> if theres is no error values will be "" and will return true
    const hasErrorMsg = Object.values(errors).some((value) => value === "") && Object.values(errors).every((value) => value === "");
    if (!hasErrorMsg) {
      setErrorsmsg(errors);
      return;
    }

    //*Shallow Copy
    const updatedProducts = [...products];
    updatedProducts[productToEditIndex] = { ...productToEdit, colors: tempColors.concat(productToEdit.colors) };
    setProducts(updatedProducts);

    setProductToEdit(defaultProductObj);
    setTempColors([]);
    closeEditModal();
  };

  /* ----- Renders ----- */
  const renderProductList = products.map((item, index) => <ProductCard key={item.id} product={item} setProductToEdit={setProductToEdit} openEditModal={openEditModal} index={index} setProductToEditIndex={setProductToEditIndex} />);

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
        if (productToEdit.colors.includes(color)) {
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

  const renderProductEdit = (id: string, label: string, name: TProductNames) => {
    return (
      <div className="flex flex-col" key={id}>
        <label className="mb-[2px] text-sm font-medium text-gray-700" htmlFor={id}>
          {label}
        </label>
        <Input type="text" name={name} id={id} value={productToEdit[name]} onChange={onChangeEditHandler} />
        <ErrorMessage msg={errorsmsg[name]} />
      </div>
    );
  };

  return (
    <main className="container mx-auto ">
      <Button className="bg-indigo-600 hover:bg-indigo-700 block mx-auto" onClick={openModal} width="w-fit">
        Open Modal
      </Button>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-5 ">{renderProductList}</div>
      {/* Add Product Modal */}
      <Modal isOpen={isOpen} close={closeModal} title="Add a New Product">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <Select selected={selectedCategory} setSelected={setSelectedCategory} />
          <div className="colorsHex flex items-center flex-wrap space-x-1"> {renderProductColorsHex}</div>
          <div className="colors flex items-center flex-wrap space-x-1"> {renderProductColors}</div>
          <div className="flex items-center space-x-3">
            <Button className="text-white bg-indigo-600 hover:bg-indigo-700">Submit </Button>
            <Button className="text-black bg-gray-400 hover:bg-gray-500" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Product Modal */}
      <Modal isOpen={isOpenEditModal} close={closeEditModal} title="Edit the Product">
        <form className="space-y-3" onSubmit={submitEditHandler}>

          {renderProductEdit("title", "Product title", "title")}
          {renderProductEdit("description", "Product description", "description")}
          {renderProductEdit("imageURL", "Product image URL", "imageURL")}
          {renderProductEdit("price", "Product price", "price")}
          <Select selected={productToEdit.category} setSelected={(value)=> setProductToEdit({ ...productToEdit, category: value })} />
          <div className="colors flex items-center flex-wrap space-x-1"> {renderProductColors}</div>
          <div className="colorsHex flex items-center flex-wrap space-x-1">
            {tempColors.concat(productToEdit.colors).map((color) => (
              <span key={color} className="text-white font-semibold cursor-pointer p-1 mb-1 rounded-md" style={{ backgroundColor: color }} onClick={() => setTempColors((prev) => prev.filter((item) => item !== color))}>
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-600 hover:bg-indigo-700">Submit </Button>
            <Button className="bg-gray-400 hover:bg-gray-500" onClick={onCancelEditProduct}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default App;
