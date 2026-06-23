const Input = ({ icon: Icon, rightIcon:RightIcon,onRightIconClick, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-indigo-400" />
      </div>

      <input
        {...props}
        className="
      w-full
      pl-10
      pr-3
      py-2
      bg-slate-800/50
      rounded-lg
      focus:border-indigo-500
      focus:ring-2
      focus:ring-indigo-500
      text-white
      placeholder-slate-400
      transition-all
      duration-200
    "
      />
        {RightIcon && (
        <button
          type="button"
          onClick={onRightIconClick}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <RightIcon className="size-5 text-indigo-400" />
        </button>
      )}
    </div>
  );
};

export default Input;
