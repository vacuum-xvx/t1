import React, { useMemo, useState } from 'react';
import { ArrowUp, CheckCircle2, ChevronRight, Plus, Star, Target, TrendingUp } from 'lucide-react';

const userProfile = {
  name: 'Crystal',
  role: 'Middle Developer',
  level: 3,
  xp: 2450,
  xpToNext: 3000,
  avatar: '👩‍💻',
  achievements: ['⭐', '🎯', '💖']
};

const initialTasks = [
  { id: 1, title: 'Код-ревью PR #234', status: 'done', xp: 50 },
  { id: 2, title: 'Реализовать новый модуль', status: 'progress', xp: 150 },
  { id: 3, title: 'Фикс бага в продакшене', status: 'progress', xp: 100 },
  { id: 4, title: 'Документация API', status: 'todo', xp: 80 },
  { id: 5, title: 'Оптимизация запросов', status: 'todo', xp: 120 }
];

const careerLevels = [
  { id: 1, name: 'Junior', xp: 0 },
  { id: 2, name: 'Junior+', xp: 1000 },
  { id: 3, name: 'Middle', xp: 2000 },
  { id: 4, name: 'Middle+', xp: 3000 },
  { id: 5, name: 'Senior', xp: 5000 },
  { id: 6, name: 'Senior+', xp: 7000 },
  { id: 7, name: 'Team Lead', xp: 10000 }
];

const achievements = [
  { id: 1, title: 'Первая задача', desc: 'Выполнено', icon: '⭐', unlocked: true },
  { id: 2, title: 'Цель дня', desc: 'Выполнено', icon: '🎯', unlocked: true },
  { id: 3, title: 'Помощь коллеге', desc: 'Выполнено', icon: '💖', unlocked: true },
  { id: 4, title: 'Ночной воин', desc: 'В процессе', icon: '🌙', unlocked: false }
];

const tabs = [
  { id: 'all', label: 'Все' },
  { id: 'progress', label: 'В работе' },
  { id: 'done', label: 'Выполнено' }
];

const statusConfig = {
  done: { label: 'Выполнено', className: 'tag tag-success' },
  progress: { label: 'В работе', className: 'tag tag-progress' },
  todo: { label: 'К выполнению', className: 'tag tag-muted' }
};

export default function CareerPathApp() {
  const [activeTab, setActiveTab] = useState('all');
  const [tasks, setTasks] = useState(initialTasks);

  const filteredTasks = useMemo(() => {
    if (activeTab === 'all') return tasks;
    if (activeTab === 'progress') return tasks.filter(task => task.status === 'progress');
    return tasks.filter(task => task.status === 'done');
  }, [activeTab]);

  const xpPercent = Math.round((userProfile.xp / userProfile.xpToNext) * 100);

  const handleToggleTask = id => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id !== id) return task;
        if (task.status === 'done') return { ...task, status: 'todo' };
        return { ...task, status: 'done' };
      })
    );
  };

  const handleAddTask = () => {
    const title = window.prompt('Название новой задачи');
    if (!title) return;
    setTasks(prev => [
      ...prev,
      {
        id: Date.now(),
        title,
        status: 'todo',
        xp: 80
      }
    ]);
  };

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="logo-side">
          <span className="logo-text">Путь+</span>
        </div>
        <div className="profile-side">
          <div className="xp-box">
            <span>XP</span>
            <strong>
              {userProfile.xp}/{userProfile.xpToNext}
            </strong>
          </div>
          <div className="avatar">{userProfile.avatar}</div>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="hero-card">
          <div className="hero-top">
            <div>
              <p className="hero-label">{userProfile.role}</p>
              <h1>{userProfile.name}</h1>
              <span className="level-badge">LEVEL {userProfile.level}</span>
            </div>
            <div className="hero-avatar">{userProfile.avatar}</div>
          </div>
          <div className="hero-progress">
            <div className="progress-track">
              <div className="progress-bar" style={{ width: `${xpPercent}%` }} />
            </div>
            <div className="progress-footer">
              <span>
                {userProfile.xp}/{userProfile.xpToNext} XP
              </span>
            </div>
          </div>
          <div className="hero-achievements">
            {userProfile.achievements.map(item => (
              <div key={item} className="hero-achievement">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="tasks-card">
          <div className="section-head">
            <div>
              <h2>Задачи дня</h2>
              <p>Фокус на результат: 5 задач</p>
            </div>
            <button className="ghost-button" onClick={handleAddTask}>
              <Plus size={18} />
              Добавить
            </button>
          </div>
          <div className="tabs">
            {tabs.map(tab => (
              <button key={tab.id} className={`tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="task-list">
            {filteredTasks.map(task => {
              const status = statusConfig[task.status];
              return (
                <div key={task.id} className="task-card">
                  <div className="task-info">
                    <input type="checkbox" checked={task.status === 'done'} onChange={() => handleToggleTask(task.id)} />
                    <div>
                      <p className={`task-title ${task.status === 'done' ? 'completed' : ''}`}>{task.title}</p>
                      <span className={status.className}>{status.label}</span>
                    </div>
                  </div>
                  <div className="xp-pill">
                    <Star size={16} />
                    +{task.xp} XP
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="career-card">
          <div className="section-head">
            <div>
              <h2>Карьерный путь</h2>
              <p>
                <TrendingUp size={16} /> 2450 / 10000 XP до цели
              </p>
            </div>
          </div>
          <div className="career-track">
            {careerLevels.map((level, index) => {
              const isActive = userProfile.level === level.id;
              const isPassed = userProfile.level > level.id;

              return (
                <div key={level.id} className="career-step">
                  <div className={`step-circle ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}>
                    {isPassed ? <CheckCircle2 size={18} /> : level.id}
                  </div>
                  <span>{level.name}</span>
                  <small>{level.xp} XP</small>
                  {index !== careerLevels.length - 1 && <ChevronRight className="step-arrow" size={18} />}
                </div>
              );
            })}
          </div>
        </section>

        <section className="achievements-card">
          <div className="section-head">
            <div>
              <h2>Достижения</h2>
              <p>
                <Target size={16} /> {achievements.filter(a => a.unlocked).length} / {achievements.length} активны
              </p>
            </div>
          </div>
          <div className="achievement-grid">
            {achievements.map(item => (
              <div key={item.id} className={`achievement-item ${item.unlocked ? 'unlocked' : ''}`}>
                <div className="achievement-icon">{item.icon}</div>
                <p className="achievement-title">{item.title}</p>
                <span className="achievement-desc">{item.desc}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <ChatWidget />
    </div>
  );
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: 'ai',
      text: 'Привет! Я твой AI-карьерный помощник.\nЕсли нужна помощь с задачами или советы по развитию — просто спроси! 🚀'
    }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now(), author: 'user', text: input.trim() },
      { id: Date.now() + 1, author: 'ai', text: 'Запомнил! Скоро подготовлю подсказку. 😉' }
    ]);
    setInput('');
  };

  return (
    <>
      {isOpen && (
        <div className="chat-panel">
          <header className="chat-header">
            <div>
              <p>AI Помощник</p>
              <span>Всегда на связи</span>
            </div>
            <button onClick={() => setIsOpen(false)}>×</button>
          </header>
          <div className="chat-messages">
            {messages.map(message => (
              <div key={message.id} className={`chat-message ${message.author}`}>
                <div>{message.text}</div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Задай вопрос..." onKeyDown={e => e.key === 'Enter' && handleSend()} />
            <button onClick={handleSend}>
              <SendIcon />
            </button>
          </div>
        </div>
      )}
      <button className="chat-fab" onClick={() => setIsOpen(prev => !prev)}>
        <span role="img" aria-label="chat">
          💬
        </span>
      </button>
    </>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 12L20 4L14 12L20 20L4 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

