import ProductCard from "./ProductCard";
import { Product } from "./types";

type Props = {
  products: Product[];
  selectedProducts: Product[];
  onSelectChange: (product: Product) => void;
};

function ProductsList({ products, onSelectChange, selectedProducts }: Props) {
  return (
    <div className="orders-list-container">
      <div className="orders-list-items">
        { products.map(product => (
          <ProductCard
            key={ product.id }
            product={ product }
            onSelectChange={ onSelectChange }
            isSelected={ selectedProducts.some(item => item.id === product.id) }
          />
        )) }
      </div>
    </div>
  );
}

export default ProductsList;