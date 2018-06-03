package com.ssm.module.sys.service;

import java.util.List;


/**
 * 用户与角色对应关系
 *
 * @author TheOne
 */
public interface SysUserRoleService {

    /**
     * 新增或修改用户角色关联
     *
     * @param userId     用户ID
     * @param roleIdList 角色ID列表
     */
    void saveOrUpdate(Long userId, List<Long> roleIdList);

    /**
     * 根据用户ID，获取角色ID列表
     *
     * @param userId 用户ID
     * @return 角色ID列表
     */
    List<Long> queryRoleIdList(Long userId);

    /**
     * 删除系统管理员
     *
     * @param userId 用户ID
     */
    void delete(Long userId);
}
