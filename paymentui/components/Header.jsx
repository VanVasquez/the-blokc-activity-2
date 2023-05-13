import { ConnectButton } from 'web3uikit';

const Header = () => {
  return (
    <div>
      Payment Contract <ConnectButton moralisAuth={false} />
    </div>
  );
};

export default Header;
