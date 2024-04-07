import EditorRow from './EditorRow';

const EditorZone = ({ numRows = 5 }: { numRows?: number }) => {
  return (
    <div className="editor-zone">
      {Array.from({ length: numRows }).map((_, i) => (
        <EditorRow key={i} />
      ))}
    </div>
  );
}
export default EditorZone;
