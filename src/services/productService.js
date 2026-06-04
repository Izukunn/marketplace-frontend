import api from "../api/client";

function getBackendOrigin() {
    const base =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";
    return base.replace(/\/api\/?$/, "");
}

function toAbsoluteAssetUrl(path) {
    if (!path || typeof path !== "string") return path;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    if (!path.startsWith("/")) return path;
    return `${getBackendOrigin()}${path}`;
}

function normalizeProduct(product) {
    if (!product || typeof product !== "object") return product;

    const normalizedImages = Array.isArray(product.images)
        ? product.images.map((img) => toAbsoluteAssetUrl(img)).filter(Boolean)
        : [];

    const thumbnail = toAbsoluteAssetUrl(product.thumbnail_url);

    return {
        ...product,
        // Keep compatibility with existing UI field mapping.
        item_name:
            product.item_name ??
            product.product_name ??
            product.name ??
            product.title,
        model_sku:
            product.model_sku ??
            product.marketplace_sku ??
            product.sku ??
            product.seller_sku ??
            product.internal_sku,
        name:
            product.name ??
            product.product_name ??
            product.item_name ??
            product.title,
        sku:
            product.sku ??
            product.marketplace_sku ??
            product.model_sku ??
            product.seller_sku ??
            product.internal_sku,
        quantity: product.quantity ?? product.stock,
        images: normalizedImages,
        image:
            toAbsoluteAssetUrl(product.image) ||
            thumbnail ||
            normalizedImages[0],
        thumbnail_url: thumbnail,
    };
}

function normalizeProductsResponse(data) {
    const payload = data?.data || data || {};
    const list =
        payload.items ||
        payload.products ||
        payload.data ||
        (Array.isArray(payload) ? payload : []);
    const items = Array.isArray(list) ? list.map(normalizeProduct) : [];

    const pagination = payload.pagination || {};
    const total =
        payload.total ?? payload.totalCount ?? pagination.total ?? items.length;
    const limit = items.length;
    const pages = pagination.pages ?? Math.max(1, Math.ceil(total / limit));

    return {
        ...payload,
        items,
        pagination: {
            ...pagination,
            page: pagination.page ?? 1,
            limit,
            total,
            pages,
        },
    };
}

function normalizeSingleProductResponse(data) {
    const payload = data?.data || data || {};
    const product = payload.item || payload.product || payload.data || payload;
    return normalizeProduct(product);
}

/**
 * Fetch paginated product list for a marketplace.
 * @param {string} marketplace - shopee | tokopedia | lazada
 * @param {Object} params - { page, limit, search, category, minPrice, maxPrice }
 */
export const getProducts = (marketplace, params = {}) =>
    api.get(`/${marketplace}/products`, { params }).then((response) => ({
        ...response,
        data: normalizeProductsResponse(response.data),
    }));

/**
 * Fetch a single product by ID.
 */
export const getProductById = (marketplace, id) =>
    api.get(`/${marketplace}/products/${id}`).then((response) => ({
        ...response,
        data: normalizeSingleProductResponse(response.data),
    }));
