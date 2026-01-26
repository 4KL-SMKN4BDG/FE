interface HeaderProps {
  Title: string;
  Description?: string;
}

const Header: React.FC<HeaderProps> = ({ Title, Description }) => {
  return (
    <div>
      <div className="w-full">
        <p className="text-2xl font-bold max-xl:text-4xl">{Title}</p>
        <p className="text-sm max-xl:text-base">{Description}</p>
      </div>
    </div>
  );
};

export default Header;
