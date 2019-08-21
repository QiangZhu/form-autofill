console.log("autofill starting .....");

/*
在此处定义表单对象
*/
var autoFillForm = {
  //标题
  title: "",
  //违规等级
  level: "1",
  //网页截图
  snapshot: "",
  //URL
  url: "",
  //网站名称
  website: ""
};

/*
处理copy操作
*/
function copy() {
  console.log("------------start copy-------------------");
  //通过DOM查找页面需要拷贝的值
  var title = document.getElementById("title").value;
  var level_select = document.getElementById("level");
  var level = level_select.options[level_select.selectedIndex].value; 
  var snapshot_src = document.getElementById("snapshot").src;
  //赋值
  autoFillForm.title = title;
  autoFillForm.level = level;
  autoFillForm.snapshot = snapshot.src;
  //存储到storage
  chrome.storage.sync.set({
    'key_autoFillForm': autoFillForm
  }, function () {
    console.log("storage stores autoFillForm is ", autoFillForm);
  });
  console.log("-----------end copy---------------------");
}

/*
处理粘贴操作
*/
function paste() {
  console.log("------------start paste-------------------");
  chrome.storage.sync.get(['key_autoFillForm'], function (result) {
    //从storage获取需要自动填充对象
    autoFillForm = result.key_autoFillForm;
    console.log('get autoFillForm from storage :' + autoFillForm);
    //通过DOM自动填充
    document.getElementById("title").value = autoFillForm.title;
    var level_select = document.getElementById("level");
    level_select.value = autoFillForm.level;
    document.getElementById("snapshot").src = autoFillForm.snapshot;
  });
  console.log("------------end paste-------------------");
}


/*
接受消息
 */
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log("-------context script listner received a message--------");
    var requestAction = request.action;
    if (requestAction == "copy") {
      copy();
      console.log(" context script received copy command");
    } else if (requestAction == "paste") {
      paste();
      console.log(" context script received paste command");
    } else {
      console.log(" context script received unknown command : " + requestAction);
    }
    sendResponse({
      action: requestAction
    });
  }
);
