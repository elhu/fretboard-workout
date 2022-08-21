function DropDown(props) {
  const { options, onChange, defaultText } = props;

  return (
    <div>
      <select defaultValue={defaultText} onChange={onChange}>
        <option key="default">{defaultText}</option>
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
}

export { DropDown };
