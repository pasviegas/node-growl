var Growl = require('../lib/growl').Growl;


Growl.notify('You have mail!')
Growl.notify('5 new messages', { sticky: true })
Growl.notify('5 new emails', { title: 'Email Client', image: 'Safari', sticky: true })

