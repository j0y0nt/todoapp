import React from 'react';

class ToDo extends React.Component {
			   
    constructor(props) {
	super(props);
	this.state = {title: 'Todo App',
		      newTaskId: 2,
		      tasks: new Map([
	[0, {id: 0,
	     text: 'Send email to Clark.',
	     done: false}
	],
	[1, {id: 1,
	     text: 'Call Julia.',
	     done: false}
	]
	])
		     };
    }

    markTaskDone(taskId, event) {
	let tasks = this.state.tasks
	let task = tasks.get(taskId);
	task.done = event.target.checked;
	tasks[taskId]= task;
	this.setState((state, props) => ({
	    tasks: tasks
	}));
    }

    addTask(event) {
	if (event.key === "Enter") {
	    // Cancel the default action, if needed
	    event.preventDefault();
	    const nextTaskId =  this.state.newTaskId +1 ; //this.state.tasks.size;
	    const newTaskDesc = event.target.value;
	    let newTask = {id : nextTaskId, text: newTaskDesc, done: false};
	    let updatedTasks = this.state.tasks;
	    updatedTasks.set(nextTaskId, newTask);
	    
	    this.setState((state, props) => ({
		tasks: updatedTasks,
		newTaskId: nextTaskId,
	    }));
	    event.target.value= "";
	}
    }

    deleteTask(taskId, event) {
	let updatedTasks = this.state.tasks;
	updatedTasks.delete(taskId);
	this.setState((state, props) => ({
	    tasks: updatedTasks
	}));   
    }
    
    render() {

	const taskItems = Array.from(this.state.tasks.values()).map(task => {
	    return (
		    <div className="box" key={task.id}>
			<div className="taskSelect">
			    <input type="checkbox"
				   value={task.id}
				   onClick={(e) => this.markTaskDone(task.id, e)}/>
			</div>
			<div className="taskBody"> 
			    <p style={{
				   textDecoration: task.done? 'line-through': ''
			       }}>
				{task.text}
			    </p>
			</div>
			<div className="deleteButtonDiv">
			    <button className="deleteTaskBtn"
				    onClick={(e) => this.deleteTask(task.id, e)}
			    >Delete</button>
			</div>
		    </div>
		);
	    }
	);

	return (
	    <div style={{width: '50%', margin: 'auto'}}>
		<div>
		    <h1>{this.state.title}</h1>
		</div>
		<div className="taskInputDiv">
		    <input placeholder="Enter new task here.... Press Enter when done"
			   type="text" className="taskInput"
			   size="100" onKeyPress={(e) => this.addTask(e)}
			   
		    />
		</div>
		{taskItems}
	    </div>
	);
    }
}

export default ToDo;
