let TelegramBot = require('node-telegram-bot-api');

class TelegramBotHandler {
    constructor(token) {
        this.bot = new TelegramBot(token, {polling: true});
        this.num = 0;
        this.setUpBotOptions();
        this.membersIds = [];
    }

    generateNewOrderNum() {
        this.num++;
        if (this.num === 10000){
            this.num=0;
        }
        return this.num;
    }

    subscribeUser(id){
        this.membersIds.push(id);
    }

    unsubscribeUser(id) {
        let num = this.membersIds.indexOf(id);
        if (num!==-1){
            this.membersIds.splice(num, 1);
        }
    }

    setUpBotOptions() {
        this.bot.on('message', (msg) => {
            let id = msg.chat.id;
            let command = msg.text;
            if (command === "/start" || command=== "/subscribe"){
                this.subscribeUser(id);
            }
            if (command === "/unsubscribe"){
                this.unsubscribeUser(id);
            }
        });

        this.bot.on('new_chat_participant', (user) => {
            console.log("new user connected");
        })
    }

    prepareOrderString(objInfo, productsInfo) {
        let str = "";
        str+="Заявка #"+this.generateNewOrderNum()+"\n";
        str+="Клиент: "+objInfo.name+"\n";
        str+="Телефон: "+objInfo.phone+"\n";
        str+="Адрес доставки: "+objInfo.address+"\n";
        str+="Общая сумма: "+objInfo.price+"\n";
        str+="Список товаров: \n";
        productsInfo.forEach( (product, i) => {
            let num = i+1;
            str+=num+". "+product.productInfo.name+" - "+product.count+" шт.\n";
        });
        return str;
    }

    sendOrder(info, productsInfo) {
        let msg = this.prepareOrderString(info, productsInfo);
        this.sendMessageToAll(msg);
    }

    sendMessageToAll(message) {
        for (let i=0;i<this.membersIds.length;i++){
            let id = this.membersIds[i];
            this.sendMessageTo(id, message);
        }
    }

    sendMessageTo(id, message = ""){
        this.bot.sendMessage(id, message);
    }

}

module.exports.TelegramBotHandler = TelegramBotHandler;