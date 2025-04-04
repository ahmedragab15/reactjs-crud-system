import Button from "./ui/Button";
import Image from "./Image";
import { IProduct } from "../interfaces";
import { txtSlicer } from "../utils";
import CircleColor from "./CircleColor";

interface Iprops {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  index:number
  setProductToEditIndex: (index: number) => void
  openConfirmModal: () => void
}

const ProductCard = ({ product, setProductToEdit, openEditModal, index, setProductToEditIndex, openConfirmModal }: Iprops) => {
  const { description, imageURL, price, title, id, colors, category } = product;

  /* ----- Renders ----- */
  const renderProductColors = colors.map((color) => <CircleColor key={color} color={color} />);

  /* ----- Handlers ----- */
  const onEdit = () => {
    setProductToEdit(product);
    openEditModal();
    setProductToEditIndex(index);
  };
  
  const onRemove = () => {
    setProductToEdit(product);
    openConfirmModal();
  };

  return (
    <div className="card max-w-sm md:max-w-lg h-[430px] mx-auto md:mx-0 border border-gray-300 rounded-md py-2 px-3 flex justify-between flex-col" id={id}>
      <Image src={imageURL} alt={title} className="rounded-md h-52 w-full object-cover" />
      <h3 className="text-lg font-semibold py-1">{title}</h3>
      <p className="text-xs text-gray-500 break-words pb-2">{txtSlicer(description)}</p>

      <div className="colors flex items-center flex-wrap space-x-1"> {renderProductColors.length > 0 ? renderProductColors : <span>There's no other colors</span>}</div>

      <div className="flex justify-between items-center py-2">
        <span className="price text-lg text-indigo-600 font-semibold">${price}</span>

        <div className="category flex items-center gap-1">
          <span className="text-xs font-semibold">{category.name}</span>
          <Image src={category.imageURL} alt={category.name} className="rounded-full w-10 h-10 object-cover" />
        </div>
      </div>

      <div className="buttons flex items-center justify-between gap-2">
        <Button className=" bg-indigo-600 hover:bg-indigo-700" width="w-full" onClick={onEdit}>
          Edit
        </Button>
        <Button className=" bg-red-600 hover:bg-red-700" onClick={onRemove}>Remove</Button>
      </div>
    </div>
  );
};

export default ProductCard;
