import TreatmentsAutocomplete from '@/components/autocompletes/TreatmentsAutocomplete';
import AutocompleteField from '@/components/forms/fields/AutocompleteField';
import { useState } from 'react';

const options = [
  { label: 'Ukraine', value: 'ua' },
  { label: 'USA', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
];

const Appointments = () => {
  const [selected, setSelected] = useState<{
    label: string;
    value: string;
  } | null>(null);

  return (
    <div className="mx-auto max-w-md p-6">
      <TreatmentsAutocomplete />
    </div>
  );
};

export default Appointments;
