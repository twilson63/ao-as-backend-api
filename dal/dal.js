import { message, result, createDataItemSigner, dryrun } from '@permaweb/aoconnect'

const PROCESS = "zxqMCg6Eil-U04j7gSk2bns3TJmS3EvC0PrPz8P_Wws"

function read(tags, options = {}) {
    return dryrun({
        process: PROCESS,
        data: "",
        tags: [
            { name: 'Data-Protocol', value: 'ao' },
            { name: 'Variant', value: 'ao.TN.1'},
            { name: 'Type', value: 'Message'},
            ...tags
        ],
        ...options
    }).then(res => res.Output.data)
}

function writeMessage(data, tags) {
    return message({
        process: PROCESS,
        signer: createDataItemSigner(arweaveWallet),
        data: data,
        tags: [
            { name: 'Data-Protocol', value: 'ao' },
            { name: 'Variant', value: 'ao.TN.1'},
            { name: 'Type', value: 'Message'},
            ...tags
        ]
    }).then(id => result({
        process: PROCESS,
        message: id
    })).then(res => res.Output.data)
}

// List Todos
export function list(user) {
    return read([
        {name: 'Action', value: 'List'}
    ], { Owner: user })
}

// Add Todo
export function add(description) {
    return writeMessage(description, [
        {name: 'Action', value: 'Add-Item'}
    ])
}
// 
// Mark Complete
export function complete(id) {
    return writeMessage(id, [
        {name: 'Action', value: 'Complete'}
    ])    
}

// Remove Todo
export function remove(id) {
    return writeMessage(id, [
        {name: 'Action', value: 'Remove'}
    ])    
}
