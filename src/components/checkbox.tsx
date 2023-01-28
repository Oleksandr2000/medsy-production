import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface ICheckboxProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  values?: any;
  label: string;
}

const Checkbox = ({ values, label, ...props }: ICheckboxProps) => (
  <label className="mr-4 mb-2 flex items-center">
    <input {...props} type="checkbox" className="absolute h-8 w-8 opacity-0" />
    <div className="mr-2 flex  h-8 w-8 flex-shrink-0 items-center justify-center rounded border-2 border-dark bg-white focus-within:border-dark dark:bg-slate-500">
      {Array.isArray(values) && values?.includes(props.value) && (
        <svg
          className="pointer-events-none block h-3 w-3 fill-current text-dark"
          version="1.1"
          viewBox="0 0 17 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(-9 -11)" fill="#212121" fillRule="nonzero">
              <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
            </g>
          </g>
        </svg>
      )}
      {typeof values === "boolean" && values && (
        <svg
          className="pointer-events-none block h-3 w-3 fill-current text-dark"
          version="1.1"
          viewBox="0 0 17 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(-9 -11)" fill="#212121" fillRule="nonzero">
              <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
            </g>
          </g>
        </svg>
      )}
    </div>
    <span className="text-base font-normal text-gray-500 dark:text-gray-400">
      {label}
    </span>
  </label>
);

export default Checkbox;
