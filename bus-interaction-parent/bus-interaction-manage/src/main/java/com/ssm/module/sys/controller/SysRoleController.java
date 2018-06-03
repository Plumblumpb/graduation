package com.ssm.module.sys.controller;

import com.ssm.module.common.annotation.SysLog;
import com.ssm.module.common.constant.AdminUserConstant;
import com.ssm.module.common.util.R;
import com.ssm.module.sys.entity.SysRoleEntity;
import com.ssm.module.sys.service.SysRoleDeptService;
import com.ssm.module.sys.service.SysRoleMenuService;
import com.ssm.module.sys.service.SysRoleService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 角色管理
 */
@RestController
@RequestMapping("/sys/role")
public class SysRoleController extends AbstractController {

    @Autowired
    private SysRoleService sysRoleService;

    @Autowired
    private SysRoleMenuService sysRoleMenuService;

    @Autowired
    private SysRoleDeptService sysRoleDeptService;

    /**
     * 角色列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:role:list")
    public R list(@RequestParam Map<String, Object> params) {
        //如果不是超级管理员，则只查询自己创建的角色列表
        if (getUserId() != AdminUserConstant.SUPER_ADMIN.intValue()) {
            params.put("createUserId", getUserId());
        }
        if (params.get("roleName") != null && StringUtils.isNotBlank(params.get("roleName").toString())) {
            params.put("roleName", params.get("roleName") + "%");
        }
        //查询列表数据
        String currentPage = params.get("currentPage") == null ? "1" : params.get("currentPage").toString();
        String pageSize = params.get("pageSize") == null ? "20" : params.get("pageSize").toString();
        PageHelper.startPage(Integer.parseInt(currentPage), Integer.parseInt(pageSize));
        List<SysRoleEntity> sysRoleEntities = sysRoleService.queryList(params);
        PageInfo<SysRoleEntity> pageInfo = new PageInfo<>(sysRoleEntities);
        return R.ok().put("pageInfo", pageInfo);
    }

    /**
     * 角色列表
     */
    @RequestMapping("/select")
    @RequiresPermissions("sys:role:select")
    public R select() {
        Map<String, Object> map = new HashMap<>();

        //如果不是超级管理员，则只查询自己所拥有的角色列表
        if (getUserId() != AdminUserConstant.SUPER_ADMIN.intValue()) {
            map.put("createUserId", getUserId());
        }
        List<SysRoleEntity> list = sysRoleService.queryList(map);

        return R.ok().put("list", list);
    }

    /**
     * 角色信息
     */
    @RequestMapping("/info/{roleId}")
    @RequiresPermissions("sys:role:info")
    public R info(@PathVariable("roleId") Long roleId) {
        SysRoleEntity role = sysRoleService.queryObject(roleId);

        //查询角色对应的菜单
        List<Long> menuIdList = sysRoleMenuService.queryMenuIdList(roleId);
        role.setMenuIdList(menuIdList);

        //查询角色对应的部门
        List<Long> deptIdList = sysRoleDeptService.queryDeptIdList(roleId);
        role.setDeptIdList(deptIdList);

        return R.ok().put("role", role);
    }

    /**
     * 保存角色
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:role:save")
    @SysLog(value = "新增角色")
    public R save(@RequestBody SysRoleEntity role) {

        sysRoleService.save(role);

        return R.ok();
    }

    /**
     * 修改角色
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:role:update")
    @SysLog(value = "修改角色")
    public R update(@RequestBody SysRoleEntity role) {

        sysRoleService.update(role);

        return R.ok();
    }

    /**
     * 删除角色
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:role:delete")
    @SysLog(value = "删除角色")
    public R delete(@RequestBody Long[] roleIds) {
        sysRoleService.deleteBatch(roleIds);

        return R.ok();
    }
}
