localhost:3000/new 调用public/widgets/new.html（一个表格）,它的action是widgets/create,然后他会去调用added.ejs方法将新
加的内容显示出来。它是通过表格中的id,譬如id="widgetprice"， 跟下面的dict进行对应

// widgets.js
widgets[widgets.length] =
  { id : indx,
	  name : req.body.widgetname,
	  price : parseFloat(req.body.widgetprice),
	  desc : req.body.widgetdesc}
