import React from "react"
import { ethers } from "ethers"
import { useAccountStore } from "@/store/account"
import { getProfile } from "@/api"

const ConnectWalletButton: React.FC = () => {
  const { setAddress, setRole } = useAccountStore()

  const connectWallet = async () => {
    try {
      const wallet = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const currentAccount = await ethers.getAddress(wallet[0])
      setAddress(currentAccount)
      const profile = await getProfile(currentAccount)
      setRole(profile.role)
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
