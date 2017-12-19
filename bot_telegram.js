const TOKEN = process.env.TELEGRAM_TOKEN || '474321130:AAHmMrkAzAnre3i9phhV1lqP5RsRLsNuNC4';
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const hours = [1, 2, 3, 7]
const need_to_fill_hour = 5
const request = require('request');
const options = {
  polling: true
};
const bot = new TelegramBot(TOKEN, options);

// Matches /cheking_if_coming
bot.onText(/\/cheking_if_coming/, function onEditableText(msg) {
  const opts = {
    reply_markup: {
      inline_keyboard: 
	  [
        [
          {
            text: 'no',
             // we shall check for this value when we listen
             // for "callback_query"
            callback_data: 'no'
          },
		  {
            text: 'yes',
             // we shall check for this value when we listen
             // for "callback_query"
            callback_data: 'yes'
          }
        ]
      ]
    }
  };
  bot.sendMessage(msg.from.id, 'Are you coming to all your classes tommorow?', opts);
});

function change_because_cannot(hour) {
	fs.writeFile("C:\\Users\\Administrator\\Desktop\\test.txt", hour, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}
); 
}

// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let text;

  if (action === 'no') {
    text = 'Ok fixing the time system';
	for (var i = 0; i < hours.length; i++) {
		const opts = {
			reply_markup: 
			{
				inline_keyboard:
				[
					[ 	
			          {
						text: 'no',
						// we shall check for this value when we listen
						// for "callback_query"
				
						callback_data: 'yes'
				      },
			          {
						text: 'yes',
						// we shall check for this value when we listen
						// for "callback_query"
						callback_data: 'not coming'
			          }
					]
				]
			}
		};
	bot.sendMessage(msg.chat.id, 'Are you going to miss the ' +  hours[i] + ' hour?', opts);
	}
  };

  
   if (action === 'yes') {
    text = 'Great!!!';
	bot.editMessageText(text, opts);
  }
  
  if (action === 'not coming') {
    text = text = 'Ok fixing the time system';
	hour = hours[i];
	change_because_cannot(hour);
	bot.editMessageText(text, opts);
  }
  
});

// Matches /cheking_if_can_fill_in
bot.onText(/\/cheking_if_can_fill_in/, function onEditableText(msg) {
  const opts = {
    reply_markup: {
      inline_keyboard: 
	  [
        [
          {
            text: 'no',
             // we shall check for this value when we listen
             // for "callback_query"
            callback_data: 'not able'
          },
		  {
            text: 'yes',
             // we shall check for this value when we listen
             // for "callback_query"
            callback_data: 'able'
          }
        ]
      ]
    }
  };
  bot.sendMessage(msg.from.id, 'Can you fiil in in the ' + need_to_fill_hour + ' hour tommorow?', opts);
});

function change_because_can() {
	fs.writeFile("C:\\Users\\Administrator\\Desktop\\test.txt", 'can', function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}
); 
}

// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let text;

  if (action === 'able') {
    text = 'Great, fixing the time system';
	change_because_can();
	bot.editMessageText(text, opts);
	}

  if (action === 'not able') {
    text = 'OK';
	bot.editMessageText(text, opts);
	}

});