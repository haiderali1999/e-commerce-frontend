import { callAPi } from './http-common';

const getProductsWithPagination = (page, pageSize) =>
  callAPi.get(`/products/pagination?page=${page}&pageSize=${pageSize}`);
const getProducts = () => callAPi.get('/products');
const getProductsSearch = (data) => callAPi.post(`/products/search`, data);

export { getProductsWithPagination, getProducts, getProductsSearch };
