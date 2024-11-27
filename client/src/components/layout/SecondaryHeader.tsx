type SecondaryHeaderProps = {
  title: string;
};

const SecondaryHeader = ({ title }: SecondaryHeaderProps): JSX.Element => {
  return <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>;
};

export default SecondaryHeader;
