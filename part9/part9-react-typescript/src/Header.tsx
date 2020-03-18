import React from 'react';

interface IProps {
  name: string;
}

const Header: React.FC<IProps> = ({ name }) => {
  return <h1>{name}</h1>;
};

export default Header;
