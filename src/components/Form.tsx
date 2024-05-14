import { Movie, Show } from "../types/types";

type FormProps = {
  onClose?: () => void;
  edit: any;
  object: Movie | Show;
};

function Form({ onClose, edit = {}, object }: FormProps) {
  return <div></div>;
}

export default Form;
