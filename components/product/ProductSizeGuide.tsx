import Modal from '../ui/Modal';

interface ProductSizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductSizeGuide({
  isOpen,
  onClose,
}: ProductSizeGuideProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Size Guide" size="medium">
      <div className="space-y-6">
        <p className="text-soft-gray">
          Our garments are designed to provide a tailored fit. Please refer to
          the measurements below to find your perfect size.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-light-gray">
                <th className="py-3 px-4 text-left font-medium">Size</th>
                <th className="py-3 px-4 text-left font-medium">Bust (in)</th>
                <th className="py-3 px-4 text-left font-medium">Waist (in)</th>
                <th className="py-3 px-4 text-left font-medium">Hips (in)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-light-gray">
                <td className="py-3 px-4">XS</td>
                <td className="py-3 px-4">31-32</td>
                <td className="py-3 px-4">24-25</td>
                <td className="py-3 px-4">34-35</td>
              </tr>
              <tr className="border-b border-light-gray">
                <td className="py-3 px-4">S</td>
                <td className="py-3 px-4">33-34</td>
                <td className="py-3 px-4">26-27</td>
                <td className="py-3 px-4">36-37</td>
              </tr>
              <tr className="border-b border-light-gray">
                <td className="py-3 px-4">M</td>
                <td className="py-3 px-4">35-36</td>
                <td className="py-3 px-4">28-29</td>
                <td className="py-3 px-4">38-39</td>
              </tr>
              <tr className="border-b border-light-gray">
                <td className="py-3 px-4">L</td>
                <td className="py-3 px-4">37-39</td>
                <td className="py-3 px-4">30-32</td>
                <td className="py-3 px-4">40-42</td>
              </tr>
              <tr>
                <td className="py-3 px-4">XL</td>
                <td className="py-3 px-4">40-42</td>
                <td className="py-3 px-4">33-35</td>
                <td className="py-3 px-4">43-45</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-warm-white p-4 text-sm">
          <p className="font-medium mb-2">How to Measure</p>
          <ul className="space-y-1 text-soft-gray">
            <li>• Bust: Measure around the fullest part of your bust</li>
            <li>• Waist: Measure around the narrowest part of your waist</li>
            <li>• Hips: Measure around the fullest part of your hips</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}
