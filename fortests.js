var _ = require("underscore");
var str = [
  {
    timestamp: "Genesis time",
    lastHash: "----",
    hash: "f78ed219d5b60a3665e7382fe68f97cf837bacc732v924n143mf7b401a6002e4",
    data: [],
    nonce: 0,
    difficulty: 3
  },
  {
    timestamp: 1535042135830,
    lastHash:
      "f78ed219d5b60a3665e7382fe68f97cf837bacc732v924n143mf7b401a6002e4",
    hash: "00258e45y5t4u6u35twrt373a476fa72dd28",
    data: [
      {
        input: {
          timestamp: 1535042135796,
          transaction_type: "register_transaction",
          transaction_sender:
            "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEf7GfgFPKhQ6Gy7qeFlzdaf4c\n2/3YUMf8+/D09Mu5G1LGUR3I0tAJj3aMzz2lG2xR1c1IB8mfafWSPmeHkrovDeJR\nAlpFUOn7glbtG4ofihQzI5UiTqjq52lHra7cCModGCbIeZIYjKXGLWujhaHvrpul\n8TwTEDXzRfnGdqdI1wIDAQAB\n-----END PUBLIC KEY-----",
          signature:
            "8870952494152602d3d9a221c77704460d420194a324c3fca378c0d6be05281a7737f20a6e4b87c45449a3ef5334b3747616745330b03a6375c7edd12abbebc784b59d1e72364f3311a06c84da6ca116e4c0a54d66244eed38553b712f38a31cb96f414c8b474a9465508d104b0329058df827cf6834e024bb52d5af95ec446d"
        },
        outputs: [
          {
            mobilePhone: "455646534",
            email: "ivan@mail.ru",
            fio: "my fio",
            user:
              "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEf7GfgFPKhQ6Gy7qeFlzdaf4c\n2/3YUMf8+/D09Mu5G1LGUR3I0tAJj3aMzz2lG2xR1c1IB8mfafWSPmeHkrovDeJR\nAlpFUOn7glbtG4ofihQzI5UiTqjq52lHra7cCModGCbIeZIYjKXGLWujhaHvrpul\n8TwTEDXzRfnGdqdI1wIDAQAB\n-----END PUBLIC KEY-----"
          }
        ]
      }
    ],
    nonce: 463,
    difficulty: 2
  },
  {
    timestamp: 1535042150640,
    lastHash:
      "00258ef444e72092b0b060ac84394d642744637257cfdf23bf73a476fa72dd28",
    hash: "08rerer3453453r34534r34534c1d8dcb5227654645645645627ebc5c89f",
    data: [
      {
        input: {
          timestamp: 1535042150638,
          transaction_type: "register_transaction",
          transaction_sender:
            "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDi6oPd0f1YAwJcO87JbZvJdKeb\nlGx9uKc13CeMiCf4cpyx6AHK+iVd0r/EUy9Bnj5ILBRmT9Xx6zTOb6YUHf3kECTu\nU8djKsQD9pETlhZuBTgeO8SbwYmkbCGLP6JbaOydng2rr0hE2vhXndejCPy3sE1H\nZURSsSJphyjFqZrauwIDAQAB\n-----END PUBLIC KEY-----",
          signature:
            "d58e5cf78e5c7e4d1ca95cab913e58b15144a898b480285cf4bb6a084672bd5362b58b9ad8f0a103b13b1c741a3374bdd3b3b5cfae852f56c0c5720e66b219143b59e4830cfb7542cf390b74703bdd862b9da1ac7b4c891b758805b3ac72430607e4fe80d2e3605a260469830f5bdbddcdf27bb29048adb2d6d12e0e756ff137"
        },
        outputs: [
          {
            mobilePhone: "537563543",
            email: "alex@mail.ru",
            fio: "fio1",
            user:
              "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDi6oPd0f1YAwJcO87JbZvJdKeb\nlGx9uKc13CeMiCf4cpyx6AHK+iVd0r/EUy9Bnj5ILBRmT9Xx6zTOb6YUHf3kECTu\nU8djKsQD9pETlhZuBTgeO8SbwYmkbCGLP6JbaOydng2rr0hE2vhXndejCPy3sE1H\nZURSsSJphyjFqZrauwIDAQAB\n-----END PUBLIC KEY-----"
          }
        ]
      }
    ],
    nonce: 14,
    difficulty: 1
  },
  {
    timestamp: 1535042150640,
    lastHash:
      "00258ef444e72092b0b060ac84394d642744637257cfdf23bf73a476fa72dd28",
    hash: "08c1d8dcb5256y65y4y46y5y46ya7d9031c0759e2518c51c827ebc5c89f",
    data: [
      {
        input: {
          timestamp: 1535042150638,
          transaction_type: "register_transaction",
          transaction_sender:
            "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDi6oPd0f1YAwJcO87JbZvJdKeb\nlGx9uKc13CeMiCf4cpyx6AHK+iVd0r/EUy9Bnj5ILBRmT9Xx6zTOb6YUHf3kECTu\nU8djKsQD9pETlhZuBTgeO8SbwYmkbCGLP6JbaOydng2rr0hE2vhXndejCPy3sE1H\nZURSsSJphyjFqZrauwIDAQAB\n-----END PUBLIC KEY-----",
          signature:
            "d58e5cf78e5c7e4d1ca95cab913e58b15144a898b480285cf4bb6a084672bd5362b58b9ad8f0a103b13b1c741a3374bdd3b3b5cfae852f56c0c5720e66b219143b59e4830cfb7542cf390b74703bdd862b9da1ac7b4c891b758805b3ac72430607e4fe80d2e3605a260469830f5bdbddcdf27bb29048adb2d6d12e0e756ff137"
        },
        outputs: [
          {
            mobilePhone: "53443243",
            email: "tom@gmail.com",
            fio: "fio",
            user:
              "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDi6oPd0f1YAwJcO87JbZvJdKeb\nlGx9uKc13CeMiCf4cpyx6AHK+iVd0r/EUy9Bnj5ILBRmT9Xx6zTOb6YUHf3kECTu\nU8djKsQD9pETlhZuBTgeO8SbwYmkbCGLP6JbaOydng2rr0hE2vhXndejCPy3sE1H\nZURSsSJphyjFqZrauwIDAQAB\n-----END PUBLIC KEY-----"
          }
        ]
      }
    ],
    nonce: 14,
    difficulty: 1
  },
  {
    timestamp: 1535042150640,
    lastHash:
      "00258ef444e72092b0b060ac84394d642744637257cfdf23bf73a476fa72dd28",
    hash: "08c1d8dcb5256y65y4y46y5y46ya7d9031c0759e2518c51c827ebc5c89f",
    data: [
      {
        input: {
          timestamp: 1535042150638,
          transaction_type: "sign_transaction",
          transaction_sender:
            "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDi6oPd0f1YAwJcO87JbZvJdKeb\nlGx9uKc13CeMiCf4cpyx6AHK+iVd0r/EUy9Bnj5ILBRmT9Xx6zTOb6YUHf3kECTu\nU8djKsQD9pETlhZuBTgeO8SbwYmkbCGLP6JbaOydng2rr0hE2vhXndejCPy3sE1H\nZURSsSJphyjFqZrauwIDAQAB\n-----END PUBLIC KEY-----",
          signature:
            "d58e5cf78e5c7e4d1ca95cab913e58b15144a898b480285cf4bb6a084672bd5362b58b9ad8f0a103b13b1c741a3374bdd3b3b5cfae852f56c0c5720e66b219143b59e4830cfb7542cf390b74703bdd862b9da1ac7b4c891b758805b3ac72430607e4fe80d2e3605a260469830f5bdbddcdf27bb29048adb2d6d12e0e756ff137"
        },
        outputs: [
          {
            mobilePhone: "53443243",
            email: "tomas@gmail.com",
            doc_hash: "12331345",
            user:
              "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDi6oPd0f1YAwJcO87JbZvJdKeb\nlGx9uKc13CeMiCf4cpyx6AHK+iVd0r/EUy9Bnj5ILBRmT9Xx6zTOb6YUHf3kECTu\nU8djKsQD9pETlhZuBTgeO8SbwYmkbCGLP6JbaOydng2rr0hE2vhXndejCPy3sE1H\nZURSsSJphyjFqZrauwIDAQAB\n-----END PUBLIC KEY-----"
          }
        ]
      }
    ],
    nonce: 14,
    difficulty: 1
  },
  {
    timestamp: 1535042150640,
    lastHash:
      "00258ef444e72092b0b060ac84394d642744637257cfdf23bf73a476fa72dd28",
    hash: "08c1d8dcb5256y65y4y46y5y46ya7d9031c0759e2518c51c827ebc5c89f",
    data: [
      {
        input: {
          timestamp: 1535042150638,
          transaction_type: "sign_transaction",
          transaction_sender:
            "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDi6oPd0f1YAwJcO87JbZvJdKeb\nlGx9uKc13CeMiCf4cpyx6AHK+iVd0r/EUy9Bnj5ILBRmT9Xx6zTOb6YUHf3kECTu\nU8djKsQD9pETlhZuBTgeO8SbwYmkbCGLP6JbaOydng2rr0hE2vhXndejCPy3sE1H\nZURSsSJphyjFqZrauwIDAQAB\n-----END PUBLIC KEY-----",
          signature:
            "d58e5cf78e5c7e4d1ca95cab913e58b15144a898b480285cf4bb6a084672bd5362b58b9ad8f0a103b13b1c741a3374bdd3b3b5cfae852f56c0c5720e66b219143b59e4830cfb7542cf390b74703bdd862b9da1ac7b4c891b758805b3ac72430607e4fe80d2e3605a260469830f5bdbddcdf27bb29048adb2d6d12e0e756ff137"
        },
        outputs: [
          {
            mobilePhone: "53443243",
            email: "tim@gmail.com",
            doc_hash: "12331345",
            user:
              "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDi6oPd0f1YAwJcO87JbZvJdKeb\nlGx9uKc13CeMiCf4cpyx6AHK+iVd0r/EUy9Bnj5ILBRmT9Xx6zTOb6YUHf3kECTu\nU8djKsQD9pETlhZuBTgeO8SbwYmkbCGLP6JbaOydng2rr0hE2vhXndejCPy3sE1H\nZURSsSJphyjFqZrauwIDAQAB\n-----END PUBLIC KEY-----"
          }
        ]
      }
    ],
    nonce: 14,
    difficulty: 1
  },
  {
    timestamp: 1535042150640,
    lastHash:
      "00258ef444e72092b0b060ac84394d642744637257cfdf23bf73a476fa72dd28",
    hash: "08c1d8dcb5256y65y4y46y5y46ya7d9031c0759e2518c51c827ebc5c89f",
    data: [
      {
        input: {
          timestamp: 1535042150638,
          transaction_type: "sign_transaction",
          transaction_sender:
            "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDi6oPd0f1YAwJcO87JbZvJdKeb\nlGx9uKc13CeMiCf4cpyx6AHK+iVd0r/EUy9Bnj5ILBRmT9Xx6zTOb6YUHf3kECTu\nU8djKsQD9pETlhZuBTgeO8SbwYmkbCGLP6JbaOydng2rr0hE2vhXndejCPy3sE1H\nZURSsSJphyjFqZrauwIDAQAB\n-----END PUBLIC KEY-----",
          signature:
            "d58e5cf78e5c7e4d1ca95cab913e58b15144a898b480285cf4bb6a084672bd5362b58b9ad8f0a103b13b1c741a3374bdd3b3b5cfae852f56c0c5720e66b219143b59e4830cfb7542cf390b74703bdd862b9da1ac7b4c891b758805b3ac72430607e4fe80d2e3605a260469830f5bdbddcdf27bb29048adb2d6d12e0e756ff137"
        },
        outputs: [
          {
            mobilePhone: "53443243",
            email: "pol@gmail.com",
            doc_hash: "12331345",
            user:
              "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDi6oPd0f1YAwJcO87JbZvJdKeb\nlGx9uKc13CeMiCf4cpyx6AHK+iVd0r/EUy9Bnj5ILBRmT9Xx6zTOb6YUHf3kECTu\nU8djKsQD9pETlhZuBTgeO8SbwYmkbCGLP6JbaOydng2rr0hE2vhXndejCPy3sE1H\nZURSsSJphyjFqZrauwIDAQAB\n-----END PUBLIC KEY-----"
          }
        ]
      }
    ],
    nonce: 14,
    difficulty: 1
  }
];

// var res = str.filter(
//   a =>
//     a.data &&
//     a.data.find(
//       b =>
//         b.input.transaction_type == "sign_transaction" &&
//         b.outputs[0].doc_hash == "12331345"
//     )
// );

console.log(ConvertPubKeysToIds(str, "12331345"));

function GetDocSignFios(str, hash) {
  var keypairs = [];
  var id_arr = [];
  var res_senders = str.filter(
    a =>
      a.data &&
      a.data.find(
        b =>
          b.input.transaction_type == "sign_transaction" &&
          b.outputs[0].doc_hash == hash
      )
  );

  for (let a of res_senders) {
    keypairs.push(a.data[0].input.transaction_sender);
  }

  for (let i = 0; i < keypairs.length; i++) {
    var res = str.find(
      a =>
        a.data &&
        a.data.find(
          b =>
            b.input.transaction_type == "register_transaction" &&
            b.outputs[0].user == keypairs[i]
        )
    );
    try {
      id_arr.push(res.data[0].outputs[0].fio);
    } catch (e) {
      return -1;
    }
  }
  return id_arr;
}
