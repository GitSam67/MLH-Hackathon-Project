export const CONTRACT_ADDRESS = "0X81Bd07C7225a011A903c12540Accab639E964dB9"

export const CONTRACT_ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "Id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "Hash",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "Size",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "Type",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "Name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "uploadTime",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "uploader",
                "type": "address"
            }
        ],
        "name": "Uploaded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_Hash",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_Size",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_Type",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_Name",
                "type": "string"
            }
        ],
        "name": "uploadFile",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "Count",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "files",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "Id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "Hash",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "Size",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "Type",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "Name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "uploadTime",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "uploader",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }

   

]   

