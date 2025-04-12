import { useDebounce } from '@/hooks/useDebounce';
import useFetch from '@/hooks/useFetch';
import { ResponseData } from '@/types/Common';
import { Treatment } from '@/types/Treatments';
import { useState } from 'react';
import AutocompleteField from '../forms/fields/AutocompleteField';

const TreatmentsAutocomplete = () => {
  const [selected, setSelected] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  const { data: treatments, isLoading } = useFetch<ResponseData<Treatment>>(
    '/treatments',
    {
      page: -1,
      limit: -1,
      q: debouncedQuery,
      field: 'treatment_name',
    },
    {
      minQueryLength: 2,
    }
  );

  const options =
    treatments?.data.map((treatment) => ({
      label: treatment.treatment_name,
      value: String(treatment.id),
    })) ?? [];

  return (
    <div>
      <AutocompleteField
        label="Послуги лікування"
        options={options}
        value={selected}
        onChange={setSelected}
        inputValue={searchQuery}
        onInputChange={setSearchQuery}
        isLoading={isLoading}
        renderOption={(option) => (
          <div className="flex flex-col">
            <span className="font-medium">{option.label}</span>
            <span className="text-sm text-gray-500">
              {
                treatments?.data.find((t) => t.id.toString() === option.value)
                  ?.cost
              }{' '}
              грн
            </span>
          </div>
        )}
      />
    </div>
  );
};

export default TreatmentsAutocomplete;
