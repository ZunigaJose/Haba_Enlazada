import IpfsAPI from 'ipfs-api';
const ipfs = new IpfsAPI({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})

export default ipfs;