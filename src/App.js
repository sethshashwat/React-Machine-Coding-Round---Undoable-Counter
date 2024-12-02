import { useState } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState(0);
  const [history, setHistory] = useState([]);
  const [redoList, setRedoList] = useState([]);
  const [undoCount, setUndoCount] = useState(0);
  const [redoCount, setRedoCount] = useState(0);

  const handleClick = (action) => {
    const val = parseInt(action);
    maintainHistory(action, value, value + val);
    setValue(value + val);
  }

  const maintainHistory = (action, previousValue, updatedValue) => {
    const obj = { action, previousValue, updatedValue };
    const copyHistory = [...history];
    copyHistory.unshift(obj);
    setHistory(copyHistory);
  }

  const handleUndo = () => {
    if (history.length) {
      if (undoCount + 1 > 5) {
        alert("You can't undo beyond limit = 5");
        return;
      }
      setUndoCount((c) => c + 1);
      const copyHistory = [...history];
      const firstItem = copyHistory.shift();
      setHistory(copyHistory);
      setValue(firstItem.previousValue);

      const copyRedoList = [...redoList];
      copyRedoList.push(firstItem);
      setRedoList(copyRedoList);
    }
  }

  const handleRedo = () => {
    if (redoList.length) {
      if (redoCount + 1 > 4) {
        alert("You can't redo beyond limit = 4");
        return;
      }
      setRedoCount((c) => c + 1);
      const copyRedoList = [...redoList];
      const lastItem = copyRedoList.pop();
      setRedoList(copyRedoList);
      setValue(lastItem.updatedValue);

      const copyHistory = [...history];
      copyHistory.unshift(lastItem);
      setHistory(copyHistory);
    }
  }

  return (
    <div className="App">
      <h1>Undoable Counter</h1>
      <div class="action-buttons">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>
      <div class="user-actions">
        {
          [-100, -10, -1].map((action) => {
            return (
              <button onClick={() => handleClick(action)}>{action}</button>
            )
          })
        }
        <div style={{ fontSize: 40 }}>{value}</div>
        {
          ["+1", "+10", "+100"].map((action) => {
            return (
              <button onClick={() => handleClick(action)}>{action}</button>
            )
          })
        }
      </div>
      <div class="history">
        <h1>History</h1>
        {
          history.map((item) => {
            return (
              <div className='row'>
                <div>{item.action}</div>
                <div>
                  {
                    `[ ${item.previousValue} -> ${item.updatedValue} ]`
                  } </div>
              </div>

            )
          })
        }
      </div>
    </div>
  );
}

export default App;
