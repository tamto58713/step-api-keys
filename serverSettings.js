module.exports = {
    secure: {
      api_keys: [
        {name: 'devClient', apikey: '1234567', scope: ['write', 'read']},
        {name: 'testClient', apikey: '891011', scope: ['read']},
        {name: 'publicClient', apikey: '0000', scope: ['readPublic']}
      ],
    }
  };