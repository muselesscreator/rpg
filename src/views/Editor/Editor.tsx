import './Editor.scss';
import EditorZone from './EditorZone';
import EditorToolbox from './EditorToolbox';

const Editor = () => {
  return (
    <div className="editor-wrapper">
      <div className="editor row">
        <div className="column editor-nav">
          <h3>Files</h3>
        </div>
        <div className="column editor-content">
          <h3>Content</h3>
          <EditorZone />
        </div>
        <EditorToolbox />
      </div>
    </div>
  );
};

export default Editor;

