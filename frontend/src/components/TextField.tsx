import "../styles/TextField.scss";
type Props = {
  error: string | undefined;
};
const TextField: React.FC<Props> = ({ error, ...rest }) => {
  return (
    <div className="text-field">
      <input type="text" placeholder="Add your todo..." {...rest} />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default TextField;
