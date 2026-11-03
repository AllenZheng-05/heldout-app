const STEPS = ['Dates & pickup', 'Rider & extras', 'Review & pay'];

export default function Steps({ current }: { current: number }) {
  return (
    <ol className="steps" aria-label="Checkout progress">
      {STEPS.map((s, i) => (
        <li
          key={s}
          className={i === current ? 'active' : i < current ? 'done' : ''}
          aria-current={i === current ? 'step' : undefined}
        >
          <span className="step-num">{i + 1}</span> {s}
        </li>
      ))}
    </ol>
  );
}
