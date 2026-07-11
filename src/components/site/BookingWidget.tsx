import { TREATMENTS } from "@/lib/treatments";

export function BookingWidget() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="bg-stone-50 grid grid-cols-1 md:grid-cols-[1.1fr_1.1fr_1fr_auto] items-stretch"
    >
      <Field label="Location">
        <input
          type="text"
          placeholder="London postcode"
          className="bg-transparent outline-none text-sm font-medium placeholder:text-stone-400 w-full"
        />
      </Field>
      <Field label="Treatment" bordered>
        <select className="bg-transparent outline-none text-sm font-medium appearance-none w-full text-stone-900">
          {TREATMENTS.slice(0, 8).map((t) => (
            <option key={t.slug}>{t.name}</option>
          ))}
        </select>
      </Field>
      <Field label="Date" bordered>
        <input
          type="date"
          className="bg-transparent outline-none text-sm font-medium w-full text-stone-900"
        />
      </Field>
      <div className="p-2 md:p-3 md:pl-1 flex">
        <button
          type="submit"
          className="w-full md:w-auto bg-forest text-stone-50 font-medium text-sm px-8 py-4 md:py-3 rounded-full hover:bg-gold transition-colors tracking-wide"
        >
          Check Availability
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
  bordered,
}: {
  label: string;
  children: React.ReactNode;
  bordered?: boolean;
}) {
  return (
    <label
      className={`flex flex-col gap-1.5 px-6 md:px-8 py-5 md:py-6 ${
        bordered ? "md:border-l border-t md:border-t-0 border-stone-200/80" : ""
      }`}
    >
      <span className="text-[10px] tracking-[0.22em] uppercase text-stone-500 font-medium">
        {label}
      </span>
      {children}
    </label>
  );
}
