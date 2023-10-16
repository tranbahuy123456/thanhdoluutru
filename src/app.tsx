import React, { useEffect, useState } from 'react';

function App() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [tasks, setTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/role')
      .then(res => res.json())
      .then(data => {
        setRoles(data);
      });
  }, []);

  function loadTask() {
    const role = selectedRole;
    setAssignedTasks([]);
    setTasks([]);

    fetch(`http://localhost:8080/role?role=${role}`)
      .then(res => res.json())
      .then(data => {
        const taskList = data['task'];
        setAssignedTasks(taskList);
      });

    fetch('http://localhost:8080/task')
      .then(res => res.json())
      .then(data => {
        setTasks(data);
      });
  }

  function actionTask(type, id) {
    const role = selectedRole;
    const xhr = new XMLHttpRequest();
    const obj = document.getElementById('btn_' + id);

    if (
      obj.style.color === '#f22' ||
      obj.style.color === 'rgb(255, 0, 0)' ||
      obj.style.color === 'rgb(255, 34, 34)'
    ) {
      obj.style.color = 'green';
      obj.style.borderColor = 'green';
    } else {
      obj.style.color = '#f22';
      obj.style.borderColor = '#f22';
    }

    xhr.open(
      'GET',
      `http://localhost:8080/task?type=${type}&task=${id}&role=${role}`,
      true
    );
    xhr.send();
  }

  return (
    <div>
      <h3>Chọn nhiệm vụ cho role</h3>
      <div>
        <select
          name=""
          id="role"
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="Chọn role" disabled selected></option>
          {roles.map((role) => (
            <option key={role.name} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <br />
        <span id="task"></span>
        <span id="OnTask"></span>
      </div>
      {tasks.map((task) => (
        <button
          id={`btn_${task._id}`}
          key={task._id}
          style={{
            padding: '5px',
            margin: '5px',
            color: assignedTasks.includes(task._id) ? 'green' : '#f00',
            border: `1px ${assignedTasks.includes(task._id) ? 'green' : '#f00'} solid`
          }}
          onClick={() =>
            actionTask(
              assignedTasks.includes(task._id) ? 'delete' : 'add',
              task._id
            )
          }
        >
          {task.name}
        </button>
      ))}
    </div>
  );
}

export default App;
