import { Project } from "@/types/projects";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type Props = {
  value?: string | number;
  set: (input: string, field: keyof Project) => void;
  isEditing: boolean;
  field: keyof Project;
  isFile?: boolean;
  type?: "text" | "url" | "textarea" | "file";
};

const AdminEditField = ({
  value,
  isEditing,
  set,
  field,

  type,
}: Props) => {
  let outputField = <span>{value}</span>;

  if (!isEditing) {
    if (!value) {
      return null;
    }
    if (type == "url") {
      outputField = (
        <a className="text-teal-50" href={value.toString()}>
          {field}
        </a>
      );
    } else {
      outputField = <span className="break-words text-teal-50">{value}</span>;
    }
  } else {
    switch (type) {
      case "text":
        outputField = (
          <Input value={value} onChange={(e) => set(e.target.value, field)} />
        );
        break;
      case "textarea":
        outputField = (
          <Textarea
            value={value}
            onChange={(e) => set(e.target.value, field)}
          />
        );
        break;
      case "file":
        outputField = (
          <Input
            type="file"
            value={value}
            onChange={(e) => set(e.target.value, field)}
          />
        );
        break;
      case "url":
        outputField = (
          <Input value={value} onChange={(e) => set(e.target.value, field)} />
        );
        break;
      default:
        outputField = (
          <span className="text-[white] break-words">{value}:</span>
        );

        break;
    }
    if (!value) {
      outputField = (
        <Input value={value} onChange={(e) => set(e.target.value, field)} />
      );
    }
  }

  return (
    <div className="text-[black]">
      {isEditing && (
        <span className="text-[white] font-extrabold">{field}:</span>
      )}
      {outputField}
    </div>
  );
};

export default AdminEditField;
