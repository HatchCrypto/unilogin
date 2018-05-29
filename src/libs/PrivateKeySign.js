
/**
 * @PrivateKeySign
 * Takes a private key and a data payload, signs the data with private key
 *
 * Returns a signed and unsigned data payload
 */
import ethUtils from 'ethereumjs-util';

const PrivateKeySign = ( _data, _account, _privateKey ) => {
  const header = '0x19'
  const version = '0'
  const _transactionHash = ethUtils.keccak256(header, version, _account, _data);
  const _signedTransactionHash = ethUtils.ecsign(_transactionHash, _privateKey);

  return {transactionHash: _transactionHash, signedTransactionHash: _signedTransactionHash};
}

export default PrivateKeySign;
