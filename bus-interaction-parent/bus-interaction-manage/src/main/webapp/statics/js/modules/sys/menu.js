var elTableTreeColumn = Vue.extend({
    name: 'el-table-tree-column',
    props: {
        prop: {
            type: String
        },
        label: {
            type: String
        },
        width: {
            type: String
        },
        treeKey: {
            type: String,
            default: 'menuId'
        },
        childNumKey: {
            type: String,
            default: 'child_num'
        },
        parentKey: {
            type: String,
            default: 'parentId'
        },
        levelKey: {
            type: String,
            default: 'depth'
        },
        childKey: {
            type: String,
            default: 'children'
        },
        fileIcon: {
            type: String,
            default: 'el-icon-file'
        },
        folderIcon: {
            type: String,
            default: 'el-icon-folder'
        },
        remote: {
            type: Function,
            default: null
        }
    },
    computed: {
        owner: function () {
            var parent = this.$parent;
            while (parent && !parent.tableId) {
                parent = parent.$parent;
            }
            return parent;
        }
    },
    data: function () {
        return {loading: false};
    },
    methods: {
        floderIcon: function (row) {
            var expanded = row.$extra && row.$extra.expanded;
            var floder = this.folderIcon,
                floder_open = this.folderIcon + '-open';
            return expanded ? floder_open : floder;
        },
        hasChild: function (row) {
            if (row[this.childNumKey] != undefined) {
                return row[this.childNumKey] > 0 ? true : false;
            } else if (row[this.childKey] != undefined) {
                return row[this.childKey].length > 0 ? true : false;
            } else {
                return false;
            }
        },
        paddingLeft: function (row) {
            return (parseInt(row[this.levelKey]) * 14) + 'px';
        },
        icon: function (row) {
            if (row.$extra && row.$extra.loading == true) return 'el-icon-loading';
            return row.$extra && row.$extra.expanded ? 'el-icon-caret-bottom' : 'el-icon-caret-right';
        },
        doexpanded: function (index, row) {
            var vm = this;
            var data = JSON.parse(JSON.stringify(this.owner.store.states._data))
            if (data[index].$extra == undefined) {
                data[index].$extra = {expanded: true}
            } else {
                data[index].$extra.expanded = !data[index].$extra.expanded;
            }
            if (data[index].$extra.expanded) {
                if (this.remote != null) {
                    var hash = hash();
                    data[index].$extra.expanded = false;
                    data[index].$extra.hash = hash;
                    data[index].$extra.loading = true;
                    vm.owner.store.commit('setData', data);
                    this.remote(row, function (result) {
                        var list = vm.owner.store.states._data;
                        var _index = index(hash, list);
                        list[_index].$extra = {
                            loading: false,
                            expanded: result && result.length > 0 ? true : false
                        }
                        if (result && result.length > 0) {
                            var prefix = list.slice(0, _index + 1);
                            var i = 0;
                            while (i < _index + 1) {
                                list.shift();
                                i++;
                            }
                            list = prefix.concat(result).concat(list);
                        } else {
                            list[_index][vm.childNumKey] = 0;
                        }
                        vm.owner.store.commit('setData', list);
                    })
                } else {
                    var prefix = data.slice(0, index + 1);
                    var i = 0;
                    while (i < index + 1) {
                        data.shift();
                        i++;
                    }
                    data = prefix.concat(row[vm.childKey]).concat(data);
                    this.owner.store.commit('setData', data);
                }
            } else {
                var id = row[vm.treeKey], result = [];
                var removeIds = descendantsIds(id, data, this.parentKey, this.treeKey);
                data.forEach(function (item) {
                    if (indexOf(item[vm.treeKey], removeIds) == -1) {
                        result.push(item)
                    }
                });
                data = result;
                this.owner.store.commit('setData', data);
            }

        }
    },
    template: [
        '<div>',
        '<component is="el-table-column" :prop="prop" :label="label" :width="width">',
        '<template scope="scope">',
        '<span v-if="hasChild(scope.row)" @click.prevent="doexpanded(scope.$index,scope.row)" >',
        '<span :style="{paddingLeft : paddingLeft(scope.row)}">',
        '<i :class="icon(scope.row)"></i>',
        '<i :class="floderIcon(scope.row)" style="padding-right: 0px;"></i>',
        '</span>',
        '<span>{{scope.row[prop]}}</span>',
        '</span>',
        '<span v-if="!hasChild(scope.row)">',
        '<span :style="{paddingLeft : paddingLeft(scope.row)}">',
        '<i :class="fileIcon" style="padding-right: 7px;padding-left:18px"></i>',
        '</span>',
        '<span>{{scope.row[prop]}}</span>',
        '</span>',
        '</template>',
        '</component>',
        '</div>'
    ].join('')
});
Vue.component('elTableTreeColumn', elTableTreeColumn);


var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "menuId",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url: "nourl"
        }
    }
};
var ztree;

var vm = new Vue({
    el: '#rrapp',
    data: {
        menuNameTree: null,
        showList: true,
        title: null,
        menu: {
            parentName: null,
            parentId: 0,
            type: 1,
            orderNum: 0,
            icon: null
        },
        defaultPropsMenu: {
            children: 'children',
            label: 'name'
        },
        menuTree: [{id: 0, label: '一级菜单', name: '一级菜单', children: '',}],
        showMenuName: false,
        multipleSelection: [],
        disabled: false,
        disabledDelete: false
    },
    methods: {
        getMenu: function () {
            //加载菜单树
            axios.get(baseURL + "sys/menu/list").then(function (response) {
                var menuTree = treeify(response.data, 'menuId', 'parentId', 'children');
                vm.menuTree[0].children = menuTree;

            });
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            $('.selected-icon i:first-child').attr("class", "fip-icon-block")
            $('.current-icon').removeClass("current-icon");
            vm.menu = {parentName: null, parentId: 0, type: 1, orderNum: 0, type: "1"};
            vm.getMenu();
        },
        update: function (row) {
            $.get(baseURL + "sys/menu/info/" + row.menuId, function (r) {
                vm.showList = false;
                vm.title = "修改";
                vm.menu = r.menu;
                vm.menu.type = r.menu.type + "";
                $('.selected-icon i:first-child').attr("class", r.menu.icon)
                $('.current-icon').removeClass("current-icon");
                vm.getMenu();
            });
        },
        del: function () {
            if (vm.multipleSelection.length == 0) {
                vm.$message({
                    message: '请先选择需要删除的部门',
                    type: 'warning'
                });
                return;
            } else {
                var ids = new Array();
                for (var i = 0; i < vm.multipleSelection.length; i++) {
                    ids.push(vm.multipleSelection[i].menuId);
                }
                vm.$confirm('确定要删除选中的记录', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: function (action, instance) {
                        if (action == 'cancel') {
                            return;
                        } else {
                            axios.post(baseURL + "sys/menu/delete", ids).then(function (response) {
                                if (response.data.code == 0) {
                                    // 保存成功，隐藏表单，更新列表数据
                                    vm.$message({
                                        message: '操作成功',
                                        type: 'success'
                                    });
                                    vm.multipleSelection = [];
                                    vm.search()
                                } else {
                                    vm.$message({
                                        message: response.data.msg,
                                        type: 'error'
                                    });
                                }
                            });
                        }
                    }
                });

            }
        },
        search: function () {
            axios.get(baseURL + "sys/menu/list").then(function (response) {
                var length = response.data.length
                for (var i = 0; i < length; i++) {
                    var tmp = response.data[i].icon
                    if (tmp == null) {
                        continue
                    }
                    ;
                    response.data[i].icon = "<i class=" + "'" + tmp + " fa-lg" + "'" + "></i>"

                }
                var menuNameTree = treeify(response.data, 'menuId', 'parentId', 'children');
                vm.menuNameTree = menuNameTree;
            }).catch(function (error) {
                vm.$message({
                    message: '加载菜单数据出错',
                    type: 'error'
                });
            });
        },
        saveOrUpdate: function () {
            if (vm.validator()) {
                return;
            }
            vm.menu.icon = $('#menuIcon').val()
            var url = vm.menu.menuId == null ? "sys/menu/save" : "sys/menu/update";
            if (vm.menu.parentId == null) {
                vm.menu.parentId = 0;
            }
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.menu),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function () {
                        });
                        vm.showList = true;
                        vm.search()
                    } else {
                        alert(r.msg);
                    }
                }
            });
            vm.search()
        },
        menuTree: function () {
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择菜单",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#menuLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = ztree.getSelectedNodes();
                    //选择上级菜单
                    vm.menu.parentId = node[0].menuId;
                    vm.menu.parentName = node[0].name;
                    layer.close(index);
                }
            });
        },
        reload: function () {
            vm.showList = true;
        },
        validator: function () {
            if (isBlank(vm.menu.name)) {
                alert("菜单名称不能为空");
                return true;
            }

            //菜单
            if (vm.menu.type === 1 && isBlank(vm.menu.url)) {
                alert("菜单URL不能为空");
                return true;
            }
        },
        showMenuTree: function () {
            vm.getMenu()
            vm.showMenuName = true;
        },
        handleMenuNodeClick: function (nodeObject, node, nodeComponent) {
            vm.menu.parentId = nodeObject.menuId;
            vm.menu.parentName = nodeObject.name;
            vm.showMenuName = false;
        },
        handleSelectionChange: function (val) {
            if (val.length <= 1) {
                vm.disabledDelete = false;
                vm.disabled = false;
            } else {
                vm.disabledDelete = true;
                vm.disabled = true
            }
            vm.multipleSelection = val;
        }
    },
    created: function () {
        axios.get(baseURL + "sys/menu/list").then(function (response) {
            var length = response.data.length
            for (var i = 0; i < length; i++) {
                var tmp = response.data[i].icon
                if (tmp == null) {
                    continue
                }
                ;
                response.data[i].icon = "<i class=" + "'" + tmp + " fa-lg" + "'" + "></i>"

            }
            var menuNameTree = treeify(response.data, 'menuId', 'parentId', 'children');
            vm.menuNameTree = menuNameTree;
        }).catch(function (error) {
            vm.$message({
                message: '加载菜单数据出错',
                type: 'error'
            });
        });
        $(function () {
            $('#menuIcon').fontIconPicker({
                iconsPerPage: 100,
                source: resourceInfoIconDatas,
                emptyIcon: true,
                hasSearch: true
            });
        });


    }

});


var Menu = {
    id: "menuTable",
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Menu.initColumn = function () {
    var columns = [
        {field: 'selectItem', radio: true},
        {title: '菜单ID', field: 'menuId', visible: false, align: 'center', valign: 'middle', width: '80px'},
        {title: '菜单名称', field: 'name', align: 'center', valign: 'middle', sortable: true, width: '180px'},
        {title: '上级菜单', field: 'parentName', align: 'center', valign: 'middle', sortable: true, width: '100px'},
        {
            title: '图标',
            field: 'icon',
            align: 'center',
            valign: 'middle',
            sortable: true,
            width: '80px',
            formatter: function (item, index) {
                return item.icon == null ? '' : '<i class="' + item.icon + ' fa-lg"></i>';
            }
        },
        {
            title: '类型',
            field: 'type',
            align: 'center',
            valign: 'middle',
            sortable: true,
            width: '100px',
            formatter: function (item, index) {
                if (item.type === 0) {
                    return '<span class="label label-primary">目录</span>';
                }
                if (item.type === 1) {
                    return '<span class="label label-success">菜单</span>';
                }
                if (item.type === 2) {
                    return '<span class="label label-warning">按钮</span>';
                }
            }
        },
        {title: '排序号', field: 'orderNum', align: 'center', valign: 'middle', sortable: true, width: '100px'},
        {title: '菜单URL', field: 'url', align: 'center', valign: 'middle', sortable: true, width: '160px'},
        {title: '授权标识', field: 'perms', align: 'center', valign: 'middle', sortable: true}]
    return columns;
};
