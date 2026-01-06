import Input from '../ui/Input';

export default function PaymentForm() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-light mb-6">Payment Information</h2>

      <div className="bg-warm-white p-6 text-sm text-soft-gray mb-6">
        This is a demo checkout. No actual payment will be processed.
      </div>

      <Input
        label="Card Number"
        type="text"
        placeholder="1234 5678 9012 3456"
        disabled
      />

      <div className="grid grid-cols-2 gap-4">
        <Input label="Expiry Date" type="text" placeholder="MM/YY" disabled />
        <Input label="CVV" type="text" placeholder="123" disabled />
      </div>

      <Input
        label="Cardholder Name"
        type="text"
        placeholder="John Doe"
        disabled
      />
    </div>
  );
}
