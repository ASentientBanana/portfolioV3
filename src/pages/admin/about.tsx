import { useState } from "react"



const AboutAdmin = () => {

  const [description, setDescription] = useState('')
  const [stack, setStack] = useState('')

  return (

    <div className="m-auto flex flex-col gap-5 pt-10 items-center">
      <h1>
        Landing page
      </h1>
      <div className="flex flex-col w-[80%]">
        <span>
          Edit the description
        </span>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        <button>Revert</button>
      </div>

      <div className="flex flex-col w-[80%]">
        <span>Edit the tech stack</span>
        <input value={stack} onChange={(e) => setStack(e.target.value)} />
        <button>Revert</button>
      </div>


      <button className="w-full bg-[green]">
        Save
      </button>
    </div>
  )

}

export default AboutAdmin
