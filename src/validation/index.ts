import { IvalidtionForm } from "../interfaces";

export const productValidation = (product:  IvalidtionForm ) => {
  const errors: IvalidtionForm = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  const valideUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

  if (!product.title.trim() || product.title.length < 4 || product.title.length > 80) errors.title = "Product title must be between 4 and 80 characters";

  if (!product.description.trim() || product.description.length < 8 || product.description.length > 900) errors.description = "Product description must be between 8 and 900 characters";

  if (!product.imageURL.trim() || !valideUrl) errors.imageURL = "Valid Image URL is required";

  if (!product.price.trim() || isNaN(Number(product.price))) errors.price = "Valid Price is required";

  return errors;
};
