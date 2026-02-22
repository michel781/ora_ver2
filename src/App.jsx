import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState([])
  const [activeTab, setActiveTab] = useState('counter')

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, timestamp: new Date().toLocaleTimeString() }])
      setInputText('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>ORA Test Screen</h1>
        <p className="subtitle">테스트 화면</p>
      </header>

      <nav className="tabs">
        <button
          className={`tab ${activeTab === 'counter' ? 'active' : ''}`}
          onClick={() => setActiveTab('counter')}
        >
          카운터
        </button>
        <button
          className={`tab ${activeTab === 'input' ? 'active' : ''}`}
          onClick={() => setActiveTab('input')}
        >
          입력 테스트
        </button>
        <button
          className={`tab ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          메시지 ({messages.length})
        </button>
      </nav>

      <main className="content">
        {activeTab === 'counter' && (
          <section className="card">
            <h2>카운터 테스트</h2>
            <div className="counter-display">{count}</div>
            <div className="counter-buttons">
              <button onClick={() => setCount(c => c - 1)}>- 1</button>
              <button onClick={() => setCount(0)} className="reset">초기화</button>
              <button onClick={() => setCount(c => c + 1)}>+ 1</button>
            </div>
          </section>
        )}

        {activeTab === 'input' && (
          <section className="card">
            <h2>입력 테스트</h2>
            <div className="input-group">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="메시지를 입력하세요..."
              />
              <button onClick={handleSendMessage}>전송</button>
            </div>
            {inputText && (
              <p className="preview">미리보기: {inputText}</p>
            )}
          </section>
        )}

        {activeTab === 'messages' && (
          <section className="card">
            <h2>메시지 목록</h2>
            {messages.length === 0 ? (
              <p className="empty">"입력 테스트" 탭에서 메시지를 추가해보세요.</p>
            ) : (
              <ul className="message-list">
                {messages.map((msg, i) => (
                  <li key={i} className="message-item">
                    <span className="message-text">{msg.text}</span>
                    <span className="message-time">{msg.timestamp}</span>
                  </li>
                ))}
              </ul>
            )}
            {messages.length > 0 && (
              <button className="reset" onClick={() => setMessages([])}>
                전체 삭제
              </button>
            )}
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>ORA v2 - 테스트 환경</p>
      </footer>
    </div>
  )
}

export default App
