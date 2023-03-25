import Checkout from "./application/usecase/Checkout";
import GetProducts from "./application/usecase/GetProducts";
import PgPromise from "./infra/database/PgPromiseAdapter";
import CurrencyGatewayHttp from "./infra/gateway/CurrencyGatewayHttp";
import AxiosAdapter from "./infra/http/AxiosAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
// import HapiHttpServer from "./infra/http/HapiAdapter";
import HttpController from "./infra/http/HttpController";
import CouponRepositoryDatabase from "./infra/repository/CouponRepositoryDatabase";
import OrderRepositoryDatabase from "./infra/repository/OrderRepositoryDatabase";
import ProductRepositoryDatabase from "./infra/repository/ProductRepositoryDatabase";

const connection = new PgPromise();
const httpClient = new AxiosAdapter();
const currencyGateway = new CurrencyGatewayHttp(httpClient);
const productRepository = new ProductRepositoryDatabase(connection);
const couponRepository = new CouponRepositoryDatabase(connection);
const orderRepository = new OrderRepositoryDatabase(connection);
const checkout = new Checkout(
  currencyGateway,
  productRepository,
  couponRepository,
  orderRepository
);
const getProducts = new GetProducts(productRepository);
const httpServer = new ExpressAdapter();
// const httpServer = new HapiHttpServer();
new HttpController(httpServer, checkout, getProducts);
httpServer.listen(3012);
