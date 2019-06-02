const path = require("path");

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
    timestamp: 1556543153947,
    lastHash:
      "f78ed219d5b60a3665e7382fe68f97cf837bacc732v924n143mf7b401a6002e4",
    hash: "0070514c0601e4d33d5a38bb2419123fee04477098537f14c9c4e807200c9da8",
    data: [
      {
        input: {
          timestamp: 1556543151908,
          transaction_type: "register_transaction",
          transaction_sender:
            "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC62jdP9/hfkPh1jcQwTVGR9SZX\n2o14AS6fbXC0s13YB255EGUtMlxk8BTGAHR+OS7Z//E12PjppGa1OAJAOqqJHF74\ne6kZy3PW4whQ0qqG32mhuaArr9JxdZ+WpeIG0B5xkNAQh2W8cPessCv2udmolobz\n5v4qc3wAHhhkXefYXwIDAQAB\n-----END PUBLIC KEY-----",
          signature:
            "9c8ac5c2d274a62b372ff7ff7815863b59c468d5b7ab633d3194833c7dfc0858be546cfdd83be6476d7f49113593a734336f3dc347280df0482f7820059bc6eb02ba3d9c9749d05954a574273a8d4033e2b0c669722437a6be746692236194a70a91bd642fb8073c4f18e3494c2614e16f31ce206fc081920c34388967b06ad1"
        },
        outputs: [
          {
            mobilePhone: "5453543",
            email: "alexgridnev96@mail.ru",
            fio: "Алексей Гриднев 96",
            user:
              "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC62jdP9/hfkPh1jcQwTVGR9SZX\n2o14AS6fbXC0s13YB255EGUtMlxk8BTGAHR+OS7Z//E12PjppGa1OAJAOqqJHF74\ne6kZy3PW4whQ0qqG32mhuaArr9JxdZ+WpeIG0B5xkNAQh2W8cPessCv2udmolobz\n5v4qc3wAHhhkXefYXwIDAQAB\n-----END PUBLIC KEY-----"
          }
        ]
      }
    ],
    nonce: 520,
    difficulty: 2
  },
  {
    timestamp: 1556543176154,
    lastHash:
      "0070514c0601e4d33d5a38bb2419123fee04477098537f14c9c4e807200c9da8",
    hash: "0480431c13a6a521640ca3f51c54394ef780cc05201f21b149cb6e8e3a575b89",
    data: [
      {
        input: {
          timestamp: 1556543174149,
          transaction_type: "register_transaction",
          transaction_sender:
            "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCfYtBCNpiLxMf4W/zN/s/WV0NV\nKZxuSDgq/7vsV/pspDTeRum4qUe0U2e5HeVp687n1+sSQ7vK6qIlwZ1r/mL0Mmlh\n82vssNEwK7k9rRuBP7zq6sUHl+XwlKLJPlLxfpjVn842DvZBpgzlbMtJl3pXfDP7\n5T84PZr0wsIJ7ZrD2QIDAQAB\n-----END PUBLIC KEY-----",
          signature:
            "492dc42e78a1e55a65f7a53d0ce3eb57b2a9d9af60c86272d49e21432f10f9d7e4691e4aa5b5104e384d12a81d3b69c727aa2a936303d9e51c308c45018fbcfedcb40438727eff681045c0764957d55e2fe124d2e6cdcf1e6deee67ca07f231d59cb76cda0e15029d0b5af5077c97d55484bdf3f1e2af92c0aa539032afe2ac0"
        },
        outputs: [
          {
            mobilePhone: "5453543",
            email: "lexa1548@mail.ru",
            fio: "Алексей Гриднев 1548",
            user:
              "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCfYtBCNpiLxMf4W/zN/s/WV0NV\nKZxuSDgq/7vsV/pspDTeRum4qUe0U2e5HeVp687n1+sSQ7vK6qIlwZ1r/mL0Mmlh\n82vssNEwK7k9rRuBP7zq6sUHl+XwlKLJPlLxfpjVn842DvZBpgzlbMtJl3pXfDP7\n5T84PZr0wsIJ7ZrD2QIDAQAB\n-----END PUBLIC KEY-----"
          }
        ]
      }
    ],
    nonce: 34,
    difficulty: 1
  },
  {
    timestamp: 1556543263945,
    lastHash:
      "0480431c13a6a521640ca3f51c54394ef780cc05201f21b149cb6e8e3a575b89",
    hash: "1bf628e5d5de4830caa9d953d4e29690251218ab953da30497d85467e98cd10f",
    data: [
      {
        input: {
          timestamp: 1556543261938,
          transaction_type: "sign_transaction",
          transaction_sender:
            "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCfYtBCNpiLxMf4W/zN/s/WV0NV\nKZxuSDgq/7vsV/pspDTeRum4qUe0U2e5HeVp687n1+sSQ7vK6qIlwZ1r/mL0Mmlh\n82vssNEwK7k9rRuBP7zq6sUHl+XwlKLJPlLxfpjVn842DvZBpgzlbMtJl3pXfDP7\n5T84PZr0wsIJ7ZrD2QIDAQAB\n-----END PUBLIC KEY-----",
          signature:
            "4659481096f29129307acb88aed76d8051c0a594298b0df0e704c9c4ccad47154e67a9c0bc2a9ce50608efdcd18ea655548767a6c196891ad2b3967589a34e2f9318a60b177ad10b97aeff2f6c41bdce7cfb71bc51e4f32dd9d669bad4aa566e6ed0134a35b1beeb06af1cb6b76714832a02f1ef62e0eb8bc4de0c3f8d4ee58d"
        },
        outputs: [
          {
            user:
              "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCfYtBCNpiLxMf4W/zN/s/WV0NV\nKZxuSDgq/7vsV/pspDTeRum4qUe0U2e5HeVp687n1+sSQ7vK6qIlwZ1r/mL0Mmlh\n82vssNEwK7k9rRuBP7zq6sUHl+XwlKLJPlLxfpjVn842DvZBpgzlbMtJl3pXfDP7\n5T84PZr0wsIJ7ZrD2QIDAQAB\n-----END PUBLIC KEY-----",
            doc_hash: "5dd93a1d7b5a73e791e834e654d83d5a",
            doc_signature:
              "6c7d831f4ebeeb1194479d74096417af5d3959f6b9d76430858e524f0938d5416058a4c24ce252ee230895938326fe30390592bbd5711ca8a377113b4e5f6d7515a116234d6c70e290643a9be1607dc7a8178936436b3ff55b9505a4829b85f5cc78afdd0a21d3f89c394f65c3f680895511fbc0b508e6d21066b3dfab8a69c7",
            signers:
              "0480431c13a6a521640ca3f51c54394ef780cc05201f21b149cb6e8e3a575b89, 0070514c0601e4d33d5a38bb2419123fee04477098537f14c9c4e807200c9da8"
          }
        ]
      }
    ],
    nonce: 1,
    difficulty: 3
  },
  {
    timestamp: 1556543314097,
    lastHash:
      "1bf628e5d5de4830caa9d953d4e29690251218ab953da30497d85467e98cd10f",
    hash: "006e1bbd92906ebea4aeef8b742e04c9eae39d87ff953078461e3999d0fc35e1",
    data: [
      {
        input: {
          timestamp: 1556543312084,
          transaction_type: "sign_transaction",
          transaction_sender:
            "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC62jdP9/hfkPh1jcQwTVGR9SZX\n2o14AS6fbXC0s13YB255EGUtMlxk8BTGAHR+OS7Z//E12PjppGa1OAJAOqqJHF74\ne6kZy3PW4whQ0qqG32mhuaArr9JxdZ+WpeIG0B5xkNAQh2W8cPessCv2udmolobz\n5v4qc3wAHhhkXefYXwIDAQAB\n-----END PUBLIC KEY-----",
          signature:
            "448cf30324fb6c7a921c05b2559978cf9a06b9afc611c4891569d45dfa5c84980e3597f975b16dfc750d2e80512e684b88a058ac4315b5f22fb94734165907be4c2e28924a41b030d3dd7e2ea5a80fc7c955dd3393052d1bd8527107f0ccf7b5cc8f82d623ed073cbf4964d475261d048842c5c6acb22ba18e1376bb4c41249d"
        },
        outputs: [
          {
            user:
              "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC62jdP9/hfkPh1jcQwTVGR9SZX\n2o14AS6fbXC0s13YB255EGUtMlxk8BTGAHR+OS7Z//E12PjppGa1OAJAOqqJHF74\ne6kZy3PW4whQ0qqG32mhuaArr9JxdZ+WpeIG0B5xkNAQh2W8cPessCv2udmolobz\n5v4qc3wAHhhkXefYXwIDAQAB\n-----END PUBLIC KEY-----",
            doc_hash: "5dd93a1d7b5a73e791e834e654d83d5a",
            doc_signature:
              "0c94ac553dd2e67f2809bb5a13fab7f2e7df11fafe589c21ba4c463cfcfc0a388472a95073d7946d7681d75521e884ab3c3900c301068d5935f408c8ab344edf16ab4130787206f837648c5271995d51887457e1d54e143d6b2d5049d07427e01daa3ffd2786f17138da80c054f34d87c48f3c0a4c08d003545e69b5d1040ad9",
            signers:
              "0480431c13a6a521640ca3f51c54394ef780cc05201f21b149cb6e8e3a575b89, 0070514c0601e4d33d5a38bb2419123fee04477098537f14c9c4e807200c9da8"
          }
        ]
      }
    ],
    nonce: 137,
    difficulty: 2
  }
];

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
      return "-1";
    }
  }
  return id_arr;
}

//console.log(GetDocSignFios(str, "5dd93a1d7b5a73e791e834e654d83d5a"));

let filename = "testDoc-574856454857454.pdf";

console.log(path.extname(filename));
