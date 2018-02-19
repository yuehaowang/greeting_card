# Greeting Card
---------------

*Your creative, cross-platform and magnificent greeting card.*

## Intro

Be tired of paper greeting card? Get no originality about birthday gift? This project may come to your assistance. To make sure you'll immediately fall in love with it, please enjoy two screenshots below.

![Screenshot 1](http://images.cnblogs.com/cnblogs_com/yorhom/731449/o_greeting_card1.png)

![Screenshot 2](http://images.cnblogs.com/cnblogs_com/yorhom/731449/o_greeting_card2.png)

You may want to write some warm words to your best friends, parents or lover. Plain text may bore them. *Greeting Card* provides a magnificent animation to show the message brick by brick. Receivers just need to tap the screen until they make sense of what you want to express (maybe it's your gratitude or your love). Two demo are listed below:

- [Happy Birthday to My Grandma](http://yuehaolab.com/demo/greeting_card_showcase/0/)
- [Happy Chinese Valentine's Day](http://yuehaolab.com/demo/greeting_card_showcase/1/)

Being compatible with many popular platforms including main-stream web browsers, QQ and Wechat, your receivers can open and view your greeting card everywhere regardless they are using smart phones or computers. (Non-fluency phenomenon may occur on certain devices, because particle animations are fairly performance hungry.)


## Guide to Use

First, clone this project to your workspace:

```bash
git clone https://github.com/yuehaowang/greeting_card.git
```

After downloading, you'll get a project directory. Open `index.html` in your web browser which must support HTML5 and then you'll see the default demo. Tap the demo page until there is no unemitted particle. Now, you have got your first impression of this project. To customize the text showing on the screen, two files are allowed to be modified. They are `common.js` and `list.js`. It's not necessary to modify other files unless you want to do some extensions.

In `common.js`, it's allowed to modify six variables. Below are their brief introductions:

- `documentTitle` Document title
- `particleW` Particles' width
- `particleH` Particles' height
- `stageW` Screen width (Generally, it's a multiple of `particleW`)
- `stageH` Screen height (Generally, it's a multiple of `particleH`)
- `emitterNum` The number of particles to emit at a time

Generally speaking, you don't have to modify the variables in `common.js` at all, while `list.js` requires more attention. Open `list.js` in a text editor, there is a two-dimensional array filled with `true` and `false`. Actually, it's a text map which indicates the positions of particles.

To generate your own text map, open `export_array_tool.html` in your web browser. It's an affiliated tool to edit your own text map. Do some clicks on the gird and you'll see that the color of the block you click turns darkgray and if you click it again, it will turn back to white. One darkgray block indicates there is one paritcle. White area indicates there is no particle. However, if you check the 'Revert' checkbox (below the gird), the meaning of the two colors will be swapped.

After designing text map, click 'Export Array' button to generate a text map array. Then, copy and paste it to the right position in `list.js` (Make sure not to forget saving the file). Finally, refresh/open `index.html` to check the result.

If you want to do some modifications based on the previous work, you can import it to the editor with the help of 'Import Content' text box and 'Import Array' button (Notice, 'Revert' checkbox has no influence on the import function). Undo operation is avaliable but just for the latest 10 operations. **(Updated on 12/25/2017)**

Find the design totally unsatisfied? Try clicking 'Reset' button to clear the gird and result. (It's **NOT** allowed to undo this operation, so please think over before using it.)

![Export Array Tool](http://images.cnblogs.com/cnblogs_com/yorhom/731449/o_export_array_tool.png)

> Note: `particleW particleH stageW stageH` in `common.js` have influence on `export_array_tool.html` as well.

All the left to do is to publish your work. If you get nowhere to upload your work but you really need to share it, don't hesitate and drop me an email with a .zip attachment which contains your work. I'm willing to help you out.


## Contact

If you come across any problems, please let me know immediately~

> Twitter: @yuehaowang
>
> Weibo: @Yorhom
>
> Email: wangyuehao1999@gmail.com (Recommended)


## License 

[MIT License](http://en.wikipedia.org/wiki/MIT_License)