package com.ssm.module.sys.dao;

import com.ssm.module.common.dao.BaseDao;
import com.ssm.module.sys.entity.SysUserEntity;

import java.util.List;
import java.util.Map;

/**
 * 系统用户
 *
 * @author TheOne
 */
public interface SysUserDao extends BaseDao<SysUserEntity> {

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
     * @return 系统用户信息
     */
    SysUserEntity queryByUserName(String username);

    /**
     * 修改密码
     *
     * @param map 用户密码信息
     * @return 更新结果
     */
    int updatePassword(Map<String, Object> map);

    /**
     * 根据菜单ID查询所有权限
     *
     * @param menuIdList
     * @return
     */
    List<String> queryPermsByMenuId(List<Long> menuIdList);

    void deleteSysuserrole(Long id);

    void deleteSysuser(Long id);

}
