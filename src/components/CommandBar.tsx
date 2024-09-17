import { Autocomplete, CircularProgress, TextField, createFilterOptions } from '@mui/material';
import React from 'react';
import { UseMutationResult } from 'react-query';
import { useNavigate } from 'react-router-dom'; // Add this import

interface SearchOption {
  inputValue?: string;
  title: string;
  original_title: string;
  source?: string;
  id?: string;
}
const filter = createFilterOptions<SearchOption>();

export function CommandBar({
  searchOptionsList,
  loadingNewTheme,
  setLoadingNewTheme,
  addTheme,
}: {
  searchOptionsList: SearchOption[];
  loadingNewTheme: boolean;
  setLoadingNewTheme: React.Dispatch<React.SetStateAction<boolean>>;
  addTheme: UseMutationResult<string, unknown, string, unknown>;
}) {
  const navigate = useNavigate(); // Initialize navigate
  return (
    <Autocomplete
      freeSolo
      options={searchOptionsList}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      disabled={loadingNewTheme}
      loading={true}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        const isExisting = options.some((option) => inputValue.toLowerCase() === option.original_title.toLowerCase());
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            original_title: `Add Topic: "${inputValue}"`,
            title: inputValue,
            source: 'custom',
          });
        }
        return filtered;
      }}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.original_title;
      }}
      renderOption={(props, option) => {
        const { ...optionProps } = props;
        if ('key' in optionProps) {
          delete optionProps.key;
        }
        return (
          <li key={option.id} {...optionProps}>
            {option.original_title}
          </li>
        );
      }}
      groupBy={(option) => option.source || ''}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {params.InputProps.endAdornment}
                {loadingNewTheme && <CircularProgress size={20} />}
              </>
            ),
          }}
        />
      )}
      onChange={(_event, newValue, reason) => {
        if (reason === 'selectOption' && newValue && typeof newValue !== 'string') {
          if (newValue.source === 'custom' && newValue.original_title.startsWith('Add Topic:')) {
            // Use a state setter function instead of directly modifying the ref
            setLoadingNewTheme(true);
            addTheme.mutate(newValue.title);
          } else {
            navigate(`/theme/${newValue.title}`);
          }
        } else if (reason === 'createOption' && newValue && typeof newValue === 'string') {
          navigate(`/search/${encodeURIComponent(newValue)}`);
        }
      }}
    />
  );
}
