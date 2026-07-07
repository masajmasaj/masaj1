import { TREATMENTS } from "@/lib/treatments";

export function BookingWidget() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="bg-stone-50 rounded-2xl shadow-soft ring-1 ring-black/5 p-2 grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] items-stretch gap-2 md:gap-0"
    >
      <Field label="Location">
        <input
          type="text"
          placeholder="Enter London postcode"
          className="bg-transparent outline-none text-sm font-medium placeholder:text-stone-300 w-full"
        />
      </Field>
      <Field label="Treatment" bordered>
        <select className="bg-transparent outline-none text-sm font-medium appearance-none w-full">
          {TREATMENTS.map((t) => (
            <option key={t.slug}>{t.name}</option>
          ))}
        </select>
      </Field>
      <Field label="Date" bordered>
        <input type="date" className="bg-transparent outline-none text-sm font-medium w-full" />
      </Field>
      <button
        type="submit"
        className="bg-gold text-stone-50 font-medium px-8 py-4 rounded-xl hover:brightness-105 active:scale-[0.98] transition"
      >
        Check Availability
      </button>
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
      className={`flex flex-col gap-1 px-6 py-3 ${bordered ? "md:border-l border-stone-200" : ""}`}
    >
      <span className="eyebrow text-stone-500">{label}</span>
      {children}
    </label>
  );
}
