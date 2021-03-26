var app = new Vue({
    el: '#root',
    data: {
        ind: 0,
        searchcontact: '',
        sending: '',
        clicked: -1,
        lastentry: '',
        lasttext: '',
        mdbn: 'none',
        details: '',
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'E allora ne approfittiamo ;D',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ovvio ;)',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Marco',
                avatar: '_4', 
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Orazio',
                avatar: '_5', 
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 16:33:40',
                        text: 'Stasera ci si diverte, ho trovato la scusa perfetta per liberarmi. Luisa non lo scoprira\' mai',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 16:34:00',
                        text: 'Ti aspetto <3',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_6', 
                visible: true,
                messages: [
                    {
                        date: '12/01/2020 16:36:17',
                        text: 'Sono la moglie di Orazio, smettila di andare a letto con lui!',
                        status: 'received'
                    },
                    {
                        date: '12/01/2020 16:38:02',
                        text: 'No.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Sempre Orazio',
                avatar: '_5', 
                visible: true,
                messages: [
                    {
                        date: '12/01/2020 18:10:35',
                        text: 'Sono sempre io, Luisa mi ha distrutto il telefono... e la macchina. Ci vediamo la prossima settimana?',
                        status: 'received'
                    },
                    {
                        date: '12/01/2020 19:59:40',
                        text: 'Quando vuoi <3',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Marcello',
                avatar: '_8', 
                visible: true,
                messages: [
                    {
                        date: '17/01/2020 18:30:21',
                        text: 'Marcello!',
                        status: 'sent'
                    },
                    {
                        date: '17/01/2020 19:54:00',
                        text: 'Che c\'e\'?',
                        status: 'received'
                    }
                ],
            }
        ]
    },

    methods: {
        chats: function(index) {
            this.clicked = -1;
            this.ind = 0;
            this.ind = index;
            this.lastentry = '';
            this.lastentry = this.contacts[this.ind].messages[this.contacts[this.ind].messages.length - 1].date;
        },
        send: function() {
            var time = new Date().toLocaleTimeString();
            var date = new Date().toLocaleDateString();

            if (this.sending == 0) {
                return;
            }

            this.contacts[this.ind].messages.push({
                date: `${date} ${time}`,
                text: this.sending,
                status: 'sent'
            });

            this.sending = '';

            setTimeout(() => {
                this.lastentry = 'Online';
            }, 2000);

            setTimeout(() => {
                this.lastentry = 'Sta scrivendo...';
            }, 3500);

            setTimeout(() => {
                time = new Date().toLocaleTimeString();
                date = new Date().toLocaleDateString();
                this.contacts[this.ind].messages.push({
                    date: `${date} ${time}`,
                    text: 'Ok',
                    status: 'received'
                });
                this.lastentry = '';
                this.lastentry = this.contacts[this.ind].messages[this.contacts[this.ind].messages.length - 1].date;
                
                this.$nextTick(function() {
                    scrolling();
                });

            }, 5000);

            this.$nextTick(function() {
                scrolling();
            });

        },
        inspect: function() {
            this.searchcontact = this.searchcontact.charAt(0).toUpperCase() + this.searchcontact.slice(1);
            console.log(this.searchcontact);

            for (var key in this.contacts) {
                this.contacts[key].visible = true;
            }

            for (i = 0; i < this.searchcontact.length; i++) {

                for (var key in this.contacts) {

                    if(this.contacts[key].name[i] != this.searchcontact[i]) {
                        this.contacts[key].visible = false;
                    }
    
                }

            }

            this.searchcontact = '';
        },
        infomessage: function(indice) {

            if (this.clicked == indice) {
                this.clicked = -1;
            } else {
                this.clicked = indice;
            }

        },
        removeinfo: function() {
            this.clicked = -1;
        },
        canc: function(indice) {
            
            if(this.contacts[this.ind].messages.length == 1) {
                this.details = '';
                this.details = 'Hai cancellato questa chat.';
                this.mdbn = 'block auto';

                if (this.contacts.length == 1) {
                    this.lastentry = '';
                    this.lasttext = '';        
                    time = new Date().toLocaleTimeString();
                    date = new Date().toLocaleDateString();    
                    this.contacts.push({
                        name: 'Boolzapp Assistant',
                        avatar: 'img/avatar_io.jpg', 
                        visible: true,
                        messages: [
                            {
                                date: `${date} ${time}`,
                                text: 'Ciao! Avvia una nuova chat',
                                status: 'received'
                            }
                        ],
                    });
                }

                this.contacts.splice(this.ind, 1); 
            } else {
                this.contacts[this.ind].messages.splice(indice, 1);
            }

            if (this.ind == this.contacts.length) {
                this.ind--
            }

            this.clicked = -1;
        },
        messagedetails: function(indi) {
            this.details = '';
            this.details = this.contacts[this.ind].messages[indi];
            this.mdbn = 'block';
        },
        closewindow: function() {
            this.mdbn = 'none';
        }
    },

    created: function() {
            this.lastentry = '';
            this.lasttext = '';
            this.lastentry = this.contacts[this.ind].messages[this.contacts[this.ind].messages.length - 1].date;
            this.lasttext = this.contacts[this.ind].messages[this.contacts[this.ind].messages.length - 1].text;            
    }
});

function scrolling() {
    var scroller = document.getElementById('last');
    scroller.scrollIntoView(false);
    return;
}