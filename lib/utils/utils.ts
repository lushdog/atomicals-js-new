import axios from "axios";

export const sleeper = async (seconds: number) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, seconds * 1000);
    })
  }

export function onlyUnique<T>(value: T, index: number, array: T[]) {
  return array.indexOf(value) === index;
}


export async function getUnSpentUtxo(address): Promise<any> {
    const url = `https://api.blockcypher.com/v1/btc/main/addrs/${address}?unspentOnly=true`
    const response = await axios.get(url);
    const txs = response.data.txrefs || [];
    txs.map(item => {
        // 兼容现有格式
        item.index = item.tx_output_n;
        item.txid = item.tx_hash;
        item.txId = item.tx_hash;
        item.outputIndex = item.tx_output_n;
        item.vout = item.index;
        item.atomicals = [];
    })
    return txs
}