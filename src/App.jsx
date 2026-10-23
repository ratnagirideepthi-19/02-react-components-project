import { useState } from 'react'
import './App.css'

const initialTasks = [
  { id: 1, title: 'Learn JSX basics', category: 'Learning', done: true },
  { id: 2, title: 'Build reusable React components', category: 'Practice', done: false },
  { id: 3, title: 'Make a responsive layout', category: 'Design', done: false },
]

function ProfileCard({ name, role, skills, accent }) {
  return (
    <article className="profile-card">
      <div className={`avatar ${accent}`} aria-hidden="true">{name.charAt(0)}</div>
      <div className="profile-info">
        <h3>{name}</h3>
        <p className="muted">{role}</p>
        <div className="skill-list">
          {skills.map((skill) => <span className="skill-tag" key={skill}>{skill}</span>)}
        </div>
      </div>
    </article>
  )
}

function StatCard({ label, value, note, icon }) {
  return (
    <article className="stat-card">
      <div className="stat-icon">{icon}</div>
      <p className="muted stat-label">{label}</p>
      <div className="stat-value">{value}</div>
      <p className="stat-note">{note}</p>
    </article>
  )
}

function TaskList() {
  const [tasks, setTasks] = useState(initialTasks)
  const [newTask, setNewTask] = useState('')

  const completed = tasks.filter((task) => task.done).length

  function toggleTask(id) {
    setTasks((current) => current.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    ))
  }

  function addTask(event) {
    event.preventDefault()
    const title = newTask.trim()
    if (!title) return
    setTasks((current) => [
      ...current,
      { id: Date.now(), title, category: 'Personal', done: false },
    ])
    setNewTask('')
  }

  return (
    <section className="panel tasks-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">STAY ON TRACK</p>
          <h2>My learning tasks</h2>
        </div>
        <span className="progress-pill">{completed}/{tasks.length} done</span>
      </div>
      <div className="progress-track" aria-label={`${completed} of ${tasks.length} tasks completed`}>
        <div className="progress-fill" style={{ width: `${tasks.length ? (completed / tasks.length) * 100 : 0}%` }} />
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <label className={`task-row ${task.done ? 'task-done' : ''}`} key={task.id}>
            <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
            <span className="task-title">{task.title}</span>
            <span className="task-category">{task.category}</span>
          </label>
        ))}
      </div>
      <form className="add-task-form" onSubmit={addTask}>
        <input
          aria-label="New task"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          placeholder="Add a learning task..."
          maxLength={80}
        />
        <button type="submit">Add task <span aria-hidden="true">+</span></button>
      </form>
    </section>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('Overview')
  const tabs = ['Overview', 'Components', 'My progress']

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home" aria-label="React Lab home">
          <span className="brand-mark">R</span>
          <span>react<span className="brand-light">lab</span></span>
        </a>
        <p className="sidebar-label">WORKSPACE</p>
        <nav className="side-nav" aria-label="Main navigation">
          {tabs.map((tab, index) => (
            <button
              className={`nav-item ${activeTab === tab ? 'nav-active' : ''}`}
              key={tab}
              onClick={() => setActiveTab(tab)}
            >
              <span className="nav-number">0{index + 1}</span>
              {tab}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="mini-avatar">D</div>
          <div><strong>Deepthi</strong><span>React learner</span></div>
        </div>
      </aside>

      <main className="main-content" id="home">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>{activeTab}</strong></div>
          <div className="status"><span className="status-dot" /> Practice mode</div>
        </header>

        <section className="welcome-section">
          <div>
            <p className="eyebrow">YOUR FRONTEND JOURNEY</p>
            <h1>Build small.<br /><span>Learn every day.</span></h1>
            <p className="welcome-copy">A friendly space to practise React components, explore reusable UI, and track your progress one step at a time.</p>
            <a className="primary-link" href="#components">Explore components <span aria-hidden="true">↘</span></a>
          </div>
          <div className="hero-art" aria-label="Decorative React learning illustration" role="img">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="hero-core"><span>R</span></div>
            <span className="float-card float-code">&lt;/&gt; <small>Reusable UI</small></span>
            <span className="float-card float-check">✓ <small>One step at a time</small></span>
            <span className="float-dot dot-one" />
            <span className="float-dot dot-two" />
          </div>
        </section>

        <section className="stats-grid" aria-label="Learning statistics">
          <StatCard label="Components" value="04" note="Reusable building blocks" icon="◈" />
          <StatCard label="Learning streak" value="01 day" note="Every day counts" icon="↗" />
          <StatCard label="Focus area" value="React" note="Learn by building" icon="✳" />
        </section>

        <div className="content-grid" id="components">
          <section className="panel components-panel">
            <div className="panel-heading">
              <div><p className="eyebrow">REUSABLE UI</p><h2>Meet the components</h2></div>
              <span className="subtle-count">03 examples</span>
            </div>
            <div className="component-preview">
              <ProfileCard name="Deepthi" role="Frontend learner" skills={['HTML', 'CSS', 'React']} accent="lavender" />
              <ProfileCard name="Aarav" role="UI explorer" skills={['Design', 'Layout']} accent="mint" />
              <ProfileCard name="Mira" role="Problem solver" skills={['JavaScript', 'Logic']} accent="peach" />
            </div>
          </section>
          <TaskList />
        </div>

        <footer className="footer">
          <span>Made with curiosity by Deepthi</span>
          <span>React Components Practice <span className="footer-dot">•</span> 2026</span>
        </footer>
      </main>
    </div>
  )
}

export default App
