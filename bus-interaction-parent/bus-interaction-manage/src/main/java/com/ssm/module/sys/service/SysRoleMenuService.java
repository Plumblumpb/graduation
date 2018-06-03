package com.ssm.module.sys.service;

import java.util.List;


/**
 * 角色与菜单对应关系
 *
 * @author TheOne
 */
public interface SysRoleMenuService {

    /**
     * 新增或修改角色菜单关联
     *
     * @param roleId     角色ID
     * @param menuIdList 菜单列表
     */
    void saveOrUpdate(Long roleId, List<Long> menuIdList);

    /**
     * 根据角色ID，获取菜单ID列表
     *
     * @param roleId 角色ID
     * @return 菜单ID列表
     */
    List<Long> queryMenuIdList(Long roleId);

}
