import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './Editor.scss';
import Editor from './Editor';

const EditorContainer = () => (
  <DndProvider backend={HTML5Backend}>
    <Editor />
  </DndProvider>
);
export default EditorContainer;
