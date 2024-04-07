import './Editor.scss';
import { useDrag } from 'react-dnd';

import Gem from './Gem';
import Value from './Value';
import EditorZone from './EditorZone';
import {
  gems,
  values,
} from './data';

const Editor = () => {
  return (
    <div
      className="editor-wrapper"
      style={{
        backgroundColor: 'black',
        padding: '2rem',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <h1>Editor</h1>
      <div className="editor row">
        <div className="column editor-nav">
          <h3>Files</h3>
        </div>
        <div className="column editor-content">
          <h3>Content</h3>
          <EditorZone />
        </div>
        <div className="column editor-toolbox">
          <h3>Tools</h3>
          <h4>Gems</h4>
          <div className="tool-list">
            {gems.map((gem, i) => (
              <Gem
                key={i}
                {...gem} 
              />
            ))}
          </div>
          <h4>Values</h4>
          <div className="tool-list">
            {values.map((value, i) => (
              <Value key={i} value={value} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;

