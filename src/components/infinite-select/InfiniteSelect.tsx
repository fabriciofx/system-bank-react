import { useCallback, useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent
} from '@mui/material';

export type Option = {
  label: string;
  value: string;
};

type InfiniteSelectProps = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: (page: number) => Promise<Option[]>;
  required?: boolean;
};

const InfiniteSelect: React.FC<InfiniteSelectProps> = ({
  label,
  value,
  onChange,
  options,
  required
}) => {
  const [opts, setOpts] = useState<Option[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadOptions = useCallback(
    async (nextPage: number) => {
      setLoading(true);
      const newOpts = await options(nextPage);
      setOpts((prev) => [...prev, ...newOpts]);
      setLoading(false);
    },
    [options]
  );

  useEffect(() => {
    loadOptions(1);
  }, [loadOptions]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  const handleScroll = async (event: React.UIEvent<HTMLUListElement>) => {
    const target = event.currentTarget;
    if (
      target.scrollTop + target.clientHeight >= target.scrollHeight - 5 &&
      !loading
    ) {
      const nextPage = page + 1;
      setPage(nextPage);
      await loadOptions(nextPage);
    }
  };

  return (
    <FormControl fullWidth variant="filled">
      <InputLabel id="infinite-select-label">{label}</InputLabel>
      <Select
        labelId="infinite-select-label"
        required={required}
        value={String(value)}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            onScroll: handleScroll,
            style: { maxHeight: 200 }
          }
        }}
      >
        {opts.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
        {loading && <MenuItem disabled>Carregando...</MenuItem>}
      </Select>
    </FormControl>
  );
};

export default InfiniteSelect;
