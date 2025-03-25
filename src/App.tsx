import ProductCard from "./components/ProductCard"
import { productList } from "./data"

function App() {
  //* Renders
  const renderProductList = productList.map(product => <ProductCard key={product.id} product={product} />);
  return (
    <main className="container mx-auto ">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-5 ">{renderProductList}</div>
    </main>
  );
}

export default App
