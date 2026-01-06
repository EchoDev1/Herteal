import Input from '../ui/Input';

interface ShippingFormProps {
  values: {
    fullName: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
  };
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export default function ShippingForm({
  values,
  errors,
  onChange,
}: ShippingFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-light mb-6">Shipping Information</h2>

      <Input
        label="Full Name"
        type="text"
        value={values.fullName}
        onChange={(e) => onChange('fullName', e.target.value)}
        error={errors.fullName}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email"
          type="email"
          value={values.email}
          onChange={(e) => onChange('email', e.target.value)}
          error={errors.email}
          required
        />

        <Input
          label="Phone"
          type="tel"
          value={values.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          error={errors.phone}
          required
        />
      </div>

      <Input
        label="Address Line 1"
        type="text"
        value={values.addressLine1}
        onChange={(e) => onChange('addressLine1', e.target.value)}
        error={errors.addressLine1}
        required
      />

      <Input
        label="Address Line 2 (Optional)"
        type="text"
        value={values.addressLine2}
        onChange={(e) => onChange('addressLine2', e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="City"
          type="text"
          value={values.city}
          onChange={(e) => onChange('city', e.target.value)}
          error={errors.city}
          required
        />

        <Input
          label="State"
          type="text"
          value={values.state}
          onChange={(e) => onChange('state', e.target.value)}
          error={errors.state}
          required
        />

        <Input
          label="ZIP Code"
          type="text"
          value={values.zipCode}
          onChange={(e) => onChange('zipCode', e.target.value)}
          error={errors.zipCode}
          required
        />
      </div>
    </div>
  );
}
