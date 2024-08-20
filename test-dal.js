import fs from 'fs'
import { list, add, complete, remove } from './dal/dal.js'
import Arweave from 'arweave'

globalThis.arweaveWallet = JSON.parse(fs.readFileSync('./test-wallet.json', 'utf-8'))
let arweave = Arweave.init({})

async function main() {
  // add todo
  // console.log(await add("Remember the milk"))
  // list todos
  const user = await arweave.wallets.jwkToAddress(globalThis.arweaveWallet)
  const result = await list(user)
  console.log(result)

  // complete todo
  //const result = await complete("2")
  //console.log(result)

  // remove todo 
  //console.log(await remove("2"))
}

main()
