function Checkbox({ children, isChecked, onCheck }) {
  return (
    <div className="p-4">
      <label className="flex flex-row items-center text-neutral-200 justify-between" htmlFor={`checkbox-${children}`}>
        {children}
        <input
          className="h-4 w-4 rounded-sm border-[1px] border-white accent-white/5"
          type="checkbox"
          id={`checkbox-${children}`}
          checked={isChecked}
          onChange={onCheck}
        />
      </label>
    </div>
  );
}

export default Checkbox;
