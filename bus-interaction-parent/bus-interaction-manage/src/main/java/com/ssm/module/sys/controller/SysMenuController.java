package com.ssm.module.sys.controller;

import com.ssm.module.common.annotation.SysLog;
import com.ssm.module.common.constant.MenuTypeConstant;
import com.ssm.module.common.exception.GciException;
import com.ssm.module.common.util.R;
import com.ssm.module.sys.entity.SysMenuEntity;
import com.ssm.module.sys.service.SysMenuService;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

/**
 * 系统菜单
 *
 * @author TheOne
 */
@RestController
@RequestMapping("/sys/menu")
public class SysMenuController extends AbstractController {

    @Autowired
    private SysMenuService sysMenuService;

    /**
     * 导航菜单
     */
    @RequestMapping("/nav")
    public R nav() {
        List<SysMenuEntity> menuList = sysMenuService.getUserMenuList(getUserId());
        return R.ok().put("menuList", menuList);
    }

    /**
     * 所有菜单列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:menu:list")
    public List<SysMenuEntity> list() {
        List<SysMenuEntity> menuList = sysMenuService.queryList(new HashMap<String, Object>());

        return menuList;
    }

    /**
     * 选择菜单(添加、修改菜单)
     */
    @RequestMapping("/select")
    @RequiresPermissions("sys:menu:select")
    public R select() {
        //查询列表数据
        List<SysMenuEntity> menuList = sysMenuService.queryNotButtonList();

        //添加顶级菜单
        SysMenuEntity root = new SysMenuEntity();
        root.setMenuId(0L);
        root.setName("一级菜单");
        root.setParentId(-1L);
        root.setOpen(true);
        menuList.add(root);

        return R.ok().put("menuList", menuList);
    }

    /**
     * 菜单信息
     */
    @RequestMapping("/info/{menuId}")
    @RequiresPermissions("sys:menu:info")
    public R info(@PathVariable("menuId") Long menuId) {
        SysMenuEntity menu = sysMenuService.queryObject(menuId);
        return R.ok().put("menu", menu);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:menu:save")
    @SysLog(value = "新增菜单")
    public R save(@RequestBody SysMenuEntity menu) {
        //数据校验
        verifyForm(menu);

        sysMenuService.save(menu);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:menu:update")
    @SysLog(value = "修改菜单")
    public R update(@RequestBody SysMenuEntity menu) {
        //数据校验
        verifyForm(menu);

        sysMenuService.update(menu);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:menu:delete")
    @SysLog(value = "删除菜单")
    public R delete(@RequestBody Long[] menuId) {
        for (int i = 0; i < menuId.length; i++) {
            if (menuId[i] < 24) {
                return R.error("系统菜单，不能删除");
            }
            //判断是否有子菜单或按钮
            List<SysMenuEntity> menuList = sysMenuService.queryListParentId(menuId[i]);
            if (menuList.size() > 0) {
                return R.error("请先删除子菜单或按钮");
            }
        }

        sysMenuService.deleteBatch(menuId);

        return R.ok();
    }

    /**
     * 验证参数是否正确
     */
    private void verifyForm(SysMenuEntity menu) {
        if (StringUtils.isBlank(menu.getName())) {
            throw new GciException("菜单名称不能为空");
        }

        if (menu.getParentId() == null) {
            throw new GciException("上级菜单不能为空");
        }

        //菜单
        if (menu.getType() == MenuTypeConstant.MENU.intValue()) {
            if (StringUtils.isBlank(menu.getUrl())) {
                throw new GciException("菜单URL不能为空");
            }
        }

        //上级菜单类型
        int parentType = MenuTypeConstant.CATALOG.intValue();
        if (menu.getParentId() != 0) {
            SysMenuEntity parentMenu = sysMenuService.queryObject(menu.getParentId());
            parentType = parentMenu.getType();
        }

        //目录、菜单
        if (menu.getType() == MenuTypeConstant.CATALOG.intValue() ||
                menu.getType() == MenuTypeConstant.MENU.intValue()) {
            if (parentType != MenuTypeConstant.CATALOG.intValue()) {
                throw new GciException("上级菜单只能为目录类型");
            }
            return;
        }

        //按钮
        if (menu.getType() == MenuTypeConstant.BUTTON.intValue()) {
            if (parentType != MenuTypeConstant.MENU.intValue()) {
                throw new GciException("上级菜单只能为菜单类型");
            }
            return;
        }
    }
}
