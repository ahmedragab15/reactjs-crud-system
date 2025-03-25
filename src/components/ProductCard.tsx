import Button from "./ui/Button";
import Image from "./Image";
import { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";

interface Iprops {
  product: IProduct;
}

const ProductCard = ({ product }: Iprops) => {
    const {description,imageURL,price,title,id} = product
    const {name, imageURL : categoryImage} = product.category
  return (
    <div className="card max-w-sm md:max-w-lg mx-auto md:mx-0 border border-gray-300 rounded-md p-2" id={id}>
      <Image src={imageURL} alt={title} className="rounded-md h-52 w-full object-cover" />
      <h3 className="py-1">{title}</h3>
      <p className="text-sm text-gray-600 py-2">{txtSlicer(description)}</p>

      <div className="colors flex gap-0.5">
        <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer"></span>
        <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer"></span>
      </div>

      <div className="flex justify-between items-center py-2">
        <span className="price text-indigo-600 font-bold">${price}</span>
        <span className="category flex items-center gap-1">
          <Image src={categoryImage} alt="Product category" className="rounded-full w-10 h-10 object-cover" />
          {name}
        </span>
      </div>

      <div className="buttons flex gap-2">
        <Button
          className=" bg-indigo-600 hover:bg-indigo-700"
          width="w-full"
          onClick={() => {
            alert("clicked");
          }}
        >
          Edit
        </Button>
        <Button className=" bg-red-600 hover:bg-red-700">Delete</Button>
      </div>
    </div>
  );
};

export default ProductCard;
