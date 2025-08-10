class SmartContractService {
  constructor() {
    this.web3 = null;
    this.contract = null;
    this.contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    this.contractABI = []; // Add your contract ABI here
    this.isInitialized = false;
  }

  // Initialize Web3 and contract connection
  async initialize() {
    try {
      if (typeof window.ethereum !== 'undefined') {
        // Modern dapp browsers
        this.web3 = new window.Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } else if (typeof window.web3 !== 'undefined') {
        // Legacy dapp browsers
        this.web3 = new window.Web3(window.web3.currentProvider);
      } else {
        throw new Error('No Web3 provider detected');
      }

      if (this.contractAddress && this.contractABI.length > 0) {
        this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
      }

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Error initializing Web3:', error);
      throw error;
    }
  }

  // Check if Web3 is available
  isWeb3Available() {
    return typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined';
  }

  // Get current account
  async getCurrentAccount() {
    try {
      if (!this.web3) await this.initialize();
      
      const accounts = await this.web3.eth.getAccounts();
      return accounts[0] || null;
    } catch (error) {
      console.error('Error getting current account:', error);
      return null;
    }
  }

  // Get account balance
  async getBalance(address = null) {
    try {
      if (!this.web3) await this.initialize();
      
      const account = address || await this.getCurrentAccount();
      if (!account) throw new Error('No account available');

      const balance = await this.web3.eth.getBalance(account);
      return this.web3.utils.fromWei(balance, 'ether');
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }

  // Execute a contract method (read-only)
  async callContractMethod(methodName, ...args) {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized');
      }

      const result = await this.contract.methods[methodName](...args).call();
      return result;
    } catch (error) {
      console.error(`Error calling contract method ${methodName}:`, error);
      throw error;
    }
  }

  // Execute a contract transaction
  async sendContractTransaction(methodName, value = '0', ...args) {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized');
      }

      const account = await this.getCurrentAccount();
      if (!account) {
        throw new Error('No account connected');
      }

      const gasEstimate = await this.contract.methods[methodName](...args)
        .estimateGas({ from: account, value: this.web3.utils.toWei(value, 'ether') });

      const tx = await this.contract.methods[methodName](...args).send({
        from: account,
        value: this.web3.utils.toWei(value, 'ether'),
        gas: Math.floor(gasEstimate * 1.2) // Add 20% buffer
      });

      return tx;
    } catch (error) {
      console.error(`Error sending contract transaction ${methodName}:`, error);
      throw error;
    }
  }

  // Listen for contract events
  subscribeToEvent(eventName, callback, fromBlock = 'latest') {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized');
      }

      const subscription = this.contract.events[eventName]({
        fromBlock
      });

      subscription.on('data', callback);
      subscription.on('error', (error) => {
        console.error(`Error in event ${eventName}:`, error);
      });

      return subscription;
    } catch (error) {
      console.error(`Error subscribing to event ${eventName}:`, error);
      throw error;
    }
  }

  // Get transaction receipt
  async getTransactionReceipt(txHash) {
    try {
      if (!this.web3) await this.initialize();
      
      return await this.web3.eth.getTransactionReceipt(txHash);
    } catch (error) {
      console.error('Error getting transaction receipt:', error);
      throw error;
    }
  }

  // Convert Wei to Ether
  weiToEther(weiAmount) {
    return this.web3 ? this.web3.utils.fromWei(weiAmount.toString(), 'ether') : '0';
  }

  // Convert Ether to Wei
  etherToWei(etherAmount) {
    return this.web3 ? this.web3.utils.toWei(etherAmount.toString(), 'ether') : '0';
  }

  // Switch network
  async switchNetwork(chainId) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: this.web3.utils.toHex(chainId) }],
      });
    } catch (error) {
      console.error('Error switching network:', error);
      throw error;
    }
  }

  // Get current network
  async getCurrentNetwork() {
    try {
      if (!this.web3) await this.initialize();
      
      return await this.web3.eth.getChainId();
    } catch (error) {
      console.error('Error getting current network:', error);
      throw error;
    }
  }
}

export default new SmartContractService();