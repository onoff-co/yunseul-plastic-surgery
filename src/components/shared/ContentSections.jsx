export default function ContentSections({ title, items }) {
  return <section className="content-guide">
    <h2>{title}</h2>
    <ol className="content-guide-list">{items.map((item) => <li key={item.title}>
      <div><h3>{item.title}</h3><p>{item.body}</p></div>
    </li>)}</ol>
  </section>;
}
