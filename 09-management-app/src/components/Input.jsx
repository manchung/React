export default function Input({
  ref,
  title,
  defaultValue,
  textarea,
  ...props
}) {
  const inputClass =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
  const labelClass = "text-sm font-bold uppercase text-stone-500";
  return (
    <>
      <label className={labelClass}>{title}</label>
      {textarea ? (
        <textarea
          ref={ref}
          defaultValue={defaultValue}
          className={inputClass}
          {...props}
        />
      ) : (
        <input
          ref={ref}
          type="text"
          defaultValue={defaultValue}
          className={inputClass}
          {...props}
        />
      )}
    </>
  );
}
