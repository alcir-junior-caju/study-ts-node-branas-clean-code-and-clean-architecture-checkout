import CouponRepository from "../../src/application/repository/CouponRepository";
import ValidateCoupon from "../../src/application/usecase/ValidateCoupon";
import Connection from "../../src/infra/database/Connection";
import PgPromise from "../../src/infra/database/PgPromiseAdapter";
import CouponRepositoryDatabase from "../../src/infra/repository/CouponRepositoryDatabase";

let validateCoupon: ValidateCoupon;
let connection: Connection;
let couponRepository: CouponRepository;

beforeEach(function () {
  connection = new PgPromise();
  couponRepository = new CouponRepositoryDatabase(connection);
  validateCoupon = new ValidateCoupon(couponRepository);
});

afterEach(async function () {
  await connection.close();
});

test("Deve validar um cupom de desconto válido", async function () {
  const input = "VALE20";
  const output = await validateCoupon.execute(input);
  expect(output).toBeTruthy();
});

test("Deve validar um cupom de desconto expirado", async function () {
  const input = "VALE10";
  const output = await validateCoupon.execute(input);
  expect(output).toBeFalsy();
});
