"use client";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
} from "wagmi";

import SendTx from "@/components/SendTx";

export default function Wagmi() {
  const {
    address,
    isConnecting,
    isDisconnected,
    isConnected,
    connector: user,
  } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { chain, chains } = useNetwork();


  //------------------------

  return (
    <>
      {chain && <div className="m-5 p-5">Connected to {chain.name}</div>}
      {chains && (
        <div className="m-5 p-5">
          Available chains: {chains.map((chain) => `  ${chain.name}  `)}
        </div>
      )}
      {isConnecting && <div>Connecting</div>}
      {isConnected && <div>Address {address} has connected.</div>}
      {isDisconnected ? (
        connectors.map((connector) => (
          <button
            className="p-5 bg-blue-600 m-5 rounded-2xl"
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            {connector.name}
            {`--${connector}--`}
            {isLoading &&
              pendingConnector?.id === connector.id &&
              " (connecting)"}
          </button>
        ))
      ) : (
        <button onClick={() => disconnect()}>Disconnect</button>
      )}

      <SendTx />

      {error && <div>{error.message}</div>}
    </>
  );
}
