import { PAY_NOW, PAY_NEGATIVE_PAYMENT } from "./ActionTypes";

export function request(data: Object, success: Function, failure: Function) {
  return {
    payload: data,
    success,
    failure,
    type: PAY_NOW.REQUEST
  };
}
export function requestNegativePayment(
  data: Object,
  success: Function,
  failure: Function
) {
  return {
    payload: data,
    success,
    failure,
    type: PAY_NEGATIVE_PAYMENT.REQUEST
  };
}
