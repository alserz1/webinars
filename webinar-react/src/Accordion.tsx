export function Accordion() {
  return (
    <aside className="accordion">
      <ul className="tags">
        <li className="tag" tabIndex={0}>
          Work
        </li>
        <li className="tag" tabIndex={0}>
          Home
        </li>
        <li className="tag" tabIndex={0}>
          Reading list
        </li>
      </ul>
    </aside>
  );
}
