import { useState } from "react"

const AddTask = ({ onAdd }) => {

  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) =>{
    e.preventDefault();
    if(!text){
      alert("please add a text please")
      return
    }

    onAdd({text, day, reminder});
    setText('');
    setDay('');
    setReminder(false);
  }
  return (
    <form action="" className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="" className="pr-3">Task</label>
        <input type="text" placeholder="Add task" value={text} onChange={(e) => setText(e.target.value)}/>
      </div>
      <div className="form-control">
        <label htmlFor="" className="pr-3">Day and time</label>
        <input type="text" placeholder="Set Day and Time" value={day} onChange={(e) => setDay(e.target.value)}/>
      </div>
      <div className="form-control">
        <label htmlFor="" className="pr-3">reminder</label>
        <input type="checkbox" value={reminder} checked={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
      </div>

      <input type="submit" className="btn btn-success" value="Save task" />
    </form>
  )
}

export default AddTask