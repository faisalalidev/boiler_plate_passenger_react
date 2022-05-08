import stripe from "tipsi-stripe";

import { Publishable_key } from "../constants";
stripe.setOptions({
  publishableKey: Publishable_key //not a client key
});

const options = {
  smsAutofillDisabled: true,
  requiredBillingAddressFields: "zip" // or 'full'
  // theme
};

class Stripe {
  _getStripToken = (anyValue, callBack) => {
    stripe
      .paymentRequestWithCardForm()
      .then(stripeTokenInfo => {
        console.log("Token created", { stripeTokenInfo });
        callBack(anyValue, stripeTokenInfo, true);
      })
      .catch(error => {
        console.log("Payment failed", { error });
        callBack(anyValue, error, false);
      });
  };
}
export default new Stripe();
