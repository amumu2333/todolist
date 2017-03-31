
  var ing = document.querySelector(".ing"),
      ed = document.querySelector(".ed");
  var ing_num = 0,
      ed_num = 0;
  var add = $("header #title-text");
  var todo = getItem("todo");
  reload(todo);


  add.get(0).onkeydown = function (event) {
    if (event.keyCode == 13) {
      if (this.value.lenght == 0) {
        alert("不能为空");
        return;
      };
      add_todo(this.value);
      this.value = "";
    }
  }


  //重载
  function reload(arr) {

    var ing_str = "",
        ed_str = "";
    for ( var i in arr) {
      if (arr[i].isDone == true) {
        ed_str +=
          '<li class="item draggable">'+
            '<input type="checkbox" name="" value="" checked onclick=change('+i+',"isDone",false)>'+
            '<p class="info" contenteditable onblur=change('+i+',"title",this.innerHTML)>'+arr[i].title+'</p>'+
            '<p class="time">'+arr[i].time+'</p>'+
            '<a href="##" class="remove" onclick=change('+i+')>-</a>'+
          '</li>';
      } else if (arr[i].isDone == false ) {
        ing_str +=
          '<li class="item draggable">'+
            '<input type="checkbox" name="" value="" onclick=change('+i+',"isDone",true)>'+
            '<p class="info" contenteditable onblur=change('+i+',"title",this.innerHTML)>'+arr[i].title+'</p>'+
            '<p class="time">'+arr[i].time+'</p>'+
            '<a href="##" class="remove" onclick=change('+i+')>-</a>'+
          '</li>';
      }
      $(".list",ed).html(ed_str);
      $(".list",ing).html(ing_str);
    }
  };//reload





  function current_time(time) {
    var year = time.getFullYear() % 100;
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hour = time.getHours();
    var min = time.getMinutes();
    return year+"/"+month+"/"+date+" "+hour+":"+min;
  }



  //add
  function add_todo(data) {
    todo.unshift({
      title: data,
      isDone: false,
      time: current_time(new Date())
    })
    reload(todo);
    setItem("todo",todo);
  }

  //change
  function change(i,key,val) {
    if (key == undefined && val == undefined) {
      todo.splice(i,1);
    }else{
      todo[i][key] = val;
    }
    setItem("todo",todo);
    reload(todo);
  }





  //setItem
  function setItem(key,data) {
    localStorage.setItem(
      key,
      JSON.stringify(data)
    )
  }

  //getItem
  function getItem(key) {
    var data = localStorage.getItem(key) || "[]";
    return JSON.parse(data);
  }
