import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';
import './UpgradePlanPage.css';

export const UpgradePlanPage = () => {
  const wallet = useTonWallet();

  if (wallet && 'appName' in wallet) {
    return (
      <div>
        <h1>Upgrade plan</h1>
        <TonConnectButton />
        <div>
          <img alt="Provider logo" src={wallet.imageUrl} width={60} height={60} />
          <div>
            <p>
              {wallet.name}
              &nbsp;
              <span>({wallet.appName})</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="upgrade-plan-page">
      <p className="label">Please connect to the TON Wallet</p>
      <TonConnectButton />
    </div>
  );
};
