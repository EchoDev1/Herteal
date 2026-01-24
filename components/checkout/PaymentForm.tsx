import Input from '../ui/Input';

export default function PaymentForm() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-light mb-6">Payment Information</h2>

      <Input
        label="Card Number"
        type="text"
        placeholder="1234 5678 9012 3456"
        disabled
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
