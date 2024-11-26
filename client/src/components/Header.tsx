type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps): JSX.Element => {
  return (
    <header className="bg-blue-600 w-full py-4">
      <h1 className="text-white text-2xl font-bold text-center">{title}</h1>
    </header>
  );
};

export default Header;
