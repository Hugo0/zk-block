import React, { useState } from 'react';
import {
  Box,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Typography,
} from '@mui/material';

import BaseButton, {
  maxButtonHeight,
  maxButtonWidth,
} from '@components/common/BaseButton';

import { networkConfig } from '@config/network';
import { useWalletConnect } from '@hooks/useWalletConnect';

const networkOptions = Object.values(networkConfig);

const WalletConnectComponent = () => {
  const {
    provider,
    network,
    account,
    chainId,
    connectWallet,
    switchNetwork,
    setNetwork,
    web3Modal,
    disconnect,
  } = useWalletConnect();

  const handleNetworkSelect = (event: any) => {
    console.log(`event.target.value`, event.target.value);
    setNetwork(event.target.value);
    switchNetwork(event.target.value);
  };

  React.useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  return (
    <Box
      style={{
        flexDirection: 'column',
        justifyContent: 'start',
      }}
    >
      <Box
        style={{
          display: 'flex',
          justifyContent: 'start',
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="network-select-label">Network</InputLabel>
          <Select
            labelId="network-select-label"
            id="network-select"
            value={chainId}
            label="Network"
            onChange={handleNetworkSelect}
            sx={{
              border: '2px solid black',
              maxWidth: maxButtonWidth,
              maxHeight: maxButtonHeight,
              fontSize: '10px',
            }}
          >
            {networkOptions.map((network) => (
              <MenuItem
                value={network.chainId}
              >{`${network.name} (${network.chainName})`}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {!account ? (
          <BaseButton variant="contained" onClick={connectWallet}>
            Connect Wallet
          </BaseButton>
        ) : (
          <BaseButton variant="contained" onClick={disconnect}>
            Disconnect
          </BaseButton>
        )}
      </Box>
      <Typography>{`Account: ${account ?? ''}`}</Typography>
      <Typography>{`Network ID: ${
        chainId ? chainId : 'No Network'
      }`}</Typography>
    </Box>
  );
};

export default WalletConnectComponent;
