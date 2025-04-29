'use client'
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.scss";
import { apiGetTasks, apiPostTask, apiUpdateTask, ITask } from "@/lib/api";

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [inputData, setInputData] = useState<string>('');

  useEffect(() => {
    apiGetTasks()
      .then(setTasks)
      .catch(console.log)
  }, [])

  function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    apiPostTask(inputData)
      .then((res) => {
        setTasks((prev) => [...prev, res])
      })
      .catch(console.log)
      .finally(() => setInputData(''))
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputData(value);
  }

  function handleTasksClick(task: ITask) {
    apiUpdateTask(task.id, !task.completed)
      .then((res) => {
        setTasks(prev => prev.map(item => item.id == task.id ? res : item));
      })
      .catch(console.log)
  }

  const { completedTasks, uncompletedTasks } = useMemo(() => { // Сортируем наши тудушки
    return tasks.reduce<{
      completedTasks: ITask[];
      uncompletedTasks: ITask[];
    }>(
      (acc, task) => {
        if (task.completed) {
          acc.completedTasks.push(task);
        } else {
          acc.uncompletedTasks.push(task);
        }
        return acc;
      },
      { completedTasks: [], uncompletedTasks: [] }
    );
  }, [tasks]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.stack} style={{ "--stacks": 3 } as React.CSSProperties}>
            <span style={{ "--index": 0 } as React.CSSProperties}>ЗАДАЧНИК 2000</span>
            <span style={{ "--index": 1 } as React.CSSProperties}>ЗАДАЧНИК 2000</span>
            <span style={{ "--index": 2 } as React.CSSProperties}>ЗАДАЧНИК 2000</span>
          </div>
        </div>
        <section className={styles.columns}>
          <div className={styles.left_column}>
            <h2>Текущие задачи</h2>
            <form onSubmit={handleSubmitForm} className={styles.form}>
              <input value={inputData} onChange={handleInputChange} />
              <button type="submit">Создать</button>
            </form>

            <ul className={styles.list}>
              {uncompletedTasks?.map((task) => (
                <li key={task.id}>
                  {task.title}
                  <button onClick={() => handleTasksClick(task)}>Выполнить</button>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.right_column}>
            <h2>Выполненные задачи</h2>
            <ul className={styles.list}>
              {completedTasks?.map((task) => (
                <li key={task.id}>
                  {task.title}
                  <button onClick={() => handleTasksClick(task)}>Вернуть в задачи</button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.stack} style={{ "--stacks": 3 } as React.CSSProperties}>
            <span style={{ "--index": 0 } as React.CSSProperties}>Это мое тестовое :0</span>
            <span style={{ "--index": 1 } as React.CSSProperties}>Это мое тестовое :0</span>
            <span style={{ "--index": 2 } as React.CSSProperties}>Это мое тестовое :0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
