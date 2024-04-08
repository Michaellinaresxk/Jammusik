
import type Payment from "@/domain/payment/Payment";

export class PaymentView {

  private constructor(
    public readonly userId: string,
    public readonly productId: string,
    public readonly price: string
  ) {}

  static fromDomain(payment: Payment) {
    const { userId, productId, price  } = payment;
    return new PaymentView(
      userId,
      productId,
      price
    );
  }
}