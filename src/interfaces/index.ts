import { ProductNameTypes } from "../components/types";

export interface IProduct {
  id?: string;
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    imageURL: string;
  };
}
export interface IFormInput {
  id: string;
  name: ProductNameTypes;
  label: string;
  type: string;
}

export interface IvalidtionForm {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}
