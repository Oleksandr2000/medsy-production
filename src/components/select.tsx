import Select from "react-select";

interface ISelectProps {
  onChange: (value: any) => void;
  isMulti?: boolean;
  isLoading?: boolean;
  value: unknown;
  placeholder?: string;
  options: any;
  id: string;
  instanceId: string;
  disabled?: boolean;
  isSearchable?: boolean;
}

export type Option = {
  label: string;
  value: any;
};
const CustomSelect = ({
  id,
  instanceId,
  onChange,
  isMulti = false,
  placeholder,
  value,
  options,
  isLoading = false,
  isSearchable = false,
  disabled,
}: ISelectProps) => (
  <Select
    id={id}
    instanceId={instanceId}
    placeholder={placeholder}
    classNamePrefix="custom-select"
    value={value}
    options={options}
    onChange={onChange}
    isMulti={isMulti}
    isLoading={isLoading}
    isDisabled={disabled}
    isSearchable={isSearchable}
    theme={(theme) => ({
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "lightgray",
        primary: "212121",
      },
    })}
  />
);

export default CustomSelect;
