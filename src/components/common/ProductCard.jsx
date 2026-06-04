import { useNavigate } from "react-router-dom";
import { getProductField, formatPrice } from "../../utils/marketplaceConfig";
import { placeholderImage } from "../../utils/helpers";
import Button from "../common/Button";

export default function ProductCard({ product, marketplace, config }) {
  const navigate = useNavigate();

  const name = getProductField(product, marketplace, "name");
  const sku = getProductField(product, marketplace, "sku");
  const stock = getProductField(product, marketplace, "stock");
  const price = getProductField(product, marketplace, "price");
  const outOfStock = !stock || stock <= 0;

  const imgSrc =
    product.image ||
    product.thumbnail_url ||
    product.images?.[0] ||
    placeholderImage(product.id || product._id || sku || name || "product");

  const handleOpenDetail = () => {
    const id = product.id || product._id;
    navigate(`/${marketplace}/products/${id}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpenDetail();
    }
  };

  return (
    <div
      className="card flex flex-col overflow-hidden group cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={handleOpenDetail}
      onKeyDown={handleKeyDown}
      aria-label={`Open detail for ${name || "product"}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
        <img
          src={imgSrc}
          alt={name || "Product"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {outOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-sm bg-red-500 px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight min-h-[2.5rem]">
          {name || "Unknown Product"}
        </h3>
        <p className="text-xs text-gray-400 font-mono">SKU: {sku || "-"}</p>

        <div className="mt-auto flex items-center justify-between gap-2">
          <div>
            <p className={`font-bold text-sm ${config.textColor}`}>
              {formatPrice(price)}
            </p>
            <p className="text-xs text-gray-400">Stock: {stock ?? "-"}</p>
          </div>
          <Button
            colorClass={config.btnBg}
            onClick={handleOpenDetail}
            disabled={outOfStock}
            className="text-xs px-3 py-1.5 shrink-0"
          >
            {outOfStock ? "Sold Out" : "Buy"}
          </Button>
        </div>
      </div>
    </div>
  );
}
