import { ProductType } from "@data/product";
import axios, { AxiosInstance } from "axios";

export class ProductsService {
  static instance: ProductsService;
  private http: AxiosInstance;

  private constructor() {
    this.http = axios.create({ baseURL: "https://fakestoreapi.com" });
  }

  static create() {
    if (!ProductsService.instance) {
      ProductsService.instance = new ProductsService();
    }

    return ProductsService.instance;
  }

  public async findAll() {
    const { data } = await this.http.get<ProductType[]>("/products");

    return data;
  }

  public async findById(id: number) {
    const { data } = await this.http.get<ProductType>(`/products/${id}`);

    return data;
  }
}
