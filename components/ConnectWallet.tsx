import React, { useState } from 'react'
import { ethers } from 'ethers'

type ConnectWalletButtonProps = {
  onConnect: (address: string) => void
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  onConnect,
}) => {
  const [address, setAddress] = useState<string>('')

  const connectWallet = async () => {
    try {
      const wallet = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      const currentAccount = await ethers.getAddress(wallet[0])
      setAddress(currentAccount)
      onConnect(currentAccount) // call the callback function with the new address
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={connectWallet}
        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Connect Wallet
      </button>
    </div>
  )
}

export default ConnectWalletButton
