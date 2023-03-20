```
index.js
...
const bot = new Bot();

import { setupJoiningStage } from './stages/submodule.js';

setupJoiningStage(bot);

bot.start();
```

```
submodule.js
...

export const setupOnOfTheStages = (bot) => {
  const myArray = [1, 2, 3, 4...];

  const myNewMenu = new Menu('myNewMenu');

  mayArray.map((item) => 
    const myNewSubmenu = new Menu(item.name);
    
    myNewSubmenu
      .text('Hello grammy', (ctx) => ctx.reply('Waboolabudubub!')).row()
      .back('⬅️ Back')

    myNewMenu.register(myNewSubmenu);

    myNewMenu.submenu((ctx) => item.name, item.name);
  });

  bot.use(myNewMenu);
```


```
update {
  update_id: xxx,
  message: {
    message_id: xx,
    from: {
      id: ,
      is_bot: false,
      first_name: 'xxx',
      last_name: 'xxx',
      username: 'xxx',
      language_code: 'xx',
      is_premium: true
    },
    chat: {
      id: ,
      first_name: 'xxx',
      last_name: 'xxx',
      username: 'xxx',
      type: 'private'
    },
    date: xxxxxxx,
    text: 'asd'
  }
}
api Api {
  raw: {},
  config: {
    use: [Function: use],
    installedTransformers: [Function: installedTransformers]
  }
}
me {
  id: ,
  is_bot: true,
  first_name: 'xxx',
  username: 'xxx',
  can_join_groups: true,
  can_read_all_group_messages: false,
  supports_inline_queries: false
}
```