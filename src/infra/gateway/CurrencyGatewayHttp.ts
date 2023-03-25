import CurrencyGateway from "../../application/gateway/CurrencyGateway";
import HttpClient from "../http/HttpClient";

export default class CurrencyGatewayHttp implements CurrencyGateway {
  constructor(readonly httpClient: HttpClient) {}

  async getCurrencies() {
    const response = await this.httpClient.get(
      "http://localhost:3013/currencies"
    );
    return response;
  }
}
