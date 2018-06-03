package com.ssm.module.sys.service;

import com.ssm.module.sys.entity.SysUserEntity;

import java.util.List;
import java.util.Map;


/**
 * 系统用户
 *
 * @author TheOne
 */
public interface SysUserService {

    /**
     * 查询用户的所有权限
     *
     * @param userId 用户ID
     * @return 权限列表
     */
    List<String> queryAllPerms(Long userId);

    /**
     * 查询用户的所有菜单ID
     *
     * @param userId 用户ID
     * @return 菜单ID列表
     */
    List<Long> queryAllMenuId(Long userId);

    /**
     * 根据用户名，查询系统用户
     *
     * @param username 用户名
     * @return 用户信息
     */
    SysUserEntity queryByUserName(String username);

    /**
     * 根据用户ID，查询用户
     *
     * @param userId 用户ID
     * @return 用户信息
     */
    SysUserEntity queryObject(Long userId);

    /**
     * 查询用户列表
     *
     * @param map 查询条件
     * @return 用户列表
     */
    List<SysUserEntity> queryList(Map<String, Object> map);

    /**
     * 保存用户
     *
     * @param user 用户信息
     */
    void save(SysUserEntity user);

    /**
     * 修改用户
     *
     * @param user 用户信息
     */
    void update(SysUserEntity user);

    /**
     * 删除用户
     *
     * @param userIds 用户ID数组
     */
    void deleteBatch(Long[] userIds);

    /**
     * 修改密码
     *
     * @param userId      用户ID
     * @param password    原密码
     * @param newPassword 新密码
     * @return 更新结果
     */
    int updatePassword(Long userId, String password, String newPassword);

    List<Long> listUserMenuIds(Long userId);

    void deleteSysuserrole(Long[] id);

    void deleteSysuser(Long[] id);
}
