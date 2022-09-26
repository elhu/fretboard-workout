interface Props {
  options: { value: string; text: string }[];
  defaultText?: string;
  onChange: React.SelectHTMLAttributes<HTMLSelectElement>["onChange"];
}
export const DropDown = ({ options, onChange, defaultText }: Props) => {
  return (
    <div>
      <select defaultValue={defaultText} onChange={onChange}>
        {defaultText && <option key="default">{defaultText}</option>}
        {options.map(({ value, text }) => {
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </select>
    </div>
  );
};
