/**
 * 角色管理的单例
 */
var Menu = {
		id : "menuTable",	//表格id
		seItem : null,		//选中的条目
		table : null,
		layerIndex : -1
};

/**
 * 初始化表格的列
 */
Menu.initColumn = function(){
	var columns = [  
		{field: 'selectItem',radio:true},     
        {title: 'id',field: 'id', visible: false, align: 'center',valign: 'middle'},   
        {title: '菜单编号',field: 'code',align: 'center',valign: 'middle'},   
        {title: '菜单父编号',field: 'pcode',align: 'center',valign: 'middle'},   
        {title: '菜单名称',field: 'name',align: 'center',valign: 'middle'},
        {title: '请求地址',field: 'url',align: 'center',valign: 'middle'},
        {title: '排序',field: 'num',align: 'center',valign: 'middle'},
        {title: '层级',field: 'levels',align: 'center',valign: 'middle'},
        {title: '状态',field: 'statusName',align: 'center',valign: 'middle'}]
	return columns;
};

/**
 * 绑定表格的事件
 */
Menu.bindEvent = function(){
	$('#' + this.id).on('click-row.bs.table', function(e, row, $element) {
		Menu.seItem = row;
    });
};

/**
 * 检查是否选中
 */
Menu.check = function(){
	if(this.seItem == null){
		Feng.info("请先选中表格中的某一记录！");
		return false;
	}else{
		return true;
	}
};

/**
 * 点击添加菜单
 */
Menu.openAddMenu = function(){
	var index = layer.open({
	    type: 2,
	    title: '添加菜单',
	    area: ['800px', '450px'], //宽高
	    fix: false, //不固定
	    maxmin: true,
	    content :Feng.ctxPath + '/menu/menu_add'
	});
	this.layerIndex = index;
};

/**
 * 点击修改
 */
Menu.openChangeMenu = function(){
	if(this.check()){
		var index = layer.open({
		    type: 2,
		    title: '修改菜单',
		    area: ['800px', '450px'], //宽高
		    fix: false, //不固定
		    maxmin: true,
		    content :Feng.ctxPath + '/menu/menu_edit/' + this.seItem.id
		});
		this.layerIndex = index;
	}
};

/**
 * 删除
 */
Menu.delMenu = function(){
	if(this.check()){
		var ajax = new $ax(Feng.ctxPath + "/menu/remove/" + this.seItem.id, function(data){
			Feng.success("删除成功!");
			Menu.table.refresh();
		},function(data){
			Feng.error("删除失败!");
		});
		ajax.start();
	}
};

$(function(){
	var defaultColunms = Menu.initColumn();
	var table = new BSTable(Menu.id,"/menu/list",defaultColunms);
	table.setPaginationType("client");
	table.init();
	Menu.bindEvent();
	Menu.table = table;
});