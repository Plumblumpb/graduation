package com.ssm.module.sys.controller;

import com.ssm.module.common.annotation.SysLog;
import com.ssm.module.common.util.R;
import com.ssm.module.common.util.ShiroUtil;
import com.ssm.module.sys.entity.SysUserEntity;
import com.ssm.module.sys.service.SysUserRoleService;
import com.ssm.module.sys.service.SysUserService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.commons.lang.ArrayUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 系统用户
 *
 * @author TheOne
 */
@RestController
@RequestMapping("/sys/user")
public class SysUserController extends AbstractController {

    @Autowired
    private SysUserService sysUserService;

    @Autowired
    private SysUserRoleService sysUserRoleService;

    /**
     * 所有用户列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:user:list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        String currentPage = params.get("currentPage") == null ? "1" : params.get("currentPage").toString();
        String pageSize = params.get("pageSize") == null ? "20" : params.get("pageSize").toString();
        PageHelper.startPage(Integer.parseInt(currentPage), Integer.parseInt(pageSize));
        List<SysUserEntity> userList = sysUserService.queryList(params);
        PageInfo<SysUserEntity> pageInfo = new PageInfo<>(userList);
        return R.ok().put("pageInfo", pageInfo);
    }

    /**
     * 获取登录的用户信息
     */
    @RequestMapping("/info")
    public R info() {
        return R.ok().put("user", getUser());
    }

    /**
     * 修改登录用户密码
     */
    @RequestMapping("/password")
    @SysLog(value = "修改密码")
    public R password(String password, String newPassword) {
        //原密码
        password = ShiroUtil.sha256(password, getUser().getSalt());
        //新密码
        newPassword = ShiroUtil.sha256(newPassword, getUser().getSalt());

        //更新密码
        int count = sysUserService.updatePassword(getUserId(), password, newPassword);
        if (count == 0) {
            return R.error("原密码不正确");
        }

        return R.ok();
    }

    /**
     * 用户信息
     */
    @RequestMapping("/info/{userId}")
    @RequiresPermissions("sys:user:info")
    public R info(@PathVariable("userId") Long userId) {
        SysUserEntity user = sysUserService.queryObject(userId);

        //获取用户所属的角色列表
        List<Long> roleIdList = sysUserRoleService.queryRoleIdList(userId);
        user.setRoleIdList(roleIdList);

        return R.ok().put("user", user);
    }

    /**
     * 保存用户
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:user:save")
    @SysLog(value = "新增系统管理员")
    public R save(@RequestBody SysUserEntity user) {
        sysUserService.save(user);
        return R.ok();
    }

    /**
     * 修改用户
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:user:update")
    @SysLog(value = "修改系统管理员")
    public R update(@RequestBody SysUserEntity user) {
        sysUserService.update(user);
        return R.ok();
    }

    /**
     * 删除用户
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:user:delete")
    @SysLog(value = "删除系统管理员")
    public R delete(@RequestBody Long[] userIds) {
        if (ArrayUtils.contains(userIds, 1L)) {
            return R.error("系统管理员不能删除");
        }

        if (ArrayUtils.contains(userIds, getUserId())) {
            return R.error("当前用户不能删除");
        }

        sysUserService.deleteSysuserrole(userIds);

        return R.ok();
    }
}
